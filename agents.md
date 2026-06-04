# agents.md — Mirelle & Co
_French romantic affordable luxury jewellery brand. South African market (ZAR). Vanilla React (no JSX transpile — all `React.createElement`). Single-page prototype rendered into `#root`._

---

## File Map
- `styles.css` — entire design system: tokens, typography, layout, all component styles, responsive
- `ui.jsx` — shared primitives: `Icon`, `Slot`, `HeartRule`, `useReveal` hook; exported via `Object.assign(window,{…})`
- `data.js` — all content + product data at `window.MIRELLE`
- `sections.jsx` — all page sections: `Announce`, `Header`, `Hero`, `Explore`, `Featured`, `Experience`, `Assurances`, `Testimonials`, `Story`, `Newsletter`, `Footer`
- `overlays.jsx` — `CartDrawer`, `MobileMenu`, `SearchOverlay`, `WhatsApp`, `Toasts`
- `app.jsx` — root `App` component, state hub, `ReactDOM.createRoot` mount
- `assets/` — logos: `logo-espresso.png` (dark header), `logo-gold.png`, `logo-mark.png`, `logo-mark-espresso.png`
- `uploads/` — brand reference images (not served directly)

**Load order in HTML (must not change):** `ui.jsx` → `data.js` → `sections.jsx` → `overlays.jsx` → `app.jsx`

---

## Design Tokens (`:root` in `styles.css`)

### Colors
| Token | Role |
|-------|------|
| `--porcelain` | Primary page background |
| `--cream` | Alternate warm background, `.slot` default |
| `--blush` | Soft blush accent, `.tone-blush` slot |
| `--taupe` | Parisian taupe, `.tone-taupe` slot |
| `--nude` | Dusty rose, `.tone-nude` slot |
| `--espresso` | Primary text + dark UI elements |
| `--espresso-deep` | Announcement bar bg, deeper dark |
| `--gold` | Antique gold accent (kickers, dividers) |
| `--gold-deep` | Hover state gold, CTA emphasis |
| `--warmgrey` | Subtle grey |
| `--charcoal` | Soft charcoal alternative |
| `--ink` | Body text (alias for `--espresso`) |
| `--ink-soft` | Muted / secondary text |
| `--line` | Borders at 14% opacity |
| `--line-soft` | Borders at 8% opacity |

### Typography
- `--serif` → `'Cormorant Garamond', Georgia, serif` — headings, display, editorial
- `--sans` → `'Jost', 'Century Gothic', sans-serif` — body, nav, labels, buttons
- `--mono` → `'IBM Plex Mono', monospace` — slot labels only

### Spacing / Layout
- `--maxw: 1440px` — max content width (apply via `.wrap`)
- `--gutter: clamp(20px, 5vw, 80px)` — horizontal page padding
- `--shadow-soft`, `--shadow-card` — standard elevation tokens

---

## Typography Classes
| Class | Use |
|-------|-----|
| `.kicker` | Small uppercase gold label (section category label) |
| `.display` | Large serif display type |
| `.serif` | Serif font-family helper |
| `.muted` | `--ink-soft` color helper |
| `h2.section-title` | Standard section heading (serif, fluid `2–3.1rem`) |
| `.heart-rule` | Decorative divider with heart icon + gold lines |

---

## Component Inventory

### `ui.jsx` (window globals)
- `Icon({ name, className, style, filled })` — SVG icon; names: `search user bag heart caret close minus plus arrow star shield card return truck whatsapp insta tiktok pin image check menu ring`
- `Slot({ tone, label, className, children })` — image placeholder; `tone` = `tone-cream|tone-blush|tone-taupe|tone-nude`
- `HeartRule()` — decorative divider
- `useReveal()` — IntersectionObserver hook; add `.reveal` class to any element to animate in at 12% threshold

### `sections.jsx`
- `Announce` — rotating announcement bar; reads `window.MIRELLE.announcements`
- `Header` — sticky header with megamenu; props: `{ cartCount, onCart, onSearch, onMenu }`
- `Hero` — full-height hero with scrim overlay; prop: `{ onShop }`
- `Explore` — category circles grid; reads `window.MIRELLE.categories`; prop: `{ onShop }`
- `Featured` — tabbed product grid (New Arrivals / Best Sellers / Coming Soon); props: `{ onAdd, onShop }`
- `Experience`, `Assurances`, `Testimonials`, `Story`, `Newsletter`, `Footer` — no props

