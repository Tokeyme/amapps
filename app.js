// Simple, dependency-free bilingual (EN/DE) text switching.
// To add or change text, edit the dictionaries below. Each translatable
// element in index.html carries a data-i18n="key" attribute.

const I18N = {
  en: {
    page_title: "AM Apps — Apps for iOS & Android",
    meta_desc: "Apps for iOS and Android by Andreas Maier.",
    hero_tagline: "Apps for iOS & Android",
    hero_sub: "Clean, easy-to-use apps that I design and build myself — focused and made with care.",
    hero_by: "by Andreas Maier",
    apps_heading: "The apps",
    btn_appstore: "App Store",
    btn_googleplay: "Google Play",
    app_converter_name: "Converter AM",
    app_converter_desc: "A clean, fast unit and currency converter — lengths, weights, temperatures, currencies and more, all in one place.",
    app_podcast_name: "Podcast AM",
    app_podcast_desc: "A focused podcast player with charts, search and reliable background playback. Find top shows and listen your way.",
    app_feste_name: "Feste AM",
    app_feste_desc: "Find local festivals and events in your region — even offline.",
    badge_dev: "In development",
    footer_made: "Made with care in Germany.",
    footer_imprint: "Imprint",
    footer_privacy: "Privacy",
  },
  de: {
    page_title: "AM Apps — Apps für iOS & Android",
    meta_desc: "Apps für iOS und Android von Andreas Maier.",
    hero_tagline: "Apps für iOS & Android",
    hero_sub: "Einfach zu bedienende, übersichtliche Apps, die ich selbst gestalte und entwickle — fokussiert und mit Sorgfalt gemacht.",
    hero_by: "von Andreas Maier",
    apps_heading: "Die Apps",
    btn_appstore: "App Store",
    btn_googleplay: "Google Play",
    app_converter_name: "Umrechner AM",
    app_converter_desc: "Ein übersichtlicher, schneller Einheiten- und Währungsrechner — Längen, Gewichte, Temperaturen, Währungen und mehr, alles an einem Ort.",
    app_podcast_name: "Podcast AM",
    app_podcast_desc: "Ein fokussierter Podcast-Player mit Charts, Suche und zuverlässiger Hintergrundwiedergabe. Finde Top-Sendungen und höre, wie du willst.",
    app_feste_name: "Feste AM",
    app_feste_desc: "Finde Feste und Veranstaltungen in deiner Region — auch offline.",
    badge_dev: "In Entwicklung",
    footer_made: "Mit Sorgfalt in Deutschland gemacht.",
    footer_imprint: "Impressum",
    footer_privacy: "Datenschutz",
  },
};

function setLang(lang) {
  if (!I18N[lang]) lang = "en";
  const dict = I18N[lang];

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] != null) el.textContent = dict[key];
  });

  // Show German-only cards (e.g. Feste) only on the German page.
  document.querySelectorAll('[data-only="de"]').forEach((el) => {
    el.hidden = lang !== "de";
  });

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });

  if (dict.page_title) document.title = dict.page_title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && dict.meta_desc) meta.content = dict.meta_desc;

  try { localStorage.setItem("amapps_lang", lang); } catch (e) { /* ignore */ }
}

function initLang() {
  let lang = null;
  try { lang = localStorage.getItem("amapps_lang"); } catch (e) { /* ignore */ }
  if (!lang) {
    // English is the default; German visitors get German automatically.
    lang = (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
  }
  setLang(lang);
}

document.querySelectorAll(".lang-switch button").forEach((b) => {
  b.addEventListener("click", () => setLang(b.dataset.lang));
});

initLang();
