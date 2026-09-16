# AIoT-DA 課程 — DIC-1（Do in Class 1）專案說明文件

> **課程名稱**：物聯網應用與資料分析（AIoT & Data Analytics, AIoT-DA）
> **課堂實作**：L2 練習 — 個人資訊儀表板（Personal Dashboard）
> **授課單元**：Lecture 2 — 前端框架、元件化開發與非同步資料流（L2 React）
> **實作學生**：李偉聖（Andy Li）
> **儲存庫網址**：[https://github.com/superMLK/AIoT-DA_DIC-1](https://github.com/superMLK/AIoT-DA_DIC-1)
> **Live Demo Page**：[https://superMLK.github.io/AIoT-DA_DIC-1/](https://superMLK.github.io/AIoT-DA_DIC-1/)

![Live Demo Snapshot](./assets/demo-preview.png)

---

## 📌 1. 專案定位與教學故事線

本實作是 **AIoT-DA 課程 Lecture 2** 的個人練習成果，採用 **React + Vite** 前端技術棧，練習「元件化開發」與「非同步資料流」兩個核心概念：

$$\underbrace{\text{React 元件}}_{\text{UI 拆解}} \longrightarrow \underbrace{\text{useState / useEffect}}_{\text{狀態與生命週期}} \longrightarrow \underbrace{\text{setInterval}}_{\text{時間驅動更新}} \longrightarrow \underbrace{\text{Fetch API}}_{\text{天氣資料非同步取得}} \longrightarrow \underbrace{\text{Vite Build}}_{\text{打包最佳化}} \longrightarrow \underbrace{\text{GitHub Actions}}_{\text{CI/CD 自動部署}} \longrightarrow \underbrace{\text{GitHub Pages}}_{\text{無伺服器上線}}$$

頁面核心是一張「個人名片式儀表板」：顯示中文/英文姓名、學校與學系、工作地點，搭配即時更新的圓形進度時鐘，練習如何用 React 的宣告式寫法處理「每秒都在變」的資料。

---

## 📁 2. 專案結構與模組說明

```text
L2練習/
├── index.html                    # Vite 入口 HTML
├── vite.config.js                # Vite 設定（base: './' 供靜態部署）
├── package.json                  # 專案依賴與指令
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions：build 並自動部署到 Pages
└── src/
    ├── main.jsx                  # React 掛載入口
    ├── App.jsx                   # 主要頁面元件：組裝時鐘、資訊卡、按鈕列
    ├── timeUtils.js               # 純函式：ISO 週數、問候語、日進度、時間格式化
    ├── useWeather.js               # 自訂 Hook：呼叫 Open-Meteo API 取得台中天氣
    └── index.css                  # 深色 HUD 風格樣式
```

### 核心檔案職責

| 檔案 | 角色與技術重點 |
| :--- | :--- |
| **`App.jsx`** | 結構與行為層：組合圓形進度時鐘（SVG）、個人資訊區、Projects/About/Connect 按鈕、24H/12H 切換與 Copy Time 功能。 |
| **`timeUtils.js`** | 邏輯層：純函式計算 ISO 8601 週數、年度第幾天、依時段變化的問候語、日進度百分比、12H/24H 格式化，全部與元件邏輯脫鉤，方便單獨驗證。 |
| **`useWeather.js`** | 資料層：示範「畫面不寫死資料」，透過 `fetch` 向 Open-Meteo 取得台中即時氣溫與天氣代碼，並處理載入中/失敗狀態。 |
| **`index.css`** | 樣式層：CSS 深色漸層背景、毛玻璃卡片、SVG 圓弧發光效果，比照參考儀表板視覺風格。 |

---

## ✨ 3. 核心功能與技術亮點

### 1. 圓形進度時鐘（Live Timekeeper）
- **SVG 圓弧進度環**：以 `strokeDasharray` / `strokeDashoffset` 表示一天（00:00–24:00）經過的比例，每秒依本地時間重新計算，避免時區偏移。
- **時段感知問候語**：依當前小時切換「早安 / 午安 / 下午好 / 晚安」。
- **12H / 24H 制切換**：按鈕即時切換顯示格式，含 AM/PM 標籤。
- **UNIX 時間戳、ISO 週數、年度第幾天**：展示時間的多種表示法。

### 2. 個人資訊卡（Identity Card）
- 頭像圓圈顯示英文姓名縮寫（AL）。
- 副標題顯示學校/學系，卡片下方另有完整資訊列（中文姓名、英文姓名、學校/學系、工作地點）。

### 3. 非同步天氣資料（Fetch API）
- 透過 `fetch('https://api.open-meteo.com/...')` 非同步取得台中即時氣溫，練習 `useEffect` 內處理非同步請求、清理函式（cleanup）與錯誤狀態。
- API 失敗時（例如離線開啟 `dist/index.html` 的 `file://` 情境）會顯示「天氣讀取失敗」，不影響其餘功能。

### 4. Copy Time 剪貼簿功能
- 點擊按鈕呼叫 `navigator.clipboard.writeText`，複製當前時間字串。
- 成功顯示「已複製 ✓」，失敗顯示「複製失敗 ✕」，避免靜默失敗讓使用者無感。

### 5. 裝飾性導覽按鈕
- `Projects` / `About` / `Connect` 三個按鈕僅作視覺呈現，練習排版與互動樣式，不綁定實際頁面跳轉。

---

## 🚀 4. 本機執行與 GitHub Pages 部署指南

### 本機開發
```bash
npm install
npm run dev
```
開啟瀏覽器前往：`http://localhost:5173`

> 天氣功能需要透過 http 伺服器讀取（`npm run dev` 或任何靜態伺服器），直接雙擊 `dist/index.html`（`file://`）會因瀏覽器安全機制擋下跨網域請求，導致天氣顯示「讀取失敗」，其餘功能不受影響。

### 正式建置
```bash
npm run build
```
產出的 `dist/` 資料夾即為可部署的靜態網站。

### GitHub Pages 自動部署（GitHub Actions）

本專案已設定 `.github/workflows/deploy.yml`：每次 push 到 `main` 分支時，自動執行 `npm ci && npm run build`，並將 `dist/` 發布到 GitHub Pages，不需要手動維護 `gh-pages` 分支。

1. **推送程式碼**：
   ```bash
   git push origin main
   ```
2. **確認 GitHub Pages 設定**：
   - 進入 GitHub 儲存庫頁面 → **Settings** → **Pages**
   - **Build and deployment → Source** 選擇 **GitHub Actions**
3. **完成發布**：
   Actions 執行完成後（約 1–2 分鐘），即可在以下網址存取線上版本：
   $$\text{https://superMLK.github.io/AIoT-DA\_DIC-1/}$$

---

## 🎯 5. 自我檢核清單

- [ ] **元件化思維**：能否說明 `App.jsx`、`timeUtils.js`、`useWeather.js` 各自的職責邊界，為什麼要拆開？
- [ ] **狀態與副作用**：能否解釋 `useEffect` 中 `setInterval` 為什麼一定要在 return 裡呼叫 `clearInterval`？
- [ ] **非同步資料流**：能否說明 `useWeather.js` 從 `fetch` 發出請求到畫面顯示溫度之間，狀態經歷了哪幾個階段？
- [ ] **時區與時間計算**：能否解釋為什麼圓形進度環要用 `getHours()` 而不是 `getUTCHours()` 來計算？
- [ ] **端到端部署**：是否成功透過 GitHub Actions 將自己的作品自動部署到 GitHub Pages？
