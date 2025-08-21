# Vizuara Sentiment Lab (Kid-Friendly)

A complete, kid-friendly **Sentiment Analysis** web app built with **React + Vite + Tailwind CSS** and an optional **Node.js + Express** backend. 
Designed to meet the Vizuara Full Stack Intern assignment requirements: beautiful UI, simple UX for 6th graders, storytelling, interactive exercises, and multiple sentiment analysis approaches (rule-based + ML-style Naive Bayes).

## Features
- 🎨 **Attractive UI** with bright, kid-friendly visuals (Tailwind CSS).
- 🧭 **Simple UX**: Large buttons, clear labels, friendly emojis.
- 📖 **Story Mode**: Learn through a short story with characters.
- 🧪 **Play/Quiz**: Multiple mini-games and quizzes with instant feedback and progress bar.
- 🧰 **Lab**: Try-it sandbox where kids type sentences and see live sentiment.
- 🧠 **Two Approaches**: 
  - Rule-based sentiment using a tiny lexicon.
  - ML-style **Naive Bayes** trained on a small demo dataset (in browser and also in backend).
- 🔌 **Optional Backend** (`server/`): `/api/sentiment` endpoint running the same logic with CORS enabled.
- 🚀 **Deploy-ready**: Easily deploy client to **Vercel/Netlify** and backend to **Render/Railway**.

<img width="1901" height="907" alt="Screenshot 2025-08-21 192936" src="https://github.com/user-attachments/assets/23eafa45-553d-4aef-9eaa-93c3ea644081" />
<img width="1887" height="865" alt="Screenshot 2025-08-21 193017" src="https://github.com/user-attachments/assets/783ea49b-01c3-4f7e-8dc2-6208abf7661d" />

<img width="1910" height="870" alt="Screenshot 2025-08-21 193037" src="https://github.com/user-attachments/assets/654a5d15-5cdf-4c34-8da5-c6978be1250e" />
<img width="1906" height="851" alt="Screenshot 2025-08-21 193055" src="https://github.com/user-attachments/assets/ee24cee3-e6fe-4c88-aa0d-319b06c33d0d" />

## Quick Start

### 1) Run Frontend
```bash
cd client
npm install
npm run dev
```
Vite dev server runs at http://localhost:5173

### 2) (Optional) Run Backend
```bash
cd server
npm install
npm start
```
Backend runs at http://localhost:8080

### 3) Configure Backend URL (Optional)
The app auto-works offline with rule-based + in-browser Naive Bayes. 
If you want to use the backend, set `VITE_API_BASE=http://localhost:8080` in `client/.env`

### 4) Build & Deploy
- **Frontend**: `npm run build` → deploy `client/dist` to Vercel/Netlify.
- **Backend**: Deploy `server` to Render/Railway/Heroku.

## Folder Structure
```
vizuara-sentiment-lab/
├─ client/ (Vite + React + Tailwind)
└─ server/ (Express API)
```

## Notes
- No external AI keys required. Hugging Face integration stub provided if you want to add your key.
- Designed for **11-year-olds**: big fonts, clear CTAs, fun emojis, accessible colors.
