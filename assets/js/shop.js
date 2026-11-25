/* =========================================================
   SHOP-LOGIK – Kopf/Fußzeile, Produktraster, Produktseite, Warenkorb
   Normalerweise muss hier nichts geändert werden.
   ========================================================= */

const NAV = [
  { href: "index.html", text: "Start" },
  { href: "produkte.html", text: "Produkte" },
  { href: "ueber-uns.html", text: "Über uns" },
  { href: "kontakt.html", text: "Kontakt" }
];

/* ---------- Hilfsfunktionen ---------- */
const preisFormat = new Intl.NumberFormat("de-DE", { style: "currency", currency: SHOP.waehrung });
const preis = (wert) => preisFormat.format(wert);
const findeProdukt = (id) => PRODUKTE.find((p) => p.id === id);
const esc = (s) => String(s).replace(/[&<>"']/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[z]));

function produktBild(p) {
  if (p.bild) return `<img src="${esc(p.bild)}" alt="${esc(p.name)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
  return `<svg viewBox="0 0 400 400" role="img" aria-label="${esc(p.name)} (Platzhalterbild)" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="400" fill="${esc(p.farbe || "#e5e5e5")}"/>
    <circle cx="200" cy="175" r="78" fill="#fff" fill-opacity=".45"/>
    <rect x="120" y="275" width="160" height="14" rx="7" fill="#000" fill-opacity=".08"/>
  </svg>`;
}

function zeigeToast(text) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.classList.add("sichtbar");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("sichtbar"), 2500);
}

/* ---------- Warenkorb (im Browser gespeichert) ---------- */
const WK_SCHLUESSEL = "warenkorb";
let speicherFallback = [];

function wkLaden() {
  try { return JSON.parse(localStorage.getItem(WK_SCHLUESSEL)) || []; }
  catch { return speicherFallback; }
}
function wkSpeichern(posten) {
  speicherFallback = posten;
  try { localStorage.setItem(WK_SCHLUESSEL, JSON.stringify(posten)); } catch {}
  wkZahlAktualisieren();
}
function wkHinzufuegen(id, menge = 1, option = "") {
  const posten = wkLaden();
  const vorhanden = posten.find((x) => x.id === id && x.option === option);
  if (vorhanden) vorhanden.menge += menge;
  else posten.push({ id, menge, option });
  wkSpeichern(posten);
}
function wkAnzahl() { return wkLaden().reduce((s, x) => s + x.menge, 0); }
function wkZahlAktualisieren() {
  document.querySelectorAll(".warenkorb-zahl").forEach((el) => { el.textContent = wkAnzahl(); });
}

/* ---------- Kopf- und Fußzeile ---------- */
function baueLayout() {
  const seite = location.pathname.split("/").pop() || "index.html";

  const kopf = document.getElementById("kopf");
  if (kopf) {
    kopf.outerHTML = `
      ${SHOP.ankuendigung ? `<div class="ankuendigung">${esc(SHOP.ankuendigung)}</div>` : ""}
      <header class="kopf">
        <div class="container kopf__innen">
          <a class="logo" href="index.html">${esc(SHOP.name)}</a>
          <nav class="nav" id="hauptnav" aria-label="Hauptmenü">
            ${NAV.map((n) => `<a href="${n.href}"${n.href === seite ? ' aria-current="page"' : ""}>${n.text}</a>`).join("")}
          </nav>
          <div class="kopf__aktionen">
            <a class="warenkorb-link" href="warenkorb.html" aria-label="Warenkorb">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
              <span class="text">Warenkorb</span>
              <span class="warenkorb-zahl">0</span>
            </a>
            <button class="menue-knopf" aria-label="Menü öffnen" aria-expanded="false" aria-controls="hauptnav">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
          </div>
        </div>
      </header>`;
    const knopf = document.querySelector(".menue-knopf");
    const nav = document.getElementById("hauptnav");
    knopf.addEventListener("click", () => {
      const offen = nav.classList.toggle("offen");
      knopf.setAttribute("aria-expanded", offen);
    });
  }

  const fuss = document.getElementById("fuss");
  if (fuss) {
    fuss.outerHTML = `
      <footer class="fuss">
        <div class="container">
          <div class="fuss__raster">
            <div>
              <h3>${esc(SHOP.name)}</h3>
              <p>${esc(SHOP.adresse)}<br><a href="mailto:${esc(SHOP.email)}">${esc(SHOP.email)}</a></p>
            </div>
            <div>
              <h3>Shop</h3>
              <ul>
                <li><a href="produkte.html">Alle Produkte</a></li>
                <li><a href="warenkorb.html">Warenkorb</a></li>
              </ul>
            </div>
            <div>
              <h3>Info</h3>
              <ul>
                <li><a href="ueber-uns.html">Über uns</a></li>
                <li><a href="kontakt.html">Kontakt</a></li>
                <li><a href="impressum.html">Impressum</a></li>
                <li><a href="datenschutz.html">Datenschutz</a></li>
              </ul>
            </div>
          </div>
          <div class="fuss__unten">Alle Preise inkl. MwSt.</div>
        </div>
      </footer>`;
  }

  document.querySelectorAll("[data-shopname]").forEach((el) => { el.textContent = SHOP.name; });
  document.querySelectorAll("[data-shop-email]").forEach((el) => { el.textContent = SHOP.email; el.href = "mailto:" + SHOP.email; });
  document.querySelectorAll("[data-shop-telefon]").forEach((el) => { el.textContent = SHOP.telefon; });
  document.querySelectorAll("[data-shop-adresse]").forEach((el) => { el.textContent = SHOP.adresse; });
  wkZahlAktualisieren();
}

/* ---------- Produktraster ---------- */
function produktKarte(p) {
  return `
    <a class="karte" href="produkt.html?id=${encodeURIComponent(p.id)}">
      <div class="karte__bild">${produktBild(p)}${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}</div>
      <h3 class="karte__name">${esc(p.name)}</h3>
      <div class="karte__preis">${preis(p.preis)}${p.preisAlt ? `<span class="preis-alt">${preis(p.preisAlt)}</span>` : ""}</div>
    </a>`;
}

function baueRaster() {
  document.querySelectorAll("[data-produkt-raster]").forEach((raster) => {
    const limit = parseInt(raster.dataset.limit, 10) || PRODUKTE.length;
    const zeichne = (kat) => {
      const liste = PRODUKTE.filter((p) => !kat || p.kategorie === kat).slice(0, limit);
      raster.innerHTML = liste.map(produktKarte).join("");
    };
    zeichne("");

    const filter = document.querySelector("[data-filter]");
    if (filter) {
      const kategorien = [...new Set(PRODUKTE.map((p) => p.kategorie))];
      filter.innerHTML = [`<button class="aktiv" data-kat="">Alle</button>`]
        .concat(kategorien.map((k) => `<button data-kat="${esc(k)}">${esc(k)}</button>`)).join("");
      filter.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        filter.querySelectorAll("button").forEach((x) => x.classList.toggle("aktiv", x === b));
        zeichne(b.dataset.kat);
      });
    }
  });
}

/* ---------- Produktseite ---------- */
function baueProduktseite() {
  const ziel = document.querySelector("[data-produktseite]");
  if (!ziel) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = findeProdukt(id) || PRODUKTE[0];
  document.title = `${p.name} – ${SHOP.name}`;

  ziel.innerHTML = `
    <nav class="brotkrumen" aria-label="Pfad"><a href="index.html">Start</a> / <a href="produkte.html">Produkte</a> / ${esc(p.name)}</nav>
    <div class="produkt">
      <div class="produkt__bild">${produktBild(p)}</div>
      <div>
        <p class="leise">${esc(p.kategorie)}</p>
        <h1>${esc(p.name)}</h1>
        <div class="produkt__preis">${preis(p.preis)}${p.preisAlt ? `<span class="preis-alt">${preis(p.preisAlt)}</span>` : ""}</div>
        <p>${esc(p.kurz)}</p>
        ${p.optionen ? `
          <div class="feld">
            <label>${esc(p.optionen.name)}</label>
            <div class="optionen" data-optionen>
              ${p.optionen.werte.map((w, i) => `<button type="button" class="${i === 0 ? "aktiv" : ""}" data-wert="${esc(w)}">${esc(w)}</button>`).join("")}
            </div>
          </div>` : ""}
        <div class="feld">
          <label for="menge">Menge</label>
          <div class="menge">
            <button type="button" data-menge="-1" aria-label="Weniger">−</button>
            <input id="menge" type="number" min="1" value="1" inputmode="numeric">
            <button type="button" data-menge="1" aria-label="Mehr">+</button>
          </div>
        </div>
        <button class="btn" style="width:100%" data-in-warenkorb>In den Warenkorb</button>
        <p class="leise" style="font-size:.9rem;margin-top:.75rem">inkl. MwSt., zzgl. Versand · Lieferzeit 2–4 Werktage</p>
        <div class="produkt__details">
          <details open><summary>Beschreibung</summary><p>Hier steht eine ausführliche Beschreibung: Material, Maße, Besonderheiten und Einsatzzweck des Produkts.</p></details>
          <details><summary>Versand &amp; Rückgabe</summary><p>Versand innerhalb von 2–4 Werktagen. Kostenloser Versand ab ${preis(SHOP.versandkostenfreiAb)}. 30 Tage Rückgaberecht.</p></details>
          <details><summary>Pflegehinweise</summary><p>Platzhalter für Pflege- oder Gebrauchshinweise.</p></details>
        </div>
      </div>
    </div>
    <section class="abschnitt" style="padding-top:0">
      <h2>Das könnte dir auch gefallen</h2>
      <div class="produkt-raster">${PRODUKTE.filter((x) => x.id !== p.id).slice(0, 4).map(produktKarte).join("")}</div>
    </section>`;

  const optionen = ziel.querySelector("[data-optionen]");
  if (optionen) {
    optionen.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      optionen.querySelectorAll("button").forEach((x) => x.classList.toggle("aktiv", x === b));
    });
  }
  const mengeFeld = ziel.querySelector("#menge");
  ziel.querySelectorAll("[data-menge]").forEach((b) => b.addEventListener("click", () => {
    mengeFeld.value = Math.max(1, (parseInt(mengeFeld.value, 10) || 1) + parseInt(b.dataset.menge, 10));
  }));
  ziel.querySelector("[data-in-warenkorb]").addEventListener("click", () => {
    const menge = Math.max(1, parseInt(mengeFeld.value, 10) || 1);
    const option = optionen ? optionen.querySelector(".aktiv").dataset.wert : "";
    wkHinzufuegen(p.id, menge, option);
    zeigeToast(`${p.name} wurde in den Warenkorb gelegt.`);
  });
}

/* ---------- Warenkorbseite ---------- */
function baueWarenkorb() {
  const ziel = document.querySelector("[data-warenkorb]");
  if (!ziel) return;

  const zeichne = () => {
    const posten = wkLaden().filter((x) => findeProdukt(x.id));
    if (!posten.length) {
      ziel.innerHTML = `
        <div class="text-mitte" style="padding:3rem 0">
          <p class="leise">Dein Warenkorb ist leer.</p>
          <a class="btn" href="produkte.html">Weiter einkaufen</a>
        </div>`;
      return;
    }
    const zwischensumme = posten.reduce((s, x) => s + findeProdukt(x.id).preis * x.menge, 0);
    const versand = zwischensumme >= SHOP.versandkostenfreiAb ? 0 : SHOP.versandkosten;

    ziel.innerHTML = `
      <div class="wk-layout">
        <ul class="wk-liste">
          ${posten.map((x, i) => {
            const p = findeProdukt(x.id);
            return `
              <li class="wk-posten">
                <a class="wk-posten__bild" href="produkt.html?id=${encodeURIComponent(p.id)}">${produktBild(p)}</a>
                <div>
                  <a class="wk-posten__name" href="produkt.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a>
                  ${x.option ? `<div class="leise" style="font-size:.9rem">${esc(p.optionen ? p.optionen.name : "Option")}: ${esc(x.option)}</div>` : ""}
                  <div class="wk-posten__aktionen">
                    <div class="menge">
                      <button type="button" data-i="${i}" data-d="-1" aria-label="Weniger">−</button>
                      <input type="number" min="1" value="${x.menge}" data-i="${i}" aria-label="Menge" inputmode="numeric">
                      <button type="button" data-i="${i}" data-d="1" aria-label="Mehr">+</button>
                    </div>
                    <button class="link-knopf" data-entfernen="${i}">Entfernen</button>
                  </div>
                </div>
                <div class="wk-posten__preis">${preis(p.preis * x.menge)}</div>
              </li>`;
          }).join("")}
        </ul>
        <aside class="wk-summe">
          <h2 style="font-size:1.3rem">Zusammenfassung</h2>
          <div class="wk-zeile"><span>Zwischensumme</span><span>${preis(zwischensumme)}</span></div>
          <div class="wk-zeile"><span>Versand</span><span>${versand ? preis(versand) : "kostenlos"}</span></div>
          <div class="wk-zeile wk-zeile--gesamt"><span>Gesamt</span><span>${preis(zwischensumme + versand)}</span></div>
          <p class="leise" style="font-size:.85rem">inkl. MwSt.</p>
          <div class="hinweis">Die Kasse ist noch nicht eingerichtet. Zahlungsarten werden später ergänzt.</div>
          <button class="btn" style="width:100%" disabled>Zur Kasse</button>
        </aside>
      </div>`;
  };

  ziel.addEventListener("click", (e) => {
    const posten = wkLaden().filter((x) => findeProdukt(x.id));
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.entfernen !== undefined) {
      posten.splice(+b.dataset.entfernen, 1);
    } else if (b.dataset.d) {
      const x = posten[+b.dataset.i];
      x.menge = Math.max(1, x.menge + parseInt(b.dataset.d, 10));
    } else return;
    wkSpeichern(posten);
    zeichne();
  });
  ziel.addEventListener("change", (e) => {
    if (!e.target.matches("input[data-i]")) return;
    const posten = wkLaden().filter((x) => findeProdukt(x.id));
    posten[+e.target.dataset.i].menge = Math.max(1, parseInt(e.target.value, 10) || 1);
    wkSpeichern(posten);
    zeichne();
  });
  zeichne();
}

/* ---------- Formulare (Platzhalter, noch ohne Versand) ---------- */
function baueFormulare() {
  document.querySelectorAll("form[data-platzhalter]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      zeigeToast(f.dataset.platzhalter);
      f.reset();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  baueLayout();
  baueRaster();
  baueProduktseite();
  baueWarenkorb();
  baueFormulare();
});
