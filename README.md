# Shop-Grundgerüst

Statische Shop-Website (HTML, CSS, JavaScript), gehostet kostenlos über GitHub Pages.

## Wo ändere ich was?

| Was | Datei |
| --- | --- |
| Farben, Schriften, Abstände | `assets/css/style.css` – Block `:root` ganz oben |
| Shopname, Kontaktdaten, Ankündigungsleiste, Versandkosten | `assets/js/daten.js` – `SHOP` |
| Produkte (Name, Preis, Kategorie, Bild, Optionen) | `assets/js/daten.js` – `PRODUKTE` |
| Menüpunkte | `assets/js/shop.js` – `NAV` |
| Texte der Seiten | die jeweilige `.html`-Datei |

## Seiten

`index.html` (Start), `produkte.html`, `produkt.html?id=…`, `warenkorb.html`,
`ueber-uns.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`

Zahlungsarten sind noch nicht eingebaut; der Warenkorb speichert nur lokal im Browser.
