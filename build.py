"""Assembles the static site into ./dist. Run: python3 build.py"""
import math, re, shutil, json, pathlib
ROOT = pathlib.Path(__file__).parent
SRC, DIST = ROOT / "src", ROOT / "dist"
shutil.rmtree(DIST, ignore_errors=True); DIST.mkdir()
shutil.copytree(ROOT / "assets", DIST / "assets", ignore=shutil.ignore_patterns("*.txt"))
shutil.copy(ROOT / "favicon.svg", DIST / "favicon.svg")
part = lambda n: (SRC / "partials" / n).read_text()

def sprig():
    p = ['<svg viewBox="0 0 300 420" fill="currentColor" xmlns="http://www.w3.org/2000/svg">',
         '<path d="M40 420 C70 320 110 220 190 40" stroke="currentColor" stroke-width="4" fill="none"/>',
         '<path d="M110 420 C120 340 160 270 250 170" stroke="currentColor" stroke-width="3" fill="none"/>']
    def lf(x, y, a, L, w):
        r = math.radians(a); dx, dy = math.cos(r), -math.sin(r); nx, ny = -dy, dx
        tx, ty = x + dx * L, y + dy * L
        return (f'<path d="M{x:.0f} {y:.0f} Q{x+dx*L*.5+nx*w:.0f} {y+dy*L*.5+ny*w:.0f} {tx:.0f} {ty:.0f} '
                f'Q{x+dx*L*.5-nx*w*.4:.0f} {y+dy*L*.5-ny*w*.4:.0f} {x:.0f} {y:.0f}Z" opacity=".9"/>')
    for i in range(14):
        t = i / 13
        x = 40 + 150 * (t ** 1.2); y = 420 - 380 * t
        side = 1 if i % 2 else -1
        p.append(lf(x, y, 70 + side * 50 + t * 10, 80 - t * 30, 9))
    for i in range(8):
        t = i / 7
        x = 110 + 140 * t; y = 420 - 250 * t
        p.append(lf(x, y, 50 + (1 if i % 2 else -1) * 45, 64 - t * 20, 8))
    p.append("</svg>")
    return "".join(p)

def whisk():
    return "".join(f'<ellipse cx="100" cy="100" rx="96" ry="22" transform="rotate({a} 100 100)"/>' for a in range(0, 180, 6)) + \
        '<circle cx="100" cy="100" r="60"/><circle cx="100" cy="100" r="30"/>'

def marquee(words):
    s = "".join(f"<span>{w}</span>" for w in words)
    return s * 4

ICONS = {
 "IG": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
 "TT": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.4 2.2 1.8 3.7 4 4v3.1c-1.5 0-2.9-.4-4-1.1v6.2A5.8 5.8 0 1 1 10.7 9.4v3.2a2.7 2.7 0 1 0 2.7 2.7V3h3.1z"/></svg>',
 "FB": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V14h2.7v8z"/></svg>',
 "TH": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M17 8.5C16 5.5 13.8 4 11.6 4 7.8 4 5 7 5 12s2.8 8 6.8 8c3.4 0 5.7-2.2 5.7-5 0-3.6-4.4-4.4-6.5-3.4-1.7.8-1.5 3.4.7 3.6 2.6.2 3.6-2.2 3.4-5.6"/></svg>',
}

logo = (ROOT / "assets" / "logo-inline.txt").read_text().replace('role="img" aria-label="Paradise Kafé logo"', 'aria-hidden="true" focusable="false"')

def shell(title, desc, path, body, base="/"):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} · Paradise Kafé</title><meta name="description" content="{desc}"><meta name="theme-color" content="#0b0904">
<link rel="canonical" href="https://paradisekafe.com{path}"><link rel="icon" href="/assets/tree.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500;1,600&family=Montserrat:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/styles.css"></head>
<body><a class="skip" href="#main">Skip to content</a><div class="grain" aria-hidden="true"></div>
{{{{HEADER}}}}
<main id="main">{body}</main>
{{{{FOOTER}}}}
<script src="/assets/data.js" defer></script><script src="/assets/app.js" defer></script></body></html>'''

def legal(title, eyebrow, file, path, desc):
    body = f'''<section class="legal-hero"><div class="wrap"><p class="eyebrow">{eyebrow}</p><h1 class="poster gold-text">{title}</h1><p>Last updated: October 24, 2026</p></div></section>
