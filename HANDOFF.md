# HANDOFF DOCUMENT — Schneider Realty Services Website
## Client: Schneider Realty Services | Delivered: July 2026

---

## What Was Built

A production-grade commercial real estate website for Schneider Realty Services —
Staten Island's exclusive commercial investment brokerage.

### Pages
| Route | Purpose |
|-------|---------|
| `/` | Home — hero, deal ticker, stats, featured listings, specialist manifesto, asset class index, track record teaser, insights teaser, conversion band |
| `/listings` | Faceted listing grid with grid/list toggle and URL-synced filters |
| `/listings/[slug]` | Listing detail with photo, metrics table, sticky inquiry panel |
| `/track-record` | Full deal archive as deal stamps, filterable by asset type and year |
| `/sell` | Seller landing page with 4-step process + valuation request form |
| `/invest` | Investor landing page with investor list signup form |
| `/services` | Advisory services overview |
| `/about` | Firm story, career timeline, team overview |
| `/team/[slug]` | Individual broker pages |
| `/insights` | Market insights article index |
| `/insights/[slug]` | Article detail |
| `/contact` | Contact form + office info |
| `/legal/privacy` | Privacy policy |
| `/legal/fair-housing` | NY fair housing notice (legally required) |
| `/legal/sopa` | NY Standard Operating Procedures (legally required) |
| `/not-found` | Branded 404 — "This parcel isn't on the map" |

### Key Features
- **Deal stamp motif** — the signature design element, appears in ticker, track record, track record teaser, and sell page
- **Scrolling deal ticker** — closed transactions strip below the hero
- **Faceted listing filters** — asset type, status, price range with clear button
- **Four form flows** — valuation request, investor signup, listing inquiry, contact; all Zod-validated, honeypot-protected, rate-limited API routes
- **Animated stats** — count-up on scroll for the 27 / 1,000+ / $400M numbers
- **JSON-LD structured data** — on home (LocalBusiness), listings (RealEstateListing), articles (Article), team pages (Person)
- **Sitemap.xml and robots.txt** — auto-generated via Next.js
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy on all routes

---

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill in these values:

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | When live | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | When live | Default: `production` |
| `SANITY_API_READ_TOKEN` | When live | Read token from Sanity project settings |
| `SANITY_API_WRITE_TOKEN` | For lead writes | Write token — keep secret |
| `RESEND_API_KEY` | For emails | Verify `schneiderrealty.com` domain in Resend |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | For maps | Create custom dark style matching the brand |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://schneiderrealty.com` |
| `NEXT_PUBLIC_GA4_ID` | Optional | Google Analytics 4 measurement ID |

---

## Connecting Live Sanity CMS

All data currently comes from seed files in `/data/`. To switch to live Sanity:

1. Create a Sanity project at sanity.io
2. Copy the project ID and dataset name to `.env.local`
3. Open `/lib/sanity.ts` — every function has commented-out GROQ queries ready to use
4. Uncomment the `sanityClient` initialization and GROQ queries in each function
5. The schemas are in `/sanity/schemaTypes/` — import them in `sanity/index.ts` and add the Studio at `/studio`
6. Run `sanity deploy` to publish the studio

**Swap point is a single file: `/lib/sanity.ts`** — all data fetching goes through it.

---

## How to Edit Content (once Sanity is connected)

### Adding a new listing
1. Open `[your-domain]/studio`
2. Click **Listings** → **Create new listing**
3. Fill in the required fields: address, neighborhood, asset type, price, description, headline
4. Add photos (the alt text field is required for accessibility)
5. Toggle **Featured on Home Page** if you want it on the homepage grid
6. Set latitude/longitude for the map pin
7. Publish — the listing appears live immediately

### Adding a closed deal
1. Studio → **Closed Deals** → **Create**
2. Enter address, asset type, sale price, and year
3. Toggle **Price Undisclosed** if needed
4. Publish — appears in the track record grid and deal ticker

### Adding a team member
1. Studio → **Team Members** → **Create**
2. Fill in name, title, license type, bio, and profile photo
3. Toggle **Show on About page**
4. A URL is automatically generated: `/team/[their-slug]`

### Adding an article/insight
1. Studio → **Articles** → **Create**
2. Set title, excerpt, category, author, and body
3. Add a cover image
4. Publish — appears in `/insights` and the homepage teaser

### Reviewing leads (form submissions)
1. Studio → **Leads**
2. Each form submission creates a lead document with source, contact info, and inquiry details
3. Update the **Status** field as you work through them (new → contacted → qualified → closed)

---

## Image Swap List

All current images are Unsplash placeholders. Swap these with real photography:

| Location | Current placeholder | Replace with |
|----------|--------------------|----|
| Hero (`/`) | NYC skyline placeholder | Cinematic photo of a Staten Island commercial corridor (Victory Blvd, Richmond Ave, etc.) |
| Listing cards | Generic building photos | Property-specific photography |
| About/team photos | Generic professional portraits | Real photos of Michael and Denise |
| Insights cover images | Generic real estate photos | Deal-specific or SI market photography |

**Process:** All images in the mock data are in `/data/listings.ts` and `/data/teamMembers.ts`. Once Sanity is connected, upload real images through the studio. The `next/image` component with `remotePatterns` in `next.config.ts` already allows `cdn.sanity.io`.

---

## Deployment (Vercel)

1. Push the repo to GitHub
2. Import to Vercel — it auto-detects Next.js 15
3. Add all environment variables in the Vercel dashboard
4. Set production domain to `schneiderrealty.com`
5. Enable **Vercel Analytics** in the project settings
6. The build runs `next build --turbopack` — outputs 39 static/SSG pages

---

## Phase 2 Priorities (Recommended Next Steps)

| Priority | Feature | Notes |
|----------|---------|-------|
| 🔴 High | **Real photography** | No other change has more visual impact |
| 🔴 High | **Sanity CMS connection** | So Michael can add listings independently |
| 🔴 High | **Domain + Resend email setup** | Forms currently log to console without RESEND_API_KEY |
| 🟡 Medium | **Mapbox integration** | Several map placeholder divs need the `NEXT_PUBLIC_MAPBOX_TOKEN` to render |
| 🟡 Medium | **OM download gating** | `/listings/[slug]` has an OM download slot — wire it to upload in Sanity + email gate |
| 🟡 Medium | **CRM webhook** | Add a Zapier/Make webhook from leads → CRM (HubSpot, Pipedrive, etc.) |
| 🟡 Medium | **Email drip for investor list** | Automatically notify investor list subscribers when matching listings go live |
| 🟢 Low | **IDX/RETS feed** | Staten Island Board of Realtors MLS feed for broader listing coverage |
| 🟢 Low | **EB-5 project page** | Dedicated page for EB-5 investment opportunities |
| 🟢 Low | **Deal map on track record** | Replace stamp grid with Mapbox map view of all closings |

---

## Development Commands

```bash
# Start dev server
cd schneider-realty-services
npm run dev

# Production build (verify before deploy)
npm run build

# ESLint
npm run lint
```

---

## Contact for Development Questions

This site was built by [your agency]. For development questions, technical issues, or feature additions, contact: [developer contact].

For content and business questions: Michael Schneider · 347-205-2882 · michael@schneiderrealty.com
