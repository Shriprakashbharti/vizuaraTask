// [file name]: db.js
// [new file - database utilities]
// Simple localStorage-based "database" for demo purposes
// In a real application, this would connect to MongoDB

const DB_KEY = 'sentiment_analysis_history'

export function saveAnalysis(text, method, result) {
  try {
    const history = getAnalysisHistory()
    const newEntry = {
      text,
      method,
      result,
      timestamp: new Date().toISOString()
    }
    
    history.unshift(newEntry) // Add to beginning
    // Keep only the last 100 entries for demo purposes
    const limitedHistory = history.slice(0, 100)
    
    localStorage.setItem(DB_KEY, JSON.stringify(limitedHistory))
    return true
  } catch (error) {
    console.error('Error saving analysis:', error)
    return false
  }
}

export function getAnalysisHistory() {
  try {
    const historyJSON = localStorage.getItem(DB_KEY)
    return historyJSON ? JSON.parse(historyJSON) : []
  } catch (error) {
    console.error('Error reading analysis history:', error)
    return []
  }
}

export function clearAnalysisHistory() {
  try {
    localStorage.removeItem(DB_KEY)
    return true
  } catch (error) {
    console.error('Error clearing analysis history:', error)
    return false
  }
}