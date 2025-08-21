import Quiz from '../components/Quiz'

export default function Play(){
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black">Play</h2>
      <p className="text-gray-700">Pick the correct feeling for each sentence.</p>
      <Quiz />
    </div>
  )
}
