import { Link } from 'react-router-dom'
import SentimentDemo from '../components/SentimentDemo'

export default function Home(){
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          Learn <span className="text-emerald-600">Sentiment Analysis</span> the fun way!
        </h1>
        <p className="text-lg text-gray-700">
          Computers can guess feelings in text. Are the words happy, sad, or just facts? Explore with stories, games, and a live lab!
        </p>
        <div className="flex gap-3">
          <Link to="/learn" className="btn btn-primary">Start Story</Link>
          <Link to="/play" className="btn bg-yellow-400">Play Quiz</Link>
          <Link to="/lab" className="btn bg-slate-900 text-white">Open Lab</Link>
        </div>
      </div>
      <SentimentDemo compact />
    </div>
  )
}
