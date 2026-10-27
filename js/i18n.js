/* ============================================================
   Targo — bilingual (BG / EN) internationalization
   Lightweight, dependency-free. Text nodes opt in with a
   `data-i18n="key"` attribute; the staircase headline is
   re-rendered per language so each reads cleanly.
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "targo_lang";
  var DEFAULT_LANG = "en";

  /* ---- Dictionaries ---- */
  var DICT = {
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.contact": "Contact us",
      "hero.cta": "Get started",
      "about.about": "About",
      "about.business": "Business",
      "about.p":
        "Targo builds the testing infrastructure modern teams rely on. " +
        "From automated pipelines to full-scale QA audits, we make sure " +
        "your software ships fast and breaks nothing. Hundreds of releases, " +
        "zero surprises.",
      "about.learn": "Learn more",
      "doc.title": "Targo — Scaling the platform for your business"
    },
    bg: {
      "nav.home": "Начало",
      "nav.about": "За нас",
      "nav.contact": "Контакти",
      "hero.cta": "Започнете",
      "about.about": "За",
      "about.business": "Бизнеса",
      "about.p":
        "Targo изгражда тестовата инфраструктура, на която разчитат " +
        "модерните екипи. От автоматизирани пайплайни до цялостни QA одити — " +
        "гарантираме, че софтуерът ви излиза бързо и нищо не се чупи. " +
        "Стотици внедрявания, нула изненади.",
      "about.learn": "Научете повече",
      "doc.title": "Targo — Мащабираме платформата за вашия бизнес"
    }
  };

  /* ---- Staircase headline (line count differs per language) ---- */
  var HEADLINE = {
    en: [
      { t: "Scaling" },
      { t: "The" },
      { t: "Platform" },
      { t: "For", indent: true },
      { t: "Your", indent: true },
      { t: "Business", indent: true, accent: true }
    ],
    bg: [
      { t: "Мащабираме" },
      { t: "Платформата" },
      { t: "За", indent: true },
      { t: "Вашия", indent: true },
      { t: "Бизнес", indent: true, accent: true }
    ]
  };

  function renderHeadline(lang) {
    var h1 = document.querySelector(".hero__headline");
    if (!h1) return;
    var lines = HEADLINE[lang] || HEADLINE[DEFAULT_LANG];
    h1.textContent = "";
    lines.forEach(function (line) {
      var span = document.createElement("span");
      span.className =
        "hero__line" +
        (line.indent ? " hero__line--indent" : "") +
        (line.accent ? " hero__line--accent" : "");
      span.textContent = line.t;
      h1.appendChild(span);
    });
  }

  function apply(lang) {
    if (!DICT[lang]) lang = DEFAULT_LANG;
    var dict = DICT[lang];

    // Translate every opted-in text node
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    renderHeadline(lang);

    // Document-level language + title
    document.documentElement.lang = lang;
    if (dict["doc.title"]) document.title = dict["doc.title"];

    // Reflect state on the switcher (aria-current marks the active item)
    document.querySelectorAll(".lang__btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-current", active ? "true" : "false");
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable — carry on */
    }
  }

  function initialLang() {
    var saved;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    if (saved && DICT[saved]) return saved;
    var nav = (navigator.language || DEFAULT_LANG).toLowerCase();
    return nav.indexOf("bg") === 0 ? "bg" : DEFAULT_LANG;
  }

  // Script is deferred, so the DOM is ready here.
  apply(initialLang());

  document.querySelectorAll(".lang__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.getAttribute("data-lang"));
    });
  });
})();
