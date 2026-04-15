# Firewall Flamingos — Technical Blog Design Spec

## Overview

Static technical blog built with Astro, featuring two content sections (Blog and Knowledge Base), global search with filters, and a dark theme with animated particles background. Deployed to GitHub Pages.

## Tech Stack

- **Framework:** Astro (static site generator, Content Collections, MDX support)
- **Search:** Pagefind (static search index generated at build time, client-side)
- **Particles:** tsparticles (lightweight, tree-shakeable, loaded as Astro island)
- **Deployment:** GitHub Pages via GitHub Actions
- **Language:** TypeScript
- **Styling:** CSS (global stylesheet, scoped component styles)

## Site Structure

### Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero with search, Blog and KB cards |
| `/blog` | Blog listing — all research articles, chronological |
| `/blog/[slug]` | Single blog post |
| `/kb` | Knowledge Base listing — all guides and cheat sheets |
| `/kb/[slug]` | Single KB article |
| `/search` | Search page with section/tag filters |
| `/tags/[tag]` | Articles filtered by tag (both Blog and KB) |
| `/about` | Author page |

### File Structure

```
blog_fwflamingos/
├── src/
│   ├── components/
│   │   ├── Header.astro          # Site header with navigation
│   │   ├── Footer.astro          # Site footer
│   │   ├── ParticlesBg.astro     # tsparticles island (client:load)
│   │   ├── SearchInput.astro     # Gradient-border search input
│   │   ├── SearchFilters.astro   # Section + tag filter controls
│   │   ├── ArticleList.astro     # Compact article link list
│   │   ├── TagList.astro         # Inline tag display
│   │   └── TableOfContents.astro # Sticky sidebar TOC
│   ├── content/
│   │   ├── blog/                 # Markdown files for Blog
│   │   ├── kb/                   # Markdown files for Knowledge Base
│   │   └── config.ts             # Content Collections schemas (Zod)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Shell: head, particles bg, header, footer
│   │   └── ArticleLayout.astro   # Article: breadcrumb, meta, content, TOC
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── kb/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── search.astro
│   │   ├── tags/
│   │   │   └── [tag].astro
│   │   └── about.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── favicon.svg
│   └── avatar.jpg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Content Schemas

### Blog Collection

```yaml
---
title: "Article Title"           # required, string
date: 2026-04-10                 # required, date (determines sort order)
category: "Reverse Engineering"  # required, string
tags: ["firmware", "IoT"]        # required, string[]
description: "Short summary..."  # required, string
---
```

Reading time is computed automatically at build time based on word count.

### Knowledge Base Collection

```yaml
---
title: "Guide Title"             # required, string
tags: ["debugging", "arm"]       # required, string[]
description: "Short summary..."  # required, string
lastUpdated: 2026-04-08          # required, date (shown instead of publish date)
---
```

No `category` field — KB articles are organized by tags only.

## Visual Design

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0f0b1e` | Page background |
| `--bg-card` | `#0f0b1e` | Card inner background (transparent feel) |
| `--text-primary` | `#f1f5f9` | Headings, titles |
| `--text-secondary` | `#e2e8f0` | Body text, article links |
| `--text-muted` | `#94a3b8` | Secondary text, nav links |
| `--text-dim` | `#64748b` | Dates, metadata, placeholders |
| `--accent` | `#a855f7` | Primary accent (purple) |
| `--accent-secondary` | `#6366f1` | Gradient midpoint (indigo) |
| `--accent-tertiary` | `#ec4899` | Gradient endpoint (pink) |
| `--border-subtle` | `rgba(168,85,247,0.1)` | Subtle dividers |
| `--border-card` | `rgba(168,85,247,0.3) → rgba(99,102,241,0.12)` | Card gradient border |

### Typography

- Font family: system sans-serif stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', ...`)
- Code blocks: monospace stack (`'Fira Code', 'JetBrains Mono', monospace`)
- Site title: 28px, weight 800
- Section headers: 14px, weight 600
- Article titles (list): 13px, regular
- Body text: 14px, line-height 1.7

### Interactive Effects

**Search input:** Animated rotating `conic-gradient` border (purple -> indigo -> pink -> purple). Inspired by uiverse.io/adamgiebl/hot-cat-14.

