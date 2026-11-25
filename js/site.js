/* Pastel agency site (mockup): shared header, footer, street illustration,
   scroll reveals and the contact form notice. */
(function () {
  "use strict";

  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  function cur(href) {
    var on = here === href || (href === "work.html" && here === "project.html") ||
      (href === "index.html#services" && here === "services.html");
    return on ? ' aria-current="page"' : "";
  }

  // services.html is deliberately not linked: it is the detailed write-up
  // shared with a prospect after a call. "Services" goes to the summary on
  // the home page.
  var LINKS = [
    ["work.html", "Work"],
    ["index.html#services", "Services"],
    ["index.html#approach", "Approach"]
  ];
  // The header has a "Start a project" button, so it needs no Contact link.
  // The footer has no button, so it lists Contact.
  var FOOT_LINKS = LINKS.concat([["index.html#contact", "Contact"]]);
  var OFFER = ["Websites", "Brand identity", "Logo design", "SEO and AEO", "Paid search", "Social media", "Reputation management"];
  // The logo: the name in Gabarito Bold, drawn as outlines (the same shapes as
  // img/pastel-wordmark-gabarito.svg). It takes the text color around it.
  var WORDMARK = '<svg viewBox="0 -681 2632.8 871" aria-hidden="true" focusable="false"><path d="M321.79 12.27Q257.49 12.27 209.91 -17.24Q162.33 -46.75 135.97 -104.04Q109.6 -161.32 109.6 -244.14Q109.6 -323.98 136.54 -381.26Q163.47 -438.54 211.33 -469.98Q259.2 -501.41 322.93 -501.41Q389.79 -501.41 440.29 -468.56Q490.79 -435.7 519.36 -377.85Q547.93 -320 547.93 -244.14Q547.93 -169.27 519.07 -111.14Q490.22 -53 439.15 -20.36Q388.09 12.27 321.79 12.27ZM52.07 190V-489.14H161.01L198.07 -364.45H188.64V-135.85H198.07V190ZM295.43 -125.4Q340.4 -125.4 369.88 -158.63Q399.36 -191.85 399.36 -244.14Q399.36 -296.85 369.88 -330.58Q340.4 -364.3 295.43 -364.3Q250.9 -364.3 220.85 -330.79Q190.8 -297.29 190.8 -244.57Q190.8 -191.85 220.85 -158.63Q250.9 -125.4 295.43 -125.4ZM750.24 13.43Q697.21 13.43 656.78 -7.14Q616.35 -27.7 593.99 -64.92Q571.64 -102.14 571.64 -151.3Q571.64 -202.7 595.63 -239.35Q619.62 -276 660.33 -296.01Q701.05 -316.02 751.37 -316.02Q823.64 -316.02 868.98 -283.11Q914.32 -250.19 929.05 -187.8L865.67 -199.16V-313.37Q865.67 -340.4 846.66 -360.43Q827.64 -380.47 786 -380.47Q758.57 -380.47 723.93 -373.69Q689.3 -366.9 651.59 -348.63L609.1 -453.46Q652.94 -475.16 703.47 -488.28Q754 -501.41 806.79 -501.41Q874.9 -501.41 920.73 -476.99Q966.55 -452.57 989.39 -408.96Q1012.23 -365.35 1012.23 -307.12V0H892.53L863.56 -94.68L929.05 -114.79Q912.75 -54.65 867.89 -20.61Q823.02 13.43 750.24 13.43ZM795.49 -91.47Q827.57 -91.47 847.19 -107.99Q866.8 -124.52 866.8 -151.3Q866.8 -178.51 847.19 -194.82Q827.57 -211.12 795.49 -211.12Q762.28 -211.12 742.95 -194.82Q723.62 -178.51 723.62 -151.3Q723.62 -124.52 742.95 -107.99Q762.28 -91.47 795.49 -91.47ZM1275.79 14.54Q1217.41 14.54 1165.92 -8.32Q1114.43 -31.19 1072.21 -87.48L1155.02 -167.01Q1188.7 -131.71 1219.95 -116.63Q1251.2 -101.55 1287.79 -101.55Q1309.57 -101.55 1323.09 -111.24Q1336.62 -120.93 1336.62 -135.27Q1336.62 -146.73 1328.69 -155.04Q1320.75 -163.35 1298.9 -171.29Q1277.05 -179.24 1235.21 -189.8Q1157.53 -209.37 1120.24 -245.48Q1082.94 -281.59 1082.94 -343.48Q1082.94 -387.46 1105.78 -423.86Q1128.62 -460.27 1171.73 -482.26Q1214.84 -504.25 1273.65 -504.25Q1344.17 -504.25 1393 -477.61Q1441.83 -450.98 1473.64 -413.14L1383.58 -335.69Q1362.2 -355.96 1331.22 -370.06Q1300.25 -384.15 1260.95 -384.15Q1239.93 -384.15 1224.89 -375.83Q1209.85 -367.51 1209.85 -352.16Q1209.85 -337.38 1227.93 -327.28Q1246.01 -317.17 1299.71 -304.04Q1390.55 -282.47 1430.39 -245.28Q1470.23 -208.09 1470.23 -145.7Q1470.23 -97.7 1444.88 -61.5Q1419.53 -25.3 1375.77 -5.38Q1332.01 14.54 1275.79 14.54ZM1756.69 8.43Q1675.65 8.43 1629.35 -31.91Q1583.05 -72.25 1583.05 -163.17V-483.14L1581.35 -489.14L1611.14 -606.52H1729.05V-195.24Q1729.05 -161 1744.97 -146.43Q1760.89 -131.86 1786.86 -131.86Q1802.16 -131.86 1815.44 -134.43Q1828.73 -137 1838.16 -140V-3.27Q1820.62 2.43 1801.14 5.43Q1781.67 8.43 1756.69 8.43ZM1506.91 -354.55V-489.14H1838.16V-354.55ZM2133.89 9.43Q2060.62 9.43 2005.48 -21.78Q1950.35 -53 1919.78 -110Q1889.21 -167 1889.21 -244.14Q1889.21 -320 1919.78 -377.85Q1950.35 -435.7 2005.48 -468.56Q2060.62 -501.41 2133.89 -501.41Q2209.3 -501.41 2264.15 -467.42Q2319 -433.43 2349 -375.86Q2379 -318.3 2379 -245.84Q2379 -232.59 2378.22 -220.83Q2377.43 -209.07 2375.86 -201.94H2002.95V-305.54H2264.11L2246.9 -263.44Q2246.9 -318.43 2219.43 -353.24Q2191.96 -388.04 2135.02 -388.04Q2083.81 -388.04 2053.34 -357.06Q2022.88 -326.07 2022.88 -274.57V-220.3Q2022.88 -165.22 2054.62 -134.52Q2086.36 -103.83 2142.41 -103.83Q2189.48 -103.83 2216.66 -122.86Q2243.83 -141.9 2263.29 -170.38L2362.14 -115.43Q2330.41 -56.41 2272.36 -23.49Q2214.32 9.43 2133.89 9.43ZM2576.78 5Q2539.99 5 2508.91 -9.77Q2477.84 -24.54 2458.96 -56.49Q2440.07 -88.44 2440.07 -141.05V-681H2585.21V-192.52Q2585.21 -155.84 2598.44 -145.4Q2611.67 -134.97 2632.8 -134.97V-0.46Q2622.64 2.27 2606.5 3.64Q2590.37 5 2576.78 5Z"/></svg>';

  // The mark beside the name in the header: three color chips fanned out like
  // a swatch deck, one per brand color. The thin outline and the pivot dot are
  // the header's own background color.
  var FAN = '<svg class="logo__mark" viewBox="-5 14 110 100" aria-hidden="true" focusable="false">' +
    '<g stroke="#F8F7F4" stroke-width="4">' +
    '<rect x="35" y="16" width="30" height="90" rx="8" transform="rotate(-30 50 96)" fill="#96A598"/>' +
    '<rect x="35" y="16" width="30" height="90" rx="8" fill="#E4C9BA"/>' +
    '<rect x="35" y="16" width="30" height="90" rx="8" transform="rotate(30 50 96)" fill="#4A4E51"/>' +
    '</g><circle cx="50" cy="96" r="4" fill="#F8F7F4"/></svg>';

  // ---- Header and mobile menu -------------------------------------------
  document.body.insertAdjacentHTML("afterbegin",
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site-header" data-header><div class="wrap site-header__in">' +
    '<a class="logo wordmark" href="index.html" aria-label="Pastel, home">' + FAN + WORDMARK + "</a>" +
    '<nav class="nav" aria-label="Main">' + LINKS.map(function (l) { return '<a href="' + l[0] + '"' + cur(l[0]) + ">" + l[1] + "</a>"; }).join("") + "</nav>" +
    '<a class="btn btn--sm" href="index.html#contact">Start a project</a>' +
    '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span>Menu</span><i></i></button>' +
    "</div></header>" +
    '<div class="menu" id="menu"><nav aria-label="Mobile">' +
    LINKS.map(function (l) { return '<a class="menu__link" href="' + l[0] + '">' + l[1] + "</a>"; }).join("") +
    '</nav><a class="btn" href="index.html#contact" style="align-self:flex-start">Start a project</a></div>' +
    // The header slides away on the way down the page. This small round
    // button takes its corner while it is gone, so the menu stays in reach
    // without scrolling back to the top.
    '<div class="quick" data-quick><div class="wrap quick__in">' +
    '<button class="quick__btn" type="button" aria-expanded="false" aria-controls="quick-menu" aria-label="Menu"><i></i></button>' +
    '<nav class="quick__menu" id="quick-menu" aria-label="Quick menu">' +
    LINKS.map(function (l) { return '<a href="' + l[0] + '"' + cur(l[0]) + ">" + l[1] + "</a>"; }).join("") +
    '<a class="btn btn--sm" href="index.html#contact">Start a project</a></nav>' +
    "</div></div>");

  var header = document.querySelector("[data-header]");
  var menu = document.getElementById("menu");
  var menuBtn = document.querySelector(".menu-btn");
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.querySelector("span").textContent = open ? "Close" : "Menu";
    document.body.style.overflow = open ? "hidden" : "";
  }
  menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  var quick = document.querySelector("[data-quick]");
  var quickBtn = quick.querySelector(".quick__btn");
  function setQuick(open) {
    quick.classList.toggle("is-open", open);
    quickBtn.setAttribute("aria-expanded", String(open));
  }
  quickBtn.addEventListener("click", function () { setQuick(!quick.classList.contains("is-open")); });
  // Closes after a choice, and on a click anywhere else on the page.
  document.addEventListener("click", function (e) {
    if (e.target.closest(".quick__menu a") || !e.target.closest("[data-quick]")) setQuick(false);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); setQuick(false); } });

  // The header belongs to the top of the page. It slides away once the page
  // has moved down by the header's own height and stays away, in both scroll
  // directions, until the page is back at the top. The quick menu button
  // stands in for it the whole time. (The header used to return on any
  // scroll up; the owner prefers the button.)
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    var hidden = y > header.offsetHeight && !menu.classList.contains("is-open");
    header.classList.toggle("is-hidden", hidden);
    quick.classList.toggle("is-on", hidden);
    if (!hidden) setQuick(false);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Footer ------------------------------------------------------------
  var tone = document.body.getAttribute("data-footer-on") || "";
  document.body.insertAdjacentHTML("beforeend",
    '<footer class="site-footer' + (tone ? " on-" + tone : "") + '">' +
    '<div class="street" data-street="night" aria-hidden="true"></div>' +
    '<div class="site-footer__body"><div class="wrap site-footer__in"><div class="site-footer__top">' +
    '<div class="site-footer__brand"><span class="wordmark" role="img" aria-label="Pastel">' + WORDMARK + "</span>" +
    "<p>Websites, brand and marketing for apartment communities and residential developments.</p></div>" +
    "<div><h3>Studio</h3><ul>" + FOOT_LINKS.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>"; }).join("") + "</ul></div>" +
    "<div><h3>Services</h3><ul>" + OFFER.map(function (o) { return '<li><a href="index.html#services">' + o + "</a></li>"; }).join("") + "</ul></div>" +
    '<div><h3>Contact</h3><ul><li class="ph">[email address]</li><li class="ph">[phone number]</li><li class="ph">[city, state]</li></ul></div>' +
    "</div>" +
    '<div class="site-footer__base"><span>&copy; 2026 Pastel</span><a href="#top">Back to top &uarr;</a></div>' +
    "</div></div></footer>");
  document.body.id = document.body.id || "top";

  // ---- Street of homes ----------------------------------------------------
  // Drawn from the Pastel mark: a simple house with an arched door and a knob.
  var DAY = { knob: "#4A4E51", sage: "#96A598", charcoal: "#4A4E51", peach: "#E4C9BA", white: "#FFFFFF", deep: "#5C6E60", tint: "#E3E8E3", door: "#E4C9BA", surround: "#F8F7F4", win: "#F8F7F4", ground: "#96A598", tree: "#C5CFC6", stem: "#5C6E60", sun: "#F0DDD2" };
  var NIGHT = { knob: "#2F3335", sage: "#3B4144", charcoal: "#3B4144", peach: "#454B4E", white: "#3B4144", deep: "#3B4144", tint: "#454B4E", door: "#E4C9BA", surround: "#2F3335", win: "#E4C9BA", ground: "#2F3335", tree: "#454B4E", stem: "#454B4E", sun: "none" };
  var BLD = [
    ["tree", 48, 96], ["house", 80, 150, 168, "sage"], ["block", 252, 164, 252, "charcoal", 4, 4], ["tree", 446, 124],
    ["house", 476, 112, 132, "peach"], ["house", 598, 116, 156, "white"], ["block", 734, 204, 206, "sage", 5, 3], ["tree", 968, 104],
    ["house", 998, 172, 194, "charcoal"], ["block", 1186, 128, 284, "tint", 3, 5], ["house", 1326, 104, 140, "sage"], ["tree", 1418, 84]
  ];

  function archPath(x, y, w, h) {
    var q = w / 2;
    return "M" + x + "," + (y + h) + " V" + (y + q) + " A" + q + "," + q + " 0 0 1 " + (x + w) + "," + (y + q) + " V" + (y + h) + " Z";
  }
  // How far every shape runs down behind the ground strip. A building that
  // lifts on hover then still meets the ground, with no gap under it.
  var ROOT = 24;
  function doorway(c, cx, w, h, base, k) {
    var m = 9 * k;
    return '<path d="' + archPath(cx - w / 2 - m, base - h - m, w + m * 2, h + m + ROOT) + '" fill="' + c.surround + '"/>' +
      '<path class="door" d="' + archPath(cx - w / 2, base - h, w, h + ROOT) + '" fill="' + c.door + '"/>' +
      '<circle cx="' + (cx + w * 0.26) + '" cy="' + (base - h * 0.44) + '" r="' + Math.max(1.5, w * 0.075) + '" fill="' + c.knob + '"/>';
  }
  function street(el) {
    var night = el.getAttribute("data-street") === "night", c = night ? NIGHT : DAY, s = "", i = 0;
    // The footer band is shorter than the hero's. Its street is drawn at 60%
    // and repeated, so every building fits whole with room to lift on hover.
    // The band's CSS height (15vw) matches this viewBox, so nothing is cropped.
    var k = night ? 0.6 : 1, H = night ? 216 : 330, base = H - 30, tiles = night ? 2 : 1;
    if (!night) s += '<circle cx="1090" cy="96" r="74" fill="' + c.sun + '"/>';
    for (var t = 0; t < tiles; t++) BLD.forEach(function (b) {
      var g = "", x = (b[1] + t * 1440) * k, w = b[2] * k, h = (b[3] || 0) * k, fill = c[b[4]];
      var outline = !night && b[4] === "white" ? ' stroke="rgba(74,78,81,.2)" stroke-width="1"' : "";
      if (b[0] === "tree") {
        if (night) return; // no trees in the footer: as dark shapes they read oddly among the buildings
        g = '<line x1="' + x + '" y1="' + (base + ROOT) + '" x2="' + x + '" y2="' + (base - w * 0.6) + '" stroke="' + c.stem + '" stroke-width="' + 3 * k + '"/>' +
          '<ellipse cx="' + x + '" cy="' + (base - w * 0.78) + '" rx="' + w * 0.24 + '" ry="' + w * 0.36 + '" fill="' + c.tree + '"/>';
      } else if (b[0] === "house") {
        var roof = w * 0.42, e = 7 * k;
        g = '<path d="M' + (x + e) + "," + (base + ROOT) + " V" + (base - h + roof) + " L" + (x + w / 2) + "," + (base - h + e) + " L" + (x + w - e) + "," + (base - h + roof) + " V" + (base + ROOT) +
          ' Z" fill="' + fill + '" stroke="' + fill + '" stroke-width="' + 14 * k + '" stroke-linejoin="round"/>' +
          (outline ? '<path d="M' + x + "," + (base + ROOT) + " V" + (base - h + roof - 3) + " L" + (x + w / 2) + "," + (base - h) + " L" + (x + w) + "," + (base - h + roof - 3) + " V" + (base + ROOT) + '" fill="none"' + outline + ' stroke-linejoin="round"/>' : "") +
          doorway(c, x + w / 2, w * 0.24, h * 0.42, base, k);
      } else {
        var cols = b[5], rows = b[6], pad = 20 * k, q = 12 * k, gw = (w - pad * 2) / cols, top = base - h + 26 * k, gh = (h - 106 * k) / rows;
        g = '<path d="M' + x + "," + (base + ROOT) + " V" + (base - h + q) + " Q" + x + "," + (base - h) + " " + (x + q) + "," + (base - h) + " H" + (x + w - q) + " Q" + (x + w) + "," + (base - h) + " " + (x + w) + "," + (base - h + q) + " V" + (base + ROOT) + ' Z" fill="' + fill + '"/>';
        for (var rr = 0; rr < rows; rr++) for (var cc = 0; cc < cols; cc++) {
          var lit = (rr * 3 + cc * 5 + b[2] + t) % 4 === 0;
          g += '<path class="win" d="' + archPath(x + pad + cc * gw + gw * 0.22, top + rr * gh, gw * 0.56, gh * 0.66) + '" fill="' + (lit ? c.door : c.win) + '" fill-opacity="' + (night ? (lit ? 0.95 : 0.1) : (lit ? 1 : (b[4] === "tint" ? 1 : 0.5))) + '"/>';
        }
        g += doorway(c, x + w / 2, 30 * k, 56 * k, base, k);
      }
      s += '<g class="rise" style="--d:' + ((i++ % 12) * 0.06).toFixed(2) + 's"><g class="bld">' + g + "</g></g>";
    });
    s += '<rect x="-2000" y="' + base + '" width="5440" height="40" fill="' + c.ground + '"/>';
    el.innerHTML = '<svg viewBox="0 0 1440 ' + H + '" preserveAspectRatio="xMidYMax slice">' + s + "</svg>";
  }
  document.querySelectorAll("[data-street]").forEach(street);

  // ---- Reveal on scroll ----------------------------------------------------
  var targets = document.querySelectorAll("[data-reveal], [data-street]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  }

  // ---- Contact form: mockup only -------------------------------------------
  var form = document.querySelector("[data-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form__status");
      var token = (form.querySelector('[name="cf-turnstile-response"]') || {}).value;
      status.hidden = false;
      if (window.turnstile && !token) { status.textContent = 'Please complete the "Verify you are human" check.'; return; }
      status.textContent ="This is a design mockup. The form is not connected yet, so nothing was sent.";
    });
  }
})();
