import ScrollAnimation from '../common/ScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'

export default function TimelineSection({
  title = '項目進程',
  titleEn = '',
  subtitle,
  subtitleEn = '',
  items = [],
  backgroundImage,
  stopSectionId,
}) {
  const { t } = useLanguage()
      return (
    <section id="timeline" className="relative py-24 lg:py-32 px-6 lg:px-12 scroll-mt-24 overflow-hidden">
      {/* Background wallpaper image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(10, 61, 42, 0.85)' }}
      />
      <div className="relative z-10 mx-auto max-w-[1440px]">
        {(title || subtitle) && (
          <ScrollAnimation>
            <div className="text-center mb-16">
              {subtitle && (
                <p className="text-xs tracking-widest uppercase font-[family-name:var(--font-body)] mb-3"
                   style={{ color: 'var(--color-accent)' }}>
                  {t(subtitle)}
                </p>
              )}
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                  style={{ color: 'var(--color-text)' }}>
                {t(title)}
              </h2>
            </div>
          </ScrollAnimation>
        )}

        <div className="relative">
          {/* Vertical line - centered on desktop, left on mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2"
               style={{ backgroundColor: 'var(--color-border)' }}></div>

          <div className="space-y-12 md:space-y-16">
            {items.map((item, i) => {
              const isLeft = i % 2 === 1  // Odd indices (1, 3) on left, even (0, 2) on right
              return (
                <div key={i} className="relative flex items-start">
                  {/* Dot - positioned on the line */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full z-10 md:-translate-x-1/2"
                       style={{ 
                         backgroundColor: 'var(--color-accent)', 
                         boxShadow: `0 0 0 4px var(--color-bg), 0 0 0 5px var(--color-accent)` 
                       }}></div>

                  {/* Mobile content (always left of dot) */}
                  <div className="md:hidden ml-10">
                    <p className="text-xs tracking-widest uppercase mb-2 font-[family-name:var(--font-body)]"
                       style={{ color: 'var(--color-accent)' }}>
                      {t(item.date)}
                    </p>
                    <h3 className="text-xl lg:text-2xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                        style={{ color: 'var(--color-text)' }}>
                      {t(item.title)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed font-[family-name:var(--font-body)]"
                       style={{ color: 'var(--color-text-secondary)' }}>
                      {t(item.description)}
                    </p>
                  </div>

                  {/* Desktop: Two column layout */}
                  <div className="hidden md:grid md:grid-cols-2 w-full items-start">
                    {/* Left column - right justified near center line */}
                    <ScrollAnimation delay={i * 0.1}>
                      <div className={`pr-12 text-right ${isLeft ? 'visible' : 'invisible'}`}>
                        {isLeft && (
                          <>
                            <p className="text-xs tracking-widest uppercase mb-2 font-[family-name:var(--font-body)]"
                               style={{ color: 'var(--color-accent)' }}>
                              {t(item.date)}
                            </p>
                            <h3 className="text-xl lg:text-2xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                                style={{ color: 'var(--color-text)' }}>
                              {t(item.title)}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed font-[family-name:var(--font-body)]"
                               style={{ color: 'var(--color-text-secondary)' }}>
                              {t(item.description)}
                            </p>
                          </>
                        )}
                      </div>
                    </ScrollAnimation>

                    {/* Right column - left justified near center line */}
                    <ScrollAnimation delay={i * 0.1}>
                      <div className={`pl-12 text-left ${!isLeft ? 'visible' : 'invisible'}`}>
                        {!isLeft && (
                          <>
                            <p className="text-xs tracking-widest uppercase mb-2 font-[family-name:var(--font-body)]"
                               style={{ color: 'var(--color-accent)' }}>
                              {t(item.date)}
                            </p>
                            <h3 className="text-xl lg:text-2xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)]"
                                style={{ color: 'var(--color-text)' }}>
                              {t(item.title)}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed font-[family-name:var(--font-body)]"
                               style={{ color: 'var(--color-text-secondary)' }}>
                              {t(item.description)}
                            </p>
                          </>
                        )}
                      </div>
                    </ScrollAnimation>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
