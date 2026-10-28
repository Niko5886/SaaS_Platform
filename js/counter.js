/* ============================================================
   Targo — stat count-up
   Each [data-count] figure eases from 1 up to its target the
   first time it scrolls into view. Prefix / suffix / decimals
   are preserved, targets of 0 stay static, reduced motion and
   browsers without IntersectionObserver keep the printed value.
   ============================================================ */
(function () {
  "use strict";

  var DURATION = 1800;
  var START = 1;

  var nums = Array.prototype.slice.call(
    document.querySelectorAll(".stat__num[data-count]")
  );
  if (!nums.length) return;

  function meta(el) {
    return {
      target: parseFloat(el.getAttribute("data-count")),
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

    // Nothing to count toward zero — just settle on it.
    if (m.target <= START) {
      render(el, m.target, m);
      return;
    }

    var startTime = null;

    function tick(now) {
      if (startTime === null) startTime = now;
      var t = Math.min((now - startTime) / DURATION, 1);
      render(el, START + (m.target - START) * easeOut(t), m);
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
    if (!isNaN(m.target) && m.target > START) render(el, START, m);
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
