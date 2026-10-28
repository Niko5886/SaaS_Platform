<div align="center">

<img src="docs/screenshots/hero.webp" alt="Targo — Scaling the platform for your business" width="100%" />

# 🛰️ Targo — Scaling the Platform for Your Business

### A cinematic landing page for a modern QA & testing-infrastructure brand

A hand-built, dependency-free one-page site — a full-viewport **video hero** and a rich, multi-block **about** experience (mission, live stats, partners and a closing call-to-action), wrapped in a precise, motion-aware design system. Plain HTML, CSS and JavaScript: no framework, no bundler, no build step, so it clones and runs anywhere in seconds.

<br />

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Fonts](https://img.shields.io/badge/Quantico-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)

![Build](https://img.shields.io/badge/build-none%20·%20static-success)
![Pages](https://img.shields.io/badge/single--page-index.html-informational)
![Responsive](https://img.shields.io/badge/responsive-%E2%89%A4700px-informational)
![Status](https://img.shields.io/badge/status-ready%20to%20deploy-15BCDF)

</div>

---

## 📖 Overview

**Targo** is a conversion-focused landing page for a software **QA & testing-infrastructure** brand — _"scaling the platform for your business"_. The experience lives in a handful of small files and leans on modern CSS (`clip-path` chamfers, `mix-blend-mode` tinting, fluid `clamp()` type, `100svh` layout) with a touch of vanilla JavaScript for resilient video autoplay, bilingual switching, scroll-reveal and the mobile menu.

The flow: a **video hero** that fades cleanly behind a staircase headline, then an **about** area that opens with a cyan hue-tinted video and unfolds into **mission**, a **stats** band, a **partners** row and a **resources + join** closing — each scrolling into view.

---

## ✨ Features

| | Feature | Details |
|---|---|---|
| 🎬 | **Full-viewport video hero** | Autoplaying background video with a left-edge scrim gradient that keeps the headline crisp over any frame |
| 🪜 | **Staircase headline** | Six-line uppercase headline with a stepped indent and a cyan accent closer (`BUSINESS`) |
| 🔷 | **Chamfered CTAs** | `clip-path` cut-corner buttons with a cyan glow and a trailing accent rule — shared across both sections |
| 🎨 | **Hue-tinted media** | A `#15BCDF` overlay in `mix-blend-mode: hue` recolours the about video toward the brand accent |
| 🧩 | **Expanded about** | Mission statement, a live **stats** band, grayscale **partner** wordmarks and a **resources + join** closing — all sharing the staircase rhythm |
| ✨ | **Scroll-reveal** | Blocks fade and rise into view via `IntersectionObserver`, staggered, and fully stilled under `prefers-reduced-motion` |
| 🔁 | **Resilient autoplay** | Videos retry `play()` every second and on first interaction — always muted, rejections swallowed |
| 🍔 | **Adaptive navigation** | Desktop links + contact button swap for a hamburger-toggled stacked menu below 700px |
| 📱 | **Fully responsive** | CSS breakpoint at **700px** repositions the hero video, headline and navbar |
| ⚡ | **Zero dependencies** | No framework, no bundler, no build — three files plus an inline SVG favicon |
| 🔤 | **Custom typography** | The condensed techno display face *Quantico* (400 / 700) |
| 🔍 | **SEO & social ready** | Open Graph + Twitter card meta, `theme-color`, and a crisp SVG favicon |

---

## 🧰 Tech Stack

- **HTML5** — semantic, accessible single-page markup
- **CSS3** — custom-property design tokens, `clamp()` fluid type, `clip-path` chamfered buttons, `mix-blend-mode` tinting, `100svh` hero
- **Vanilla JavaScript (IIFE-scoped)** — resilient video autoplay (retry + gesture fallback) and the mobile menu toggle
- **[Quantico](https://fonts.google.com/specimen/Quantico)** via Google Fonts (weights 400 + 700)
- **CDN media** — the hero & about videos stream from a CDN by absolute URL

---

## 📁 Project Structure

```
.
├── index.html            # Markup: hero + about, mission, stats, partners, closing
├── css/
│   └── styles.css        # Design tokens, layout, scroll-reveal & responsive rules
├── js/
│   ├── i18n.js           # BG / EN dictionary, switcher & persistence
│   ├── main.js           # Video autoplay retry + mobile menu
│   └── reveal.js         # IntersectionObserver scroll-reveal
├── docs/
│   └── screenshots/      # README preview image
└── favicon.svg           # Brand mark
```

Everything the site needs lives in these files; the two videos are external CDN assets referenced by absolute URL.

---

## 🚀 Getting Started

No install, no build. The videos stream over HTTPS, so **serve the folder** for a production-accurate preview:

```bash
# clone
git clone https://github.com/Niko5886/SaaS_Platform.git
cd SaaS_Platform

# serve on http://localhost:8000  (pick any one)
python -m http.server 8000       # Python 3
npx serve -l 8000                # Node
php -S 127.0.0.1:8000            # PHP
```

Then open **http://localhost:8000/**.

> 💡 An internet connection is required — the hero and about videos are streamed from a CDN.

---

## 🎨 Design System

Design tokens are defined as CSS custom properties on `:root`:

| Token | Value | Role |
|---|---|---|
| `--accent` | `#15BCDF` | CTAs, accent words, video tint |
| `--accent-hover` | `#3fd0ef` | Button hover |
| `--accent-border` | `#0fa3c2` | Button border |
| `--bg` | `#F2F1F0` | Page canvas |
| `--heading` | `#2b3033` | Headings |
| `--nav-link` | `#3a3a3a` | Navigation links |
| `--body-gray` | `#6b6f72` | Body copy |
| `--ink` | `#1a1c1e` | Button text / mobile menu |
| **Font** | *Quantico*, Arial Narrow | Display + UI |

Convention: **uppercase headings** with tight tracking (`0.01em`) and leading (`0.98`), accent words in cyan.

---

## ♿ Accessibility

- Decorative videos and the scrim are marked `aria-hidden`
- The hamburger exposes `aria-expanded` / `aria-controls`, and its label toggles open/close
- Semantic landmarks throughout (`header`, `nav`, `section`, `h1`/`h2`)
- Fluid type and a clean 700px breakpoint keep the layout legible down to small screens

---

## 🚢 Deployment

The site is a static bundle — no build step, so deploys are near-instant. It drops straight onto **Netlify**, **Vercel** or **GitHub Pages**:

```bash
# Netlify CLI — publish the repo root as-is
netlify deploy --prod --dir=.
```

> To enable automatic deploys on every push, connect the repo in your host's dashboard (build command: **none** · publish directory: **repo root**).

---

## 📄 License

© 2026 **Nikolay Stoyanov**. Personal project — all rights reserved.
External media referenced by the site remains the property of its respective owners.

---

## 👤 Author

**Nikolay Stoyanov** — AI-Native Full-Stack Developer

- 🌐 Portfolio: [nikolay-ai-native-developer.netlify.app](https://nikolay-ai-native-developer.netlify.app/)
- 💻 GitHub: [@Niko5886](https://github.com/Niko5886)

---

<div align="center">

<sub>Crafted step by step — one commit at a time 🛰️</sub>

</div>
