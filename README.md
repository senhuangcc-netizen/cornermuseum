# Corner Museum 角落博物館 · 零碳古文明策展主題系統
> **Zero-Carbon Ancient Civilization Curation Platform**  
> 官方正式線上站點：[https://cornermuseum.org](https://cornermuseum.org)  
> ESG 零碳策展專頁：[https://cornermuseum.org/pages/esg](https://cornermuseum.org/pages/esg)  
> GitHub 存儲庫：[https://github.com/senhuangcc-netizen/cornermuseum.git](https://github.com/senhuangcc-netizen/cornermuseum.git)

---

## 🏛️ 專案概述 (Project Overview)

Corner Museum（角落博物館）攜手「東方森煌第三方科學鑑定中心」，開創全台首創之**「零碳古文明企業策展體系」**。  
打破傳統企業 ESG 活動（如搭設一次性木工舞台、PVC 帆布或高耗能活動）產生的二次碳排與邊際疲勞，以傳承數百年至數千年之古文明資產為核心載體，融合材料科學光譜檢測與國際 SROI（社會投資報酬率）量化指標，為企業在永續報告書中補齊最稀缺、最頂級的文化平權（SDG 11）與創新教育（SDG 4）章節。

---

## ⚡ 核心系統模組 (Core Modules)

### 1. 零碳 ESG 核心指標 (`sections/esg-curation.liquid`)
- **`0 kg` 古物新增碳排**：文物歷經數百年至數千年天然燒造流傳，活動期 0 新增碳排放，完勝一次性裝置藝術。
- **`85%` 可視覺與數據化產出**：成果得全數轉化為高品質影像、電子參展證書與量化圖表。
- **`7項` 聯合國 SDGs 指標一次扣連**：涵蓋 SDG 4、8、9、11、12、13、17。
- **`1: 5.8+ SROI` 社會投資回報**：依據國際 SROI 評價架構與財務代理變數（Financial Proxies），平均每投入 NT$ 1 創造 NT$ 5.8+ 實質社會價值。

### 2. 實境策展展示視窗 (Enterprise Architectural Showcase)
- **旗艦寬景取景框**：融入高奢深空琉金 HUD 取景框與 L 型瞄準角碼（Reticles）。
- **三組動態互動探索熱點 (Interactive Hotspots)**：
  - 🟢 **SDG 9 · 科技研發**：東方森煌 XRF 螢光光譜履歷，客觀杜絕贗品風險。
  - 🟢 **SDG 11 · 文化資產**：博物館級氣密恆溫恆濕展櫃（RH 45%~55%），免買斷進駐企業大廳。
  - 🟡 **SDG 17 · 夥伴關係**：英雄相惜跨界對話，寫下企業專屬永續篇章。
- **3D 游標透視視差**：隨滑鼠游標微幅傾斜，支援手機觸控響應。

### 3. SEO / AEO / GEO 雙核優化引擎 (`snippets/seo-aeo-geo-schema.liquid`)
- **Google Search + AI Overviews + Perplexity + ChatGPT 專用**。
- 完整包含 `Article`、`FAQPage`、`ExhibitionEvent` 與 `Brand` 之 JSON-LD 語意標註。
- 低調優雅的 FAQ 收摺摺疊備忘，保留 100% 搜尋爬蟲語意權重，不干擾頁面視覺流暢度。

### 4. 高端動態視覺工程 (`assets/esg-curation.css` / `assets/esg-curation.js`)
- **NeoLeaf 風格雙波浪注水 Loader (Wave Liquid Loader)**：3 秒優雅載入開場，支援全螢幕穿透揭幕與點擊跳過。
- **Three.js 深空星場宇宙背景**：全視窗 Canvas 空間微粒飄逸渲染。
- **SROI 動態試算機 (Rolling Odometer)**：即時滾動數字計算企業投入與量化產出。

---

## 📂 主題目錄結構 (Repository Structure)

```text
cornermuseum/
├── assets/
│   ├── esg-curation.css          # ESG 頁面核心樣式、HUD 取景框、熱點與動畫
│   ├── esg-curation.js           # Three.js 星空、Loader、SROI 試算引擎、3D 視差
│   ├── esg-popup-ad.jpg          # 企業總部實境展示全景大圖 (最佳化 Progressive JPEG)
│   ├── corner-museum-logo.png    # Corner Museum 官方高解析標誌
│   └── three.min.js              # Three.js 核心庫
├── layout/
│   └── theme.liquid              # 主版面配置 (全域 SEO Schema 注入點)
├── sections/
│   ├── esg-curation.liquid       # ESG 零碳策展旗艦模組 (Hero, Stats, Showcase, FAQ, Pricing)
│   ├── header.liquid             # 全站導航列 (包含零碳ESG策展重點入口)
│   └── exhibition-gallery.liquid # 展覽回顧與文物藝廊
├── snippets/
│   └── seo-aeo-geo-schema.liquid # 專屬 JSON-LD 結構化資料庫
├── templates/
│   ├── page.esg.json             # ESG 專屬頁面樣板配置
│   └── index.json                # 首頁區塊配置
├── DEVELOPMENT_LOG.md            # 完整開發歷程、技術決策與維護白皮書
└── README.md                     # 本專案說明文件
```

---

## 🚀 部署與維護指引 (Deployment & Operations)

### 前置需求
- 安裝 [Shopify CLI 3.x](https://shopify.dev/docs/themes/tools/cli)
- 具備 Corner Museum Shopify 商店權限

### 本地開發與即時預覽
```bash
# 啟動本地開發伺服器
shopify theme dev --store corner-museum.myshopify.com
```

### 推送更新至線上正式主題 (Live Theme)
```bash
# 推送到 Live Theme: Corner Museum Final (#186983547159)
shopify theme push --theme 186983547159 --allow-live --nodelete
```

---

## 📖 深入文件 (Documentation)
詳盡之功能決策、演算法公式、SEO 指標對照與問題排查指引，請參閱：  
👉 **[DEVELOPMENT_LOG.md](./DEVELOPMENT_LOG.md)**

---
*© 2026 Corner Museum 角落博物館 × 東方森煌古文物科學鑑定中心. All Rights Reserved.*
