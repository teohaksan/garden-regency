import { useState } from 'react'
import ScrollAnimation from '../common/ScrollAnimation'

/**
 * FloorplanSection — Tower-based floor plan viewer.
 * Shows standard floor plan for each tower with unit type color tags.
 */
export default function FloorplanSection({
  title = '樓層平面圖',
  subtitle = 'FLOOR PLANS',
  description = '按座數查看標準層平面圖',
  towers = [],
}) {
  const [activeTower, setActiveTower] = useState(0)
  const current = towers[activeTower]

  if (!current) return null

  return (
    <section
      id="floorplans"
      className="relative py-24 lg:py-32 px-6 lg:px-12 scroll-mt-24"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-[1440px]">
        <ScrollAnimation>
          <div className="text-center max-w-3xl mx-auto mb-12">
            {subtitle && (
              <p
                className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                {subtitle}
              </p>
            )}
            <h2
              className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
              style={{ color: 'var(--color-text)' }}
            >
              {title}
            </h2>
            {description && (
              <p
                className="mt-3 text-sm lg:text-base font-[family-name:var(--font-body)]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {description}
              </p>
            )}
            <div
              className="mt-6 w-12 h-[1px] mx-auto"
              style={{ backgroundColor: 'var(--color-accent)' }}
            ></div>
          </div>
        </ScrollAnimation>

        {/* Tower Tabs */}
        <ScrollAnimation delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {towers.map((tower, i) => (
              <button
                key={i}
                onClick={() => setActiveTower(i)}
                className={`px-6 py-3 text-sm tracking-[0.1em] rounded-full font-[family-name:var(--font-body)] transition-all duration-300 ${
                  activeTower === i
                    ? 'font-semibold shadow-lg'
                    : 'opacity-60 hover:opacity-90'
                }`}
                style={{
                  backgroundColor: activeTower ? 'var(--color-surface)' : 'var(--color-accent)',
                  color: activeTower ? 'var(--color-text-secondary)' : '#000',
                  border: `1px solid ${
                    activeTower === i ? 'var(--color-accent)' : 'var(--color-border)'
                  }`,
                }}
                onMouseEnter={(e) => {
                  if (activeTower !== i) e.currentTarget.style.borderColor = 'var(--color-accent)'
                }}
                onMouseLeave={(e) => {
                  if (activeTower !== i) e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                <span className="mr-2">🏢</span>
                {tower.name}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Tower Content */}
        <ScrollAnimation delay={0.2}>
          <div
            className="rounded-2xl p-6 lg:p-8 border"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* Tower Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3
                  className="text-xl lg:text-2xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                  style={{ color: 'var(--color-text)' }}
                >
                  {current.name}標準層平面圖
                </h3>
                <p
                  className="mt-1 text-sm font-[family-name:var(--font-body)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {current.floorRange} · {current.unitsPerFloor}
                </p>
              </div>

              {/* Unit Type Color Tags */}
              {current.unitTypes && current.unitTypes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {current.unitTypes.map((ut, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs rounded-full font-[family-name:var(--font-body)] font-medium"
                      style={{
                        backgroundColor: `${ut.color}20`,
                        color: ut.color,
                      }}
                    >
                      {ut.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Floor Plan Image */}
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}
            >
              {current.image ? (
                <picture>
                  <source media="(max-width: 640px)" srcSet={current.image.mobile} />
                  <source media="(max-width: 1024px)" srcSet={current.image.medium} />
                  <img
                    src={current.image.large}
                    alt={`${current.name}標準層平面圖`}
                    className="w-full h-auto block"
                    loading="lazy"
                    width={1600}
                    height={1067}
                  />
                </picture>
              ) : (
                <div className="aspect-[3/2] flex items-center justify-center">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    平面圖將於售樓說明書公佈後上載
                  </p>
                </div>
              )}
            </div>

            {/* Floor Plan Notes */}
            {current.notes && (
              <div
                className="mt-6 p-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-bg-alt)',
                  borderLeft: `3px solid var(--color-accent)`,
                }}
              >
                <p
                  className="text-xs lg:text-sm leading-relaxed font-[family-name:var(--font-body)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {current.notes}
                </p>
              </div>
            )}
          </div>
        </ScrollAnimation>

        {/* Disclaimer */}
        <p
          className="mt-6 text-center text-[11px] lg:text-xs font-[family-name:var(--font-body)] italic"
          style={{ color: 'var(--color-text-muted)' }}
        >
          平面圖僅供參考，一切資料以發展商最後公布之售樓說明書為準。
          <br />
          <span className="text-[10px] lg:text-[11px] opacity-70">
            電腦模擬效果圖，僅供參考 | Artist's impression for reference only
          </span>
        </p>
      </div>
    </section>
  )
}
