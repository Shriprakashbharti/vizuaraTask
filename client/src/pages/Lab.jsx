// [file name]: Lab.jsx
// [updated file]
import { useState } from 'react'
import Sandbox from '../components/Sandbox'
import BatchAnalysis from '../components/BatchAnalysis'
import ComparisonView from '../components/ComparisonView'

export default function Lab(){
  const [activeTab, setActiveTab] = useState('sandbox')

  const tabs = [
    { id: 'sandbox', name: 'Sandbox' },
    { id: 'comparison', name: 'Comparison' },
    { id: 'batch', name: 'Batch Analysis' }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black">Sentiment Lab</h2>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'sandbox' && (
        <>
          <p className="text-gray-700">Type any sentence and see the computer's guess in real-time.</p>
          <Sandbox />
        </>
      )}

      {activeTab === 'comparison' && (
        <>
          <p className="text-gray-700">Compare results from all three sentiment analysis methods.</p>
          <ComparisonView />
        </>
      )}

      {activeTab === 'batch' && (
        <>
          <p className="text-gray-700">Analyze multiple sentences at once and get an overall summary.</p>
          <BatchAnalysis />
        </>
      )}
    </div>
  )
}