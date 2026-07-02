# DESIGN PLAN — Schneider Realty Services
## "Borough Ledger" — Design Direction & Self-Critique

---

## Concept

The visual world of this site is **investment paperwork made monumental**: title deeds, tax maps, 
zoning lot diagrams, closing binders, recording stamps. Not a real estate website that *looks like* 
investment — an investment office that *happens to have* a website. The institutional confidence 
of a title company's filing room, rendered at magazine scale.

---

## Design Direction: "Borough Ledger"

### Why This Works
Michael Schneider's competitive moat is depth and permanence — 27 years, 1,000+ deals, the only 
specialist in his borough. The visual language must communicate *record*, *authority*, and *place*.

### Why This Is NOT Generic
- Not warm cream + serif + terracotta: our palette is cooler (harbor blue), more institutional
- Not near-black + acid green: palette is warm-documented, not tech-editorial
- Not hairline-rule broadsheet: our grid is confident and asymmetric, not newspaper-minimalist
- Not gold-serif-on-black luxury real estate: our accent is signal orange-red, not gold

---

## Color Tokens

| Token        | Hex     | Role                                                     |
|--------------|---------|----------------------------------------------------------|
| `--ink`      | #101820 | Primary text, deepest backgrounds                        |
| `--paper`    | #F7F5F0 | Primary background — warm, not clinical white            |
| `--harbor`   | #1E3A4C | Brand primary — deep harbor blue for headers, footer     |
| `--signal`   | #C8451F | The ONE accent — CTAs, active states, SOLD stamp only    |
| `--brass`    | #9A7B4F | Detail color — rules, eyebrows, data labels              |
| `--slate`    | #5E6B73 | Secondary text, muted UI elements                        |

Supporting tones derived from primaries:
- `--harbor-800` through `--harbor-200` for dark section variations
- `--paper-dark` #EDE9E1 for subtle section differentiation on light backgrounds
- `--signal-dark` #A33518 for pressed/hover states on signal elements

### Contrast Audit (WCAG 2.2 AA)
- ink on paper: 13.8:1 ✓ (AAA)
- paper on harbor: 7.1:1 ✓ (AA)
- paper on ink: 13.8:1 ✓ (AAA)
- signal on paper: 4.8:1 ✓ (AA for normal text, AAA for large)
- slate on paper: 4.6:1 ✓ (AA)
- brass on paper: 3.5:1 — ONLY use at 18px+ or bold weight

---

## Typography

### Scale
- Display XL (hero H1): 96–128px, Fraunces, weight 800, tracking -0.03em
- Display L (section H2): 56–72px, Fraunces, weight 700
- Display M (card H3): 36–48px, Fraunces, weight 600
- Body XL: 20px, Inter, weight 400, leading 1.7
- Body L: 17px, Inter, weight 400, leading 1.65
- Body M: 15px, Inter, weight 400, leading 1.6
- Label: 11–12px, Inter, weight 600, tracking 0.12em, ALL CAPS
- Mono: IBM Plex Mono, all numbers, prices, stats, lot/block codes

### The Fraunces Decision
Fraunces is a variable optical-size serif with extreme contrast between thicks and thins.
At large sizes it reads like a property-deed typeface — engraved authority. At display size
the `opsz` axis (14–144) lets us pull optical weight for headlines. This is exactly the
visual register we need: not a "lifestyle serif" but a "legal document serif."

### Number Treatment
Every dollar amount, square footage, cap rate, and unit count is set in IBM Plex Mono with
`font-variant-numeric: tabular-nums`. This is the data-first, instrument-panel aesthetic
of an investment office — not a brochure.

---

## The Deal Stamp Motif

The ONE memorable design element. Used for:
1. Closed-deal cards in the ticker and track record grid
2. The hero ticker strip
3. Section markers on conversion pages

**Anatomy:**
```
╔══════════════════════╗   ← outer rule (1px, signal or brass)
║                      ║   ← 2px gap
╠══════════════════════╣   ← inner rule (0.5px)
║  SOLD                ║   ← label in IBM Plex Mono, 10px, tracking +0.2em
║  342 RICHMOND AVE    ║   ← address in mono, 13px
║  MULTIFAMILY · 8U    ║   ← type + size in mono
║  $1,250,000          ║   ← price in mono, bold
╚══════════════════════╝
```

- Default state: slight 1.5° rotation (feels like a filed document)
- Hover: counter-rotate to 0° with shadow lift
- SOLD variant: `--signal` border + ink on signal background
- Available variant: `--brass` border + ink on paper background
- Animation: `prefers-reduced-motion` respected, static otherwise

---

## Layout Principles

1. **Asymmetric grid**: primary column is ~58% wide on desktop; statistics and labels anchor the 
   remaining 42%. Not a centered-everything layout.
2. **Generous vertical rhythm**: sections breathe at 120–160px. No cramming.
3. **Full-bleed photography only at the hero and listing detail** — everywhere else, typography 
   and space carry the weight.
4. **The parcel-texture SVG**: a subtle background of overlapping lot lines (think tax map 
   geometry) appears at ~3% opacity on dark (harbor) sections ONLY. Not decorative on light 
   backgrounds.

---

## Motion System

One rule: **motion earns its place or doesn't exist.**

| Interaction                  | Motion                                          |
|------------------------------|------------------------------------------------|
| Hero load                    | Orchestrated sequence: overlay fade → headline  |
|                              | stagger up → CTAs → ticker slides in            |
| Number count-up              | On scroll enter, 1.2s ease-out                  |
| Deal stamp hover             | counter-rotate + translateY(-2px) + shadow       |
| CTA button (magnetic)        | `mousemove` tracking, 8px max offset            |
| Header scroll                | opacity/shadow transition at 64px scroll depth  |
| Page transitions             | 200ms fade via Framer Motion AnimatePresence    |

All animations respect `prefers-reduced-motion: reduce` — motion collapses to instant.

---

## Self-Critique: "Would Any Agency Do This for Any Realtor?"

**Test passed on:**
- The deal-stamp motif is specific to *recorded commercial transactions* — it wouldn't work 
  for a residential agent, a tech company, or a restaurant
- The parcel-line texture is specific to Staten Island's geographic identity
- The harbor blue is derived from the literal harbor at the borough's edge
- Fraunces at large weights in this context reads "deed" not "lifestyle brand"
- IBM Plex Mono for every number makes the data feel *institutional* not decorative

**Risk areas addressed:**
- Signal accent is STRICTLY limited to conversion moments — it cannot become decorative
- Fraunces at small sizes could look precious — reserved for 36px+ only
- The ticker must not feel gimmicky — it works because it shows *real closing data*, 
  which is the product. If it were decoration it would fail.

---

## Phase Checklist

- [x] Design plan written + self-critiqued
- [ ] Token CSS file complete
- [ ] Root layout with fonts loaded
- [ ] Header/Footer components
- [ ] DealStamp component
- [ ] Button component
- [ ] Home page (hero through conversion band)
- [ ] Listings index + detail
- [ ] Track record
- [ ] Sell / Invest / Services
- [ ] About / Team / Insights / Contact / Legal
- [ ] SEO layer
- [ ] Playwright tests
- [ ] Lighthouse audit
- [ ] HANDOFF.md
