/* =========================================================
   SHOP-DATEN – Shopname, Texte und Produkte
   Neue Produkte einfach als weiteren Eintrag in PRODUKTE anlegen.
   "bild" kann später ein Pfad sein, z. B. "assets/img/produkt1.jpg".
   Ohne Bild wird automatisch ein Platzhalter in "farbe" gezeichnet.
   ========================================================= */
const SHOP = {
  name: "Mein Shop",
  ankuendigung: "Kostenloser Versand ab 50 € · 30 Tage Rückgabe",
  email: "kontakt@example.com",
  telefon: "+49 000 000000",
  adresse: "Musterstraße 1, 12345 Musterstadt",
  waehrung: "EUR",
  versandkosten: 4.95,
  versandkostenfreiAb: 50
};

const PRODUKTE = [
  { id: "produkt-1", name: "Produkt Eins", preis: 24.90, kategorie: "Kategorie A", farbe: "#c9d6e3", badge: "Neu",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen.",
    optionen: { name: "Größe", werte: ["S", "M", "L"] } },
  { id: "produkt-2", name: "Produkt Zwei", preis: 39.00, preisAlt: 49.00, kategorie: "Kategorie A", farbe: "#e8d5c4", badge: "Sale",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen.",
    optionen: { name: "Farbe", werte: ["Natur", "Schwarz"] } },
  { id: "produkt-3", name: "Produkt Drei", preis: 15.50, kategorie: "Kategorie B", farbe: "#d4e2d4",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen." },
  { id: "produkt-4", name: "Produkt Vier", preis: 59.00, kategorie: "Kategorie B", farbe: "#e6dff0",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen." },
  { id: "produkt-5", name: "Produkt Fünf", preis: 32.00, kategorie: "Kategorie C", farbe: "#f0e3c2",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen.",
    optionen: { name: "Variante", werte: ["Standard", "Premium"] } },
  { id: "produkt-6", name: "Produkt Sechs", preis: 19.90, kategorie: "Kategorie C", farbe: "#d9e4ea",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen." },
  { id: "produkt-7", name: "Produkt Sieben", preis: 74.00, kategorie: "Kategorie A", farbe: "#ead1d1", badge: "Beliebt",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen." },
  { id: "produkt-8", name: "Produkt Acht", preis: 28.00, kategorie: "Kategorie B", farbe: "#dcdcd4",
    kurz: "Kurze Beschreibung des Produkts in ein bis zwei Sätzen." }
];
