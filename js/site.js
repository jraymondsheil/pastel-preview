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

  // ---- Header and mobile menu -------------------------------------------
  document.body.insertAdjacentHTML("afterbegin",
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site-header" data-header><div class="wrap site-header__in">' +
    '<a class="logo" href="index.html" aria-label="Pastel, home"><img src="img/pastel-wordmark.svg" alt="Pastel" width="94" height="34"></a>' +
    '<nav class="nav" aria-label="Main">' + LINKS.map(function (l) { return '<a href="' + l[0] + '"' + cur(l[0]) + ">" + l[1] + "</a>"; }).join("") + "</nav>" +
    '<a class="btn btn--sm" href="index.html#contact">Start a project</a>' +
    '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span>Menu</span><i></i></button>' +
    "</div></header>" +
    '<div class="menu" id="menu"><nav aria-label="Mobile">' +
    LINKS.map(function (l) { return '<a class="menu__link" href="' + l[0] + '">' + l[1] + "</a>"; }).join("") +
    '</nav><a class="btn" href="index.html#contact" style="align-self:flex-start">Start a project</a></div>');

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
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  var lastY = 0;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    header.classList.toggle("is-hidden", y > 500 && y > lastY && !menu.classList.contains("is-open"));
    lastY = y;
  }, { passive: true });

  // ---- Footer ------------------------------------------------------------
  var tone = document.body.getAttribute("data-footer-on") || "";
  document.body.insertAdjacentHTML("beforeend",
    '<footer class="site-footer' + (tone ? " on-" + tone : "") + '">' +
    '<div class="street" data-street="night" aria-hidden="true"></div>' +
    '<div class="site-footer__body"><div class="wrap site-footer__in"><div class="site-footer__top">' +
    '<div class="site-footer__brand"><img src="img/pastel-wordmark-reverse.svg" alt="Pastel" width="210" height="76">' +
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
