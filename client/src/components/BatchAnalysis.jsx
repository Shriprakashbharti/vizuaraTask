// [file name]: BatchAnalysis.jsx
// [new file]
import { useState } from 'react'
import { classifyRule } from '../lib/lexicon'
import { makeNB, tinyTrainData } from '../lib/naiveBayes'
import { hfSentiment } from '../lib/hfClient'
import Badge from './Badge'
import { saveAnalysis } from '../lib/db'

export default function BatchAnalysis() {
  const [text, setText] = useState('I love this product!\nThis is terrible.\nThe weather is nice today.')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('rule') // 'rule', 'nb', or 'hf'

  const nb = makeNB(tinyTrainData)

  const analyzeBatch = async () => {
    const sentences = text.split('\n').filter(s => s.trim())
    if (sentences.length === 0) return
    
    setLoading(true)
    const analysisResults = []
    
    for (const sentence of sentences) {
      let result
      
      try {
        switch (method) {
          case 'rule':
            result = classifyRule(sentence)
            break
          case 'nb':
            result = nb.classify(sentence)
            break
          case 'hf':
            result = await hfSentiment(sentence)
            break
          default:
            result = { label: 'neutral', score: 0.5 }
        }
        
        analysisResults.push({
          sentence,
          result
        })
        
        // Save to history
        saveAnalysis(sentence, method, result)
      } catch (error) {
        console.error(`Error analyzing "${sentence}":`, error)
        analysisResults.push({
          sentence,
          result: { label: 'error', score: 0, error: error.message }
        })
      }
    }
    
    setResults(analysisResults)
    setLoading(false)
  }

  const sentimentSummary = {
    positive: results.filter(r => r.result.label === 'positive').length,
    negative: results.filter(r => r.result.label === 'negative').length,
    neutral: results.filter(r => r.result.label === 'neutral').length,
    error: results.filter(r => r.result.label === 'error').length
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-extrabold mb-4">Batch Sentiment Analysis</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="rounded-xl border px-3 py-2 bg-emerald-50"
          >
            <option value="rule">Rule-based</option>
            <option value="nb">Naive Bayes</option>
            <option value="hf">Hugging Face</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter sentences (one per line)
          </label>
          <textarea
            className="w-full rounded-2xl border p-4 outline-none focus:ring-4 focus:ring-emerald-200"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter one sentence per line..."
          />
        </div>
        
        <button 
          onClick={analyzeBatch}
          disabled={loading}
          className="btn btn-primary disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Sentences'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-extrabold mb-4">Results Summary</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">{sentimentSummary.positive}</div>
              <div className="text-sm text-green-600">Positive</div>
            </div>
            
            <div className="bg-rose-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-rose-700">{sentimentSummary.negative}</div>
              <div className="text-sm text-rose-600">Negative</div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-slate-700">{sentimentSummary.neutral}</div>
              <div className="text-sm text-slate-600">Neutral</div>
            </div>
            
            {sentimentSummary.error > 0 && (
              <div className="bg-amber-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-700">{sentimentSummary.error}</div>
                <div className="text-sm text-amber-600">Errors</div>
              </div>
            )}
          </div>
          
          <h4 className="font-bold mb-3">Detailed Results</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentence</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs">{item.sentence}</td>
                    <td className="px-4 py-3">
                      {item.result.label === 'error' ? (
                        <span className="text-rose-500 text-sm">Error</span>
                      ) : (
                        <Badge tone={item.result.label}>{item.result.label.toUpperCase()}</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.result.label !== 'error' ? `${(item.result.score * 100).toFixed(1)}%` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}