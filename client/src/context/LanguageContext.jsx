// [file name]: LanguageContext.jsx
// [new file - context for language support]
import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en') // 'en' or 'hi'
  
  const value = {
    language,
    setLanguage
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}