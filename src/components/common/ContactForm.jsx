import { useState } from 'react'
import ScrollAnimation from './ScrollAnimation'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../../context/LanguageContext'

// 📧 EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_uglvbvi'
const EMAILJS_TEMPLATE_ID = 'template_vrs6boo'
const EMAILJS_PUBLIC_KEY = 'F70iQWsAeEBUrOhMm'
const PROPERTY_NAME = '芊御 Garden Regency'

// 戶型 mapping：value → 中文顯示
const UNIT_TYPE_LABELS_ZH = {
  '1bed': '一房',
  '2bed': '兩房',
  '3bed': '三房',
  '3bed-suite': '三房一套',
  'platform': '平台特色戶',
  'rooftop': '天台特色戶',
}

const UNIT_TYPE_LABELS_EN = {
  '1bed': '1 Bedroom',
  '2bed': '2 Bedrooms',
  '3bed': '3 Bedrooms',
  '3bed-suite': '3BR Suite',
  'platform': 'Platform Unit',
  'rooftop': 'Rooftop Unit',
}

export default function ContactForm({
  title = '預約參觀',
  subtitle = '立即登記，專人回覆',
  waNumber = '+85291010532',
  waPrefill = '你好，我對 [樓盤名稱] 有興趣，想了解多啲資料。',
  phoneNumber = '+85291010532',
  showWeChat = false,
  weChatId = '',
  weChatQRSmall = '',
  weChatQRBig = '',
  formFields = ['name', 'phone', 'email', 'unitType'],
}) {
  const [form, setForm] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [modalCopied, setModalCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { t, lang } = useLanguage()

  const isDark = document.documentElement.classList.contains('gold') ||
                 document.documentElement.classList.contains('teal')

  const UNIT_TYPE_LABELS = lang === 'zh-CN' ? UNIT_TYPE_LABELS_EN : UNIT_TYPE_LABELS_ZH

  const fieldLabels = {
    name: t('姓名 *'),
    phone: t('聯絡電話 *'),
    email: t('電郵地址 *'),
    unitType: t('感興趣的戶型'),
    message: t('備註'),
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!agreed) return
    // Validate required fields
    const requiredFields = ['name', 'phone', 'email']
    const missingFields = requiredFields.filter(f => !form[f] || form[f].trim() === '')
    if (missingFields.length > 0) {
      alert(t('請填寫所有必填欄位：姓名、聯絡電話、電郵地址'))
      return
    }

    // Submit via EmailJS
    setIsSubmitting(true)
    setSubmitError('')

    const templateParams = {
      from_name: form.name,
      phone: form.phone,
      reply_to: form.email,
      unit_type: UNIT_TYPE_LABELS[form.unitType] || form.unitType || t('未選擇'),
      message: form.message || t('（無）'),
      property_name: PROPERTY_NAME,
    }

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setSubmitted(true)
      })
      .catch(() => {
        setSubmitError(t('提交失敗，請稍後再試或直接致電聯絡我們。'))
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleReset = () => {
    setSubmitted(false)
    setAgreed(false)
    setForm({})
  }

  const handleCopyWeChat = () => {
    navigator.clipboard?.writeText(weChatId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleModalCopyWeChat = () => {
    navigator.clipboard?.writeText(weChatId)
    setModalCopied(true)
    setTimeout(() => setModalCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 px-6 lg:px-12"
             style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="mx-auto max-w-5xl">
        <ScrollAnimation>
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-[0.05em] font-[family-name:var(--font-display)] leading-none"
                  style={{ color: 'var(--color-text)', minHeight: '1.2em' }}>
                {t(title)}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-sm tracking-[0.15em] font-[family-name:var(--font-body)] leading-snug"
                 style={{ color: 'var(--color-text-secondary)', minHeight: '1.5em' }}>
                {t(subtitle)}
              </p>
            )}
          </div>
        </ScrollAnimation>

        {/* Trust tagline */}
        <ScrollAnimation>
          <p className="text-center mb-10 text-sm font-[family-name:var(--font-body)] leading-snug"
             style={{ color: 'var(--color-text-secondary)', minHeight: '1.5em' }}>
            { t('專業獨立分析，助您判斷 Garden Regency 芊御是否適合您') }
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Form or Success Message */}
          <ScrollAnimation>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6"
                    style={{ color: 'var(--color-text)' }}>
                {formFields.map((field) => (
                  <div key={field}>
                    <label className="block text-xs tracking-[0.1em] mb-2 font-[family-name:var(--font-body)]"
                           style={{ color: 'var(--color-text-secondary)' }}>
                      {fieldLabels[field]}
                    </label>
                    {field === 'unitType' ? (
                      <select
                        value={form[field] || ''}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full px-4 py-3 text-sm outline-none border-b transition-colors duration-200 bg-transparent font-[family-name:var(--font-body)]"
                        style={{
                          color: 'var(--color-text)',
                          borderColor: 'var(--color-border)',
                        }}
                      >
                        <option value="" style={{ backgroundColor: 'var(--color-bg)' }}>{t('請選擇')}</option>
                        <option value="1bed" style={{ backgroundColor: 'var(--color-bg)' }}>{UNIT_TYPE_LABELS['1bed']}</option>
                        <option value="2bed" style={{ backgroundColor: 'var(--color-bg)' }}>{UNIT_TYPE_LABELS['2bed']}</option>
                        <option value="3bed" style={{ backgroundColor: 'var(--color-bg)' }}>{UNIT_TYPE_LABELS['3bed']}</option>
                        <option value="3bed-suite" style={{ backgroundColor: 'var(--color-bg)' }}>{UNIT_TYPE_LABELS['3bed-suite']}</option>
                        <option value="platform" style={{ backgroundColor: 'var(--color-bg)' }}>{UNIT_TYPE_LABELS['platform']}</option>
                        <option value="rooftop" style={{ backgroundColor: 'var(--color-bg)' }}>{UNIT_TYPE_LABELS['rooftop']}</option>
                      </select>
                    ) : (
                      <input
                        type={field === 'phone' ? 'tel' : field === 'email' ? 'email' : 'text'}
                        value={form[field] || ''}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        placeholder={`請輸入${fieldLabels[field]}`}
                        className="w-full px-4 py-3 text-sm outline-none border-b transition-colors duration-200 bg-transparent font-[family-name:var(--font-body)] placeholder:text-gray-500"
                        style={{
                          color: 'var(--color-text)',
                          borderColor: 'var(--color-border)',
                        }}
                      />
                    )}
                  </div>
                ))}

                {/* Privacy checkbox */}
                <div className="flex items-start gap-3 text-xs leading-relaxed mt-6 max-w-md">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 shrink-0 accent-current"
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  <label htmlFor="privacy"
                         className="font-[family-name:var(--font-body)]"
                         style={{ color: 'var(--color-text-muted)' }}>
                    { t('本人同意個人資料僅用於查詢及物業資訊，並已閱讀') }<a href="#footer" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>{ t('免責聲明') }</a>{ t('與') }<a href="#footer" className="underline mx-1" style={{ color: 'var(--color-accent)' }}>{ t('私隱條款') }</a>{ t('。') }
                  </label>
                </div>

                {/* Error message */}
                {submitError && (
                  <p className="text-red-400 text-xs text-center font-[family-name:var(--font-body)]">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!agreed || isSubmitting}
                  className="w-full px-8 py-4 text-sm tracking-wider font-semibold rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed font-[family-name:var(--font-body)]"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: isDark ? 'var(--color-bg)' : '#fff',
                  }}
                >
                  {isSubmitting ? t('提交中...') : t('提交查詢')}
                </button>
              </form>
            ) : (
              /* Success Message */
              <div className="text-center py-12 px-6 rounded-2xl border"
                   style={{
                     backgroundColor: 'var(--color-bg)',
                     borderColor: 'var(--color-border)'
                   }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(200, 169, 110, 0.1)' }}>
                  <svg className="w-8 h-8" fill="none" stroke="var(--color-accent)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4 font-[family-name:var(--font-display)]"
                    style={{ color: 'var(--color-text)' }}>
                  { t('感謝查詢') }
                </h3>
                <p className="text-sm mb-8 font-[family-name:var(--font-body)]"
                   style={{ color: 'var(--color-text-secondary)' }}>
                  { t('感謝您的查詢。我們的專業顧問會盡快聯絡您。') }
                </p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 text-sm tracking-wider font-semibold rounded-full border transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-body)]"
                  style={{
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                  }}
                >
                  { t('返回表單') }
                </button>
              </div>
            )}
          </ScrollAnimation>

          {/* Quick Contacts */}
          <ScrollAnimation delay={0.2}>
            <div className="space-y-6" style={{ color: 'var(--color-text)' }}>
              <h3 className="text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]"
                  style={{ color: 'var(--color-text-muted)' }}>
                { t('聯絡我們') }
              </h3>

              {/* WhatsApp — Dark card style */}
              <a
                href={`https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 rounded-xl border text-center text-sm tracking-[0.15em] font-semibold transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-body)]"
                style={{
                  color: '#fff',
                  borderColor: 'rgba(37,211,102,0.3)',
                  backgroundColor: 'rgba(7, 18, 10, 0.55)',
                }}
              >
                💬 { t('WhatsApp 查詢') }
              </a>

              {/* WeChat — Mount Broadcast style dark card */}
              {showWeChat && weChatId && (
                <div className="p-6 rounded-xl border flex gap-5 items-center"
                     style={{
                       backgroundColor: 'rgba(7, 18, 10, 0.55)',
                       borderColor: 'rgba(200, 169, 110, 0.25)',
                       color: 'var(--color-text)',
                     }}>
                  {/* Left: text + buttons */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs tracking-[0.15em] mb-2 font-[family-name:var(--font-body)]"
                       style={{ color: 'var(--color-text-muted)' }}>
                      { t('微信聯繫') }
                    </p>
                    <p className="text-[11px] leading-relaxed mb-4 font-[family-name:var(--font-body)]"
                       style={{ color: 'var(--color-text-secondary)' }}>
                      { t('掃描二維碼添加微信，或點擊下方按鈕複製微信 ID。') }
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCopyWeChat}
                        className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 hover:opacity-85 font-[family-name:var(--font-body)]"
                        style={{ 
                          backgroundColor: copied ? '#07C160' : 'var(--color-accent)', 
                          color: '#fff' 
                        }}
                      >
                        {copied ? t('✓ 已複製微信 ID') : t('複製微信 ID')}
                      </button>
                      <button
                        onClick={() => setQrModalOpen(true)}
                        className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 hover:opacity-85 font-[family-name:var(--font-body)]"
                        style={{ backgroundColor: '#07C160', color: '#fff' }}
                      >
                        { t('打開微信') }
                      </button>
                    </div>
                  </div>
                  {/* Right: small QR */}
                  {weChatQRSmall && (
                    <button
                      onClick={() => setQrModalOpen(true)}
                      className="shrink-0 block rounded-lg overflow-hidden border"
                      style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                      aria-label="放大二維碼"
                    >
                      <img
                        src={weChatQRSmall}
                        alt="WeChat QR Code"
                        className="w-24 h-24 object-cover block"
                      />
                    </button>
                  )}
                </div>
              )}

              {/* Phone — Dark card style */}
              <a
                href={`tel:${phoneNumber}`}
                className="block w-full py-4 px-6 rounded-xl border text-center text-sm tracking-[0.15em] font-semibold transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-body)]"
                style={{
                  color: '#fff',
                  borderColor: 'rgba(200, 169, 110, 0.25)',
                  backgroundColor: 'rgba(7, 18, 10, 0.55)',
                }}
              >
                📞 { t('致電 ') }{phoneNumber}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* WeChat QR Big Modal */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="relative rounded-2xl p-8 max-w-sm w-full text-center"
            style={{
              backgroundColor: '#1B4D3E',
              border: '1px solid rgba(200, 169, 110, 0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-3 right-4 text-2xl leading-none"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              aria-label="關閉"
            >
              ×
            </button>
            
            {/* WeChat Logo - green circle with white icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #07C160, #06AD56)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              </svg>
            </div>
            
            {/* Copy WeChat ID button */}
            <button
              onClick={handleModalCopyWeChat}
              className="mx-auto w-40 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 hover:opacity-85 mb-4"
              style={{
                backgroundColor: modalCopied ? '#07C160' : '#C8A96E',
                color: '#fff',
              }}
            >
              {modalCopied ? '✓ 已複製' : '複製微信 ID'}
            </button>

            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              { t('打開微信右上角「+」→「加入朋友」') }
            </p>
            
            {weChatQRBig ? (
              <img
                src={weChatQRBig}
                alt="WeChat QR Code"
                className="w-56 h-56 mx-auto object-contain block rounded-lg"
                style={{ backgroundColor: '#07120a', padding: '8px' }}
              />
            ) : (
              <img
                src={weChatQRSmall}
                alt="WeChat QR Code"
                className="w-56 h-56 mx-auto object-contain block rounded-lg"
                style={{ backgroundColor: '#07120a', padding: '8px' }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}
