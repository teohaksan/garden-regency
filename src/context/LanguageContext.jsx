import { createContext, useContext, useState, useEffect } from 'react'
import { sify } from 'chinese-conv'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('zh-HK') // 繁體 default

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('garden-regency-lang')
    if (saved === 'zh-HK' || saved === 'zh-CN') {
      setLang(saved)
    }
  }, [])

  // Save to localStorage + sync <html lang>
  useEffect(() => {
    localStorage.setItem('garden-regency-lang', lang)
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'zh-HK'
  }, [lang])

  /**
   * 將繁體文字轉為指定語言版本
   * @param {string} text - 繁體中文字串（必填，data file 統一用繁體）
   * @returns {string} 簡體（如 lang==='zh-CN'）或原繁體
   */
  const t = (text) => {
    if (!text || typeof text !== 'string') return text
    if (lang === 'zh-CN') return sify(text)
    return text
  }

  const toggleLang = () => {
    setLang((prev) => (prev === 'zh-HK' ? 'zh-CN' : 'zh-HK'))
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
