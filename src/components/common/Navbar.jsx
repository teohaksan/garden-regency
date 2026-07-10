import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

export default function Navbar({ logo, navItems = [], onCTAClick, ctaLabel }) {
  const [scrolled, setScrolled] = useState(false)
  const { lang, t, toggleLang } = useLanguage()

  const isDark = document.documentElement.classList.contains('gold') ||
                 document.documentElement.classList.contains('teal')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navBg = scrolled
    ? 'bg-[var(--color-bg)]/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <nav className="mx-auto max-w-[1440px] flex items-center justify-between px-6 py-4 lg:px-12" role="navigation" aria-label="主導航">
        <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          {logo ? (
            <picture>
              <source srcSet="/logo-240.webp" type="image/webp" />
              <img
                src="/logo-240.webp"
                alt="Garden Regency 芊御"
                width="240"
                height="70"
                className="h-8 md:h-10 w-auto"
                fetchpriority="high"
                decoding="async"
              />
            </picture>
          ) : (
            <span className="text-lg font-semibold tracking-wide font-[family-name:var(--font-display)]" style={{ color: 'var(--color-text)' }}>
              {navItems.length > 0 ? 'Project' : 'New Property'}
            </span>
          )}
        </a>

        {/* Nav (always visible, right-aligned) */}
        <div className="flex items-center gap-1">
          {navItems.length > 0 && (
            <ul className="hidden md:flex items-center gap-1" role="menubar">
              {navItems.map((item, i) => (
                <li key={i} role="none">
                  <a
                    href={item.href || `#${item.id}`}
                    className="relative px-3 py-2 text-xs tracking-wider transition-colors font-[family-name:var(--font-body)] hover:opacity-80 whitespace-nowrap"
                    style={{ color: 'var(--color-text-secondary)' }}
                    role="menuitem"
                  >
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Language toggle — 繁 / 简 */}
          <button
            onClick={toggleLang}
            className="ml-1 px-2.5 py-2 text-xs tracking-wider font-semibold rounded-full transition-all duration-300 hover:opacity-80 whitespace-nowrap border"
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-border, rgba(200, 169, 110, 0.35))',
            }}
            aria-label="切換語言"
            title={lang === 'zh-HK' ? '切換到簡體中文' : '切換到繁體中文'}
          >
            {lang === 'zh-HK' ? '简' : '繁'}
          </button>

          {onCTAClick && (
            <button
              onClick={onCTAClick}
              className="ml-1 px-5 py-2.5 text-xs tracking-wider font-semibold rounded-full transition-all duration-300 hover:shadow-lg whitespace-nowrap"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: isDark ? 'var(--color-bg)' : '#fff'
              }}
            >
              {t(ctaLabel || '立即預約')}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
