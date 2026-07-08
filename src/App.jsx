import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import GardenRegencyPage from './pages/GardenRegencyPage'
import gardenRegency from './data/garden-regency'

export default function App() {
  useEffect(() => {
    // Apply emerald theme to <html>
    document.documentElement.className = 'emerald'
  }, [])

  return (
    <LanguageProvider>
      <GardenRegencyPage data={gardenRegency} />
    </LanguageProvider>
  )
}
