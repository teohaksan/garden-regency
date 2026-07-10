import ScrollAnimation from '../common/ScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'

/**
 * UnitTable — Tabular display of unit types, areas, and percentages.
 * Mirrors the official 售樓說明書 style (alternating row colors, highlighted
 * "主推" row in red/gold).
 */
export default function UnitTable({
  title = '單位類型',
  titleEn = '',
  subtitle = '',
  subtitleEn = '',
  tagline = '',
  description = '',
  descriptionEn = '',
  columns = [],
  columnsEn = [],
  rows = [],
  footer = '',
  footerEn = '',
}) {
  const { t } = useLanguage()
      return (
    <section id="units" className="relative py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-[1100px]">
        <ScrollAnimation>
          <div className="text-center max-w-3xl mx-auto">
            {tagline && (
              <p
                className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                {t(tagline)}
              </p>
            )}
            <h2
              className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
              style={{ color: 'var(--color-text)' }}
            >
              {t(title)}
            </h2>
            {subtitle && (
              <p
                className="mt-3 text-sm lg:text-base font-[family-name:var(--font-body)]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t(subtitle)}
              </p>
            )}
            {description && (
              <p
                className="mt-4 text-xs lg:text-sm leading-relaxed font-[family-name:var(--font-body)]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t(description)}
              </p>
            )}
            <div
              className="mt-6 w-12 h-[1px] mx-auto"
              style={{ backgroundColor: 'var(--color-accent)' }}
            ></div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.15}>
          <div className="mt-12 overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
            <table className="w-full border-collapse">
              <thead>
                <tr
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(200,169,110,0.25), rgba(200,169,110,0.15))',
                  }}
                >
                  {columns.map((c, i) => (
                    <th
                      key={i}
                      className="px-4 lg:px-6 py-4 lg:py-5 text-center text-xs lg:text-sm font-semibold tracking-[0.08em] font-[family-name:var(--font-body)]"
                      style={{
                        color: 'var(--color-text)',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      {t(c)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const isMain = row.highlight === true
                  return (
                    <tr
                      key={i}
                      className="transition-colors duration-300 hover:brightness-125"
                      style={{
                        background: isMain
                          ? 'linear-gradient(90deg, rgba(200,169,110,0.22), rgba(200,169,110,0.10))'
                          : i % 2 === 0
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      {columns.map((_c, j) => {
                        const cell = row.cells?.[j] ?? ''
                        return (
                          <td
                            key={j}
                            className="px-4 lg:px-6 py-4 lg:py-5 text-center text-sm lg:text-base font-[family-name:var(--font-body)]"
                            style={{
                              color: isMain
                                ? 'var(--color-accent-light)'
                                : 'var(--color-text-secondary)',
                              borderBottom: '1px solid var(--color-border)',
                              fontWeight: isMain ? 600 : 400,
                            }}
                          >
                            {t(cell)}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </ScrollAnimation>

        {(footer || footerEn) && (
          <p
            className="mt-6 text-center text-[11px] lg:text-xs font-[family-name:var(--font-body)] italic"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t(footer)}
          </p>
        )}
      </div>
    </section>
  )
}
