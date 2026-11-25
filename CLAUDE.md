# Hinweise für Claude

Statische Shop-Website (nur HTML, CSS, JavaScript, keine Frameworks, kein Build-Schritt).
Live über GitHub Pages: https://fayzaris-arena.github.io/fayzariswebseite/
Kommunikation mit dem Inhaber auf Deutsch, einfach und ohne Fachjargon.

## Veröffentlichen
- GitHub Pages baut automatisch aus dem Branch `main` (Ordner `/`). Was auf `main` landet, ist nach ca. 1 Minute live.
- Wünscht der Inhaber eine Änderung „live“, die Änderung auf `main` bringen (direkt oder per Pull Request, den der Inhaber bestätigt) und danach die Live-Seite prüfen.

## Wo ändere ich was?
- Farben, Schriften, Abstände: `assets/css/style.css`, Block `:root` ganz oben
- Shopname, Kontaktdaten, Ankündigungsleiste, Versandkosten: `assets/js/daten.js` → `SHOP`
- Produkte: `assets/js/daten.js` → `PRODUKTE` (ohne `bild` wird ein farbiger Platzhalter gezeichnet)
- Menüpunkte: `assets/js/shop.js` → `NAV`; Kopf- und Fußzeile werden dort für alle Seiten erzeugt
- Seitentexte: die jeweilige `.html`-Datei

## Regeln des Inhabers
- Keine Zahlungsanbieter (PayPal, Stripe usw.) einbauen, bis ausdrücklich gewünscht.
- Nichts Kostenpflichtiges abschließen.
- Bei allem, was Geld, Passwörter oder Verträge betrifft: anhalten und fragen.
- Keine externen Schriften/Skripte von Drittservern (z. B. Google Fonts) einbinden, ohne zu fragen (Datenschutz).
- Impressum und Datenschutz sind Platzhalter, bis der Inhaber echte Angaben liefert.

## Prüfen nach Änderungen
Desktop- und Handyansicht (375 px breit) ansehen: kein seitliches Scrollen, Menü klappt auf, Warenkorb rechnet richtig.
