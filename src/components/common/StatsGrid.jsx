import ScrollAnimation from './ScrollAnimation'
import CountUp from './CountUp'
import { useLanguage } from '../../context/LanguageContext'

export default function StatsGrid({
  title,
  subtitle,
  description,
  tagline,
  items = [],
  columns = 4,
  highlightIndex,
  backgroundImage,
}) {
  const { t } = useLanguage()
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }[columns] || 'grid-cols-2 md:grid-cols-4'

  // Static label
  const artNoteLabel = t('電腦模擬效果圖，僅供參考 | Computer simulated images for reference only.')

  return (
    <section
      id="overview"
      className="relative overflow-hidden"
      style={
        backgroundImage
          ? { minHeight: '90vh' }
          : { backgroundColor: 'var(--color-bg)', minHeight: 'auto', paddingTop: '6rem', paddingBottom: '6rem' }
      }
    >
      {/* Background image (no dimmer — full visibility) */}
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          {/* Subtle right-side gradient for card legibility only (not a full dimmer) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to left, rgba(7, 18, 10, 0.55) 0%, rgba(7, 18, 10, 0.35) 30%, rgba(7, 18, 10, 0) 60%)',
            }}
          ></div>
        </>
      )}

      {/* Decorative gradient overlay (when no background image) */}
      {!backgroundImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(200,169,110,0.08), transparent 60%), radial-gradient(ellipse at bottom right, rgba(74,124,46,0.15), transparent 60%)',
          }}
        ></div>
      )}

      <div
        className={
          backgroundImage
            ? 'relative h-full min-h-[90vh] flex items-center px-6 lg:px-12 py-24 lg:py-32'
            : 'relative mx-auto max-w-[1440px]'
        }
      >
        <div
          className={
            backgroundImage
              ? 'ml-auto w-full lg:w-3/5 xl:w-1/2 max-w-3xl'
              : 'contents'
          }
        >
          {(title || description) && (
            <ScrollAnimation>
              <div className={backgroundImage ? 'mb-10' : 'max-w-3xl'}>
                {tagline && (
                  <p
                    className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-3"
                    style={{ color: backgroundImage ? '#C8A96E' : 'var(--color-accent)' }}
                  >
                    {t(tagline)}
                  </p>
                )}
                {title && (
                  <h2
                    className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                    style={{ color: backgroundImage ? '#ffffff' : 'var(--color-text)' }}
                  >
                    {t(title)}
                  </h2>
                )}
                {description && (
                  <p
                    className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl font-[family-name:var(--font-body)]"
                    style={{ color: backgroundImage ? 'rgba(255,255,255,0.85)' : 'var(--color-text-secondary)' }}
                  >
                    {t(description)}
                  </p>
                )}
                <div
                  className="mt-6 w-12 h-[1px]"
                  style={{ backgroundColor: '#C8A96E' }}
                ></div>
              </div>
            </ScrollAnimation>
          )}

          <div className={`grid ${gridCols} gap-4`}>
            {items.map((item, i) => (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <div
                  className={`group text-center px-4 py-8 rounded-2xl border h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                    i === highlightIndex ? 'ring-2' : ''
                  }`}
                  style={
                    backgroundImage
                      ? {
                          backgroundColor: 'rgba(7, 18, 10, 0.65)',
                          borderColor: 'rgba(200, 169, 110, 0.3)',
                          backdropFilter: 'blur(8px)',
                        }
                      : {
                          backgroundColor: 'var(--color-card-bg)',
                          borderColor: 'var(--color-border)',
                        }
                  }
                >
                  <p
                    className="text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-number)] leading-none"
                    style={{ color: '#C8A96E' }}
                  >
                    <CountUp value={item.value} duration={2000} />
                  </p>
                  <p
                    className="mt-3 text-sm lg:text-base tracking-[0.15em] font-[family-name:var(--font-body)] font-semibold"
                    style={{ color: backgroundImage ? '#ffffff' : 'var(--color-text)' }}
                  >
                    {t(item.label)}
                  </p>
                  {item.sub && (
                    <p
                      className="mt-1 text-[11px] lg:text-xs tracking-[0.1em] font-[family-name:var(--font-body)]"
                      style={{ color: backgroundImage ? 'rgba(255,255,255,0.7)' : 'var(--color-text-secondary)' }}
                    >
                      {t(item.sub)}
                    </p>
                  )}
                  <div
                    className="mt-4 w-10 h-[1px] mx-auto transition-all duration-500 group-hover:w-16"
                    style={{ backgroundColor: '#C8A96E' }}
                  ></div>
                  {item.detail && (
                    <p
                      className="mt-3 text-[11px] lg:text-xs leading-relaxed font-[family-name:var(--font-body)]"
                      style={{ color: backgroundImage ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted)' }}
                    >
                      {t(item.detail)}
                    </p>
                  )}
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {items.length > 0 && <div id="stats-after" />}
        </div>
      </div>
    </section>
  )
}
