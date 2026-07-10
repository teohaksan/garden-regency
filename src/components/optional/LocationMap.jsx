import { useState, useCallback } from 'react'
import ScrollAnimation from '../common/ScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'

export default function LocationMap({
  title = '位置交通',
  subtitle,
  description,
  googleMapsEmbedUrl,
  amapEmbedUrl,
  transportHighlights = [],
}) {
  const { lang, t } = useLanguage()

  // null = auto-detect from language, 'google' = force Google, 'amap' = force AMAP
  const [mapOverride, setMapOverride] = useState(null)

  // Determine which map to show — only use AMAP if URL is available
  const useAmap =
    !!amapEmbedUrl && (mapOverride === 'amap' || (mapOverride === null && lang === 'zh-CN'))

  const handleToggle = useCallback((provider) => {
    setMapOverride((prev) => (prev === provider ? null : provider))
  }, [])

  const iframeSrc = useAmap
    ? amapEmbedUrl
    : googleMapsEmbedUrl

  return (
    <section
      id="location"
      className="relative py-24 lg:py-32 scroll-mt-24 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Location wallpaper background */}
      <picture className="absolute inset-0 pointer-events-none">
        <source media="(max-width: 768px)" srcSet="/location-wallpaper-mobile-400.webp" type="image/webp" />
        <source media="(min-width: 769px)" srcSet="/location-wallpaper-960.webp" type="image/webp" />
        <img
          src="/location-wallpaper-960.webp"
          alt=""
          width="1920"
          height="1080"
          className="w-full h-full object-cover opacity-10"
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <ScrollAnimation>
          {/* Header row: title + map provider toggle */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-3xl mb-8">
            <div>
              {subtitle && (
                <p
                  className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {t(subtitle)}
                </p>
              )}
              <h2
                className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                style={{ color: 'var(--color-text)' }}
              >
                {t(title)}
              </h2>
              {description && (
                <p
                  className="mt-4 text-sm leading-relaxed font-[family-name:var(--font-body)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {t(description)}
                </p>
              )}
            </div>

            {/* Map provider toggle */}
            {amapEmbedUrl && (
              <div className="flex flex-col items-start sm:items-end gap-2">
                <span
                  className="text-[10px] tracking-widest uppercase font-[family-name:var(--font-body)]"
                  style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}
                >
                  {t('地圖來源')}
                </span>
                <div className="flex items-center gap-1">
                  {/* Google Maps button */}
                  <button
                    onClick={() => handleToggle('google')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor: !useAmap
                        ? 'var(--color-accent)'
                        : 'rgba(200, 169, 110, 0.12)',
                      color: !useAmap
                        ? '#07120a'
                        : 'var(--color-accent)',
                      border: '1px solid rgba(200, 169, 110, 0.3)',
                    }}
                  >
                    {/* Google icon (simple "G" letter) */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {t('Google 地圖')}
                  </button>

                  {/* AMAP button */}
                  <button
                    onClick={() => handleToggle('amap')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor: useAmap
                        ? 'var(--color-accent)'
                        : 'rgba(200, 169, 110, 0.12)',
                      color: useAmap ? '#07120a' : 'var(--color-accent)',
                      border: '1px solid rgba(200, 169, 110, 0.3)',
                    }}
                  >
                    {/* AMAP/高德 icon (simple "高" character) */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="11" fill="#07C160"/>
                      <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">高</text>
                    </svg>
                    {t('高德地圖')}
                  </button>
                </div>

                {/* Provider label when auto-detected */}
                {mapOverride === null && (
                  <span
                    className="text-[10px] font-[family-name:var(--font-body)]"
                    style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
                  >
                    {lang === 'zh-CN'
                      ? t('已自動切換為高德地圖')
                      : t('已自動切換為 Google 地圖')}
                  </span>
                )}
              </div>
            )}
          </div>
        </ScrollAnimation>

        {/* Transport highlights grid */}
        {transportHighlights.length > 0 && (
          <ScrollAnimation>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
              {transportHighlights.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    backgroundColor: 'rgba(7, 18, 10, 0.55)',
                    border: '1px solid rgba(200, 169, 110, 0.2)',
                  }}
                >
                  <div className="text-2xl mb-2" role="img" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div
                    className="text-xs font-semibold tracking-wide font-[family-name:var(--font-body)] mb-0.5"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {t(item.label)}
                  </div>
                  <div
                    className="text-[10px] font-medium font-[family-name:var(--font-body)] mb-1"
                    style={{ color: 'rgba(200, 169, 110, 0.7)' }}
                  >
                    {t(item.detail)}
                  </div>
                  <div
                    className="text-[9px] leading-snug font-[family-name:var(--font-body)]"
                    style={{ color: 'rgba(200, 169, 110, 0.45)' }}
                  >
                    {t(item.description)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        )}

        <ScrollAnimation>
          <div
            className="w-full rounded-xl overflow-hidden shadow-xl border"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <iframe
              src={iframeSrc}
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t(title)}
            />
          </div>

          {/* External link to open map in new tab */}
          {iframeSrc && (
            <div className="mt-3 flex justify-end">
              <a
                href={useAmap ? iframeSrc : `https://www.google.com/maps?q=22.4422873,114.0531378`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex items-center gap-1 transition-opacity hover:opacity-80 font-[family-name:var(--font-body)]"
                style={{ color: 'var(--color-accent)', opacity: 0.7 }}
              >
                {useAmap ? t('在高德地圖中開啟') : t('在 Google 地圖中開啟')}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          )}
        </ScrollAnimation>
      </div>
    </section>
  )
}