**Section cards (Blog, KB on homepage):** Gradient border (`linear-gradient` from purple to indigo). On hover: glow effect — blurred gradient shadow behind the card (filter: blur(10px), opacity transition).

**Navigation links:** Grey by default (`#94a3b8`), purple on hover (`#a855f7`). Active page has purple underline (2px solid).

**Section headers ("Blog -- Latest", "Knowledge Base -- Recent"):** Grey by default. On hover: gradient text fill (purple -> indigo -> pink) via `background-clip: text`. Clickable — link to respective section page.

**Article links:** Light grey (`#e2e8f0`) by default, purple (`#a855f7`) on hover. Clickable.

**Tags:** Purple text with subtle border. On hover: background fill `rgba(168,85,247,0.1)`.

**Social links (About page):** Grey with SVG icons, purple on hover.

### Particles Background

- Library: tsparticles (loaded as Astro island with `client:load`)
- Position: `fixed`, covers entire viewport, behind all content (`z-index: -1`)
- Particle count: 30-40 (performance-conscious)
- Particle color: `#a855f7` (accent purple), low opacity (~0.3)
- Movement: slow, random drift
- Links between particles: enabled, subtle (`rgba(168,85,247,0.05)`)
- Interactivity: none (purely decorative, no mouse interaction)

## Page Layouts

### Homepage (`/`)

1. **Header** — logo text "Firewall Flamingos" (left), nav links Home/Blog/Knowledge Base/About (right)
2. **Hero** — centered site title, subtitle "Security Research & Technical Knowledge", search input with animated gradient border
3. **Two-column section** — Blog card (left) and KB card (right), each with:
   - Section header (grey, gradient on hover, clickable)
   - "View all ->" link
   - Compact article list (title + date for Blog, title + primary tag for KB)
   - Glow-border card wrapper
4. **Footer** — minimal

### Article Page (`/blog/[slug]`, `/kb/[slug]`)

1. **Header** — same as homepage, active section highlighted
2. **Breadcrumb** — Section / Category (Blog) or Section (KB)
3. **Article header** — title, date + reading time, tags
4. **Two-column content** — article body (left, ~75%), sticky Table of Contents sidebar (right, ~25%)
5. **Article body** — rendered Markdown with styled headings, paragraphs, code blocks, lists, images
6. **Footer**

### Search Page (`/search`)

1. **Header**
2. **Search input** — gradient border, centered, larger than homepage version
3. **Section filter** — All / Blog / Knowledge Base toggle buttons
4. **Tag filter** — row of clickable tag pills, populated from all existing tags
5. **Results** — count label, then list of results each showing: section badge, date, clickable title, description with highlighted matches, tags
6. **Footer**

### About Page (`/about`)

1. **Header** — About link active
2. **Centered card** — avatar with gradient ring, name, role, bio paragraph, social links (GitHub, LinkedIn, Email with SVG icons)
3. **Footer**

### Blog/KB Listing Pages (`/blog`, `/kb`)

1. **Header**
2. **Page title** — "Blog" or "Knowledge Base"
3. **Article list** — same compact format as homepage cards but full list, with pagination if needed
4. **Footer**

### Tag Page (`/tags/[tag]`)

1. **Header**
2. **Tag title** — showing the tag name
3. **Article list** — all articles (Blog + KB) with that tag, grouped by section
4. **Footer**

## Search (Pagefind)

- Pagefind runs after Astro build: `astro build && npx pagefind --site dist`
- Articles are indexed with data attributes for filtering:
  - `data-pagefind-filter="section:Blog"` or `data-pagefind-filter="section:KB"`
  - `data-pagefind-meta="tag:firmware,reverse-engineering"`
- Custom search UI (not Pagefind's default widget) styled to match the site design
- Search results show highlighted text matches
- Filters narrow results by section and/or tags

## Deployment

- GitHub Actions workflow triggered on push to `main`
- Steps: checkout -> install deps -> `astro build` -> `npx pagefind --site dist` -> deploy to GitHub Pages
- URL: `<username>.github.io/blog_fwflamingos` (or custom domain later)

## Content Language

All site content, UI labels, navigation, and metadata are in English.
