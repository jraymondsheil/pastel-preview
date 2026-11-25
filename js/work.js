/* Pastel agency site (mockup): the work.
   PROJECTS holds the four real client projects. Each has a desktop and a
   phone screenshot in img/work/ (see the notes for how they were captured).
   To add a project: capture the two screenshots and add an entry.
   The real projects appear on the work page and the project pages. The home
   page shows four drawn samples (SAMPLES) for now. The drawn artwork (ART)
   illustrates those samples and the unlisted services page, and does not use
   the Pastel door. */
(function () {
  "use strict";

  var PAL = {
    forest: { bg: "#24382F", fg: "#EFE7D6", a: "#C9A66B", b: "#3A5345" },
    clay: { bg: "#E9D9C8", fg: "#5A2E22", a: "#B5553C", b: "#F6EEE4" },
    harbor: { bg: "#1F2F44", fg: "#EAF0F4", a: "#8FB4CF", b: "#30465F" },
    plum: { bg: "#EADFE4", fg: "#4A2A3A", a: "#9B5C78", b: "#F7F1F3" },
    ochre: { bg: "#D9A441", fg: "#2B2A26", a: "#F5EBD3", b: "#B98A2E" },
    stone: { bg: "#DAD7D0", fg: "#2F3335", a: "#7C8B7F", b: "#F3F1EC" },
    sage: { bg: "#96A598", fg: "#2F3335", a: "#E4C9BA", b: "#F8F7F4" },
    night: { bg: "#2F3335", fg: "#F8F7F4", a: "#E4C9BA", b: "#454A4D" }
  };

  var SIZE = {
    tall: [400, 500], square: [400, 400], wide: [600, 400], banner: [1050, 500],
    door: [400, 600], doorA: [400, 600], doorB: [400, 510], doorC: [400, 660], doorD: [400, 550]
  };

  function r(n) { return Math.round(n * 10) / 10; }
  function rect(x, y, w, h, attrs) {
    return '<rect x="' + r(x) + '" y="' + r(y) + '" width="' + r(w) + '" height="' + r(h) + '" ' + attrs + "/>";
  }
  function circle(cx, cy, rad, attrs) {
    return '<circle cx="' + r(cx) + '" cy="' + r(cy) + '" r="' + r(rad) + '" ' + attrs + "/>";
  }
  function serif(x, y, size, fill, text, extra) {
    return '<text x="' + r(x) + '" y="' + r(y) + '" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-weight="300" font-size="' +
      r(size) + '" fill="' + fill + '" ' + (extra || "") + ">" + text + "</text>";
  }
  function caps(x, y, size, fill, text) {
    return '<text x="' + r(x) + '" y="' + r(y) + '" text-anchor="middle" font-family="Inter, sans-serif" font-weight="500" font-size="' +
      r(size) + '" letter-spacing="' + r(size * 0.28) + '" fill="' + fill + '">' + text + "</text>";
  }
  function no(n) { return "N&#186; 0" + n; }

  // A building front: a block with a grid of windows, standing on `base`.
  function building(x, base, w, h, fill, win, cols, rows) {
    var s = rect(x, base - h, w, h, 'fill="' + fill + '"'), gx = w / (cols * 2 + 1), gy = (h * 0.82) / (rows * 2);
    for (var i = 0; i < rows; i++) for (var j = 0; j < cols; j++) {
      s += rect(x + gx * (1 + j * 2), base - h + gy * (1 + i * 2), gx, gy * 0.9, 'fill="' + win + '" fill-opacity="0.8"');
    }
    return s;
  }

  var ART = {
    wordmark: function (w, h, p, n) {
      var cx = w / 2, cy = h * 0.25;
      return rect(0, 0, w, h, 'fill="' + p.bg + '"') +
        circle(cx, cy, 34, 'fill="none" stroke="' + p.a + '" stroke-width="1.5"') +
        '<path d="M' + (cx - 20) + "," + r(cy + 8) + " A20,20 0 0 1 " + (cx + 20) + "," + r(cy + 8) + ' Z" fill="' + p.a + '"/>' +
        '<line x1="' + (cx - 26) + '" x2="' + (cx + 26) + '" y1="' + r(cy + 14) + '" y2="' + r(cy + 14) + '" stroke="' + p.a + '" stroke-width="1.5"/>' +
        serif(cx, h * 0.62, Math.min(w, h) * 0.2, p.fg, no(n), 'letter-spacing="2"') +
        '<line x1="' + (cx - 34) + '" x2="' + (cx + 34) + '" y1="' + r(h * 0.69) + '" y2="' + r(h * 0.69) + '" stroke="' + p.a + '"/>' +
        caps(cx, h * 0.76, 11, p.fg, "SAMPLE IDENTITY");
    },

    browser: function (w, h, p) {
      var fw = w * 0.8, fh = h * 0.68, fx = (w - fw) / 2, fy = (h - fh) / 2, top = fy + 26, hh = fh * 0.46;
      var cw = (fw - 40 - 24) / 3, cy = top + hh + 18, s = "";
      s += rect(0, 0, w, h, 'fill="' + p.bg + '"');
      s += rect(fx + 10, fy + 12, fw, fh, 'rx="10" fill="' + p.fg + '" fill-opacity="0.14"');
      s += rect(fx, fy, fw, fh, 'rx="10" fill="' + p.b + '"');
      for (var i = 0; i < 3; i++) s += circle(fx + 16 + i * 12, fy + 13, 3.5, 'fill="' + p.fg + '" fill-opacity="0.35"');
      s += rect(fx, top, fw, hh, 'fill="' + p.a + '"');
      s += circle(fx + fw * 0.9, top + hh * 0.26, hh * 0.13, 'fill="' + p.b + '" fill-opacity="0.55"');
      s += building(fx + fw * 0.5, top + hh, fw * 0.22, hh * 0.8, p.fg, p.b, 3, 5);
      s += building(fx + fw * 0.74, top + hh, fw * 0.18, hh * 0.5, p.bg, p.fg, 2, 3);
      s += rect(fx + 20, top + hh * 0.3, fw * 0.24, 9, 'rx="4" fill="' + p.b + '"');
      s += rect(fx + 20, top + hh * 0.3 + 17, fw * 0.16, 9, 'rx="4" fill="' + p.b + '"');
      s += rect(fx + 20, top + hh * 0.3 + 42, 58, 16, 'rx="8" fill="' + p.fg + '"');
      for (var c = 0; c < 3; c++) {
        var x = fx + 20 + c * (cw + 12);
        s += rect(x, cy, cw, fh * 0.2, 'rx="5" fill="' + p.bg + '"');
        s += rect(x, cy + fh * 0.2 + 9, cw * 0.7, 5, 'rx="2" fill="' + p.fg + '" fill-opacity="0.55"');
        s += rect(x, cy + fh * 0.2 + 19, cw * 0.45, 5, 'rx="2" fill="' + p.fg + '" fill-opacity="0.28"');
      }
      return s;
    },

    phone: function (w, h, p) {
      var ph = Math.min(w * 0.84, h * 0.84), pw = ph / 2, px = (w - pw) / 2, py = (h - ph) / 2, s = "";
      var base = py + 6 + ph * 0.36;
      s += rect(0, 0, w, h, 'fill="' + p.bg + '"');
      s += circle(w / 2, h / 2, Math.min(w, h) * 0.44, 'fill="' + p.b + '"');
      s += rect(px, py, pw, ph, 'rx="26" fill="' + p.fg + '"');
      s += rect(px + 6, py + 6, pw - 12, ph - 12, 'rx="21" fill="' + p.bg + '"');
      s += rect(px + 6, py + 6, pw - 12, ph * 0.36, 'rx="21" fill="' + p.a + '"');
      s += rect(px + 6, base - 24, pw - 12, 24, 'fill="' + p.a + '"');
      s += building(px + pw * 0.2, base, pw * 0.3, ph * 0.27, p.fg, p.a, 2, 4);
      s += building(px + pw * 0.54, base, pw * 0.26, ph * 0.17, p.b, p.fg, 2, 3);
      s += rect(px + 18, py + ph * 0.43, pw * 0.5, 8, 'rx="4" fill="' + p.fg + '"');
      s += rect(px + 18, py + ph * 0.43 + 15, pw * 0.34, 6, 'rx="3" fill="' + p.fg + '" fill-opacity="0.5"');
      for (var i = 0; i < 2; i++) {
        var y = py + ph * 0.54 + i * (ph * 0.15);
        s += rect(px + 18, y, pw - 36, ph * 0.12, 'rx="8" fill="' + p.b + '"');
        s += rect(px + 26, y + ph * 0.025, ph * 0.07, ph * 0.07, 'rx="4" fill="' + p.a + '"');
        s += rect(px + 34 + ph * 0.07, y + ph * 0.035, pw * 0.3, 5, 'rx="2" fill="' + p.fg + '" fill-opacity="0.8"');
        s += rect(px + 34 + ph * 0.07, y + ph * 0.035 + 11, pw * 0.2, 5, 'rx="2" fill="' + p.fg + '" fill-opacity="0.45"');
      }
      s += rect(px + 18, py + ph - 46, pw - 36, 24, 'rx="12" fill="' + p.fg + '"');
      return s;
    },

    marks: function (w, h, p, n) {
      var hw = w / 2, hh = h / 2, m = Math.min(hw, hh), s = "";
      s += rect(0, 0, w, h, 'fill="' + p.bg + '"');
      s += rect(hw, 0, hw, hh, 'fill="' + p.fg + '"');
      s += rect(0, hh, hw, hh, 'fill="' + p.b + '"');
      // 1: ring mark
      s += circle(hw / 2, hh / 2, m * 0.3, 'fill="none" stroke="' + p.fg + '" stroke-width="1.5"');
      s += circle(hw / 2, hh / 2, m * 0.12, 'fill="' + p.a + '"');
      // 2: reversed
      var d = m * 0.26, cx2 = hw * 1.5, cy2 = hh / 2;
      s += '<path d="M' + r(cx2) + "," + r(cy2 - d) + " L" + r(cx2 + d) + "," + r(cy2) + " L" + r(cx2) + "," + r(cy2 + d) + " L" + r(cx2 - d) + "," + r(cy2) + ' Z" fill="none" stroke="' + p.bg + '" stroke-width="1.5"/>';
      s += circle(cx2, cy2, m * 0.07, 'fill="' + p.bg + '"');
      // 3: wordmark
      s += serif(hw / 2, hh * 1.5 + 8, m * 0.26, p.fg, no(n));
      s += caps(hw / 2, hh * 1.5 + 34, 8.5, p.fg, "SAMPLE MARK");
      // 4: pattern
      var cols = 4, rows = 4, g = hw * 0.6 / cols, gx = hw + hw * 0.2, gy = hh + (hh - rows * g) / 2;
      for (var i = 0; i < rows; i++) for (var j = 0; j < cols; j++) {
        s += circle(gx + j * g + g / 2, gy + i * g + g / 2, g * 0.3, 'fill="' + ((i + j) % 2 ? p.a : p.fg) + '"');
      }
      return s;
    },

    map: function (w, h, p) {
      var s = rect(0, 0, w, h, 'fill="' + p.bg + '"'), i;
      s += '<path d="M0,' + r(h * 0.72) + " C" + r(w * 0.25) + "," + r(h * 0.6) + " " + r(w * 0.4) + "," + r(h * 0.95) + " " + r(w * 0.7) + "," + r(h * 0.84) +
        " S" + r(w * 0.95) + "," + r(h * 0.7) + " " + w + "," + r(h * 0.78) + " V" + h + ' H0 Z" fill="' + p.a + '" fill-opacity="0.22"/>';
      for (i = 0; i < 6; i++) {
        var y = h * (0.08 + i * 0.17), x = w * (0.06 + i * 0.18);
        s += '<line x1="0" y1="' + r(y) + '" x2="' + w + '" y2="' + r(y + h * 0.07) + '" stroke="' + p.b + '" stroke-width="' + (i % 3 === 1 ? 13 : 5) + '"/>';
        s += '<line x1="' + r(x) + '" y1="0" x2="' + r(x - w * 0.08) + '" y2="' + h + '" stroke="' + p.b + '" stroke-width="' + (i % 3 === 0 ? 13 : 5) + '"/>';
      }
      var cx = w * 0.56, cy = h * 0.46, m = Math.min(w, h);
      [0.34, 0.23, 0.12].forEach(function (k) {
        s += circle(cx, cy, m * k, 'fill="' + p.a + '" fill-opacity="0.2" stroke="' + p.fg + '" stroke-opacity="0.65" stroke-dasharray="3 6"');
      });
      s += circle(cx, cy, 10, 'fill="' + p.fg + '"') + circle(cx, cy, 3.5, 'fill="' + p.bg + '"');
      [[0.2, 0.24, 0.085], [0.26, 0.8, 0.065], [0.86, 0.2, 0.055]].forEach(function (q) {
        s += circle(w * q[0], h * q[1], m * q[2], 'fill="none" stroke="' + p.fg + '" stroke-opacity="0.6"');
        s += circle(w * q[0], h * q[1], 4.5, 'fill="' + p.a + '"');
      });
      return s;
    },

    search: function (w, h, p) {
      var x = w * 0.12, cw = w * 0.76, y0 = h * 0.12, s = rect(0, 0, w, h, 'fill="' + p.bg + '"');
      s += rect(x, y0, cw, 42, 'rx="21" fill="' + p.b + '"');
      s += circle(x + 24, y0 + 20, 6.5, 'fill="none" stroke="' + p.fg + '" stroke-width="1.6"');
      s += '<line x1="' + r(x + 29) + '" y1="' + r(y0 + 25) + '" x2="' + r(x + 34) + '" y2="' + r(y0 + 30) + '" stroke="' + p.fg + '" stroke-width="1.6" stroke-linecap="round"/>';
      s += rect(x + 46, y0 + 17, cw * 0.42, 7, 'rx="3" fill="' + p.fg + '" fill-opacity="0.55"');
      var ch = (h * 0.7 - 62 - 24) / 3;
      for (var i = 0; i < 3; i++) {
        var y = y0 + 62 + i * (ch + 12), first = i === 0;
        s += rect(x, y, cw, ch, 'rx="10" fill="' + (first ? p.a : p.b) + '"');
        var tc = first ? p.bg : p.fg, tx = x + 18;
        if (first) {
          s += rect(tx, y + ch * 0.2, 26, 15, 'rx="4" fill="' + p.bg + '"');
          s += '<text x="' + r(tx + 13) + '" y="' + r(y + ch * 0.2 + 11) + '" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600" font-size="9" fill="' + p.a + '">Ad</text>';
        }
        s += rect(tx + (first ? 34 : 0), y + ch * 0.2 + 3, cw * 0.36, 8, 'rx="4" fill="' + tc + '"');
        s += rect(tx, y + ch * 0.2 + 26, cw * 0.5, 5, 'rx="2" fill="' + tc + '" fill-opacity="0.55"');
        s += rect(tx, y + ch * 0.2 + 37, cw * 0.38, 5, 'rx="2" fill="' + tc + '" fill-opacity="0.38"');
        var th = Math.min(ch - 24, 56), bx = x + cw - th - 14, by = y + (ch - th) / 2;
        s += rect(bx, by, th, th, 'rx="6" fill="' + p.bg + '" fill-opacity="' + (first ? 0.3 : 1) + '"');
        s += building(bx + th * 0.26, by + th, th * 0.48, th * 0.72, first ? p.bg : p.a, first ? p.a : p.bg, 2, 3);
      }
      return s;
    },

    social: function (w, h, p, n) {
      var m = Math.min(w, h) * 0.8, gap = 9, c = (m - gap * 2) / 3, x0 = (w - m) / 2, y0 = (h - m) / 2;
      var fills = [p.a, p.b, p.fg, p.fg, p.a, p.b, p.b, p.fg, p.a], s = rect(0, 0, w, h, 'fill="' + p.bg + '"');
      for (var i = 0; i < 9; i++) {
        var x = x0 + (i % 3) * (c + gap), y = y0 + Math.floor(i / 3) * (c + gap), f = fills[i];
        var on = f === p.fg ? p.bg : p.fg;
        s += rect(x, y, c, c, 'rx="5" fill="' + f + '"');
        if (i % 4 === 0) s += building(x + c * 0.3, y + c, c * 0.4, c * 0.66, on, f, 2, 3);
        else if (i % 4 === 1) s += circle(x + c / 2, y + c / 2, c * 0.24, 'fill="none" stroke="' + on + '" stroke-width="1.5"');
        else if (i % 4 === 2) s += serif(x + c / 2, y + c * 0.6, c * 0.3, on, no(n));
        else s += rect(x + c * 0.2, y + c * 0.4, c * 0.6, 5, 'rx="2" fill="' + on + '"') + rect(x + c * 0.2, y + c * 0.4 + 12, c * 0.4, 5, 'rx="2" fill="' + on + '" fill-opacity="0.6"');
      }
      return s;
    },

    sign: function (w, h, p, n) {
      var s = rect(0, 0, w, h, 'fill="' + p.bg + '"'), m = Math.min(w, h), gy = h * 0.76, sw = Math.min(w * 0.46, 300), sh = h * 0.24, sx = (w - sw) / 2, sy = gy - sh - h * 0.04;
      s += circle(w * 0.76, h * 0.3, m * 0.15, 'fill="' + p.a + '"');
      s += '<line x1="' + r(w * 0.16) + '" y1="' + r(gy) + '" x2="' + r(w * 0.16) + '" y2="' + r(h * 0.5) + '" stroke="' + p.fg + '" stroke-width="3"/>';
      s += '<ellipse cx="' + r(w * 0.16) + '" cy="' + r(h * 0.46) + '" rx="' + r(m * 0.1) + '" ry="' + r(m * 0.14) + '" fill="' + p.fg + '" fill-opacity="0.75"/>';
      s += rect(0, gy, w, h - gy, 'fill="' + p.fg + '" fill-opacity="0.22"');
      s += rect(sx + sw * 0.08, gy - h * 0.04, sw * 0.84, h * 0.04, 'fill="' + p.fg + '" fill-opacity="0.7"');
      s += rect(sx, sy, sw, sh, 'rx="5" fill="' + p.fg + '"');
      s += circle(sx + sh * 0.36, sy + sh / 2, sh * 0.16, 'fill="' + p.a + '"');
      s += serif(sx + sw * 0.58, sy + sh * 0.56, sh * 0.38, p.b, no(n));
      s += caps(sx + sw * 0.58, sy + sh * 0.8, Math.max(7, sh * 0.085), p.b, "SAMPLE COMMUNITY");
      return s;
    }
  };

  function art(kind, pal, ratio, n) {
    var d = SIZE[ratio] || SIZE.square;
    return '<svg viewBox="0 0 ' + d[0] + " " + d[1] + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sample artwork">' +
      ART[kind](d[0], d[1], PAL[pal], n || 1) + "</svg>";
  }

  // ---- The work: four real projects ------------------------------------------
  // `services` is exactly what Pastel did on each, as the owner credited it.
  // `bg` is the Pastel colour the screens stand on and `ground` the line
  // under them on the work page. Keep both to the palette.
  var PROJECTS = [
    {
      slug: "trevian-townhomes", shot: "trevian", bg: "#96A598", ground: "#4A4E51",
      title: "Trevian Townhomes", place: "Winnetka and Wilmette, Illinois",
      tag: "Renovated townhomes on Chicago's North Shore",
      services: ["Website development"],
      about: "Trevian Townhomes is a collection of renovated townhomes across three properties in Winnetka and Wilmette, on Chicago's North Shore.",
      did: "We developed the property website."
    },
    {
      slug: "hawthorne-management-services", shot: "hms", bg: "#E4C9BA", ground: "#4A4E51",
      title: "Hawthorne Management Services", place: "Mundelein, Illinois",
      tag: "Apartment ownership and investment in Mundelein",
      services: ["Brand identity", "Logo design & development", "Website design & development"],
      about: "Hawthorne Management Services is an apartment ownership and investment group whose communities are in Mundelein, Illinois.",
      did: "We created the brand identity, designed and developed the logo, and designed and developed the portfolio website."
    },
    {
      slug: "lakeside-village", shot: "lakeside", bg: "#4A4E51", ground: "#E4C9BA",
      title: "Lakeside Village", place: "Mundelein, Illinois",
      tag: "Apartment homes in a park-like setting by Diamond Lake",
      services: ["Website development"],
      about: "Lakeside Village is an apartment community in a park-like setting in Mundelein, Illinois, steps from Diamond Lake.",
      did: "We developed the property website."
    },
    {
      slug: "portage-park-theater", shot: "portage", bg: "#E3E8E3", ground: "#96A598",
      title: "Portage Park Theater Apartments", place: "Portage Park, Chicago",
      tag: "Rehabbed apartments in the heart of Portage Park",
      services: ["Website development"],
      about: "Portage Park Theater Apartments are completely rehabbed apartments in the heart of Chicago's Portage Park neighborhood.",
      did: "We developed the property website."
    }
  ];
  function shot(p, kind) { return "img/work/" + p.shot + "-" + kind + ".jpg?v=3"; }

  // A browser window and a phone holding the real screenshots, on a flat
  // colour. `mode` is "both", "browser" or "phone". With `arch`, the group
  // starts below the curve of an arch-topped frame.
  var uid = 0;
  function siteArt(p, w, h, mode, arch) {
    var id = "shot" + (uid++), GH = mode === "browser" ? 227 : 404;
    var f = arch ? Math.min(1.08, (h - 160 - 34) / GH) : Math.min(1.5, (h - 90) / GH, (w - 60) / 400);
    var top = arch ? 160 : (h - GH * f) / 2, g = "";
    function image(href, x, y, iw, ih) { return '<image href="' + href + '" x="' + x + '" y="' + y + '" width="' + iw + '" height="' + ih + '" preserveAspectRatio="xMidYMin slice"/>'; }
    if (mode !== "phone") {
      g += '<clipPath id="' + id + 'a"><rect x="28" y="0" width="344" height="217" rx="8"/></clipPath>' +
        rect(37, 11, 344, 217, 'rx="8" fill="#2F3335" fill-opacity="0.18"') +
        '<g clip-path="url(#' + id + 'a)">' + rect(28, 0, 344, 217, 'fill="#F8F7F4"') +
        circle(41, 11, 3, 'fill="#4A4E51" fill-opacity="0.35"') + circle(51, 11, 3, 'fill="#4A4E51" fill-opacity="0.35"') + circle(61, 11, 3, 'fill="#4A4E51" fill-opacity="0.35"') +
        image(shot(p, "desktop"), 28, 22, 344, 195) + "</g>";
    }
    if (mode === "both") {
      g += '<clipPath id="' + id + 'b"><rect x="264" y="156" width="106" height="240" rx="11"/></clipPath>' +
        rect(258, 150, 118, 252, 'rx="17" fill="#2F3335"') +
        '<g clip-path="url(#' + id + 'b)">' + image(shot(p, "mobile"), 264, 156, 106, 240) + "</g>";
    }
    if (mode === "phone") {
      g += '<clipPath id="' + id + 'b"><rect x="114" y="8" width="172" height="388" rx="18"/></clipPath>' +
        rect(113, 9, 190, 404, 'rx="26" fill="#2F3335" fill-opacity="0.18"') +
        rect(105, 0, 190, 404, 'rx="26" fill="#2F3335"') +
        '<g clip-path="url(#' + id + 'b)">' + image(shot(p, "mobile"), 114, 8, 172, 388) + "</g>";
    }
    return '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="The ' + p.title + ' website">' +
      rect(0, 0, w, h, 'fill="' + p.bg + '"') +
      '<g transform="translate(' + r(w / 2) + "," + r(top) + ") scale(" + r(f * 100) / 100 + ') translate(-200,0)">' + g + "</g></svg>";
  }

  var DOORS = ["doorA", "doorB", "doorC", "doorD"];
  function link(p) { return "project.html?p=" + p.slug; }

  // Home: four drawn samples in arch-topped frames standing on a ground line.
  // The real projects were tried here (2026-11-24) and did not sit well in
  // the arches, so the home page shows samples again until a better way to
  // show real work is found. They are marked "Sample" and lead to the work
  // page, where the real projects are.
  var SAMPLES = [
    { title: "A garden-style community", tag: "Website redesign and local search", services: ["Websites", "SEO"], art: "browser", pal: "clay" },
    { title: "A lakefront lease-up", tag: "Name, identity and launch website", services: ["Brand identity", "Logo development", "Websites"], art: "wordmark", pal: "forest" },
    { title: "A regional portfolio", tag: "One company site, every community", services: ["Websites"], art: "phone", pal: "harbor" },
    { title: "A mid-rise in the city", tag: "Paid search and geotargeting for opening", services: ["SEM", "Geotargeting"], art: "map", pal: "plum" }
  ];
  function tile(s, i) {
    var ratio = DOORS[i % DOORS.length], d = SIZE[ratio];
    return '<a class="tile" href="work.html" data-reveal style="--d:' + ((i % 4) * 0.08) + 's">' +
      '<figure class="tile__art" style="aspect-ratio:' + d[0] + "/" + d[1] + '"><span class="chip">Sample</span>' + art(s.art, s.pal, ratio, i + 1) + "</figure>" +
      '<div class="tile__meta"><h3>' + s.title + "</h3><p>" + s.tag + '</p><span class="tile__tags">' + s.services.join(", ") + "</span></div></a>";
  }
  var feat = document.querySelector('[data-work="featured"]');
  if (feat) feat.innerHTML = SAMPLES.map(tile).join("");

  // Work page: one row per project. A browser window and a phone holding the
  // real screenshots stand on the project's colour and a ground line; the
  // name, place and credit sit beneath.
  var all = document.querySelector('[data-work="all"]');
  if (all) {
    all.innerHTML = PROJECTS.map(function (p, i) {
      return '<a class="proj" href="' + link(p) + '" style="--bg:' + p.bg + ";--ground:" + p.ground + '" data-reveal>' +
        '<div class="proj__stage">' +
        '<div class="proj__browser"><div class="proj__bar"><i></i><i></i><i></i></div>' +
        '<img src="' + shot(p, "desktop") + '" alt="The ' + p.title + ' website on a desktop screen" width="1600" height="904" loading="lazy"></div>' +
        '<div class="proj__phone"><img src="' + shot(p, "mobile") + '" alt="The ' + p.title + ' website on a phone" width="780" height="1688" loading="lazy"></div>' +
        "</div>" +
        '<div class="proj__meta"><div><p class="proj__n">0' + (i + 1) + " &middot; " + p.place + "</p><h2>" + p.title + "</h2></div>" +
        '<div class="proj__info"><p>' + p.tag + '.</p><ul class="proj__did">' +
        p.services.map(function (x) { return "<li>" + x + "</li>"; }).join("") +
        '</ul><span class="link">View project <span>&rarr;</span></span></div></div></a>';
    }).join("");
  }
  document.querySelectorAll("[data-count]").forEach(function (el) {
    el.textContent = (PROJECTS.length < 10 ? "0" : "") + PROJECTS.length;
  });

  // Standalone drawn artwork (unlisted services page): <figure data-art="browser" data-pal="clay" data-ratio="door">
  document.querySelectorAll("[data-art]").forEach(function (el, i) {
    el.insertAdjacentHTML("beforeend", art(el.getAttribute("data-art"), el.getAttribute("data-pal"), el.getAttribute("data-ratio") || "tall", i + 1));
  });

  // Project page.
  var page = document.querySelector("[data-case]");
  if (page) {
    var slug = new URLSearchParams(location.search).get("p");
    var idx = Math.max(0, PROJECTS.findIndex(function (q) { return q.slug === slug; }));
    var pr = PROJECTS[idx], next = PROJECTS[(idx + 1) % PROJECTS.length];
    var set = function (sel, html) { var el = page.querySelector(sel); if (el) el.innerHTML = html; };
    document.title = pr.title + " | Pastel";
    set("[data-case-title]", pr.title);
    set("[data-case-tag]", pr.tag + ".");
    set("[data-case-client]", pr.title);
    set("[data-case-scope]", pr.services.join("<br>"));
    set("[data-case-place]", pr.place);
    set("[data-case-about]", pr.about);
    set("[data-case-did]", pr.did);
    set("[data-case-hero]", '<img src="' + shot(pr, "desktop") + '" alt="The ' + pr.title + ' website on a desktop screen" width="1600" height="904">');
    set("[data-case-g1]", siteArt(pr, 400, 500, "phone", false));
    set("[data-case-g2]", siteArt(pr, 400, 500, "browser", false));
    var nx = page.querySelector("[data-case-next]");
    if (nx) {
      nx.href = link(next);
      nx.querySelector("h2").textContent = next.title;
    }
  }
})();
