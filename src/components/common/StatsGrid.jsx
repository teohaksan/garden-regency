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
      className="relative py-24 lg:py-32 px-6 lg:px-12"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Decorative gradient overlay for depth (no longer flat green) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(200,169,110,0.08), transparent 60%), radial-gradient(ellipse at bottom right, rgba(74,124,46,0.15), transparent 60%)',
        }}
      ></div>

      <div className="relative mx-auto max-w-[1440px]">
        {(title || description) && (
          <ScrollAnimation>
            <div className="max-w-3xl">
              {tagline && (
                <p
                  className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {t(tagline)}
                </p>
              )}
              {title && (
                <h2
                  className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                  style={{ color: 'var(--color-text)' }}
                >
                  {t(title)}
                </h2>
              )}
              {description && (
                <p
                  className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl font-[family-name:var(--font-body)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {t(description)}
                </p>
              )}
              <div
                className="mt-6 w-12 h-[1px]"
                style={{ backgroundColor: 'var(--color-accent)' }}
              ></div>
            </div>
          </ScrollAnimation>
        )}

        <div className={`mt-12 grid ${gridCols} gap-4`}>
          {items.map((item, i) => (
            <ScrollAnimation key={i} delay={i * 0.1}>
              <div
                className={`group text-center px-4 py-8 rounded-2xl border h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  i === highlightIndex ? 'ring-2' : ''
                }`}
                style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderColor: 'var(--color-border)',
                    ...(i === highlightIndex
                      ? { outlineColor: 'var(--color-accent)', outline: '2px solid var(--color-accent)' }
                      : {}),
                  }}
                >
                  <p
                    className="text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-number)] leading-none"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <CountUp value={item.value} duration={2000} />
                  </p>
                  <p
                    className="mt-3 text-sm lg:text-base tracking-[0.15em] font-[family-name:var(--font-body)] font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t(item.label)}
                  </p>
                  {item.sub && (
                    <p
                      className="mt-1 text-[11px] lg:text-xs tracking-[0.1em] font-[family-name:var(--font-body)]"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {t(item.sub)}
                    </p>
                  )}
                  <div
                    className="mt-4 w-10 h-[1px] mx-auto transition-all duration-500 group-hover:w-16"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  ></div>
                  {item.detail && (
                    <p
                      className="mt-3 text-[11px] lg:text-xs leading-relaxed font-[family-name:var(--font-body)]"
                      style={{ color: 'var(--color-text-muted)' }}
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
    </section>
  )
}
