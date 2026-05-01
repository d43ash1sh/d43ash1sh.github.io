# 🌐 Debashish Bordoloi — Personal Portfolio

> A blazing-fast, bilingual (English 🇮🇳 / Assamese অসমীয়া), fully responsive portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion** — packed with unique interactive features.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?logo=framer)](https://www.framer.com/motion/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-orange?logo=google)](https://aistudio.google.com/)

---

## ✨ Features

### 🌏 Bilingual (EN / অসমীয়া)
- Full site content available in both **English** and **Assamese**
- Language preference is **persisted to localStorage** — no reset on page reload
- Toggle button lives in the Navbar for instant switching

### 🤖 AI "Clone" Chatbot — Powered by Gemini 2.5 Flash
- A floating chat bubble in the bottom-right corner
- Visitors can ask questions like *"What are Debashish's skills?"* or *"Tell me about the Adi Voice Project"*
- AI is pre-loaded with the full resume context from `personal.json`
- **100% secure** — the Google Gemini API key lives only on the **server-side Next.js API route** (`/api/chat`), never exposed to the browser

### 👨‍💻 Hacker Terminal (`TerminalOverlay`)
- Press **`` ` `` (backtick)** or click the terminal icon in the footer to summon a retro Linux-style terminal
- Available commands:
  - `whoami` — display identity
  - `skills` — list technical expertise
  - `projects` — list featured projects with links
  - `contact` — show contact information
  - `sudo hack-website` — secret easter egg 🚨
  - `clear` — clear terminal
  - `exit` — close terminal
- macOS-style traffic light buttons, green prompt cursor, smooth slide-in animation

### 🐛 "Squash the Bug" Mini-Game (`BugSquasher`)
- A digital bug occasionally crawls across your screen
- Click it to "squash" it and earn a randomized **Bug Bounty reward** ($100–$1000)
- A satisfying toast notification confirms your catch
- A playful nod to Debashish's work at Bugcrowd & HackerOne

### 🔒 Security-First Architecture
- API key is stored in `.env.local` (excluded by `.gitignore`)
- Gemini calls are made **server-side only** via a Next.js API Route
- Zero API key exposure in the browser network tab

---

## 🗂️ Project Structure

```
portfolio/
├── public/
│   ├── CV/                      # Downloadable resume PDF
│   └── img/                     # Profile photo & logo
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts    # 🔐 Secure Gemini AI backend route
│   │   ├── globals.css
│   │   ├── layout.tsx           # Global layout with all overlays
│   │   └── page.tsx             # Main page — section assembly
│   ├── components/
│   │   ├── AIChatbot.tsx        # 🤖 Floating AI chat widget
│   │   ├── BugSquasher.tsx      # 🐛 Bug mini-game
│   │   ├── Footer.tsx           # Footer with terminal hint
│   │   ├── Navbar.tsx           # Responsive navbar + lang/theme toggle
│   │   ├── TerminalOverlay.tsx  # 👨‍💻 Hacker terminal
│   │   └── ThemeProvider.tsx    # Dark/light theme context
│   ├── data/
│   │   ├── personal.json        # English content (skills, projects, etc.)
│   │   ├── personal_as.json     # Assamese translation of all content
│   │   └── socials.json         # Social media links
│   ├── lib/
│   │   ├── LanguageContext.tsx  # Language state & localStorage persistence
│   │   └── utils.ts             # Utility functions (cn)
│   └── sections/
│       ├── AboutSection.tsx     # About + Highlights + Education
│       ├── ContactSection.tsx   # Email, phone, location, live IST clock
│       ├── HeroSection.tsx      # Profile, animated roles, verified badge
│       ├── ProjectsSection.tsx  # 8 featured GitHub/live projects
│       └── SocialsSection.tsx   # Social links grid
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/d43ash1sh/d43ash1sh.github.io.git
cd d43ash1sh.github.io
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root:
```env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
```
Get your free API key at [Google AI Studio](https://aistudio.google.com/).

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌩️ Deploying to Vercel

1. Push your code to GitHub (already done ✅)
2. Import the repo into [Vercel](https://vercel.com)
3. Under **Settings → Environment Variables**, add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** *(your API key)*
4. Deploy — your site will be live in ~2 minutes! 🚀

> ⚠️ **Never commit `.env.local` to Git.** It's already excluded by `.gitignore` via the `.env*` rule.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Framework & SSR API routes |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Google Gemini 2.5 Flash** | AI chatbot intelligence |
| **@google/genai SDK** | Gemini API client |
| **lucide-react** | Icon library |
| **next-themes** | Dark/light mode |

---

## 📋 Sections

| Section | Description |
|---|---|
| **Hero** | Animated role titles, profile photo, verified badge |
| **Socials** | GitHub, LinkedIn, HackerOne, Bugcrowd links |
| **About** | Bio, passion areas, professional highlights with cert links |
| **Education** | M.Tech → MCA → BCA timeline |
| **Projects** | 8 featured projects with GitHub/live links and tech tags |
| **Contact** | Email, phone, location, live IST clock, resume download |
| **Footer** | Built with ❤️ in Assam + terminal hint |

---

## 🎮 Easter Eggs

| Trigger | Effect |
|---|---|
| Press **`` ` ``** anywhere | Opens the hacker terminal |
| Type `sudo hack-website` in terminal | ACCESS DENIED 🚨 |
| Click the bug crawling across the screen | Earn a bug bounty reward 💰 |
| Toggle language to অসমীয়া | Full Assamese translation |

---

## 👤 About Me

**Debashish Bordoloi** — Security Researcher & Full Stack Developer from Assam, India.

- 🔐 Security Researcher at **Bugcrowd** & **HackerOne**
- 🌐 Full Stack Developer at **CNCF Guwahati**
- 🛡️ **OWASP Chapter Leader** for OWASP Foundation
- 🎓 M.Tech in Computer Science, Rajiv Gandhi University

---

## 📄 License

MIT License — feel free to fork and customize for your own portfolio!

---

<p align="center">Built with ❤️ in Assam, India 🦏</p>
