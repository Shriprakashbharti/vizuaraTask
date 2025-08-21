// [file name]: Sandbox.jsx
// [updated file]
import { useEffect, useState } from 'react'
import SentimentDemo from './SentimentDemo'

export default function Sandbox(){
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SentimentDemo />
      <div className="card space-y-3">
        <h3 className="text-xl font-extrabold">Tips</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Try different words like <b>love</b>, <b>hate</b>, <b>okay</b>.</li>
          <li>Mix happy and unhappy words. What happens?</li>
          <li>Switch between <b>Rule-based</b> and <b>Naive Bayes</b>.</li>
          <li>Type slowly to see real-time analysis updates.</li>
        </ul>
      </div>
    </div>
  )
}