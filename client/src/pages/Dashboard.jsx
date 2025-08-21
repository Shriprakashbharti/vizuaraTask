// [file name]: Dashboard.jsx
// [new file]
import { useState, useEffect } from 'react'
import { getAnalysisHistory } from '../lib/db'

export default function Dashboard() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getAnalysisHistory()
        setHistory(data)
      } catch (error) {
        console.error('Error fetching history:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black">Analysis History</h2>
      
      {history.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">No analysis history yet. Try using the Lab to get started!</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card text-center">
              <h3 className="text-lg font-bold text-gray-700">Total Analyses</h3>
              <p className="text-4xl font-black text-emerald-600">{history.length}</p>
            </div>
            
            <div className="card text-center">
              <h3 className="text-lg font-bold text-gray-700">Positive</h3>
              <p className="text-4xl font-black text-green-600">
                {history.filter(item => item.result.label === 'positive').length}
              </p>
            </div>
            
            <div className="card text-center">
              <h3 className="text-lg font-bold text-gray-700">Negative</h3>
              <p className="text-4xl font-black text-rose-600">
                {history.filter(item => item.result.label === 'negative').length}
              </p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Recent Analyses</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Text</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.slice(0, 10).map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{item.text}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.method}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.result.label === 'positive' ? 'bg-green-100 text-green-800' :
                          item.result.label === 'negative' ? 'bg-rose-100 text-rose-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {item.result.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {(item.result.score * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}