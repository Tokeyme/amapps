# AM Apps — Website

Eine schlanke, zweisprachige (EN/DE) statische Startseite für deine Apps.
Kein Build-Schritt, keine Abhängigkeiten — einfach HTML, CSS und ein bisschen JavaScript.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die Startseite (Aufbau & Inhalte) |
| `styles.css` | Das gesamte Design (inkl. Dark Mode automatisch) |
| `app.js` | Sprachumschaltung EN/DE (alle Texte stehen oben in der Datei) |
| `impressum.html` | Impressum (Platzhalter — bitte ausfüllen) |
| `datenschutz.html` | Datenschutz (Platzhalter — deine GitHub-Fassung einsetzen/verlinken) |
| `favicon.svg` | Das kleine „AM"-Logo im Browser-Tab |

## Ansehen (lokal)

Doppelklick auf `index.html` reicht meistens schon. Für eine möglichst echte
Vorschau (mit korrektem Pfad-Verhalten) ein kleiner lokaler Server:

```bash
# im Ordner amapps-website ausführen
python -m http.server 8000
# dann im Browser öffnen: http://localhost:8000
```

## Anpassen

- **Sprache/Texte:** alle Texte stehen in `app.js` ganz oben in `I18N` (Abschnitte `en` und `de`).
- **App-Namen:** „Converter AM" (EN) / „Umrechner AM" (DE) und „Feste AM" lassen sich dort frei ändern.
- **App-Icons:** aktuell Emoji als Platzhalter. Für echte Icons in `index.html` das
  `<div class="icon …">…</div>` durch ein Bild ersetzen, z. B. `<img src="assets/converter.png" alt="">`.
- **Store-Links:** in `index.html` die `href="#"` der App-Store-/Google-Play-Buttons
  durch die echten Links ersetzen (Suche nach `TODO`).
- **Feste-App:** erscheint absichtlich nur auf der **deutschen** Seite (`data-only="de"`).

## Veröffentlichen (kostenlos)

### GitHub Pages
1. Diesen Ordner in ein GitHub-Repository legen.
2. Repo → **Settings → Pages** → Branch `main`, Ordner `/root` → **Save**.
3. Nach kurzer Zeit ist die Seite unter `https://<user>.github.io/<repo>/` online.
4. Eigene Domain (`amapps.app`): unter **Pages → Custom domain** eintragen und beim
   Domain-Anbieter die DNS-Einträge setzen (GitHub zeigt sie an).

### Cloudflare Pages (Alternative)
1. Auf Cloudflare Pages das Repo verbinden, **Framework: None**, **Build command: leer**,
   **Output directory: `/`**.
2. Eigene Domain in Cloudflare hinzufügen — DNS wird automatisch gesetzt.

## Rechtliches (Deutschland)

- **Impressum** ist Pflicht → `impressum.html` mit deinen echten Angaben füllen.
- **Datenschutz** → deine bestehende Erklärung einsetzen.
- Die Seite nutzt **kein Tracking** und **keine Cookies** (nur lokale Sprachspeicherung),
  das hält die Datenschutz-Pflichten minimal.
