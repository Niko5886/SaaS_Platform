/* ============================================================
   Targo — stat count-up
   Each [data-count] figure eases to its target the first time
   it scrolls into view. A custom data-count-from lets a figure
   count up (default from 1) or down (e.g. from 24 to 0). Prefix
   / suffix / decimals are preserved; reduced motion and browsers
   without IntersectionObserver keep the printed value.
   ============================================================ */
(function () {
  "use strict";

  var DURATION = 1800;
  var DEFAULT_FROM = 1;

  var nums = Array.prototype.slice.call(
    document.querySelectorAll(".stat__num[data-count]")
  );
  if (!nums.length) return;

  function meta(el) {
    return {
      target: parseFloat(el.getAttribute("data-count")),
      from: parseFloat(el.getAttribute("data-count-from") || DEFAULT_FROM),
      decimals: parseInt(el.getAttribute("data-decimals") || "0", 10),
      prefix: el.getAttribute("data-prefix") || "",
      suffix: el.getAttribute("data-suffix") || ""
    };
  }

  function render(el, value, m) {
    el.textContent = m.prefix + value.toFixed(m.decimals) + m.suffix;
  }

  // Ease-out cubic — fast start, gentle landing.
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function run(el) {
    var m = meta(el);
    if (isNaN(m.target)) return;

    // Already at the target (from === to) — just settle on it.
    if (m.from === m.target) {
      render(el, m.target, m);
      return;
    }

    var startTime = null;

    // Works both ways: (target - from) is negative for a count-down.
    function tick(now) {
      if (startTime === null) startTime = now;
      var t = Math.min((now - startTime) / DURATION, 1);
      render(el, m.from + (m.target - m.from) * easeOut(t), m);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        render(el, m.target, m); // exact final value
      }
    }

    requestAnimationFrame(tick);
  }

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // No animation path: leave the static formatted markup untouched.
  if (reduced || typeof IntersectionObserver === "undefined") return;

  // Prime to the start value so a fast scroll never flashes the final figure.
  nums.forEach(function (el) {
    var m = meta(el);
    if (!isNaN(m.target) && m.from !== m.target) render(el, m.from, m);
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach(function (el) {
    observer.observe(el);
  });
})();
