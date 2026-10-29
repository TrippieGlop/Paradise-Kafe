# Paradise Kafé

Website for **Paradise Kafé**, a matcha and coffee garden café at 552 N New Street, Bethlehem, PA.
*Sip, relax, and enjoy the garden.*

Live site: https://paradise-kafe-blush.vercel.app

## What's in here

| Path | What it is |
|---|---|
| `dist/` | The finished, ready-to-host website. This is what gets deployed. |
| `src/` | Page sources: home page, About page, header/footer, and the legal page text. |
| `assets/` | Styles, scripts, logo, icons and the share image. |
| `assets/data.js` | **All menu prices, items, seasonal drinks and hours.** Edit this for day-to-day updates. |
| `static/` | `vercel.json` (security headers), robots.txt, sitemap and manifest. |
| `build.py` | Rebuilds `dist/` from the files above. |

## Pages

- `/`: home page with the seasonal drinks, matcha bar, full menu, Instagram banner, and hours and location
- `/about`: the café's story
- `/privacy`, `/terms`, `/accessibility`: legal pages
- 404 page

## Updating the menu or seasonal drinks

1. Edit `assets/data.js`:
   - **Prices or items:** change the `menu` list.
   - **New season:** copy the `fall` block under `seasons`, rename it (for example `winter`), add it to `order`, and set `current` to it.
2. Rebuild:
   ```bash
   python3 build.py
   ```
3. Deploy the `dist/` folder.

## Deploying

The site is plain static HTML, CSS and JS with no framework and no build step on the host. If you import this repo into Vercel, set the project's **Root Directory** to `dist`.

Note: Vercel's free Hobby plan is for non-commercial use only. A business site should run on a Pro plan.

## Privacy and security

- No cookies, no analytics, no trackers.
- Strict security headers are set in `dist/vercel.json`: content security policy, HSTS, clickjacking protection, and blocked camera, microphone and location access.
- The Google map loads only when a visitor clicks to load it.
