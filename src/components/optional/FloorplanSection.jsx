import { useState } from 'react'
import ScrollAnimation from '../common/ScrollAnimation'

// Elegant SVG floorplan diagrams — no external image assets required.
const ROOM = 'var(--color-surface)'
const STROKE = 'var(--color-accent)'
function FloorplanDiagram({ layout, title }) {
  const rooms = PLANS[layout] || PLANS['1bed']
  return (
    <div className="w-full rounded-xl shadow-lg overflow-hidden border"
         style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}>
      <svg viewBox="0 0 400 300" className="w-full h-auto block" role="img" aria-label={`${title} 戶型示意圖`}>
        <rect x="8" y="8" width="384" height="284" rx="6" fill="none" stroke={STROKE} strokeWidth="2" opacity="0.5" />
        {rooms.map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="3" fill={ROOM} stroke={STROKE} strokeWidth="1.2" opacity="0.85" />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 4} textAnchor="middle"
                  fontSize="11" fill="var(--color-text-secondary)" fontFamily="var(--font-body)">
              {r.label}
            </text>
          </g>
        ))}
        <text x="200" y="292" textAnchor="middle" fontSize="9" fill="var(--color-text-muted)" fontFamily="var(--font-body)">
          示意圖 · 非實際比例
        </text>
      </svg>
    </div>
  )
}

const PLANS = {
  '1bed': [
    { x: 20, y: 20, w: 200, h: 120, label: '客廳 / 飯廳' },
    { x: 232, y: 20, w: 148, h: 70, label: '睡房' },
    { x: 232, y: 100, w: 70, h: 70, label: '廚房' },
    { x: 310, y: 100, w: 70, h: 70, label: '浴室' },
    { x: 20, y: 154, w: 360, h: 60, label: '開放式廚房 / 玄關' },
    { x: 20, y: 226, w: 360, h: 54, label: '露台' },
  ],
  '2bed': [
    { x: 20, y: 20, w: 200, h: 120, label: '客廳 / 飯廳' },
    { x: 232, y: 20, w: 70, h: 70, label: '睡房' },
    { x: 310, y: 20, w: 70, h: 70, label: '睡房' },
    { x: 232, y: 100, w: 148, h: 70, label: '開放式廚房' },
    { x: 20, y: 154, w: 70, h: 70, label: '浴室' },
    { x: 100, y: 154, w: 280, h: 70, label: '玄關 / 走廊' },
    { x: 20, y: 234, w: 360, h: 46, label: '露台' },
  ],
  '3bed': [
    { x: 20, y: 20, w: 200, h: 110, label: '客廳 / 飯廳' },
    { x: 232, y: 20, w: 70, h: 70, label: '睡房' },
    { x: 310, y: 20, w: 70, h: 70, label: '睡房' },
    { x: 232, y: 100, w: 148, h: 64, label: '睡房' },
    { x: 20, y: 142, w: 150, h: 64, label: '開放式廚房' },
    { x: 180, y: 142, w: 80, h: 64, label: '浴室' },
    { x: 270, y: 142, w: 110, h: 64, label: '玄關' },
    { x: 20, y: 218, w: 360, h: 54, label: '露台' },
  ],
  '3bedE': [
    { x: 20, y: 20, w: 200, h: 110, label: '客廳 / 飯廳' },
    { x: 232, y: 20, w: 70, h: 70, label: '睡房' },
    { x: 310, y: 20, w: 70, h: 70, label: '主人套房' },
    { x: 232, y: 100, w: 148, h: 64, label: '睡房' },
    { x: 20, y: 142, w: 150, h: 64, label: '開放式廚房' },
    { x: 180, y: 142, w: 80, h: 64, label: '浴室' },
    { x: 270, y: 142, w: 110, h: 64, label: '衣帽間' },
    { x: 20, y: 218, w: 360, h: 54, label: '露台' },
  ],
}

export default function FloorplanSection({
  title = '戶型圖',
  subtitle,
  items = [],
}) {
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <section id="floorplans" className="relative py-24 lg:py-32 px-6 lg:px-12 scroll-mt-24" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="mx-auto max-w-[1440px]">
        <ScrollAnimation>
          <div className="max-w-3xl mb-12">
            {subtitle && (
              <p className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-3"
                 style={{ color: 'var(--color-accent)' }}>
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                style={{ color: 'var(--color-text)' }}>
              {title}
            </h2>
          </div>
        </ScrollAnimation>

        {/* Tabs */}
        {items.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10 border-b pb-4"
               style={{ borderColor: 'var(--color-border)' }}>
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-5 py-2 text-xs tracking-[0.15em] transition-all duration-300 font-[family-name:var(--font-body)] ${
                  active === i
                    ? 'font-semibold'
                    : 'opacity-50 hover:opacity-80'
                }`}
                style={{
                  color: active === i ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderBottom: active === i ? `2px solid var(--color-accent)` : '2px solid transparent',
                  marginBottom: '-17px',
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {current && (
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <ScrollAnimation>
              {current.image ? (
                <img src={current.image} alt={current.name} className="w-full rounded-xl shadow-lg" />
              ) : current.layout ? (
                <FloorplanDiagram layout={current.layout} title={current.name} />
              ) : (
                <div className="w-full aspect-[4/3] rounded-xl flex items-center justify-center"
                     style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    戶型圖片位置
                  </p>
                </div>
              )}
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                    style={{ color: 'var(--color-text)' }}>
                  {current.name}
                </h3>
                <div className="mt-4 space-y-3 text-sm font-[family-name:var(--font-body)]"
                     style={{ color: 'var(--color-text-secondary)' }}>
                  {current.area && (
                    <div className="flex items-center justify-between border-b pb-2"
                         style={{ borderColor: 'var(--color-border)' }}>
                      <span>實用面積</span>
                      <span style={{ color: 'var(--color-text)' }} className="font-medium">{current.area}</span>
                    </div>
                  )}
                  {current.bedrooms !== undefined && (
                    <div className="flex items-center justify-between border-b pb-2"
                         style={{ borderColor: 'var(--color-border)' }}>
                      <span>睡房</span>
                      <span style={{ color: 'var(--color-text)' }} className="font-medium">{current.bedrooms} 房</span>
                    </div>
                  )}
                  {current.bathrooms !== undefined && (
                    <div className="flex items-center justify-between border-b pb-2"
                         style={{ borderColor: 'var(--color-border)' }}>
                      <span>浴室</span>
                      <span style={{ color: 'var(--color-text)' }} className="font-medium">{current.bathrooms} 廁</span>
                    </div>
                  )}
                  {current.floor && (
                    <div className="flex items-center justify-between border-b pb-2"
                         style={{ borderColor: 'var(--color-border)' }}>
                      <span>樓層</span>
                      <span style={{ color: 'var(--color-text)' }} className="font-medium">{current.floor}</span>
                    </div>
                  )}
                </div>
                {current.description && (
                  <p className="mt-4 text-sm leading-relaxed font-[family-name:var(--font-body)]"
                     style={{ color: 'var(--color-text-muted)' }}>
                    {current.description}
                  </p>
                )}
              </div>
            </ScrollAnimation>
          </div>
        )}
      </div>
    </section>
  )
}
