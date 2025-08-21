// [file name]: lexicon.js
// [updated for Hindi support with enhanced vocabulary]

// Convert arrays to Sets for O(1) lookup time
const createLexiconSet = (words) => new Set(words.map(word => word.toLowerCase()));

const LEX = {
  positive: createLexiconSet([
    'love','like','awesome','great','good','fantastic','amazing','happy',
    'fun','joy','cool','nice','sweet','wonderful','best','excellent','perfect',
    'प्यार', 'अच्छा', 'बढ़िया', 'शानदार', 'खुश', 'मजा', 'आनंद', 'सुंदर', 
    'अद्भुत', 'उत्तम', 'बेहतरीन', 'प्रशंसा', 'आनंददायक'
  ]),
  negative: createLexiconSet([
    'hate','bad','awful','terrible','horrible','angry','sad','boring',
    'worst','ugly','annoying','dislike','hateful','disappointing',
    'नफरत', 'बुरा', 'भयानक', 'खराब', 'गुस्सा', 'उदास', 'उबाऊ', 'बदसूरत', 
    'कष्टप्रद', 'अप्रिय', 'दुखद', 'निराशाजनक'
  ]),
  neutral: createLexiconSet([
    'okay','fine','average','normal','regular','plain','neutral',
    'ठीक', 'सामान्य', 'साधारण', 'नियमित', 'साधा', 'मध्यम'
  ])
};

const scoreWord = (w) => {
  const wl = w.toLowerCase();
  if (LEX.positive.has(wl)) return 1;
  if (LEX.negative.has(wl)) return -1;
  return 0;
};

// Enhanced tokenization to handle contractions and common patterns
const tokenizeText = (text) => {
  return (text || '').match(/[a-zA-Z\u0900-\u097F']+/g) || [];
};

export function classifyRule(text) {
  const tokens = tokenizeText(text);
  let score = 0;
  let matchedWords = 0;
  
  tokens.forEach(t => {
    const wordScore = scoreWord(t);
    if (wordScore !== 0) {
      score += wordScore;
      matchedWords++;
    }
  });
  
  // More nuanced scoring that considers density of sentiment words
  const normalizedScore = matchedWords > 0 
    ? Math.max(0.5, Math.min(1, Math.abs(score) / Math.max(3, matchedWords) + 0.5))
    : 0.5;
  
  let label = 'neutral';
  if (score > 0) label = 'positive';
  if (score < 0) label = 'negative';
  
  return { 
    label, 
    score: normalizedScore,
    tokens: tokens.length,
    sentimentWords: matchedWords
  };
}

// Additional utility function for batch processing
export function analyzeMultipleTexts(texts) {
  return texts.map(text => ({
    text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
    ...classifyRule(text)
  }));
}