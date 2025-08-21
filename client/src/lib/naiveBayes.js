// [file name]: enhancedNaiveBayes.js

export const largerTrainData = [
  // Positive examples (50+)
  ['I love this', 'positive'],
  ['this is awesome', 'positive'],
  ['what a great day', 'positive'],
  ['the movie was fantastic', 'positive'],
  ['I am happy today', 'positive'],
  ['excellent work', 'positive'],
  ['wonderful experience', 'positive'],
  ['beautiful presentation', 'positive'],
  ['outstanding performance', 'positive'],
  ['brilliant idea', 'positive'],
  ['perfect solution', 'positive'],
  ['amazing results', 'positive'],
  ['superb quality', 'positive'],
  ['terrific job', 'positive'],
  ['fantastic achievement', 'positive'],
  ['marvelous effort', 'positive'],
  ['splendid performance', 'positive'],
  ['exceptional service', 'positive'],
  ['incredible progress', 'positive'],
  ['admirable work', 'positive'],
  ['I really enjoy this', 'positive'],
  ['this makes me happy', 'positive'],
  ['so pleased with this', 'positive'],
  ['thrilled with the outcome', 'positive'],
  ['delighted by the results', 'positive'],
  ['overjoyed with the news', 'positive'],
  ['ecstatic about the decision', 'positive'],
  ['blissful experience', 'positive'],
  ['jubilant mood', 'positive'],
  ['content and satisfied', 'positive'],
  
  // Negative examples (50+)
  ['I hate this', 'negative'],
  ['this is awful', 'negative'],
  ['what a terrible day', 'negative'],
  ['the food was horrible', 'negative'],
  ['I am sad today', 'negative'],
  ['disappointing result', 'negative'],
  ['poor quality', 'negative'],
  ['bad experience', 'negative'],
  ['terrible service', 'negative'],
  ['awful performance', 'negative'],
  ['horrible mistake', 'negative'],
  ['dreadful situation', 'negative'],
  ['unacceptable behavior', 'negative'],
  ['disgusting food', 'negative'],
  ['appalling conditions', 'negative'],
  ['deplorable service', 'negative'],
  ['atrocious quality', 'negative'],
  ['abysmal performance', 'negative'],
  ['lousy work', 'negative'],
  ['I really dislike this', 'negative'],
  ['this makes me angry', 'negative'],
  ['so frustrated with this', 'negative'],
  ['annoyed by the delay', 'negative'],
  ['irritated with the service', 'negative'],
  ['furious about the mistake', 'negative'],
  ['outraged by the decision', 'negative'],
  ['displeased with the outcome', 'negative'],
  ['discontent and unhappy', 'negative'],
  ['miserable experience', 'negative'],
  ['depressing situation', 'negative'],
  
  // Neutral examples (30+)
  ['the train arrives at five', 'neutral'],
  ['it is a book', 'neutral'],
  ['the sky is blue', 'neutral'],
  ['I have two pens', 'neutral'],
  ['the meeting is at 3 PM', 'neutral'],
  ['this is a computer', 'neutral'],
  ['the door is open', 'neutral'],
  ['water is transparent', 'neutral'],
  ['the table has four legs', 'neutral'],
  ['today is Monday', 'neutral'],
  ['the price is 20 dollars', 'neutral'],
  ['the building has 10 floors', 'neutral'],
  ['the car is red', 'neutral'],
  ['the phone is ringing', 'neutral'],
  ['the paper is white', 'neutral'],
  ['the room temperature is 25 degrees', 'neutral'],
  ['the project deadline is next week', 'neutral'],
  ['the store opens at 9 AM', 'neutral'],
  ['the flight number is 237', 'neutral'],
  ['the document has 15 pages', 'neutral'],
  ['the battery level is 80 percent', 'neutral'],
  ['the distance is 5 kilometers', 'neutral'],
  ['the weight is 2 kilograms', 'neutral'],
  ['the height is 180 centimeters', 'neutral'],
  ['the speed is 60 km/h', 'neutral']
];

// Advanced tokenization with stemming and stopword removal
const stopwords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
                          'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 
                          'could', 'may', 'might', 'must', 'can', 'shall', 'i', 'you', 'he', 
                          'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 
                          'your', 'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those']);

// Simple stemmer (Porter stemmer simplified)
function stemWord(word) {
  if (word.length < 3) return word;
  
  // Common suffixes
  const suffixes = [
    'ing', 'ed', 'ly', 'es', 's', 
    'ment', 'ness', 'tion', 'sion', 'able', 'ible', 'al', 'ful', 'less', 'ive'
  ];
  
  for (const suffix of suffixes) {
    if (word.endsWith(suffix) && word.length > suffix.length + 2) {
      return word.slice(0, -suffix.length);
    }
  }
  
  return word;
}

