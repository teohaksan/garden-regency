import ScrollAnimation from './ScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'

export default function FooterSection({
  companyName = 'HK New Property',
  propertyName,
  showDisclaimer = true,
}) {
  const { t } = useLanguage()

  const artNote = t('電腦模擬效果圖僅供參考 | Artist\'s impression for reference only')

  return (
    <footer id="footer" className="relative py-16 lg:py-20 px-6 lg:px-12"
            style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
      <div className="mx-auto max-w-[1440px]">
        <ScrollAnimation>
          {showDisclaimer && (
            <div className="space-y-6 text-[10px] leading-relaxed"
                 style={{ color: 'var(--color-text-muted)' }}>
              {/* PICS */}
              <div className="border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
                <p className="font-semibold mb-2 font-[family-name:var(--font-body)]" style={{ color: 'var(--color-text-secondary)' }}>
                  { t('個人資料收集聲明 | Personal Information Collection Statement') }
                </p>
                <>
                  <p className="font-[family-name:var(--font-body)]">
                    閣下透過本站表格、WhatsApp 或電話提供的個人資料，將僅用於回覆查詢及提供相關物業資訊。資料將於 12 個月內刪除，不會向第三方披露。閣下有權要求查閱或更正資料。
                  </p>
                  <p className="mt-2 italic font-[family-name:var(--font-body)]">
                    Personal Information Collection Statement: Data provided via form, WhatsApp, or phone will only be used for inquiries and updates. Data will be deleted within 12 months and not disclosed to third parties. You have the right to access or correct your data.
                  </p>
                </>
              </div>

              {/* Disclaimer */}
              <div className="border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
                <p className="font-semibold mb-2 font-[family-name:var(--font-body)]" style={{ color: 'var(--color-text-secondary)' }}>
                  { t('免責聲明 | Disclaimer') }
                </p>
                <>
                  <p className="font-[family-name:var(--font-body)]">
                    本網站為非官方資訊平台，並非發展項目「芊御 Garden Regency」或其發展商之官方網站。本網站所載之一切資料、圖片及內容僅供參考，並不構成任何形式之要約、陳述、保證或合約條款。本站使用之部分圖片或相片經電腦修飾或 AI 生成處理，純屬畫家之想像，並不代表物業之實際景觀、交付標準或周邊環境。所有物業資料均以政府部門及發展商最終公布之售樓說明書為準。本網站經營者對因依賴此等資料而引致的任何損失概不負責。準買家應自行核實資料並尋求獨立專業意見。
                  </p>
                  <p className="mt-2 italic font-[family-name:var(--font-body)]">
                    Disclaimer: This is an unofficial information platform and is NOT the official website of "Garden Regency". All information and images are for reference only. Some images on this site are digitally retouched or AI-generated, representing artist's impressions only and do not reflect the actual views or standards of the property. All details remain subject to the official Sales Brochure. The operator of this website shall not be liable for any loss arising from the use of this information. Prospective purchasers should seek independent professional advice.
                  </p>
                </>
              </div>

              <p className="text-center italic font-[family-name:var(--font-body)] pt-4">
                {artNote}
              </p>
            </div>
          )}
        </ScrollAnimation>
      </div>
    </footer>
  )
}