### `overlays.jsx`
- `CartDrawer` — slide-in drawer; props: `{ open, items, onClose, onQty, onRemove }`
- `MobileMenu` — fullscreen mobile nav; props: `{ open, onClose }`
- `SearchOverlay` — search panel; props: `{ open, onClose }`
- `WhatsApp` — floating WhatsApp button (no props)
- `Toasts` — toast notification stack; prop: `{ toasts }` (`[{ id, msg }]`)

---

## State Architecture (`app.jsx`)
All state lives in `App`. Nothing shared via context — passed as props.

| State | Type | Controls |
|-------|------|----------|
| `cart` | `[{ id, name, mat, price, tone, qty }]` | `CartDrawer`, cart count in `Header` |
| `cartOpen` | bool | `CartDrawer` open/close |
| `menuOpen` | bool | `MobileMenu` open/close |/usa
| `searchOpen` | bool | `SearchOverlay` open/close |
| `toasts` | `[{ id, msg }]` | `Toasts` display; auto-clear at 2600ms |

Escape key closes all three overlays. Overlay backdrop click closes respective overlay.

---

## Data Shape (`window.MIRELLE` in `data.js`)
```
announcements: string[]
categories:    [{ name, tone, label }]   // tone = "tone-*" CSS class
products:      { "Tab Name": [Product] }
  Product:     { id, name, mat, price, tone, alt, badge, badgeClass?, was?, soon? }
testimonials:  [{ quote, by, loc }]
assurances:    [{ icon, title, body }]   // icon = Icon name string
story:         [{ tone, big?, likes, label }]
```

---

## Naming Conventions
- **CSS classes:** kebab-case, BEM-lite (`.card`, `.card-media`, `.card-badge`), no prefixes
- **Tone modifiers:** always `tone-{color}` — `tone-cream`, `tone-blush`, `tone-taupe`, `tone-nude`
- **Components:** PascalCase functions, defined at module level, no `export` (globals via `window` in ui.jsx)
- **Sections:** one function per section, placed in `sections.jsx` in page render order
- **Product IDs:** `n1–n6` (New), `b1–b6` (Best Sellers), `c1–c6` (Coming Soon)

---

## Change Guide
| Task | File(s) |
|------|---------|
| Change brand colors | `styles.css` `:root` tokens |
| Add/edit announcement text | `data.js` → `announcements` array |
| Add/edit products | `data.js` → `products` object (add tab or add to existing array) |
| Add page section | `sections.jsx` (new fn) + wire into `app.jsx` `<main>` |
| Add overlay/drawer | `overlays.jsx` (new fn) + state in `app.jsx` |
| Add icon | `ui.jsx` → `ICONS` object (SVG path string) |
| Change logo | `assets/` (swap file, keep filename) or update `src` in `Header` |
| Edit cart price logic | `overlays.jsx` → `priceNum()` / `fmt()` helpers |
| Edit free-shipping threshold | `overlays.jsx` → `FREE_SHIP` constant (currently R1500) |

---

## Gotchas
- **No JSX transpiler** — all markup is `React.createElement(...)`. Never write JSX angle-bracket syntax.
- **File load order is critical** — `ui.jsx` must load before `sections.jsx`/`overlays.jsx`; `data.js` before sections. Changing `<script>` order in HTML will break globals.
- **`window.MIRELLE` is the data source** — components read it directly; no props drilling for data.
- **`useReveal()` must be called once** — called in `App`, applies to all `.reveal` elements globally. Adding `.reveal` to new elements works automatically.
- **Slot is a placeholder, not an `<img>`** — actual product images are not yet implemented. Replace `Slot` with `<img>` when real photography is ready.
- **Prices are strings** (e.g., `"R 420"`) — `overlays.jsx` uses `priceNum()` to parse. Add new products in the same format or update `priceNum()`.
- **`.tone-*` classes must exist in CSS** — adding a new tone requires both a CSS rule in `.slot.tone-*` and using the matching string in data/components.
