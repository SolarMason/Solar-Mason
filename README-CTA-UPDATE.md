# Solar Mason — Free Estimate CTA Repoint

## What's in this zip

93 HTML files with every "Free Estimate" CTA repointed from
`/calculators/bill-analyzer/` → `/calculators/design-studio/`
(your Engineering Program).

- **304 CTA hrefs updated** across the entire site
- Includes site-wide hero buttons, sidebar cards, countdown CTAs,
  quick-access rows, and the CTA bands at the bottom of every sub-page
- Shared footer template (`_templates/_footer.html`) updated as well,
  so any future page generated from the template inherits the change
- Shared page template (`_templates/page-template.html`) updated too

## What was NOT changed (intentionally preserved)

- Mega-menu nav link to "Bill Analyzer"
- Sidebar nav link to "Bill Analyzer"
- Footer "Calculators" list link to "Bill Analyzer"
- The "Upload Your Bill" gradient button on /shop/
- The inline "upload your utility bill" text link on the incentive page

The Bill Analyzer page itself still exists and is reachable from
navigation — only the CTA buttons that say "Free Estimate" were
repointed.

## How to apply

1. Unzip into the root of your local `Solar-Mason-Dev` clone
   (e.g., drag the `_templates`, `about-pv`, `about-us`, etc. folders
   over the existing ones — say YES to "Replace" / "Merge").
2. From your repo root, run:

       git add -A
       git commit -m "Repoint all 'Free Estimate' CTAs to Engineering Program (/calculators/design-studio/)"
       git push origin main

3. GitHub Pages will redeploy in ~30–60 seconds.

## Verify deployment

After deploy, hit any of these and click the "Free Estimate" button —
it should land on `/calculators/design-studio/` (Design Studio):

- https://solarmason.com/
- https://solarmason.com/about-us/
- https://solarmason.com/commercial-services/
- https://solarmason.com/enphase-micro-inverters/

The countdown card "Free Estimate →" button (footer area) should also
land on the Design Studio.
