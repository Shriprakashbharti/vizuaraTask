// Same tiny Naive Bayes model for server-side
export const tinyTrainData = [
  ['I love this', 'positive'],
  ['this is awesome', 'positive'],
  ['what a great day', 'positive'],
  ['the movie was fantastic', 'positive'],
  ['I am happy today', 'positive'],
  ['I hate this', 'negative'],
  ['this is awful', 'negative'],
  ['what a terrible day', 'negative'],
  ['the food was horrible', 'negative'],
  ['I am sad today', 'negative'],
  ['the train arrives at five', 'neutral'],
  ['it is a book', 'neutral'],
  ['the sky is blue', 'neutral'],
  ['I have two pens', 'neutral']
]

const tokenize = (s) => (s.toLowerCase().match(/[a-z']+/g) || [])

export function makeNB(data = tinyTrainData){
  const vocab = new Set()
  const counts = { positive: {}, negative: {}, neutral: {} }
  const classCounts = { positive: 0, negative: 0, neutral: 0 }
  const totalDocs = data.length

  for(const [text, label] of data){
    classCounts[label]++
    for(const tok of tokenize(text)){
      vocab.add(tok)
      counts[label][tok] = (counts[label][tok] || 0) + 1
    }
  }

  const prior = {
    positive: Math.log((classCounts.positive + 1) / (totalDocs + 3)),
    negative: Math.log((classCounts.negative + 1) / (totalDocs + 3)),
    neutral: Math.log((classCounts.neutral + 1) / (totalDocs + 3)),
  }
  const denom = {
    positive: Object.values(counts.positive).reduce((a,b)=>a+b,0) + vocab.size,
    negative: Object.values(counts.negative).reduce((a,b)=>a+b,0) + vocab.size,
    neutral: Object.values(counts.neutral).reduce((a,b)=>a+b,0) + vocab.size,
  }

  function score(label, tokens){
    let s = prior[label]
    for(const t of tokens){
      const num = (counts[label][t] || 0) + 1
      s += Math.log(num / denom[label])
    }
    return s
  }

  function softmax(arr){
    const mx = Math.max(...arr)
    const exps = arr.map(v=>Math.exp(v-mx))
    const sum = exps.reduce((a,b)=>a+b,0)
    return exps.map(v=>v/sum)
  }

  function classify(text){
    const toks = tokenize(text)
    const sPos = score('positive', toks)
    const sNeg = score('negative', toks)
    const sNeu = score('neutral', toks)
    const probs = softmax([sPos, sNeg, sNeu])
    const labels = ['positive','negative','neutral']
    const idx = probs.indexOf(Math.max(...probs))
    return { label: labels[idx], score: Number(probs[idx].toFixed(2)) }
  }

  return { classify }
}
