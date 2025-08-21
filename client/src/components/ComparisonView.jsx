// [file name]: ComparisonView.jsx
// [new file]
import { useState, useMemo } from 'react'
import { classifyRule } from '../lib/lexicon'
import { makeNB, tinyTrainData } from '../lib/naiveBayes'
import { hfSentiment } from '../lib/hfClient'
import Badge from './Badge'
import { saveAnalysis } from '../lib/db'

export default function ComparisonView() {
  const [text, setText] = useState('I love sunny days but hate mosquito bites.')
  const [loading, setLoading] = useState({ nb: false, rule: false, hf: false })
  const [results, setResults] = useState({
    rule: null,
    nb: null,
    hf: null
  })

  // Local Naive Bayes
  const nb = useMemo(() => makeNB(tinyTrainData), [])

  const analyzeAll = async (inputText) => {
    if (!inputText.trim()) return
    
    // Rule-based (instant)
    setLoading(prev => ({ ...prev, rule: true }))
    const ruleResult = classifyRule(inputText)
    setResults(prev => ({ ...prev, rule: ruleResult }))
    setLoading(prev => ({ ...prev, rule: false }))
    saveAnalysis(inputText, 'rule', ruleResult)

    // Naive Bayes (instant)
    setLoading(prev => ({ ...prev, nb: true }))
    const nbResult = nb.classify(inputText)
    setResults(prev => ({ ...prev, nb: nbResult }))
    setLoading(prev => ({ ...prev, nb: false }))
    saveAnalysis(inputText, 'naive_bayes', nbResult)

    // Hugging Face (API call)
    setLoading(prev => ({ ...prev, hf: true }))
    try {
      const hfResult = await hfSentiment(inputText)
      setResults(prev => ({ ...prev, hf: hfResult }))
      saveAnalysis(inputText, 'hugging_face', hfResult)
    } catch (error) {
      console.error('HF Error:', error)
      setResults(prev => ({ ...prev, hf: { label: 'error', score: 0 } }))
    } finally {
      setLoading(prev => ({ ...prev, hf: false }))
    }
  }

  const handleInputChange = (e) => {
    const newText = e.target.value
    setText(newText)
    
    // Debounce real-time analysis
    clearTimeout(window.analysisTimeout)
    window.analysisTimeout = setTimeout(() => {
      analyzeAll(newText)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-extrabold mb-4">Compare Analysis Methods</h3>
        
        <textarea
          className="w-full rounded-2xl border p-4 outline-none focus:ring-4 focus:ring-emerald-200"
          rows={4}
          value={text}
          onChange={handleInputChange}
          placeholder="Type a sentence to compare analysis methods..."
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Rule-based */}
        <div className="card">
          <h4 className="font-bold mb-3">Rule-based</h4>
          {loading.rule ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : results.rule ? (
            <div className="flex items-center justify-between">
              <Badge tone={results.rule.label}>{results.rule.label.toUpperCase()}</Badge>
              <span className="text-sm text-gray-500">{(results.rule.score * 100).toFixed(1)}%</span>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Enter text to analyze</p>
          )}
        </div>

        {/* Naive Bayes */}
        <div className="card">
          <h4 className="font-bold mb-3">Naive Bayes</h4>
          {loading.nb ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : results.nb ? (
            <div className="flex items-center justify-between">
              <Badge tone={results.nb.label}>{results.nb.label.toUpperCase()}</Badge>
              <span className="text-sm text-gray-500">{(results.nb.score * 100).toFixed(1)}%</span>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Enter text to analyze</p>
          )}
        </div>

        {/* Hugging Face */}
        <div className="card">
          <h4 className="font-bold mb-3">Hugging Face</h4>
          {loading.hf ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : results.hf ? (
            results.hf.label === 'error' ? (
              <p className="text-rose-500 text-sm">API Error</p>
            ) : (
              <div className="flex items-center justify-between">
                <Badge tone={results.hf.label}>{results.hf.label.toUpperCase()}</Badge>
                <span className="text-sm text-gray-500">{(results.hf.score * 100).toFixed(1)}%</span>
              </div>
            )
          ) : (
            <p className="text-gray-500 text-sm">Enter text to analyze</p>
          )}
        </div>
      </div>
    </div>
  )
}