# Debashish Bordoloi — Portfolio & Technical Work

[![Live Site](https://img.shields.io/badge/Live_Site-d43ash1sh.github.io-blue?style=flat&logo=vercel)](https://d43ash1sh.github.io/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Full Stack Developer · Security Researcher · AI Systems & Tooling Engineer  
> Based in Guwahati, Assam, India. Pursuing M.Tech in Computer Science at Rajiv Gandhi University.

---

## 🚀 Overview

This repository powers the official portfolio website of **Debashish Bordoloi**, accessible at [https://d43ash1sh.github.io/](https://d43ash1sh.github.io/). Built with the modern Next.js App Router, React 19, and Tailwind CSS v4, it showcases verified production systems, reverse engineering security audits, autonomous search engines, peer-reviewed research publications, and developer tooling integrations.

---

## 🛠️ Architecture & Core Sections

1. **Bilingual Localization (English & Assamese)**:
   - Client-side language state managed via React Context (`LanguageProvider`).
   - Persists preference locally in `localStorage` (`portfolio_lang`).
2. **Deep Systems & Engineering Showcase**:
   - **REA Reverse Engineering Audit**: Non-invasive architectural security audit of `https://apssb.online/` using REA v6.8.0, Chrome DevTools Protocol (CDP), and static AST chunk deconstruction.
   - **Agent Search Engine**: Distributed, agent-native web crawl and retrieval engine built with Python, FastAPI, Playwright Chromium worker pool, and PostgreSQL 16 + pgvector HNSW indexing.
   - **Model Context Protocol (MCP)**: Workflows integrating Context7 MCP, Stitch MCP, REA MCP, and Playwright MCP.
3. **Featured Projects**:
   - **ঞ (Nya)**: Assamese-first regional search engine with source-grounded answers ([Demo](https://nya-search.vercel.app/) · [GitHub](https://github.com/d43ash1sh/Nya)).
   - **OrganLink**: Healthcare network and organ donation platform with role-based auth ([Demo](https://organ-link-seven.vercel.app/login)).
   - **CubeCube**: 3D Rubik's cube solver with Three.js and algorithm visualizer ([Demo](https://cubecube.vercel.app/)).
   - **Adi Voice Project**: Speech corpus platform preserving indigenous Adi language ([GitHub](https://github.com/d43ash1sh/Adi-Voice-Project)).
   - **AuthHub**: GitHub portfolio analytics and telemetry dashboard ([Demo](https://debashishhub.vercel.app) · [GitHub](https://github.com/d43ash1sh/AuthHub)).
   - **ClipNinja**: Video clipping utility for YouTube timestamps ([GitHub](https://github.com/d43ash1sh/ClipNinja)).
   - **SpeedPulse**: Real-time network speed testing application ([Demo](https://speed-pulse-iota.vercel.app) · [GitHub](https://github.com/d43ash1sh/SpeedPulse)).
   - **Subz**: High-performance Bash CLI for subdomain recon via certificate transparency ([GitHub](https://github.com/d43ash1sh/subdomain_enumeration)).
4. **Academic Research & Publications**:
   - **Journal Paper**: *"Innovative host-based intrusion detection systems : Safeguarding networks in the digital Era"*, Journal of Information and Optimization Sciences (JIOS, Taru Publications, DOI: `10.47974/JIOS-1981`).
   - **Conference**: International Conference on Recent Trends in Mathematics and Computing (ICRTMC-2026), Jamia Millia Islamia, New Delhi.
5. **Interactive Developer Shell (DebOS Terminal)**:
   - Press `` ` `` (backtick) or `Esc` anywhere on the site to launch the interactive terminal shell.
   - Commands: `help`, `whoami`, `skills`, `projects`, `systems`, `rea`, `mcp`, `research`, `contact`, `clear`, `exit`.
6. **Curated Instagram Showcase**:
   - Curated grid connecting visitors to technical milestones and stories on [@debashishbordoloi007](https://www.instagram.com/debashishbordoloi007/).
7. **AI Assistant & Dual Deployment Architecture**:
   - Server-side Next.js route `/api/chat` using `@google/genai` (Gemini 2.0 Flash) with rate limiting and input validation.
   - Client-side grounded offline fallback for static hosts (such as GitHub Pages) where dynamic API routes are unavailable.

---

## 💻 Local Development

### Prerequisites

- Node.js `20.x` or higher
- npm `10.x` or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/d43ash1sh/d43ash1sh.github.io.git
cd d43ash1sh.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Checks & Build

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

---

## 📬 Connect

- **Email**: [debashishbordoloi007@gmail.com](mailto:debashishbordoloi007@gmail.com)
- **LinkedIn**: [linkedin.com/in/debashishbordoloi](https://www.linkedin.com/in/debashishbordoloi/)
- **GitHub**: [github.com/d43ash1sh](https://github.com/d43ash1sh)
- **HackerOne**: [hackerone.com/d4shh4x0r](https://hackerone.com/d4shh4x0r)
- **Bugcrowd**: [bugcrowd.com/d43ash1sh](https://bugcrowd.com/d43ash1sh)
- **X**: [x.com/d43a_io](https://x.com/d43a_io)
- **Instagram**: [instagram.com/debashishbordoloi007](https://www.instagram.com/debashishbordoloi007/)
