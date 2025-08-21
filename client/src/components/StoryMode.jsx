export default function StoryMode(){
  const scenes = [
    {
      title: 'Meet Zuzu & Max',
      text: 'Zuzu the robot wants to understand feelings in messages. Max will teach Zuzu using examples!',
      task: null
    },
    {
      title: 'Happy Words',
      text: 'Words like love, awesome, great often mean happy feelings.',
      task: { question: 'Which sentence sounds happy?', options: ['I love holidays!', 'This is terrible.'], answer: 0 }
    },
    {
      title: 'Sad/Angry Words',
      text: 'Words like hate, bad, awful often mean unhappy feelings.',
      task: { question: 'Which sentence sounds unhappy?', options: ['I hate spoilers.', 'This cake is amazing!'], answer: 0 }
    },
    {
      title: 'Neutral Words',
      text: 'Some sentences are just facts. They are neither happy nor sad.',
      task: { question: 'Which is neutral?', options: ['The bus arrives at 5 PM.', 'I adore puppies!'], answer: 0 }
    }
  ]

  return (
    <div className="space-y-6">
      {scenes.map((s, i)=> (
        <div key={i} className="card">
          <h3 className="text-xl font-bold mb-2">{i+1}. {s.title}</h3>
          <p className="text-gray-700">{s.text}</p>
          {s.task && (
            <div className="mt-4">
              <p className="font-semibold mb-2">{s.task.question}</p>
              <div className="flex gap-3">
                {s.task.options.map((opt, idx)=> (
                  <button key={idx} className="btn bg-emerald-50 hover:bg-emerald-100"
                    onClick={()=> alert(idx === s.task.answer ? 'Correct! 🎉' : 'Try again! 🌟')}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
