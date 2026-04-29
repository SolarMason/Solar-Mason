# Solar Mason — Site Updates Bundle (4 changes)

Drop into your local `Solar-Mason-Dev` clone, commit, and push.

────────────────────────────────────────────────────────────────────

## What's in this bundle

1. **Free Estimate CTAs** repointed to Engineering Program (304 hrefs across 92 files)
2. **Bill Analyzer** simplified to upload-only (removed dead address fallback)
3. **Site-wide Open Graph share card** with all OG/Twitter meta tags
4. **Full PWA + SEO 100/100 build-out** — manifest, service worker, 23 icons, robots.txt, sitemap.xml, JSON-LD structured data, geo tags, etc.

The OG card asset has been **compressed from 1.2 MB → 390 KB** (67% smaller) for faster crawler fetches and better cache hit rates. No file in this bundle exceeds 1 MB; largest file is 967 KB (existing design-studio HTML).

────────────────────────────────────────────────────────────────────

## How to apply

1. Unzip into the root of your local `Solar-Mason-Dev` clone — choose
   Replace / Merge so existing files get overwritten. **Important:** the
   `assets/icons/` directory at the repo root must receive all 23 new
   icon files, plus the new top-level files (`manifest.json`,
   `service-worker.js`, `robots.txt`, `sitemap.xml`, `browserconfig.xml`,
   and `favicon.ico`).

2. From the repo root:

       git add -A
       git commit -m "Repoint Free Estimate CTAs; simplify Bill Analyzer; add OG card; full PWA + SEO build-out"
       git push origin main

3. GitHub Pages will redeploy in ~30–60 seconds.

────────────────────────────────────────────────────────────────────

## If `git push` fails

If the push gets rejected, here's a triage cheat sheet by error type:

### "failed to push some refs" / "Updates were rejected because the remote contains work that you do not have locally"

Your local branch is behind origin. Fix:

    git pull --rebase origin main
    git push origin main

### "exceeds GitHub's file size limit of 100.00 MB"

A specific file is too big. Find it:

    git ls-files | xargs du -h | sort -rh | head

Largest file in this bundle is 967 KB — well under the limit.

### "Sorry, this large file is X MB and exceeds GitHub's...limit" (web UI)

You're using the GitHub web drag-and-drop uploader, which has a
**25 MB per-file limit**. None of our files exceed that, but if this
shows up, switch to git CLI push instead.

### Pages build failure (you get an email or red X in Actions tab)

Open the Actions tab on github.com, click the failed run, read the
build log. Most common: an HTML file with a syntax error caught by
the Pages built-in checker. None of the files in this bundle should
trigger that.

### "non-fast-forward" / "your branch is X commits behind"

Same as the first error — pull first, then push:

    git fetch origin
    git rebase origin/main
    git push origin main

### Local `.git` corruption / "fatal: bad object" / "fatal: pack-objects died"

Re-clone fresh and re-apply this bundle:

    cd ..
    rm -rf Solar-Mason-Dev
    git clone https://github.com/SolarMason/Solar-Mason-Dev.git
    cd Solar-Mason-Dev
    # Now unzip this bundle on top, then:
    git add -A
    git commit -m "Repoint CTAs, simplify Bill Analyzer, OG card, PWA + SEO"
    git push origin main

### Authentication failures ("could not read Username")

Your GitHub PAT expired or doesn't have `repo` scope. Generate a new
classic PAT at github.com/settings/tokens with `repo` checked, then:

    git remote set-url origin https://YOUR_TOKEN@github.com/SolarMason/Solar-Mason-Dev.git
    git push origin main

(Or use `gh auth login` if you have GitHub CLI.)

### Still stuck?

Send back the **exact error message text** and I'll diagnose
specifically. The error message tells us the cause — the fixes
above are tailored per cause.

────────────────────────────────────────────────────────────────────

## Verify after deploy

### Free Estimate CTAs
Click "Free Estimate" anywhere → lands on Design Studio.

### Bill Analyzer
Visit https://solarmason.com/calculators/bill-analyzer/ → only upload area visible.

### OG Share Card
- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/
- Paste a solarmason.com link in iMessage/WhatsApp/Slack/Discord — preview renders the business card.

### PWA
- Visit https://solarmason.com on mobile Chrome → install prompt
- Save to home screen → custom icon appears
- On modern Android, the maskable circular icon will be used; on iOS
  it'll be the rounded-square logo
- After first visit, airplane mode → cached pages still load (service worker)
- Lighthouse PWA audit should pass all checks

### SEO
- Lighthouse SEO audit → 100/100 expected
- https://search.google.com/test/rich-results → detects Organization,
  LocalBusiness, WebPage, BreadcrumbList
- Submit sitemap to Google Search Console: https://solarmason.com/sitemap.xml
