# Secure Vibe Coding

> **A Practical Application Security Field Guide & Interactive Motion Experience for AI-Assisted Development.**  
> Move beyond superficial agreement and AI hallucinations: engineer secure software from commit zero.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/Motion-GSAP_3-88CE02?style=flat&logo=greensock)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Smooth_Scroll-Lenis-black)](https://github.com/darkroomengineering/lenis)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 🧭 Overview

AI tools (Cursor, Copilot, Claude, ChatGPT) make building software faster than ever. But code that runs is not necessarily code that is safe.

**Secure Vibe Coding** is an open field guide and interactive toolkit that teaches developers, cybersecurity learners, and AI builders how to:
1. Recognize common vulnerability patterns in AI-generated code (IDOR, SQLi, Prompt Injection, SSRF, Hardcoded Secrets).
2. Enforce evidence-based security through the **No Yes-Man / Evidence-Integrity Protocol**.
3. Interactively simulate vulnerability fusion through real-time physics and retro telemetry.
4. Audit local codebases with free, automated SAST/DAST tools and verify fixes with reproducible negative tests.

---

## ✨ Key Features & Architecture

### 🛡️ 1. No Yes-Man / Evidence-Integrity Protocol
* **Operating Modes:** Explicit operational state machine dividing work into **Mode A: Planning** (read-only discovery & threat modeling), **Mode B: Implementation** (minimal verified changes), and **Mode C: Auditing** (independent verification).
* **8 Staged Approval Gates:** Sequential execution pipeline from Stage 0 (Scope & Auth) to Stage 7 (Final Closure), with clear checkpoints for human sign-off on sensitive actions.
* **Evidence Labeling:** Mandatory attribution on all security assertions (`[VERIFIED]`, `[OBSERVED]`, `[INFERRED]`, `[ASSUMPTION]`, `[UNVERIFIED]`, `[CONTRADICTED]`, `[BLOCKED]`).
* **Consistent Risk Scoring:** Qualitative `Likelihood (1–5) × Impact (1–5)` formula with confidence separation.
* **One-Click Prompts:** Pre-formatted production system prompts for Claude Projects, ChatGPT Custom GPTs, Cursor Rules, or Antigravity agents.

### 🧪 2. Interactive Threat Fusion Core (Metaballs Physics)
* A real-time 2D fluid simulation demonstrating how isolated weaknesses (`IDOR`, `Auth Bypass`, `Prompt Injection`, `SSRF`, `Secrets Leak`) coalesce into critical exploit paths.
* Dynamic cursor attraction and proximity-based fluid bridges rendered on a high-performance Canvas.

### 👾 3. 8-Bit Security Arcade & Retro CRT Telemetry
* Animated 16×16 pixel guardian daemon sprite.
* Interactive 8-bit memory scanner and vulnerability telemetry simulator.
* Toggleable retro CRT scanline shader overlay with phosphor curvature styling.

### 🌐 4. 3D Neural Mesh Background
* Continuous 3D WebGL particle network powered by Three.js with additive blending and dynamic synaptic connection lines.
* Interactive 3D mouse parallax tracking the cursor with exponential camera damping.
* Strict memory management and WebGL context disposal on component unmount.

### 🚀 5. Inertial Motion & Animation Suite
* **Lenis Smooth Scroll:** Momentum-based scrolling with custom exponential easing, intra-page anchor interpolation, and synchronization with the GSAP ticker.
* **GSAP ScrollTrigger:** Staggered hero entrance, persistent floating 3D code preview card, and scroll-triggered section reveals.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router) + React 19
* **Styling:** Tailwind CSS v4 with OKLCH emerald dark theme palette
* **Graphics & 3D:** Three.js + HTML5 Canvas
* **Animation & Scrolling:** GSAP 3 (ScrollTrigger) + Lenis
* **UI Primitives:** Radix UI (`@radix-ui/react-tabs`, `dialog`, `sheet`, `tooltip`) + Lucide Icons
* **Code Highlighting:** Shiki syntax highlighter (`github-dark-dimmed`)
* **Typography:** Geist Sans + Geist Mono

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.x or newer
* npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rizzzabh-06/secure-vibe-coding.git

# Navigate to the project directory
cd secure-vibe-coding

# Install dependencies
npm install --legacy-peer-deps
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Validate types and generate optimized static pages
npm run build

# Start production server
npm run start
```

---

## 📂 Repository Structure

```
├── app/
│   ├── globals.css              # Tailwind v4 theme, OKLCH variables, scanline utility
│   ├── layout.tsx               # Root layout with Lenis & 3D Neural Background
│   └── page.tsx                 # Main application landing page with GSAP triggers
├── components/
│   ├── effects/
│   │   ├── gsap-animator.tsx        # GSAP timeline & ScrollTrigger bindings
│   │   ├── metaball-threat-core.tsx # Interactive fluid metaballs threat simulation
│   │   ├── neural-background.tsx    # Three.js 3D WebGL particle network
│   │   └── pixel-cyber-arcade.tsx   # 8-bit animated sprite & CRT scanline mode
│   ├── guide/
│   │   ├── hero.tsx                 # Hero section with interactive diff preview
│   │   ├── vulnerabilities-section.tsx # OWASP & AI flaw handbook
│   │   ├── lab-section.tsx          # Step-by-step broken access control lab
│   │   ├── tools-section.tsx        # SAST/DAST tooling directory
│   │   ├── ai-rules-section.tsx     # Section 05: Protocol & AI rules host
│   │   ├── protocol-tabs.tsx        # Interactive 8-stage gate & mode visualizer
│   │   ├── checklist-section.tsx    # Pre-deployment audit checklist
│   │   └── site-nav.tsx             # Responsive navigation with active tracking
│   ├── providers/
│   │   └── smooth-scroll-provider.tsx # Lenis smooth scroll provider + GSAP ticker
│   └── ui/                          # Radix UI primitives (tabs, sheets, buttons)
└── lib/
    ├── content/
    │   ├── guide.ts                 # Lab code examples & scanner limits
    │   ├── protocol.ts              # Staged gates, operating modes & full protocol
    │   ├── sections.ts              # Section metadata & index keys
    │   └── vulnerabilities.ts       # Detailed vulnerability definitions
    └── utils.ts                     # Class variance and Tailwind merge utilities
```

---

## 📜 Non-Negotiable Operating Principles

1. **Evidence Over Agreement:** Never confuse a plausible explanation, a passing test, or an AI assertion with verified security.
2. **Explicit Trust Boundaries:** Enforce authorization server-side on every protected resource and operation.
3. **No Fabricated Verification:** Every material claim must be accompanied by explicit evidence: `[VERIFIED]`, `[OBSERVED]`, or `[CONTRADICTED]`.

---

## 📄 License

Distributed under the [MIT License](LICENSE).
