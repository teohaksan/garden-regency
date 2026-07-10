import { useState } from 'react'
import ScrollAnimation from '../common/ScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'

const FACILITY_LABELS = [
  '園林泳池',      // 01 (was club-02)
  '健身中心',      // 02
  '休閒貴賓室',    // 03
  '兒童遊樂場',    // 04
  '宴會廳',        // 05
  '運動場地',      // 06
  '智能生活',      // 07
  '空中花園',      // 08
  '景觀平台',      // 09
]

export default function ClubRegencySection({
  title = 'Club Regency 會所設施',
  subtitle = '48 項頂級配套',
  description,
  images = [],
}) {
  const { t } = useLanguage()
  const [lightbox, setLightbox] = useState(null) // index or null

  // Default to 9 club facility images (club-01 was the brochure cover, removed)
  const items = images.length > 0
    ? images
    : Array.from({ length: 9 }, (_, i) => {
        const n = String(i + 2).padStart(2, '0')  // Start from 02 (skip 01 = brochure cover)
        return {
          src: `/club-${n}-1200.webp`,
          thumb: `/club-${n}-700.webp`,
          mobile: `/club-${n}-400.webp`,
          label: FACILITY_LABELS[i] || `設施 ${i + 1}`,
        }
      })

  return (
    <>
      <section
        id="club-regency"
        className="relative py-24 lg:py-32 scroll-mt-24 overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Header */}
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto mb-14">
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
              <div
                className="mt-8 w-12 h-[1px] mx-auto"
                style={{ backgroundColor: 'var(--color-accent)' }}
              ></div>
            </div>
          </ScrollAnimation>

          {/* Masonry-style image grid */}
          <ScrollAnimation delay={0.15}>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer shadow-lg"
                  onClick={() => setLightbox(i)}
                >
                  <picture>
                    <source media="(max-width: 640px)" srcSet={item.mobile || item.src} />
                    <source media="(max-width: 1024px)" srcSet={item.thumb || item.src} />
                    <img
                      src={item.src}
                      alt={t(item.label)}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-[10px] tracking-widest uppercase font-[family-name:var(--font-body)]">
                        Club Regency
                      </span>
                      <span className="w-4 h-[1px] bg-white/50"></span>
                      <span className="text-white text-sm font-medium font-[family-name:var(--font-body)]">
                        {t(item.label)}
                      </span>
                    </div>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          {/* Artist impression note */}
          <p
            className="mt-10 text-center text-[11px] lg:text-xs italic font-[family-name:var(--font-body)]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            電腦模擬效果圖，僅供參考 | Artist's impression for reference only
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="圖片放大"
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="關閉"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Counter */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white/80 text-xs font-[family-name:var(--font-body)]"
          >
            {lightbox + 1} / {items.length}
          </div>

          {/* Prev button */}
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[lightbox].src}
              alt={t(items[lightbox].label)}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <p
              className="mt-3 text-center text-white/70 text-sm font-[family-name:var(--font-body)]"
            >
              {t(items[lightbox].label)}
            </p>
          </div>

          {/* Next button */}
          {lightbox < items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
