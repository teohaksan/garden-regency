import {
  Leaf,
  Heart,
  Zap,
  Sprout,
} from 'lucide-react'
import ScrollAnimation from '../common/ScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'

const ICON_MAP = {
  Leaf,
  Heart,
  Zap,
  Sprout,
}

/**
 * PillarsSection — Four pillars layout for the core philosophy.
 * Horizontal on desktop, vertical on mobile.
 */
export default function PillarsSection({
  tagline = '',
  title = '四大建築特色',
  titleEn = '',
  description = '',
  descriptionEn = '',
  items = [],
}) {
  const { t } = useLanguage()
      return (
    <section
      id="pillars"
      className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(10, 61, 42, 0.4) 0%, transparent 60%)`,
        }}
      />

      <div className="mx-auto max-w-[1440px] relative z-10">
        <ScrollAnimation>
          <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Horizontal layout on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Leaf
            return (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <div
                  className="group h-full p-8 rounded-2xl border text-center transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(10, 30, 18, 0.6)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(200,169,110,0.2), rgba(200,169,110,0.05))',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      style={{ color: 'var(--color-accent)' }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold tracking-[0.05em] font-[family-name:var(--font-display)] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {t(item.title)}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed font-[family-name:var(--font-body)]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {t(item.description)}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="mt-5 w-10 h-[2px] mx-auto transition-all duration-500 group-hover:w-20"
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
