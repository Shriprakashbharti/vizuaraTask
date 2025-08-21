// [file name]: lexicon.js
// [updated for Hindi support]
const LEX = {
  positive: ['love','like','awesome','great','good','fantastic','amazing','happy','fun','joy','cool','nice','sweet','wonderful','best',
            'प्यार', 'अच्छा', 'बढ़िया', 'शानदार', 'खुश', 'मजा', 'आनंद', 'सुंदर', 'अद्भुत', 'उत्तम'],
  negative: ['hate','bad','awful','terrible','horrible','angry','sad','boring','worst','ugly','annoying','dislike',
            'नफरत', 'बुरा', 'भयानक', 'खराब', 'गुस्सा', 'उदास', 'उबाऊ', 'बदसूरत', 'कष्टप्रद', 'अप्रिय'],
  neutral: ['okay','fine','average','normal','regular','plain',
            'ठीक', 'सामान्य', 'साधारण', 'नियमित', 'साधा']
}

const scoreWord = (w) => {
  const wl = w.toLowerCase()
  if(LEX.positive.includes(wl)) return 1
  if(LEX.negative.includes(wl)) return -1
  return 0
}

export function classifyRule(text){
  const tokens = (text || '').match(/[a-zA-Z\u0900-\u097F']+/g) || [] // Support Devanagari script for Hindi
  let score = 0
  tokens.forEach(t => score += scoreWord(t))
  let label = 'neutral'
  if(score > 0) label = 'positive'
  if(score < 0) label = 'negative'
  return { label, score: Math.max(0.5, Math.min(1, Math.abs(score)/5 + 0.5)) }
}