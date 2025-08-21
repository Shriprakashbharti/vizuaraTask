import { useMemo, useState } from 'react'
import { classifyRule } from '../lib/lexicon'
import ProgressBar from './ProgressBar'

const questions = [
  'I absolutely love this game!',
  'This homework is awful.',
  'The sky is blue.',
  'I dislike waiting in long lines.',
  'What a fantastic movie!'
]

export default function Quiz(){
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)

  const q = questions[idx]
  const label = useMemo(()=> classifyRule(q).label, [idx])

  const pick = (choice) => {
    if(choice === label) setScore(s => s+1)
    const next = idx + 1
    if(next < questions.length) setIdx(next)
    else alert(`Great job! You scored ${score + (choice === label ? 1 : 0)}/${questions.length}`)
  }

  const progress = (idx / questions.length) * 100

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold">Quick Quiz</h3>
        <div className="w-40"><ProgressBar value={progress} /></div>
      </div>
      <p className="text-lg">{q}</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={()=>pick('positive')} className="btn btn-primary">Positive 😄</button>
        <button onClick={()=>pick('negative')} className="btn bg-rose-500 text-white">Negative 😟</button>
        <button onClick={()=>pick('neutral')} className="btn bg-slate-800 text-white">Neutral 😐</button>
      </div>
    </div>
  )
}
