/* Paradise Kafé — interactions. No cookies, no trackers, no storage. */
(function () {
  "use strict";
  var D = window.PK || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var uid = 0;

  /* ---------- cup illustration ---------- */
  function cup(c) {
    var id = "c" + (++uid);
    if (c.type === "hot") {
      return '<svg class="cup" viewBox="0 0 140 170" aria-hidden="true">' +
        '<g class="steam" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3" stroke-linecap="round">' +
        '<path d="M52 40c-8-10 8-16 0-28"><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></path>' +
        '<path d="M70 44c-8-10 8-16 0-30"><animate attributeName="opacity" values="0;1;0" dur="3s" begin=".8s" repeatCount="indefinite"/></path>' +
        '<path d="M88 40c-8-10 8-16 0-28"><animate attributeName="opacity" values="0;1;0" dur="3s" begin="1.6s" repeatCount="indefinite"/></path></g>' +
        '<path d="M26 60h88l-8 84a14 14 0 0 1-14 12H48a14 14 0 0 1-14-12z" fill="#f3ece0"/>' +
        '<path d="M114 76h6a16 16 0 0 1 0 32h-9" fill="none" stroke="#f3ece0" stroke-width="8"/>' +
        '<ellipse cx="70" cy="62" rx="44" ry="8" fill="' + c.color + '"/>' +
        '<path d="M58 62c6-5 18-5 24 0" stroke="rgba(255,255,255,.55)" stroke-width="2" fill="none"/>' +
        '<path d="M30 98h80" stroke="#d98a1e" stroke-width="3"/><circle cx="70" cy="120" r="8" fill="none" stroke="#d98a1e" stroke-width="2"/>' +
        '<ellipse cx="70" cy="160" rx="52" ry="6" fill="rgba(0,0,0,.25)"/></svg>';
    }
    var top = 38, bot = 160, L = function (y) { return 22 + (y - top) * (8 / (bot - top)); }, R = function (y) { return 98 - (y - top) * (8 / (bot - top)); };
    var h = bot - top, y = bot, rects = "";
    (c.layers || []).forEach(function (ly, i) {
      var lh = ly[1] * h, ny = y - lh;
      rects += '<rect x="0" y="' + ny.toFixed(1) + '" width="120" height="' + (lh + 1).toFixed(1) + '" fill="' + ly[0] + '"/>';
      if (i > 0) rects += '<path d="M0 ' + (y).toFixed(1) + ' q15 -5 30 0 t30 0 t30 0 t30 0 v4 h-120z" fill="' + ly[0] + '" opacity=".7"/>';
      y = ny;
    });
    var surface = y;
    var ice = "";
    [[34, surface + 10, 14, -12], [58, surface + 4, 15, 8], [76, surface + 16, 13, -4], [44, surface + 28, 12, 18]].forEach(function (k) {
      ice += '<rect x="' + k[0] + '" y="' + k[1].toFixed(1) + '" width="' + k[2] + '" height="' + k[2] + '" rx="3" fill="rgba(255,255,255,.28)" stroke="rgba(255,255,255,.55)" stroke-width="1" transform="rotate(' + k[3] + ' ' + (k[0] + k[2] / 2) + ' ' + (k[1] + k[2] / 2).toFixed(1) + ')"/>';
    });
    var cream = "";
    if (c.top === "cream" || c.top === "marsh") {
      var cc = c.top === "marsh" ? "#fff6e6" : "#fffaf0";
      cream = '<path d="M24 ' + (top + 2) + ' q10 -14 22 -6 q12 -14 26 -4 q14 -12 24 8 z" fill="' + cc + '"/>';
      if (c.top === "marsh") cream += '<path d="M38 ' + (top - 4) + ' q12 -8 22 -2 q10 -8 20 2" stroke="#c98a46" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>';
      if (c.dust) cream += '<g fill="' + c.dust + '"><circle cx="44" cy="' + (top - 4) + '" r="1.6"/><circle cx="58" cy="' + (top - 8) + '" r="1.4"/><circle cx="70" cy="' + (top - 5) + '" r="1.7"/><circle cx="82" cy="' + (top - 2) + '" r="1.3"/><circle cx="52" cy="' + (top - 1) + '" r="1.2"/></g>';
    }
    if (c.top === "flakes") cream = '<g fill="#fffaf0"><rect x="40" y="' + (surface - 3) + '" width="9" height="3" rx="1.5" transform="rotate(-20 44 ' + surface + ')"/><rect x="62" y="' + (surface - 5) + '" width="10" height="3" rx="1.5" transform="rotate(15 66 ' + surface + ')"/><rect x="52" y="' + (surface - 1) + '" width="8" height="3" rx="1.5"/></g>';
    return '<svg class="cup" viewBox="0 0 120 178" aria-hidden="true"><defs><clipPath id="' + id + '"><path d="M' + L(top) + ' ' + top + 'H' + R(top) + 'L' + R(bot) + ' ' + bot + 'Q60 ' + (bot + 6) + ' ' + L(bot) + ' ' + bot + 'Z"/></clipPath>' +
      '<linearGradient id="' + id + 'g" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".2"/></linearGradient></defs>' +
      '<path d="M66 6 L58 120" stroke="#f2be45" stroke-width="7" stroke-linecap="round"/>' +
      '<g clip-path="url(#' + id + ')"><rect x="0" y="0" width="120" height="180" fill="rgba(255,255,255,.08)"/><g class="liquid">' + rects + '</g>' + ice + '<rect x="0" y="0" width="120" height="180" fill="url(#' + id + 'g)"/></g>' +
      '<path d="M' + L(top) + ' ' + top + 'H' + R(top) + 'L' + R(bot) + ' ' + bot + 'Q60 ' + (bot + 6) + ' ' + L(bot) + ' ' + bot + 'Z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/>' +
      cream +
      '<rect x="16" y="' + (top - 4) + '" width="88" height="6" rx="3" fill="rgba(255,255,255,.75)"/>' +
      '<ellipse cx="60" cy="172" rx="40" ry="5" fill="rgba(0,0,0,.3)"/></svg>';
  }

  /* ---------- open / closed status ---------- */
  function nyNow() {
    var tz = (D.hours && D.hours.tz) || "America/New_York";
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: days[o.weekday], mins: (+o.hour % 24) * 60 + (+o.minute) };
  }
  function fmt(h) { var s = h >= 12 ? "PM" : "AM"; var x = h % 12 || 12; return x + " " + s; }
  function status() {
    var n = nyNow(), wk = n.day === 0 || n.day === 6, r = wk ? D.hours.weekend : D.hours.weekday;
    var open = n.mins >= r[0] * 60 && n.mins < r[1] * 60, msg;
    if (open) msg = "Open now · until " + fmt(r[1]);
    else if (n.mins < r[0] * 60) msg = "Closed · opens " + fmt(r[0]);
    else { var nd = (n.day + 1) % 7, nw = nd === 0 || nd === 6; msg = "Closed · opens " + fmt((nw ? D.hours.weekend : D.hours.weekday)[0]) + (nd === 0 ? " Sun" : nd === 6 ? " Sat" : " tomorrow"); }
    $$(".status-pill").forEach(function (el) {
      el.classList.toggle("open", open); el.classList.toggle("closed", !open);
      var t = $(".txt", el); if (t) t.textContent = msg;
    });
    $$(".hours tr[data-day]").forEach(function (tr) { tr.classList.toggle("today", +tr.dataset.day === n.day); });
  }

  /* ---------- seasonal ---------- */
  function renderSeason(key) {
    var S = D.seasons, s = S[key]; if (!s) return;
    var sec = $("#seasonal"); sec.dataset.season = key;
    var isNow = key === S.current;
    $("#season-title").innerHTML = esc(s.title.replace(/ Specials$/, "")) + ' <span class="gold-text">Specials.</span>';
    $("#season-blurb").textContent = s.blurb;
    $("#season-badge").innerHTML = '<span class="badge">' + (isNow ? "● Available now" : "Past season") + "</span>" + esc(s.label) + " " + esc(s.year);
    $("#season-grid").innerHTML = s.drinks.map(function (d, i) {
      return '<article class="drink-card reveal in" data-glow="' + esc(d.glow || "") + '"><span class="price">' + esc(d.price || (isNow ? "Limited" : "Returns soon")) + "</span>" + cup(d.cup) +
        "<h3>" + esc(d.name) + "</h3><p>" + esc(d.desc) + "</p></article>";
    }).join("");
    $$(".drink-card", sec).forEach(function (c) { if (c.dataset.glow) c.style.setProperty("--glow", c.dataset.glow); });
    $$(".season-tabs button").forEach(function (b) { b.setAttribute("aria-selected", b.dataset.key === key ? "true" : "false"); b.tabIndex = b.dataset.key === key ? 0 : -1; });
    leaves(s.leaves);
    tilt($$(".drink-card", sec));
  }
  function initSeasons() {
    var S = D.seasons, tabs = $(".season-tabs"); if (!S || !tabs) return;
    tabs.innerHTML = S.order.map(function (k) {
      return '<button role="tab" type="button" data-key="' + k + '" aria-controls="season-grid">' + esc(S[k].label) + '<span class="tag">' + (k === S.current ? "Now" : "Past") + "</span></button>";
    }).join("");
    tabs.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) renderSeason(b.dataset.key); });
    tabs.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var bs = $$("button", tabs), i = bs.indexOf(document.activeElement); if (i < 0) return;
      var n = bs[(i + (e.key === "ArrowRight" ? 1 : bs.length - 1)) % bs.length]; n.focus(); renderSeason(n.dataset.key);
    });
    renderSeason(S.current);
  }
  var leafSVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3 3 4 6 4-1 2-1 4 1 6-2 0-3 1-3 3-2-1-3 0-4 2-1-2-2-3-4-2 0-2-1-3-3-3 2-2 2-4 1-6 3 0 5-1 6-4z"/><path d="M12 9v13" stroke="rgba(0,0,0,.35)" stroke-width="1"/></svg>';
  function leaves(colors) {
    var box = $("#leaves"); if (!box || reduce) return;
    var html = "";
    for (var i = 0; i < 18; i++) {
      html += '<span class="leaf-fall" data-v="' + [Math.random() * 100, 16 + Math.random() * 22, 10 + Math.random() * 12, -Math.random() * 20, (Math.random() - .5) * 240, colors[i % colors.length], 2 + Math.random() * 3].join("|") + '">' + leafSVG + "</span>";
    }
    box.innerHTML = html;
    $$(".leaf-fall", box).forEach(function (l) {
      var v = l.dataset.v.split("|");
      l.style.left = v[0] + "%"; l.style.setProperty("--s", v[1] + "px"); l.style.setProperty("--t", v[2] + "s");
      l.style.setProperty("--dl", v[3] + "s"); l.style.setProperty("--x", v[4] + "px"); l.style.setProperty("--c", v[5]); l.style.setProperty("--sw", v[6] + "s");
    });
  }

  /* ---------- matcha rail ---------- */
  function initMatcha() {
    var rail = $("#matcha-rail"); if (!rail || !D.matcha) return;
    rail.innerHTML = D.matcha.map(function (m) {
      return '<article class="m-card reveal" data-tint="' + m.tint + '" data-shadow="' + m.shadow + '">' + cup({ type: "iced", layers: m.layers, top: m.top, dust: m.dust }) +
        "<h3>" + esc(m.name) + '</h3><div class="sizes"><span><small>12 OZ</small>' + m.p[0] + "</span><span><small>16 OZ</small>" + m.p[1] + "</span></div></article>";
    }).join("");
    $$(".m-card", rail).forEach(function (c, i) { c.style.setProperty("--tint", c.dataset.tint); c.style.setProperty("--shadow", c.dataset.shadow); c.style.setProperty("--d", (i * 0.07) + "s"); });
  }

  /* ---------- menu ---------- */
  function price(p) { return p ? '<span class="p">' + p + "</span>" : '<span class="p na">—</span>'; }
  function initMenu() {
    var box = $("#menu-cols"), chips = $("#menu-chips"); if (!box || !D.menu) return;
    box.innerHTML = D.menu.map(function (b) {
      var two = b.sizes || b.items.some(function (i) { return Array.isArray(i.p); });
      var head = two ? '<div class="cols-head" aria-hidden="true"><span>12 OZ</span><span>16 OZ</span></div>' : "";
      return '<div class="menu-block" data-cat="' + b.id + '"><h3>' + esc(b.title) + ".</h3>" + (b.sub ? '<span class="sub">' + esc(b.sub) + "</span>" : "") + head +
        b.items.map(function (it) {
          var ps = Array.isArray(it.p) ? price(it.p[0]) + price(it.p[1]) : (two ? '<span class="p"></span>' : "") + price(it.p);
          var label = Array.isArray(it.p) ? it.n + ", 12 ounce " + it.p[0] + ", 16 ounce " + it.p[1] : it.n + ", " + it.p;
          return '<div class="item" role="listitem" aria-label="' + esc(label) + '" data-search="' + esc((it.n + " " + (it.d || "") + " " + b.title).toLowerCase()) + '"><span class="name">' + esc(it.n) +
            (it.tag ? '<span class="tagline' + (/must/i.test(it.tag) ? " gold" : "") + '">' + esc(it.tag) + "</span>" : "") + (it.d ? '<span class="desc">' + esc(it.d) + "</span>" : "") + '</span><span class="lead" aria-hidden="true"></span>' + ps + "</div>";
        }).join("") + "</div>";
    }).join("");
    $$(".menu-block", box).forEach(function (b) { b.setAttribute("role", "list"); b.setAttribute("aria-label", $("h3", b).textContent); });
    chips.innerHTML = '<button class="chip" type="button" aria-pressed="true" data-cat="all">All</button>' + D.menu.map(function (b) { return '<button class="chip" type="button" aria-pressed="false" data-cat="' + b.id + '">' + esc(b.title.replace(" & Crêpes", "")) + "</button>"; }).join("");
    var cat = "all", q = "";
    function apply() {
      var any = false;
      $$(".menu-block", box).forEach(function (b) {
        var inCat = cat === "all" || b.dataset.cat === cat, shown = 0;
        $$(".item", b).forEach(function (it) { var ok = inCat && (!q || it.dataset.search.indexOf(q) > -1); it.hidden = !ok; if (ok) shown++; });
        b.hidden = !shown; if (shown) any = true;
      });
      $("#menu-empty").style.display = any ? "none" : "block";
      $("#menu-count").textContent = any ? "" : "No drinks or bites match “" + q + "”.";
    }
    chips.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      cat = c.dataset.cat; $$(".chip", chips).forEach(function (x) { x.setAttribute("aria-pressed", x === c ? "true" : "false"); }); apply();
    });
    $("#menu-search").addEventListener("input", function (e) { q = e.target.value.trim().toLowerCase().slice(0, 40); apply(); });
    var mk = $("#milks"); if (mk) mk.innerHTML = "<b>Milk options</b>" + D.milks.map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");
  }

  /* ---------- crêpe / croissant ---------- */
  function croissant(s) {
    return '<svg viewBox="0 0 200 140" aria-hidden="true"><ellipse cx="100" cy="122" rx="78" ry="9" fill="rgba(26,23,18,.12)"/>' +
      '<path d="M22 96c10-42 48-66 78-66s68 24 78 66c-14 10-34 2-42-8-6 14-22 22-36 22s-30-8-36-22c-8 10-28 18-42 8z" fill="#e0a24e"/>' +
      '<path d="M100 30c-12 18-12 52 0 80M100 30c12 18 12 52 0 80M64 40c4 22 12 42 28 60M136 40c-4 22-12 42-28 60" stroke="#b5732c" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M40 70c30-20 90-20 120 0" stroke="' + s.drizzle + '" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M50 82c22 -12 78-12 100 0" stroke="' + s.drizzle + '" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>' +
      '<circle cx="70" cy="58" r="7" fill="' + s.fruit[0] + '"/><circle cx="128" cy="60" r="6" fill="' + s.fruit[1] + '"/><circle cx="100" cy="50" r="5" fill="' + s.fruit[0] + '"/>' +
      '<g fill="#fff" opacity=".85"><circle cx="84" cy="46" r="1.5"/><circle cx="116" cy="44" r="1.5"/><circle cx="96" cy="66" r="1.5"/><circle cx="140" cy="76" r="1.5"/><circle cx="60" cy="76" r="1.5"/></g></svg>';
  }
  function crepe(s) {
    return '<svg viewBox="0 0 200 140" aria-hidden="true"><ellipse cx="100" cy="122" rx="82" ry="9" fill="rgba(26,23,18,.12)"/>' +
      '<ellipse cx="100" cy="104" rx="84" ry="18" fill="#fffaf0" stroke="#d8cbb3" stroke-width="2"/>' +
      '<path d="M30 100 L100 26 L170 100 Q100 118 30 100z" fill="#e8bf7a"/><path d="M100 26 L118 104 Q100 110 82 104z" fill="#d9a85c"/>' +
      '<path d="M48 84c20-10 34 4 52-6s34 4 52-4" stroke="' + s.drizzle + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<circle cx="66" cy="72" r="7" fill="' + s.fruit[0] + '"/><circle cx="134" cy="74" r="6" fill="' + s.fruit[1] + '"/><circle cx="100" cy="58" r="5" fill="' + s.fruit[0] + '"/>' +
      '<g fill="#fff" opacity=".9"><circle cx="86" cy="50" r="1.5"/><circle cx="112" cy="46" r="1.5"/><circle cx="96" cy="78" r="1.5"/><circle cx="146" cy="88" r="1.5"/><circle cx="58" cy="90" r="1.5"/></g></svg>';
  }
  function initSweets() {
    var grid = $("#sweet-grid"), sw = $("#sweet-switch"); if (!grid || !D.sweets) return;
    function draw(isCrepe) {
      grid.innerHTML = D.sweets.map(function (s) {
        return '<article class="sweet"><div class="art">' + (isCrepe ? crepe(s) : croissant(s)) + "</div><h3>" + esc(s.name) + "</h3><p>" + esc(s.desc) + '</p><div class="price">' + (isCrepe ? 'Crêpe<small>· pricing in store</small>' : s.price + "<small>croissant</small>") + "</div></article>";
      }).join("");
      $("#sw-l").classList.toggle("on", !isCrepe); $("#sw-r").classList.toggle("on", isCrepe);
    }
    sw.addEventListener("click", function () { var v = sw.getAttribute("aria-checked") !== "true"; sw.setAttribute("aria-checked", v ? "true" : "false"); draw(v); });
    draw(false);
  }

  /* ---------- hero sparkles ---------- */
  function sparkles() {
    var cv = $("#sparkles"); if (!cv || reduce) return;
    var ctx = cv.getContext("2d"), W, H, dpr = Math.min(2, window.devicePixelRatio || 1), P = [], vis = true;
    function size() { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener("resize", size);
    var count = Math.min(70, Math.round(W / 18));
    for (var i = 0; i < count; i++) P.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .4, v: Math.random() * .35 + .1, a: Math.random() * Math.PI * 2, g: Math.random() < .3 });
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(cv);
    (function loop() {
      requestAnimationFrame(loop); if (!vis) return;
      ctx.clearRect(0, 0, W, H);
      P.forEach(function (p) {
        p.y -= p.v; p.a += .02; p.x += Math.sin(p.a) * .25; if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        var al = .35 + Math.sin(p.a * 2) * .3;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = p.g ? "rgba(156,194,95," + al + ")" : "rgba(251,227,138," + al + ")";
        ctx.shadowBlur = 8; ctx.shadowColor = p.g ? "#9cc25f" : "#f2be45"; ctx.fill();
      });
    })();
  }

  /* ---------- tilt ---------- */
  function tilt(els) {
    if (reduce || !window.matchMedia("(hover:hover)").matches) return;
    els.forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = "rotateY(" + (x * 12) + "deg) rotateX(" + (-y * 12) + "deg) translateY(-6px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- reveal + parallax + nav ---------- */
  function reveal() {
    var els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window) || reduce) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }
  function nav() {
    var hdr = $(".site-header"), tog = $(".menu-toggle"), links = $(".nav-links");
    var onScroll = function () {
      hdr.classList.toggle("scrolled", window.scrollY > 30);
      if (!reduce) $$(".foliage").forEach(function (f, i) { f.style.translate = "0 " + (window.scrollY * (i % 2 ? .12 : -.08)).toFixed(1) + "px"; });
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    if (tog) {
      tog.addEventListener("click", function () { var o = tog.getAttribute("aria-expanded") !== "true"; tog.setAttribute("aria-expanded", o); links.classList.toggle("open", o); });
      links.addEventListener("click", function (e) { if (e.target.closest("a")) { tog.setAttribute("aria-expanded", "false"); links.classList.remove("open"); } });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && links.classList.contains("open")) { tog.setAttribute("aria-expanded", "false"); links.classList.remove("open"); tog.focus(); } });
    }
    var secs = $$("main section[id]"), map = {};
    $$(".nav-links a[href^='#']").forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting && map[e.target.id]) { Object.keys(map).forEach(function (k) { map[k].removeAttribute("aria-current"); }); map[e.target.id].setAttribute("aria-current", "true"); } }); }, { rootMargin: "-45% 0px -50% 0px" });
      secs.forEach(function (s) { io.observe(s); });
    }
  }
  function heroLogo() {
    $$(".hero-logo .blooms ellipse, .hero-logo .blooms circle").forEach(function (el, i) { el.style.setProperty("--i", i); });
  }
  function map() {
    var b = $("#load-map"); if (!b) return;
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.title = "Map showing Paradise Kafé at 552 N New Street, Bethlehem, PA";
      f.loading = "lazy"; f.referrerPolicy = "no-referrer";
      f.src = "https://www.google.com/maps?q=552+N+New+St,+Bethlehem,+PA+18018&output=embed";
      var box = b.closest(".map"); box.innerHTML = ""; box.appendChild(f);
    });
  }

  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  /* scale the hero wordmark so PARADISE always fills, never overflows, its column */
  function fitTitle() {
    var t = $(".hero-title"), w = $(".hero-title .fit"); if (!t || !w) return;
    var box = t.parentElement.clientWidth; if (!box) return;
    t.style.fontSize = "100px";
    var size = Math.min(100 * box / w.getBoundingClientRect().width * 0.98, 141);
    t.style.fontSize = Math.max(size, 40).toFixed(1) + "px";
  }
  fitTitle(); window.addEventListener("resize", fitTitle);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTitle);
  try { heroLogo(); initSeasons(); initMatcha(); initMenu(); initSweets(); } catch (e) { console.error(e); }
  if (D.hours) { status(); setInterval(status, 60000); }
  sparkles(); nav(); map(); reveal();
})();
