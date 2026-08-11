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
    btn_web: "Open in browser",
    badge_apple_alt: "Download on the App Store",
    badge_google_alt: "Get it on Google Play",
    shot_label: "Screenshot",
    lightbox_close: "Close",

    app_podcast_name: "Podcast AM",
    app_podcast_desc: "A focused podcast player with charts, search and reliable background playback. Find top shows and listen your way.",

    app_converter_name: "Converter AM",
    app_converter_desc: "A clean, fast unit and currency converter — lengths, weights, temperatures, currencies and more, all in one place.",

    app_rapport_name: "Rapport AM",
    app_rapport_desc: "Job sheets for tradespeople: record work, hours and materials on site, collect the signature and send everything as a PDF. Works entirely offline.",

    app_feste_name: "Fest AM",
    app_feste_desc: "Find local festivals and events in your region — even offline.",

    app_radio_name: "Radio AM",
    app_radio_desc: "Internet radio without ads — stations from 16 countries, favourites and reliable background playback.",

    avail_rapport: "Available in Germany, Austria and Switzerland only — the app is in German.",
    avail_feste: "Available in Germany only — the app is in German.",
    avail_radio: "Android only, and available in 16 countries",
    avail_radio_list:
      "Austria, Belgium, Czechia, Denmark, France, Germany, Greece, Hungary, Italy, Latvia, Netherlands, Norway, Romania, Sweden, Switzerland, Türkiye.",

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
    btn_web: "Im Browser",
    badge_apple_alt: "Laden im App Store",
    badge_google_alt: "Jetzt bei Google Play",
    shot_label: "Bildschirmfoto",
    lightbox_close: "Schließen",

    app_podcast_name: "Podcast AM",
    app_podcast_desc: "Ein fokussierter Podcast-Player mit Charts, Suche und zuverlässiger Hintergrundwiedergabe. Finde Top-Sendungen und höre, wie du willst.",

    app_converter_name: "Umrechner AM",
    app_converter_desc: "Ein übersichtlicher, schneller Einheiten- und Währungsrechner — Längen, Gewichte, Temperaturen, Währungen und mehr, alles an einem Ort.",

    app_rapport_name: "Rapport AM",
    app_rapport_desc: "Rapportzettel für Handwerksbetriebe: Arbeiten, Zeiten und Material direkt vor Ort erfassen, unterschreiben lassen und alles als PDF verschicken. Läuft komplett offline.",

    app_feste_name: "Fest AM",
    app_feste_desc: "Finde Feste und Veranstaltungen in deiner Region — auch offline.",

    app_radio_name: "Radio AM",
    app_radio_desc: "Internetradio ohne Werbung — Sender aus 16 Ländern, Favoriten und zuverlässige Hintergrundwiedergabe.",

    avail_rapport: "Nur in Deutschland, Österreich und der Schweiz erhältlich — die App ist auf Deutsch.",
    avail_feste: "Nur in Deutschland erhältlich — die App ist auf Deutsch.",
    avail_radio: "Nur für Android und nur in 16 Ländern erhältlich",
    avail_radio_list:
      "Belgien, Dänemark, Deutschland, Frankreich, Griechenland, Italien, Lettland, Niederlande, Norwegen, Österreich, Rumänien, Schweden, Schweiz, Tschechien, Türkei, Ungarn.",

    badge_dev: "In Entwicklung",
    footer_made: "Mit Sorgfalt in Deutschland gemacht.",
    footer_imprint: "Impressum",
    footer_privacy: "Datenschutz",
  },
};

// Offizielle Store-Buttons von Apple und Google, unverändert übernommen. Die
// Dateien liegen lokal, damit beim Aufruf der Seite keine Anfrage an Apple oder
// Google geht. Beide Vorlagen sind schwarz mit heller Kontur und funktionieren
// deshalb im Hell- wie im Dunkelmodus.
const BADGES = {
  apple: (lang) => `assets/badges/apple-${lang}.svg`,
  google: (lang) => `assets/badges/google-${lang}.png`,
};

function setLang(lang) {
  if (!I18N[lang]) lang = "en";
  const dict = I18N[lang];

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] != null) el.textContent = dict[key];
  });

  // Store-Buttons in der passenden Sprache (Hell- und Dunkel-Variante).
  document.querySelectorAll("[data-badge]").forEach((el) => {
    const src = BADGES[el.dataset.badge];
    if (!src) return;
    el.src = src(lang);
    el.alt = el.dataset.badge === "google" ? dict.badge_google_alt : dict.badge_apple_alt;
  });

  // Bildschirmfotos: einige Apps haben je Sprache eigene Aufnahmen.
  document.querySelectorAll(".shot").forEach((btn) => {
    const name = btn.dataset.shot.replace("{lang}", lang);
    const img = btn.querySelector("img");
    const thumb = `assets/shots/${name}.jpg`;
    if (!img.getAttribute("src").endsWith(thumb)) img.setAttribute("src", thumb);
    btn.dataset.full = `assets/shots/${name}-lg.jpg`;

    const card = btn.closest(".card");
    const appName = card ? card.querySelector("h3").textContent : "";
    const nr = [...btn.parentElement.children].indexOf(btn) + 1;
    btn.setAttribute("aria-label", `${appName} — ${dict.shot_label} ${nr}`);
  });

  const close = document.getElementById("lightbox-close");
  if (close) close.setAttribute("aria-label", dict.lightbox_close);

  // Show German-only cards (currently none) only on the German page.
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

// Bildschirmfoto in groß anzeigen.
(function initLightbox() {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (!box || !img) return;

  let lastFocus = null;

  function open(btn) {
    lastFocus = btn;
    img.src = btn.dataset.full;
    img.alt = btn.getAttribute("aria-label") || "";
    box.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lightbox-close").focus();
  }

  function close() {
    box.hidden = true;
    img.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".shot").forEach((btn) => {
    btn.addEventListener("click", () => open(btn));
  });

  box.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !box.hidden) close();
  });
})();

initLang();