<section class="legal"><div class="wrap">{(SRC / file).read_text()}</div></section>'''
    return shell(title, desc, path, body)

pages = {
 "index.html": (SRC / "index.html").read_text(),
 "privacy.html": legal("Privacy Policy", "Your privacy", "legal-privacy.html", "/privacy", "How Paradise Kafé's website handles your information: no cookies, no trackers, no data sales."),
 "terms.html": legal("Terms of Use", "The fine print", "legal-terms.html", "/terms", "Terms of use for the Paradise Kafé website, including menu, pricing and allergen information."),
 "accessibility.html": legal("Accessibility", "For everyone", "legal-accessibility.html", "/accessibility", "Paradise Kafé's commitment to an accessible website."),
 "about.html": shell("About", "The story behind Paradise Kafé, a garden café in Bethlehem, PA. Sip, relax, and enjoy the garden.", "/about", (SRC / "about.html").read_text()),
 "404.html": shell("Page not found", "This page wandered off into the garden.", "/404", '''<section class="notfound"><div><img src="/assets/tree.svg" alt="" width="180" height="180"><p class="eyebrow">Lost in the garden</p><h1 class="poster gold-text">404</h1><p style="color:var(--on-dark-mute);max-width:36ch;margin:0 auto 26px">This page wandered off. Let's get you back to the matcha.</p><a class="btn btn-gold" href="/">Back to Paradise</a></div></section>'''),
}

# Extract every inline style="" into generated classes so CSP can forbid inline styles.
styles, rules = {}, []
def take(m):
    v = m.group(2).strip().rstrip(";")
    if v not in styles:
        styles[v] = f"u{len(styles)+1}"; rules.append(f".{styles[v]}{{{v}}}")
    cls = styles[v]
    tag = m.group(1)
    if re.search(r'\sclass="', tag):
        return re.sub(r'\sclass="([^"]*)"', lambda c: f' class="{c.group(1)} {cls}"', tag, count=1) + ">"
    return tag + f' class="{cls}">'

for name, html in pages.items():
    base = "" if name == "index.html" else "/"
    html = html.replace("{{HEADER}}", part("header.html")).replace("{{FOOTER}}", part("footer.html")).replace("{{BASE}}", base)
    html = html.replace("{{LOGO}}", logo).replace("{{SPRIG}}", '<img src="/assets/sprig.svg" alt="" width="300" height="420">').replace("{{WHISK}}", whisk())
    html = html.replace("{{MARQUEE1}}", marquee(["Coffee", "Matcha", "Love", "Sip", "Relax", "Enjoy the garden"]))
    html = html.replace("{{MARQUEE2}}", marquee(["Pumpkin pie matcha", "Maple matcha", "Pakistani chai", "Toasted marshmallow", "Brown sugar maple"]))
    if name == "about.html": html = html.replace('href="/about">', 'href="/about" aria-current="page">')
    for k, v in ICONS.items(): html = html.replace("{{" + k + "}}", v)
    # only rewrite style attributes on HTML tags (not inside the SVG/JSON blobs which have none)
    html = re.sub(r'(<[a-zA-Z][^<>]*?)\sstyle="([^"]*)"\s*>', take, html)
    assert 'style="' not in re.sub(r"<script.*?</script>", "", html, flags=re.S), name
    assert "{{" not in html, name
    (DIST / name).write_text(html)

css = (DIST / "assets" / "styles.css").read_text()
(DIST / "assets" / "styles.css").write_text(css + "\n/* generated utility classes */\n" + "\n".join(rules) + "\n")

(DIST/"assets"/"sprig.svg").write_text(sprig().replace('fill="currentColor"','fill="#6f9440"').replace('stroke="currentColor"','stroke="#6f9440"').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ',1) if 'xmlns' not in sprig() else sprig().replace('currentColor','#6f9440'))
# minify text assets
def mincss(t):
    t=re.sub(r"/\*.*?\*/","",t,flags=re.S); t=re.sub(r"\s*\n\s*","",t); t=re.sub(r"\s*([{};,>])\s*",r"\1",t); return t
def minjs(t):
    out=[]
    for line in t.split("\n"):
        l=line.strip()
        if not l or l.startswith("//") or (l.startswith("/*") and l.endswith("*/")): continue
        out.append(l)
    return "\n".join(out)
for f in ["styles.css"]:
    q=DIST/"assets"/f; q.write_text(mincss(q.read_text()))
for f in ["app.js","data.js"]:
    q=DIST/"assets"/f; q.write_text(minjs(q.read_text()))
for q in DIST.glob("*.html"):
    t=q.read_text(); t=re.sub(r"<!--.*?-->","",t,flags=re.S); t=re.sub(r">\s+<","><",t); t=re.sub(r"\n\s+","\n",t); q.write_text(t)
# Clean URLs (/privacy) are enabled in vercel.json
for f in ["vercel.json", "robots.txt", "sitemap.xml", "site.webmanifest"]:
    shutil.copy(ROOT / "static" / f, DIST / f)
(DIST / ".well-known").mkdir()
shutil.copy(ROOT / "static" / "security.txt", DIST / ".well-known" / "security.txt")
print("built", sorted(p.name for p in DIST.iterdir()), len(rules), "utility classes")
# not referenced by any page; keep the deploy payload lean
for f in [DIST/"favicon.svg", DIST/"assets"/"logo.svg"]:
    f.unlink(missing_ok=True)
