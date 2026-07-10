import ScrollAnimation from './ScrollAnimation'
import CountUp from './CountUp'
import { useLanguage } from '../../context/LanguageContext'

export default function HeroSection({
  title,
  titleEn,
  titleCn,
  subtitle,
  description,
  tagline,
  address,
  addressNote,
  videoSrc,
  posterSrc,
  ctaLabel,
  onCTAClick,
  stats = [],
}) {
  const { t } = useLanguage()

  const isDark =
    document.documentElement.classList.contains('gold') ||
    document.documentElement.classList.contains('teal') ||
    document.documentElement.classList.contains('emerald')
  const overlayColor = isDark ? 'from-black/40 via-black/10 to-black' : 'bg-black/55'

  // Resolve display names (back-compat: fall back to title/subtitle)
  const enName = titleEn || title || ''
  const cnName = titleCn || subtitle || ''

  // Static labels
  const artNoteLabel = t('電腦模擬效果圖，僅供參考')
  const scrollLabel = t('向下探索')
  const disclaimerLabel = t('獨立資訊平台，非官方網站')
  const disclaimerText = t('本網站為花園豪宅獨立資訊平台，旨在提供客觀分析與參考資訊，並非發展項目之官方網站。')

  // Stats - convert label to selected language
  const translatedStats = stats.map(s => ({ ...s, label: t(s.label) }))

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <video
            src={videoSrc}
            className="w-full h-full object-cover object-center"
            autoPlay muted loop playsInline disablePictureInPicture
            aria-hidden="true"
          />
        ) : posterSrc ? (
          <img src={posterSrc} alt="" className="w-full h-full object-cover object-center" />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: 'var(--color-bg-alt)' }} />
        )}
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`}></div>
        {isDark && (
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
        )}
        <p className="absolute bottom-10 right-6 z-10 text-[10px] text-white/15 font-[family-name:var(--font-body)]">
          <a
            href="#footer"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            title={disclaimerText}
          >
            {disclaimerLabel}
          </a>
        </p>
        <p className="absolute bottom-6 right-6 z-10 text-[10px] text-white/15 italic font-[family-name:var(--font-body)]">
          {artNoteLabel}
        </p>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6 py-32">
        {tagline && (
          <ScrollAnimation delay={0.1}>
            <p
              className="text-xs lg:text-sm tracking-[0.3em] font-[family-name:var(--font-body)] mb-6"
              style={{ color: 'var(--color-accent)' }}
            >
              {t(tagline)}
            </p>
          </ScrollAnimation>
        )}

        {/* Property Name: 芊御 (huge) + Garden Regency (under, smaller) */}
        <ScrollAnimation delay={0.2}>
          <div className="flex flex-col items-center">
            {cnName && (
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-[0.12em] font-[family-name:var(--font-display)]"
                style={{
                  color: 'var(--color-text)',
                  textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                }}
              >
                {t(cnName)}
              </h1>
            )}
            {enName && (
              <h2
                className="mt-3 text-2xl md:text-3xl lg:text-4xl tracking-[0.32em] uppercase font-light font-[family-name:var(--font-display)]"
                style={{
                  color: 'var(--color-accent-light)',
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                }}
              >
                {enName}
              </h2>
            )}
          </div>
        </ScrollAnimation>

        {/* Decorative divider */}
        <div
          className="w-16 h-[1px] mt-8 mb-6 scale-x-0 animate-[scaleX_0.8s_0.8s_ease-out_forwards] origin-center"
          style={{ backgroundColor: 'var(--color-accent)' }}
        ></div>

        {/* Address (middle of hero, below name) */}
        {address && (
          <ScrollAnimation delay={0.35}>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p
                  className="text-sm md:text-base tracking-[0.15em] font-[family-name:var(--font-body)]"
                  style={{ color: isDark ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.9)' }}
                >
                  {t(address)}
                </p>
              </div>
              {addressNote && (
                <p
                  className="text-[11px] md:text-xs tracking-[0.2em] font-[family-name:var(--font-body)] italic"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {t(addressNote)}
                </p>
              )}
            </div>
          </ScrollAnimation>
        )}

        {description && (
          <ScrollAnimation delay={0.4}>
            <p
              className="mt-8 text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ color: isDark ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.7)' }}
            >
              {t(description)}
            </p>
          </ScrollAnimation>
        )}

        {/* Stats bar with count-up animation */}
        {translatedStats.length > 0 && (
          <ScrollAnimation delay={0.5}>
            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-10 gap-y-4 text-sm lg:text-base px-6 py-4 rounded-full border"
              style={{
                backgroundColor: 'rgba(0,0,0,0.25)',
                borderColor: 'var(--color-border)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {translatedStats.map((s, i) => (
                <span
                  key={i}
                  className="flex items-baseline gap-2 font-[family-name:var(--font-body)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <CountUp
                    value={s.value}
                    animateOnMount
                    className="text-2xl lg:text-3xl font-bold tracking-tight font-[family-name:var(--font-number)]"
                    style={{ color: 'var(--color-accent)' }}
                  />
                  <span className="text-xs lg:text-sm tracking-[0.1em]">
                    {s.label}
                  </span>
                  {i < translatedStats.length - 1 && (
                    <span
                      className="hidden md:inline-block w-px h-5 ml-3 lg:ml-6"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    ></span>
                  )}
                </span>
              ))}
            </div>
          </ScrollAnimation>
        )}

        {/* CTA */}
        {onCTAClick && (
          <ScrollAnimation delay={0.6}>
            <button
              onClick={onCTAClick}
              className="mt-10 inline-flex items-center gap-2 px-10 py-4 text-sm tracking-wider font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#000', // Black text for maximum contrast on gold
              }}
            >
              {t(ctaLabel || '立即預約')}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </ScrollAnimation>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2" aria-hidden="true">
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-body)]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {scrollLabel}
          </span>
          <div
            className="w-[1px] h-10 bg-gradient-to-b"
            style={{ backgroundImage: `linear-gradient(to bottom, var(--color-accent), transparent)` }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes scaleX {
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}
