import {
  Leaf,
  Waves,
  Sparkles,
  Ruler,
  Home,
  Building2,
  Trees,
  Train,
  Award,
  Mountain,
  Sun,
  Shield,
  Footprints,
  Smartphone,
  Lock,
  Music,
  Flower,
  Zap,
  Heart,
  Sprout,
} from 'lucide-react'
import ScrollAnimation from '../common/ScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'

const ICON_MAP = {
  Leaf,
  Waves,
  Sparkles,
  Ruler,
  Home,
  Building2,
  Trees,
  Train,
  Award,
  Mountain,
  Sun,
  Shield,
  Footprints,
  Smartphone,
  Lock,
  Music,
  Flower2: Flower,
  Grass: Trees,
  Butterfly: Sparkles,
  Zap,
  Heart,
  Sprout,
}

/**
 * HighlightsGrid — Expanded selling-point grid with icons.
 * Replaces the previous "項目亮點" with a richer, more inviting layout.
 */
export default function HighlightsGrid({
  tagline = '',
  title = '項目亮點',
  titleEn = '',
  description = '',
  descriptionEn = '',
  items = [],
}) {
  const { t } = useLanguage()
      return (
    <section
      id="highlights"
      className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      {/* Decorative top border accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
        }}
      ></div>

      <div className="mx-auto max-w-[1440px]">
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
            {description && (
              <p
                className="mt-4 text-sm lg:text-base leading-relaxed font-[family-name:var(--font-body)]"
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

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Leaf
            return (
              <ScrollAnimation key={i} delay={i * 0.08}>
                <div
                  className="group relative h-full p-6 lg:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {/* Subtle gold sweep on hover */}
                  <div
                    className="absolute -top-1 -right-1 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  ></div>

                  {/* Icon */}
                  <div
                    className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(200,169,110,0.2), rgba(200,169,110,0.05))',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.5}
                      style={{ color: 'var(--color-accent)' }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="relative text-lg lg:text-xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)] mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t(item.title)}
                  </h3>

                  {/* Description */}
                  <p
                    className="relative text-xs lg:text-sm leading-relaxed font-[family-name:var(--font-body)]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {t(item.description)}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="relative mt-5 w-10 h-[2px] transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  ></div>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