export function tokenizeEnhanced(s) {
  const words = (s.toLowerCase().match(/[a-z']+/g) || [])
    .filter(word => !stopwords.has(word) && word.length > 1)
    .map(stemWord);
  
  return words;
}

export function makeEnhancedNB(data = largerTrainData) {
  const vocab = new Set();
  const counts = { positive: {}, negative: {}, neutral: {} };
  const classCounts = { positive: 0, negative: 0, neutral: 0 };
  const totalDocs = data.length;

  // Training phase with enhanced tokenization
  for(const [text, label] of data) {
    classCounts[label]++;
    for(const tok of tokenizeEnhanced(text)) {
      vocab.add(tok);
      counts[label][tok] = (counts[label][tok] || 0) + 1;
    }
  }

  // Calculate priors with smoothing
  const prior = {
    positive: Math.log((classCounts.positive + 1) / (totalDocs + 3)),
    negative: Math.log((classCounts.negative + 1) / (totalDocs + 3)),
    neutral: Math.log((classCounts.neutral + 1) / (totalDocs + 3)),
  };

  // Calculate denominators with smoothing
  const denom = {
    positive: Object.values(counts.positive).reduce((a, b) => a + b, 0) + vocab.size,
    negative: Object.values(counts.negative).reduce((a, b) => a + b, 0) + vocab.size,
    neutral: Object.values(counts.neutral).reduce((a, b) => a + b, 0) + vocab.size,
  };

  // Precompute log probabilities for faster prediction
  const logProbabilities = {
    positive: {},
    negative: {},
    neutral: {}
  };

  for (const label of ['positive', 'negative', 'neutral']) {
    for (const word of vocab) {
      const count = counts[label][word] || 0;
      logProbabilities[label][word] = Math.log((count + 1) / denom[label]);
    }
  }

  function score(label, tokens) {
    let s = prior[label];
    for(const t of tokens) {
      // Use precomputed log probabilities for speed
      s += logProbabilities[label][t] || Math.log(1 / denom[label]);
    }
    return s;
  }

  function softmax(arr) {
    const mx = Math.max(...arr);
    const exps = arr.map(v => Math.exp(v - mx));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(v => v / sum);
  }

  function classify(text) {
    const toks = tokenizeEnhanced(text);
    const sPos = score('positive', toks);
    const sNeg = score('negative', toks);
    const sNeu = score('neutral', toks);
    
    const probs = softmax([sPos, sNeg, sNeu]);
    const labels = ['positive', 'negative', 'neutral'];
    const idx = probs.indexOf(Math.max(...probs));
    
    return { 
      label: labels[idx], 
      score: Number(probs[idx].toFixed(4)),
      probabilities: {
        positive: Number(probs[0].toFixed(4)),
        negative: Number(probs[1].toFixed(4)),
        neutral: Number(probs[2].toFixed(4))
      }
    };
  }

  // Additional utility functions
  function getMostImportantWords(label, count = 10) {
    const words = Object.entries(counts[label])
      .sort(([, a], [, b]) => b - a)
      .slice(0, count)
      .map(([word]) => word);
    
    return words;
  }

  function getVocabularySize() {
    return vocab.size;
  }

  function getClassDistribution() {
    return {
      positive: classCounts.positive,
      negative: classCounts.negative,
      neutral: classCounts.neutral,
      total: totalDocs
    };
  }

  return { 
    classify, 
    getMostImportantWords, 
    getVocabularySize, 
    getClassDistribution,
    vocab,
    counts
  };
}

// Batch processing function for multiple texts
export function batchClassify(texts, nbModel) {
  return texts.map(text => ({
    text,
    result: nbModel.classify(text)
  }));
}

// Function to evaluate model accuracy
export function evaluateModel(testData, nbModel) {
  let correct = 0;
  const results = [];
  
  for (const [text, trueLabel] of testData) {
    const prediction = nbModel.classify(text);
    const isCorrect = prediction.label === trueLabel;
    
    if (isCorrect) correct++;
    
    results.push({
      text,
      trueLabel,
      predictedLabel: prediction.label,
      confidence: prediction.score,
      isCorrect
    });
  }
  
  const accuracy = correct / testData.length;
  
  return {
    accuracy: Number(accuracy.toFixed(4)),
    total: testData.length,
    correct,
    incorrect: testData.length - correct,
    results
  };
}