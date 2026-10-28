/* ============================================================
   Targo — scroll reveal
   Adds `is-visible` to .reveal elements as they enter the
   viewport. Flags <html> with `reveal-ready` so the CSS only
   hides them once we can actually reveal them — honours
   prefers-reduced-motion and gracefully degrades on browsers
   without IntersectionObserver.
   ============================================================ */
(function () {
  "use strict";

  var reveals = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );
  if (!reveals.length) return;

  function showAll() {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // No observer support or reduced motion → reveal everything, no animation.
  if (reduced || typeof IntersectionObserver === "undefined") {
    showAll();
    return;
  }

  // Safe to hide-then-animate: let the CSS take over.
  document.documentElement.classList.add("reveal-ready");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
