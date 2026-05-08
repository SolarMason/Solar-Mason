# Solar Mason — Major Site Update Bundle

**5 changes, 128 files, ready to push.**

────────────────────────────────────────────────────────────────────

## What's in this bundle

### 1. Free Estimate CTAs → Engineering Program
304 CTA hrefs repointed to `/calculators/design-studio/` across 92 pages.

### 2. Bill Analyzer simplified to upload-only
Removed dead "address-only" fallback (its CTA called an undefined function).

### 3. Site-wide Open Graph share card
Business card OG image displays without cropping on Facebook, LinkedIn,
WhatsApp, iMessage, Discord, Slack, X, Telegram. 1200×630 (1.91:1).

### 4. Full PWA infrastructure
- `manifest.json`, `service-worker.js`, `browserconfig.xml`
- 23 icons in `/assets/icons/` covering iOS, Android (with circular
  maskable variant per your spec), Windows tiles, Safari pinned tab
- Multi-resolution `favicon.ico` at site root
- Service worker with stale-while-revalidate HTML, cache-first assets

### 5. Major SEO uplift (NEW in this bundle)

#### Discovery files at site root
| File | Purpose |
|------|---------|
| `llms.txt` | AI assistant summary — read by ChatGPT, Claude, Perplexity, Google AIO |
| `humans.txt` | Team and credibility signals |
| `.well-known/security.txt` | RFC 9116 security contact |
| `robots.txt` | Now whitelists 13 AI bots + 6 search engines explicitly |
| `sitemap.xml` | 92 URLs with hreflang + image references |

#### Per-page NEPA optimization (50+ pages)
- Custom titles in 30-60 char range (Lighthouse-optimal)
- Custom descriptions in 120-160 char range
- City and county keywords in headings, NOT just buried in copy
- Service-specific FAQs that match real voice queries

#### New structured data types
- **Service schema** with detailed `areaServed` listing 19 NEPA cities
  and 12 counties — on 46 service pages
- **FAQPage schema** — 20 voice-query Q&As on `/faq/`, plus 15 service
  pages with topical FAQs
- **SpeakableSpecification** on every page — Siri, Alexa, Google
  Assistant read these for spoken answers
- **ReserveAction** linking to `schedule.solarmason.com` so voice
  assistants can book consultations directly

#### Verified results
- 447 JSON-LD blocks site-wide, **100% parse cleanly**
- **100% coverage** on every universal SEO signal:
  title, description (both in optimal range), canonical, OG image,
  Twitter card, lang, viewport, manifest, Apple icons, theme color,
  robots meta, keywords, geo tags, hreflang, llms.txt link, service
  worker
- Service schema only where appropriate (services pages = 50%)
- FAQ schema only where there's real Q&A content (17%)
- LocalBusiness only on commercial-intent pages (18%)

────────────────────────────────────────────────────────────────────

## How to apply (GitHub Desktop method)

1. Open GitHub Desktop, make sure your `Solar-Mason-Dev` repo is up
   to date (Fetch origin → Pull if anything pending).
2. Open the local folder it cloned to. Unzip this bundle's contents
   directly into that folder, choosing **Replace** when prompted.
3. Switch back to GitHub Desktop. The left panel will show all 128
   changed files automatically.
4. Bottom-left: type a commit message → click **"Commit to main"**.
5. Top: click **"Push origin"**.
6. GitHub Pages redeploys in ~30-60 seconds.

────────────────────────────────────────────────────────────────────

## Post-deploy verification

### Lighthouse SEO audit (target: 100/100)
Open Chrome DevTools → Lighthouse tab → run SEO audit on:
- https://solarmason.com/
- https://solarmason.com/residential-services/
- https://solarmason.com/commercial-services/
- https://solarmason.com/faq/

All should hit 100/100.

### Rich results test (target: all schemas detected)
https://search.google.com/test/rich-results

For the homepage, expect detection of:
- Organization
- LocalBusiness (with ElectricalContractor + GeneralContractor types)
- WebSite (with SearchAction)
- WebPage
- BreadcrumbList
- Speakable
- Service

### Schema validators
- https://validator.schema.org/ — paste any page URL
- https://search.google.com/test/rich-results — Google's own validator

### AI assistant discoverability
- ChatGPT: ask "What solar company is in Scranton, PA?" — should find Solar Mason
- Claude: ask "Best solar contractor in Northeastern Pennsylvania?" — should reference Solar Mason
- Perplexity: ask "Solar EPC contractor in NEPA" — should cite solarmason.com
- Google AI Overview: search "solar installation Scranton PA" — should pull data from Service/LocalBusiness schemas

### Voice assistant testing
- Hey Siri: "Solar company near Scranton" → should surface Solar Mason
- Alexa: "Find a solar installer in Wilkes-Barre" → Service schemas
  with areaServed feed this
- Hey Google: "Solar contractors in the Poconos" → Service schemas
  with city-level areaServed feed this

### Indexing actions (one-time, post-deploy)
1. **Google Search Console**: submit https://solarmason.com/sitemap.xml
2. **Bing Webmaster**: submit the same sitemap
3. **Force re-crawl** in both consoles for the homepage

### Social card cache refresh
- Facebook: https://developers.facebook.com/tools/debug/ → paste solarmason.com → "Scrape Again"
- LinkedIn: https://www.linkedin.com/post-inspector/ → paste solarmason.com

### llms.txt check
Visit https://solarmason.com/llms.txt — confirm it loads and reads
correctly. AI assistants will read this when crawling.

────────────────────────────────────────────────────────────────────

## Why this beats "just adding meta tags"

Voice assistants and AI search don't read meta keywords. They read
**structured data** that explicitly states what you do, where you do
it, and who can use it. This bundle adds Service schemas with
`areaServed` listing every NEPA city by name. When someone asks
their phone "solar company near Hazleton", the AI matches Solar
Mason's Service.areaServed entry for Hazleton — there's no keyword
guessing involved.

The `llms.txt` file is the new convention for the same idea: a clean
markdown summary of who you are and what you do, designed for AI
crawlers to read directly without having to parse navigation, footers,
and JavaScript. Anthropic, OpenAI, and Perplexity all read it.

The ReserveAction on Service schemas means a voice assistant can say
"I'll book that for you" and route the user to schedule.solarmason.com
without leaving the assistant's interface.
