# Portfolio Project

一個使用 Vite + React + Tailwind CSS 建立的現代化前端開發環境。

## 技術棧

- ⚡ **Vite** - 極速的前端建構工具
- ⚛️ **React** - 用於構建用戶界面的 JavaScript 庫
- 🎨 **Tailwind CSS** - 實用優先的 CSS 框架

## 開始使用

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器將在 `http://localhost:5173` 啟動

### 建構生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 專案結構

```
portfolio-new/
├── src/
│   ├── App.jsx          # 主要應用組件
│   ├── main.jsx         # 應用入口點
│   └── index.css        # Tailwind CSS 配置
├── public/              # 靜態資源
├── index.html           # HTML 模板
├── tailwind.config.js   # Tailwind 配置文件
├── postcss.config.js    # PostCSS 配置
└── vite.config.js       # Vite 配置文件
```

## 開發指南

### 使用 Tailwind CSS

這個專案已經配置好 Tailwind CSS。你可以直接在 JSX 中使用 Tailwind 的實用類別：

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello World
</div>
```

### 熱模組替換 (HMR)

Vite 提供了極快的 HMR 支援。當你修改代碼時，變更會立即反映在瀏覽器中，無需完整重新載入頁面。

## 相關資源

- [Vite 文檔](https://vitejs.dev/)
- [React 文檔](https://react.dev/)
- [Tailwind CSS 文檔](https://tailwindcss.com/)

## 作品頁「區塊化資料驅動」

請參考 `PROJECT_CONTENT.md`，了解如何以 JSON 區塊建立作品頁內容，並透過 `#/project/:slug` 自動渲染。

## 授權

MIT
