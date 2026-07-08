# Garden Regency 芊御 — Project Handover

> **專案路徑**: `/Users/joelteo/Downloads/garden-regency/`
> **開發伺服器**: `http://localhost:5183/`
> **技術棧**: Vite 8 + React 19 + Tailwind CSS v4 + Framer Motion

---

## 專案概覽

Garden Regency 芊御 — 新鴻基地產（0016）旗下元朗錦田北低密度花園豪宅。
- 566 伙，3 座住宅大樓
- 1房至3房 + 特色戶，約 70% 為兩房
- 3.5米特高樓底
- 逾10.6萬呎園林會所，48項設施（含33米園林泳池）
- 近60% 園林覆蓋率
- 關鍵日期：**2027年5月17日**
- 示範單位：ICC 62/F
- 已獲批預售樓花同意書

## 已建立的功能

### 頁面結構
1. **Hero Section** — 花卉插畫背景 + 項目名稱/資料 + 即時統計
2. **Stats Grid** — 566伙 / 3.5米樓底 / 48項設施 / 60%園林覆蓋
3. **Unit Tabs** — 1房/2房/3房/特色戶 四種戶型
4. **Floorplan Section** — 3款戶型圖預留位（圖片待補）
5. **Timeline** — 項目時間線（2026Q2→2027Q2）
6. **Location Map** — 位置交通 + Google Maps iframe
7. **Contact Form** — 預約參觀表單 → EmailJS ✅（已驗證 2026-07-08）
8. **Floating Actions** — WhatsApp / WeChat / 電話
9. **Footer** — 免責條款

### 主題系統：🌿 Emerald Garden

| 屬性 | 值 |
|------|-----|
| 背景色 | `#07120a`（深森林綠） |
| 強調色 | `#B8860B`（暗金） |
| 淺強調 | `#DAA520`（金黃） |
| 字體 | Playfair Display + DM Sans + Noto Sans TC |
| 風格 | 深色奢華園林風 |

### 花卉裝飾
- 花卉從官方網站素材提取（3張 PNG）
- Hero 區 CSS overlays：top-right + bottom-left 半透明花紋
- 右側浮動花卉（`animate-float` 緩慢飄動效果）
- **LeafEffect**（`src/components/optional/LeafEffect.jsx`）— Canvas 鼠標跟蹤葉子 + 背景飄落粒子動畫
  - 🔧 **Memory Leak Fix (WorkBuddy 2026-07-08)**：必須在 cleanup 中調用 `cancelAnimationFrame`，否則 StrictMode + HMR 會導致記憶體爆掉
  - 💡 **未來重用**：更換粒子形狀/顏色即可匹配不同樓盤主題

### 聯絡資料
- **WhatsApp / 電話**: +852 9101 0532
- **微信 ID**: 家在香港520（WeChat QR 碼已加入）

## 待辦事項

### 🔴 高優先
- [x] **WeChat QR Code** — ✅ 已完成（2026-07-07），QR Code 加入 ContactForm + FloatingActions WeChat Modal
- [ ] **單位圖片** — 如需顯示單位實景或 3D 渲染圖，放入 `public/` 並更新 `garden-regency.js` 的 `image` 欄位
- [ ] **戶型圖** — `floorplans.items[].image` 為 null，待官方公佈後補充

### 🟡 中優先
- [ ] **Google Maps** — ✅ 座標已更新（22.4423, 114.0531），URL 格式為 `google.com/maps?q=...&output=embed&zoom=16`
- [ ] **SEO** — Google Search Console 設定、sitemap.xml、robots.txt
- [ ] **Analytics** — 加入 Google Analytics / 其他追蹤碼

### 🟢 低優先
- [ ] **Animated Florals** — `flower-r.png` 右側裝飾可整合更多 CSS 動畫
- [ ] **Light Theme** — 如果需要淺色版本，可參照 Victoria Blossom 的 light theme 做法
- [ ] **Blog/Calculator** — 用戶確認不需要

## Known Fixes / Changelog

> 此節供跨工具 handover 參考（原專案由 **QClaw** 建立，以下修復由 **WorkBuddy (Bob)** 執行）。

### 2026-07-08 — LeafEffect 記憶體 leak 修復
- **嚴重性**：🔴 高（導致 Mac 記憶體爆掉 + hang，開發 session 長時間運行時尤甚）
- **根因**：`src/components/optional/LeafEffect.jsx` 的 `requestAnimationFrame` 動畫 loop **沒有 `cancelAnimationFrame`**。配合 `main.jsx` 開啟的 **StrictMode**（dev 雙重掛載）與 Vite HMR remount，每次 mount / 存檔重掛都 leak 一條 animation loop + canvas context + 粒子陣列，長期累積吃光 RAM/CPU。
- **修復方式**（WorkBuddy）：
  - 在 effect 內加入 `let cancelled = false;` 旗標
  - 在 cleanup 中呼叫 `cancelAnimationFrame(rafId)` 並設 `cancelled = true`，確保組件卸載時動畫立即停止、資源釋放
  - `oxlint` 檢查通過（0 warnings / 0 errors）
- **重建**：同日 `npm run build` 重新打包（642ms），preview 跑在 `http://localhost:4173`
- **提醒**：此 bug 屬 QClaw 原始代碼，非 WorkBuddy 引入。日後若 QClaw 重寫/重構 `LeafEffect.jsx`，請保留 `cancelAnimationFrame` 清理邏輯，否則會再次 leak。

## 開發指令

```bash
cd /Users/joelteo/Downloads/garden-regency

# 開發
npm run dev

# 構建
npm run build

# 預覽構建
npm run preview
```

## 資料檔案

核心資料集中在 `src/data/garden-regency.js`，修改樓盤資訊、聯絡方式、戶型資料等都在此檔案。
主題設定在 `src/themes/emerald.js` 及 `src/index.css` 的 `:root.emerald` 區段。
