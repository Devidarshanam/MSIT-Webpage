# MSIT – Master of Science in Information Technology | IIIT Hyderabad

Official student-centric announcement and programme website for the revamped AI-Native MSIT programme at IIIT Hyderabad, starting January 2027.

---

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Vanilla CSS (curated IIIT-H blue design system)
- **Data Architecture**: Centralized JSON (`src/data/msitData.json`) for zero-code content updates
- **Deployment**: Vercel / Netlify ready

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with SEO metadata
├── vite.config.js               # Vite bundler configuration
├── package.json                 # Project dependencies & scripts
├── public/
│   └── assets/                  # High-performance static assets (campus photo, logo)
├── src/
│   ├── App.jsx                  # Main single-page application
│   ├── main.jsx                 # React root mount point
│   ├── components/              # 17 modular React components
│   ├── data/
│   │   └── msitData.json        # Centralized programme information
│   └── styles/
│       └── styles.css           # Global design system & responsive styling
```

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment on Vercel

This repository is pre-configured for one-click deployment on **Vercel**:

1. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select and import the `Devidarshanam/MSIT-Webpage` repository.
3. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**. Your site will be live on your Vercel URL with continuous deployment on every Git push!

---

## 📄 License & Attribution

© IIIT Hyderabad. All rights reserved. MSIT is an initiative founded by Turing Award laureate Prof. Raj Reddy.
