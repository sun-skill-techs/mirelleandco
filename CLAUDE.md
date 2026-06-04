# CLAUDE.md — Mirelle & Co Prototype

French romantic affordable luxury jewellery brand. South African market (ZAR). Vanilla React (no JSX transpiler). Single-page prototype.

---

## Project Map

- [styles.css](styles.css) — full design system: tokens, typography, layout, components, responsive
- [ui.jsx](ui.jsx) — shared primitives (`Icon`, `Slot`, `HeartRule`, `useReveal`); exported via `Object.assign(window,{…})`
- [data.js](data.js) — all content + product data at `window.MIRELLE`
- [sections.jsx](sections.jsx) — all page sections in render order
- [overlays.jsx](overlays.jsx) — `CartDrawer`, `MobileMenu`, `SearchOverlay`, `WhatsApp`, `Toasts`
- [app.jsx](app.jsx) — root `App` component, all state, `ReactDOM.createRoot` mount
- [assets/](assets/) — logos: `logo-espresso.png`, `logo-gold.png`, `logo-mark.png`, `logo-mark-espresso.png`

**Script load order in HTML (never change):** `ui.jsx` → `data.js` → `sections.jsx` → `overlays.jsx` → `app.jsx`

---

## Critical Rules

- **No JSX** — all markup is `React.createElement(...)`. Never write angle-bracket JSX syntax.
- **Load order is sacred** — globals must exist before consumers. Reordering `<script>` tags breaks everything.
- **`window.MIRELLE` is the data source** — components read it directly; no prop-drilling for data.
- **Prices are strings** (`"R 420"`) — `overlays.jsx` parses via `priceNum()`. Match this format in new products.
- **`Slot` is a placeholder** — not an `<img>`. Swap for real `<img>` tags when photography is ready.
- **`.tone-*` classes must exist in CSS** — adding a new tone requires a CSS rule AND the matching string in data.
- **`useReveal()` called once in `App`** — applies globally; just add `.reveal` class to any new element.

---

## Design Tokens

### Colors (`:root` in `styles.css`)
| Token | Role |
|-------|------|
| `--porcelain` | Primary page background |
| `--cream` | Alternate warm bg, `.slot` default |
| `--blush` | Soft blush accent |
| `--taupe` | Parisian taupe |
| `--nude` | Dusty rose |
| `--espresso` | Primary text + dark UI |
| `--espresso-deep` | Announcement bar bg |
| `--gold` | Antique gold (kickers, dividers) |
| `--gold-deep` | Hover gold, CTA emphasis |
| `--ink-soft` | Muted / secondary text |
| `--line` | Borders at 14% opacity |
| `--line-soft` | Borders at 8% opacity |

### Typography
- `--serif` → `'Cormorant Garamond', Georgia, serif` — headings, display
- `--sans` → `'Jost', 'Century Gothic', sans-serif` — body, nav, buttons
- `--mono` → `'IBM Plex Mono', monospace` — slot labels only

### Layout
- `--maxw: 1440px` — max content width (via `.wrap`)
- `--gutter: clamp(20px, 5vw, 80px)` — horizontal padding

---

## Components

### `ui.jsx` globals
- `Icon({ name, className, style, filled })` — SVG icon. Names: `search user bag heart caret close minus plus arrow star shield card return truck whatsapp insta tiktok pin image check menu ring`
- `Slot({ tone, label, className, children })` — image placeholder. `tone`: `tone-cream | tone-blush | tone-taupe | tone-nude`
- `HeartRule()` — decorative divider
- `useReveal()` — IntersectionObserver; animate `.reveal` elements at 12% threshold

### `sections.jsx`
- `Announce` — rotating bar; reads `window.MIRELLE.announcements`
- `Header` — sticky + megamenu; props: `{ cartCount, onCart, onSearch, onMenu }`
- `Hero` — full-height hero; prop: `{ onShop }`
- `Explore` — category circles; reads `window.MIRELLE.categories`; prop: `{ onShop }`
- `Featured` — tabbed product grid (New Arrivals / Best Sellers / Coming Soon); props: `{ onAdd, onShop }`
- `Experience`, `Assurances`, `Testimonials`, `Story`, `Newsletter`, `Footer` — no props

### `overlays.jsx`
- `CartDrawer` — slide-in; props: `{ open, items, onClose, onQty, onRemove }`
- `MobileMenu` — fullscreen nav; props: `{ open, onClose }`
- `SearchOverlay` — search panel; props: `{ open, onClose }`
- `WhatsApp` — floating button (no props)
- `Toasts` — notification stack; prop: `{ toasts }` (`[{ id, msg }]`)

---

## State (`app.jsx`)

All state in `App`, passed as props. No context.

| State | Type | Controls |
|-------|------|----------|
| `cart` | `[{ id, name, mat, price, tone, qty }]` | `CartDrawer`, header count |
| `cartOpen` | bool | `CartDrawer` |
| `menuOpen` | bool | `MobileMenu` |
| `searchOpen` | bool | `SearchOverlay` |
| `toasts` | `[{ id, msg }]` | `Toasts`; auto-clear at 2600ms |

Escape key closes all overlays. Backdrop click closes respective overlay.

---

## Data Shape (`window.MIRELLE`)

```
announcements: string[]
categories:    [{ name, tone, label }]          // tone = "tone-*"
products:      { "Tab Name": [Product] }
  Product:     { id, name, mat, price, tone, alt, badge, badgeClass?, was?, soon? }
testimonials:  [{ quote, by, loc }]
assurances:    [{ icon, title, body }]           // icon = Icon name string
story:         [{ tone, big?, likes, label }]
```

---

## Quick Change Reference

| Task | File |
|------|------|
| Brand colors | `styles.css` `:root` |
| Announcement text | `data.js` → `announcements` |
| Add/edit products | `data.js` → `products` |
| New page section | `sections.jsx` + wire in `app.jsx` |
| New overlay/drawer | `overlays.jsx` + state in `app.jsx` |
| New icon | `ui.jsx` → `ICONS` object |
| Swap logo | `assets/` (keep filename) or update `src` in `Header` |
| Cart price logic | `overlays.jsx` → `priceNum()` / `fmt()` |
| Free-shipping threshold | `overlays.jsx` → `FREE_SHIP` (currently R1500) |

---

## Naming Conventions

- **CSS:** kebab-case, BEM-lite (`.card`, `.card-media`, `.card-badge`)
- **Tone modifiers:** always `tone-{color}` — `tone-cream`, `tone-blush`, `tone-taupe`, `tone-nude`
- **Components:** PascalCase, module-level functions, no `export` (globals via `window` in `ui.jsx`)
- **Product IDs:** `n1–n6` (New), `b1–b6` (Best Sellers), `c1–c6` (Coming Soon)
