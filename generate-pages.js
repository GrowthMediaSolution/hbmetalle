/**
 * HB-Metalle — Local SEO Page Generator
 * Generates 12 city pages + 6 service pages with unique content
 */
const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/info/hb-metalle';
const DOMAIN = 'https://www.hb-metalle.de';
const TEL = '+4923810000000';
const TEL_DISPLAY = '+49 (0) 2381 XXXXXX';
const EMAIL = 'info@hb-metalle.de';
const WA_LINK = 'https://wa.me/4923810000000?text=Hallo%2C%20ich%20m%C3%B6chte%20eine%20Anfrage%20stellen.';

// ─── City Data ───────────────────────────────
const cities = [
  {
    slug: 'hamm', name: 'Hamm', pop: '180.000', dist: 'Standort',
    plz: '59063', lat: '51.6739', lon: '7.8203',
    districts: ['Heessen', 'Bockum-Hövel', 'Pelkum', 'Rhynern', 'Uentrop', 'Herringen', 'Mark', 'Mitte'],
    intro: 'Als Ihr lokaler Partner direkt in Hamm kennen wir die Stadt und ihre Stadtteile wie unsere Westentasche. Ob in Heessen, Bockum-Hövel oder in der Innenstadt – wir sind schnell vor Ort.',
    text: 'Hamm ist nicht nur unser Heimatstandort, sondern auch eine Stadt mit großer industrieller Vergangenheit. Durch den Strukturwandel fallen regelmäßig Altmetalle, Maschinen und Schrott aus Betriebsauflösungen an. Privathaushalte in allen Stadtteilen nutzen unseren Service für Entrümpelungen, Gartenräumungen und den Verkauf von Altmetall. Wir bieten in Hamm den kompletten Service: von der kostenlosen Schrottabholung über den Barankauf von NE-Metallen bis hin zu Containerstellungen für größere Mengen. Unsere Fahrzeuge sind täglich in Hamm unterwegs – kurze Anfahrtswege bedeuten schnelle Termine und faire Konditionen für Sie.',
    besonderheit: 'Als einziger Anbieter mit Sitz direkt in Hamm bieten wir kürzeste Reaktionszeiten und kennen die lokalen Gegebenheiten.',
  },
  {
    slug: 'unna', name: 'Unna', pop: '59.000', dist: '~18 km',
    plz: '59423', lat: '51.5347', lon: '7.6889',
    districts: ['Königsborn', 'Massen', 'Hemmerde', 'Billmerich', 'Lünern', 'Mühlhausen'],
    intro: 'Unna liegt nur 18 Kilometer südwestlich von unserem Standort Hamm. Regelmäßige Touren durch den Kreis Unna ermöglichen schnelle und unkomplizierte Abholungen.',
    text: 'Die Kreisstadt Unna verbindet ländliche Bereiche mit gewerblichen Zonen entlang der A1 und B1. Besonders im Gewerbegebiet Königsborn und rund um den Bahnhof fallen regelmäßig Altmetalle und Schrott an. Für Privathaushalte in Unna bieten wir kostenlose Schrottabholung ab einer Mindestmenge. Gewerbetreibende profitieren von unseren flexiblen Containerstellungen und dem direkten Barankauf vor Ort. Durch die Nähe zu Hamm gehört Unna zu unseren am schnellsten erreichbaren Einsatzorten.',
    besonderheit: 'Kurze Anfahrt über die A2/B63 – oft Abholung am selben oder nächsten Werktag möglich.',
  },
  {
    slug: 'ahlen', name: 'Ahlen', pop: '55.000', dist: '~10 km',
    plz: '59227', lat: '51.7633', lon: '7.8917',
    districts: ['Dolberg', 'Vorhelm', 'Ahlen-Süd', 'Ahlen-Nord'],
    intro: 'Ahlen ist mit nur 10 Kilometern Entfernung eine unserer nächstgelegenen Einsatzstädte. Die ehemalige Bergbaustadt bietet regelmäßig Schrottabholungen aus Industrie und Privathaushalten.',
    text: 'Die Bergbautradition von Ahlen hat industrielle Strukturen hinterlassen, die bis heute Schrott und Altmetalle generieren. Ob Zeche Westfalen oder die Gewerbegebiete in Dolberg – wir kennen die Ahlener Infrastruktur und sind regelmäßig vor Ort. Privathaushalte nutzen unsere kostenlose Abholung für Altmetall, Elektroschrott und Gartengeräte. Für Gewerbetreibende bieten wir maßgeschneiderte Lösungen mit Containerstellungen und Festpreisvereinbarungen.',
    besonderheit: 'Kürzeste Anfahrt aller Einsatzorte – nur 10 km von Hamm. Abholungen oft noch am gleichen Tag.',
  },
  {
    slug: 'kamen', name: 'Kamen', pop: '46.000', dist: '~15 km',
    plz: '59174', lat: '51.5925', lon: '7.6636',
    districts: ['Methler', 'Heeren-Werve', 'Südkamen', 'Wasserkurl'],
    intro: 'Kamen, bekannt als Autobahnkreuz-Stadt, liegt strategisch günstig und ist von Hamm in nur 15 Minuten erreichbar. Ideal für schnelle Schrottabholungen.',
    text: 'Durch seine zentrale Lage am Kamener Kreuz ist die Stadt ein wichtiger Logistikstandort. Zahlreiche Gewerbe- und Industriebetriebe generieren kontinuierlich Schrott und Altmetalle. In Methler und Heeren-Werve betreuen wir sowohl Gewerbetreibende als auch Privathaushalte. Die hervorragende Autobahnanbindung über A1, A2 und B233 ermöglicht uns schnelle Anfahrtszeiten und flexible Terminvergabe.',
    besonderheit: 'Hervorragende Erreichbarkeit über das Kamener Kreuz – Abholungen oft innerhalb von 24 Stunden.',
  },
  {
    slug: 'bergkamen', name: 'Bergkamen', pop: '49.000', dist: '~14 km',
    plz: '59192', lat: '51.6167', lon: '7.6333',
    districts: ['Weddinghofen', 'Oberaden', 'Rünthe', 'Heil', 'Overberge'],
    intro: 'Bergkamen mit seiner Bergbauvergangenheit bietet ein hohes Aufkommen an Industrieschrott. Nur 14 km von Hamm entfernt, sind wir regelmäßig vor Ort.',
    text: 'Die ehemalige Bergbaustadt Bergkamen durchlebt seit Jahren einen Strukturwandel. Ehemalige Industrieflächen in Weddinghofen und Oberaden werden umgenutzt – dabei fallen große Mengen Altmetall, Stahlträger und Maschinenschrott an. Auch Privathaushalte in Rünthe und Overberge nutzen unseren kostenlosen Abholservice. Bergkamen gehört durch die kurze Distanz zu Hamm zu unserem Kerneinzugsgebiet mit den besten Konditionen.',
    besonderheit: 'Ehemaliges Bergbaugebiet mit hohem Schrottaufkommen – regelmäßige Touren durch alle Stadtteile.',
  },
  {
    slug: 'soest', name: 'Soest', pop: '48.000', dist: '~22 km',
    plz: '59494', lat: '51.5711', lon: '8.1067',
    districts: ['Ampen', 'Deiringsen', 'Hiddingsen', 'Meiningsen', 'Ostönnen'],
    intro: 'Die historische Hansestadt Soest liegt 22 km östlich von Hamm. Unser Einsatzgebiet deckt den gesamten Kreis Soest ab.',
    text: 'Soest als wirtschaftliches Zentrum des gleichnamigen Kreises verfügt über ein vielseitiges Gewerbegebiet. Handwerksbetriebe, Schlossereien und Metallverarbeiter generieren regelmäßig NE-Metalle und Produktionsschrott. Für Privatkunden aus den Ortsteilen Ampen, Deiringsen und Ostönnen bieten wir die kostenlose Abholung ab einer Mindestmenge. Die Fahrt von Hamm über die B63 dauert nur rund 20 Minuten – eine Strecke, die wir mehrmals wöchentlich bedienen.',
    besonderheit: 'Zentrum des Kreises Soest – von hier aus bedienen wir auch Werl, Wickede und Lippetal.',
  },
  {
    slug: 'werne', name: 'Werne', pop: '32.000', dist: '~10 km',
    plz: '59368', lat: '51.6614', lon: '7.6333',
    districts: ['Stockum', 'Langern', 'Horst', 'Evenkamp'],
    intro: 'Werne an der Lippe gehört mit nur 10 km Entfernung zu unseren nächsten Einsatzorten. Die Kleinstadt bietet kaum Konkurrenz bei der Schrottabholung.',
    text: 'Die beschauliche Stadt Werne an der Lippe zwischen Hamm und Lünen bietet ein überschaubares, aber stetiges Aufkommen an Altmetallen. Besonders Einfamilienhäuser in Stockum und Horst nutzen unseren Service für Garagenräumungen und Gartengeräte. Gewerbetreibende im Gewerbegebiet Lünener Straße schätzen unsere zuverlässigen Containerstellungen. Durch die geringe Entfernung von 10 km bieten wir in Werne besonders schnelle Reaktionszeiten.',
    besonderheit: 'Nur 10 km entfernt – minimale Anfahrtskosten, maximale Flexibilität bei der Terminvergabe.',
  },
  {
    slug: 'beckum', name: 'Beckum', pop: '37.000', dist: '~16 km',
    plz: '59269', lat: '51.7539', lon: '8.0403',
    districts: ['Neubeckum', 'Roland', 'Vellern'],
    intro: 'Beckum und Neubeckum liegen 16 km östlich von Hamm. Die Zementindustrie-Stadt generiert regelmäßig Metallschrott aus Industrie und Bauwesen.',
    text: 'Beckum ist bekannt für seine Zementindustrie und Kalksteinverarbeitung. Wo schwere Maschinen arbeiten, fallen Verschleißteile, Stahlschrott und Industriemetalle an. Wir betreuen zahlreiche Gewerbebetriebe in Beckum und Neubeckum mit regelmäßigen Abholungen. Auch Privathaushalte profitieren von unserer Kostenlos-Abholung für Altmetalle, Heizkörper und Metallzäune. Die kurze Anfahrt über die B475 macht Beckum zu einem unserer effizientesten Einsatzorte.',
    besonderheit: 'Starke Industrieregion mit Zement- und Kalkwerken – hoher Bedarf an professioneller Schrottverwertung.',
  },
  {
    slug: 'lippstadt', name: 'Lippstadt', pop: '68.000', dist: '~35 km',
    plz: '59555', lat: '51.6736', lon: '8.3447',
    districts: ['Bad Waldliesborn', 'Lipperode', 'Cappel', 'Overhagen', 'Benninghausen'],
    intro: 'Lippstadt, die zweitgrößte Stadt im Kreis Soest, ist 35 km östlich von Hamm gelegen. Automobilindustrie und Zulieferer sorgen für regelmäßiges Metallaufkommen.',
    text: 'Als Standort internationaler Automobilzulieferer wie HELLA und Boge generiert Lippstadt überdurchschnittlich viel Industrieschrott. Stanzabfälle, Aluminium-Reste und Produktionsausschuss sind für uns alltägliche Materialien. Auch Privatkunden in Bad Waldliesborn und Lipperode nutzen unsere Abholung. Obwohl Lippstadt etwas weiter entfernt ist, fahren wir die Strecke regelmäßig und können Sammeltouren im östlichen Kreis Soest effizient planen.',
    besonderheit: 'Automobilindustrie-Standort mit hohem NE-Metall-Aufkommen – besonders Aluminium und Kupfer.',
  },
  {
    slug: 'dortmund', name: 'Dortmund', pop: '603.000', dist: '~31 km',
    plz: '44135', lat: '51.5136', lon: '7.4653',
    districts: ['Hörde', 'Aplerbeck', 'Wickede', 'Brackel', 'Scharnhorst', 'Mengede', 'Huckarde', 'Lütgendortmund', 'Eving'],
    intro: 'Dortmund als größte Stadt Westfalens bietet enormes Potenzial für Schrottabholung und Metallankauf. Wir bedienen alle 12 Stadtbezirke regelmäßig.',
    text: 'Die Stahlstadt Dortmund hat sich zwar gewandelt, doch Industrie und Gewerbe generieren nach wie vor erhebliche Schrottmengen. Vom ehemaligen Stahlwerk Phoenix-West bis zu den Gewerbezonen in Brackel und Wickede – überall fallen Altmetalle an. Privathaushalte in allen Stadtteilen nutzen unseren Service für Entrümpelungen und Metallverkauf. Mit 603.000 Einwohnern ist Dortmund unser volumenstärkster Einsatzort. Trotz der größeren Entfernung von 31 km fahren unsere Fahrzeuge mehrmals wöchentlich nach Dortmund.',
    besonderheit: 'Größte Stadt im Einsatzgebiet – eigene Wochentouren für Dortmund und Umgebung.',
  },
  {
    slug: 'luenen', name: 'Lünen', pop: '86.000', dist: '~32 km',
    plz: '44532', lat: '51.6167', lon: '7.5167',
    districts: ['Brambauer', 'Gahmen', 'Wethmar', 'Beckinghausen', 'Horstmar'],
    intro: 'Lünen an der Lippe, 32 km westlich von Hamm, hat durch seine Bergbau-Geschichte ein überdurchschnittliches Schrottaufkommen.',
    text: 'Lünen verbindet die Bergbautradition des Ruhrgebiets mit moderner Logistik. Ehemalige Zechen-Gelände und Industriebrachen bieten regelmäßig Großmengen Schrott. In den Wohngebieten Brambauer und Wethmar bedienen wir Privathaushalte mit kostenloser Abholung. Lünener Handwerksbetriebe und Schlossereien schätzen unseren zuverlässigen Barankauf für Kupfer, Messing und Aluminium. Die Anfahrt über die A2 ist direkt und unkompliziert.',
    besonderheit: 'Bergbau-Folgelandschaften mit konstant hohem Schrottvolumen – starke Nachfrage nach Containerstellungen.',
  },
  {
    slug: 'muenster', name: 'Münster', pop: '308.000', dist: '~34 km',
    plz: '48143', lat: '51.9607', lon: '7.6261',
    districts: ['Gievenbeck', 'Kinderhaus', 'Hiltrup', 'Wolbeck', 'Amelsbüren', 'Handorf', 'Roxel'],
    intro: 'Münster als Oberzentrum Westfalens mit über 300.000 Einwohnern bietet großes Potenzial. Universität, Gewerbe und Privathaushalte generieren stetiges Schrottaufkommen.',
    text: 'Die Universitätsstadt Münster wächst stetig – und damit auch der Bedarf an professioneller Schrottverwertung. Bauprojekte in Hiltrup, Gewerbegebiete in Amelsbüren und der stetige Umzugsstrom der Studierenden sorgen für konstantes Aufkommen. Besonders NE-Metalle aus Heizungssanierungen und Kupferkabel aus Bauprojekten sind gefragt. Wir fahren Münster regelmäßig an und bieten auch für größere Mengen attraktive Konditionen mit Containerservice.',
    besonderheit: 'Wachsende Großstadt mit viel Bautätigkeit – hoher Bedarf an Kupfer- und Kabelschrott-Entsorgung.',
  },
];

// ─── Service Data ───────────────────────────────
const services = [
  {
    slug: 'metallankauf',
    title: 'Metallankauf NRW',
    h1_line1: 'Metallankauf',
    h1_line2: 'NRW & Hamm',
    metaTitle: 'Metallankauf NRW | Kupfer, Messing, Aluminium – HB-Metalle Hamm',
    metaDesc: 'Metallankauf in NRW zu fairen Tagespreisen. Kupfer, Messing, Aluminium, Zink, Blei & Edelstahl – Barankauf direkt vor Ort. HB-Metalle Hamm.',
    eyebrow: 'NE-Metalle & Buntmetall',
    heroSub: 'Faire Tagespreise für alle NE-Metalle. Kupfer, Messing, Aluminium, Zink, Blei und Edelstahl – wir kaufen direkt vor Ort an. Barankauf möglich.',
    sections: [
      {
        title: 'Welche Metalle kaufen wir an?',
        eyebrow: 'Materialien',
        content: `<p>HB-Metalle kauft alle gängigen Nichteisenmetalle (NE-Metalle) und Buntmetalle zu fairen Marktpreisen an. Unsere Ankaufpreise orientieren sich täglich an der Londoner Metallbörse (LME) – so erhalten Sie stets aktuelle und transparente Konditionen.</p>
        <div class="card-grid">
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Kupfer</h3><p>Kupferkabel, Kupferrohr, Kupferdraht, Millberry, Berry – alle Sorten und Legierungen.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Messing</h3><p>Messingspäne, Messingarmaturen, Messingrohre, Messingplatten und Messingschrott aller Art.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Aluminium</h3><p>Alu-Profile, Aluguss, Alu-Späne, Alu-Felgen, Alubleche und Mischalu.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Zink & Blei</h3><p>Zinkbleche, Dachrinnen, Bleiabdeckungen, Bleirohre, Zinkdruckguss.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Edelstahl</h3><p>V2A, V4A, Edelstahl-Rohr, Edelstahl-Blech, Edelstahl-Späne.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Kabelschrott</h3><p>Kupferkabel, Alukabel, Starkstromkabel, Elektronikkabel – lose oder auf Trommel.</p></div>
        </div>`,
      },
      {
        title: 'Ablauf des Metallankaufs',
        eyebrow: 'So funktioniert es',
        content: `<p>Unser Ankaufprozess ist einfach und transparent. In drei Schritten vom Anruf zum Bargeld:</p>
        <ul class="checklist">
          <li><strong>Kontakt aufnehmen:</strong> Rufen Sie uns an oder senden Sie Bilder per WhatsApp. Wir nennen Ihnen einen Richtpreis.</li>
          <li><strong>Termin & Abholung:</strong> Wir kommen zu Ihnen, wiegen das Material vor Ort und machen ein faires Preisangebot.</li>
          <li><strong>Sofortige Bezahlung:</strong> Bei Einigung erhalten Sie den Betrag direkt in bar oder per Überweisung.</li>
        </ul>
        <div class="info-box" style="margin-top:1.5rem"><p><strong>Tipp:</strong> Je sortenreiner Sie Ihr Metall sortieren, desto höhere Preise können wir Ihnen anbieten. Mischposten werden entsprechend der niedrigsten Sorte bewertet.</p></div>`,
      },
    ],
    faq: [
      ['Welche Metalle kauft HB-Metalle an?', 'Alle NE-Metalle: Kupfer, Messing, Aluminium, Zink, Blei, Edelstahl sowie Kabelschrott aller Art. Auch Mischposten nehmen wir an.'],
      ['Wie ermitteln Sie die Ankaufpreise?', 'Unsere Preise orientieren sich an den aktuellen Tagesnotierungen der Londoner Metallbörse (LME). So erhalten Sie stets faire Marktpreise.'],
      ['Gibt es eine Mindestmenge für den Ankauf?', 'Für Kupfer und Messing gibt es keine Mindestmenge. Bei anderen Metallen bitten wir um mindestens 50 kg für eine Vor-Ort-Abholung.'],
      ['Zahlen Sie bar?', 'Ja, Barankauf ist auf Wunsch direkt vor Ort möglich. Alternativ bieten wir Überweisung am selben Tag.'],
    ],
  },
  {
    slug: 'containerdienst',
    title: 'Containerdienst NRW',
    h1_line1: 'Container-',
    h1_line2: 'dienst NRW',
    metaTitle: 'Containerdienst Schrott NRW | Containerstellung & Abholung – HB-Metalle',
    metaDesc: 'Containerdienst für Schrott in NRW – Container stellen, befüllen, abholen lassen. Verschiedene Größen für Baustellen & Gewerbe. HB-Metalle Hamm.',
    eyebrow: 'Container & Logistik',
    heroSub: 'Professioneller Containerdienst für Schrott und Altmetall in ganz NRW. Container bestellen, befüllen, abholen lassen – schnell und unkompliziert.',
    sections: [
      {
        title: 'Unsere Containergrößen',
        eyebrow: 'Übersicht',
        content: `<p>Ob Baustelle, Gewerbebetrieb oder Großentrümpelung – wir stellen den passenden Container für Ihr Schrottprojekt. Verschiedene Größen für jeden Bedarf:</p>
        <div class="card-grid">
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="2"/></svg></div><h3>Absetzcontainer 3 m³</h3><p>Ideal für Privathaushalte, Gartenräumungen und kleinere Schrottmengen. Passt in jede Einfahrt.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="2"/></svg></div><h3>Absetzcontainer 5,5 m³</h3><p>Unser meistgebuchter Container für mittlere Projekte – Kellerräumungen, Dachsanierungen, kleine Baustellen.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="2"/></svg></div><h3>Absetzcontainer 7 m³</h3><p>Für größere Mengen: Betriebsräumungen, Abbrucharbeiten und umfangreiche Entrümpelungen.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="2"/></svg></div><h3>Abrollcontainer 10–36 m³</h3><p>Für Großprojekte, Industriebetriebe und Baustellen mit hohem Schrottaufkommen.</p></div>
        </div>`,
      },
      {
        title: 'So funktioniert unser Containerdienst',
        eyebrow: 'Ablauf',
        content: `<p>In vier einfachen Schritten zum Container:</p>
        <ul class="checklist">
          <li><strong>Anfrage:</strong> Sagen Sie uns, welches Material entsorgt werden soll und welchen Umfang Sie erwarten.</li>
          <li><strong>Containerstellung:</strong> Wir liefern den passenden Container und stellen ihn an Ihrem Wunschort ab.</li>
          <li><strong>Befüllung:</strong> Befüllen Sie den Container in Ihrem Tempo – kein Zeitdruck.</li>
          <li><strong>Abholung & Verwertung:</strong> Auf Zuruf holen wir den Container ab und verwerten das Material fachgerecht.</li>
        </ul>
        <div class="info-box" style="margin-top:1.5rem"><p><strong>Kostenlos bei reinem Metallschrott:</strong> Enthält der Container ausschließlich Metallschrott, übernehmen wir die Containerstellung oft kostenfrei. Mischcontainer mit Bauschutt oder Sondermüll werden separat berechnet.</p></div>`,
      },
    ],
    faq: [
      ['Was kostet ein Schrottcontainer?', 'Bei reinem Metallschrott ist die Containerstellung oft kostenlos. Bei Mischcontainern erstellen wir ein individuelles Angebot nach Besichtigung.'],
      ['Wie schnell wird der Container geliefert?', 'In der Regel innerhalb von 1-3 Werktagen. Eillieferungen sind in Hamm und nahem Umkreis oft am nächsten Tag möglich.'],
      ['Gibt es eine Stelldauer?', 'Standardmäßig 7-14 Tage. Verlängerungen sind nach Absprache möglich. Bei reinem Schrott oft auch länger kostenfrei.'],
      ['Was darf nicht in den Schrottcontainer?', 'Sondermüll, Asbest, Farben, chemische Stoffe und Restmüll dürfen nicht hinein. Bei Unsicherheit beraten wir Sie gerne telefonisch.'],
    ],
  },
  {
    slug: 'maschinen-ankauf',
    title: 'Maschinen-Ankauf NRW',
    h1_line1: 'Maschinen-',
    h1_line2: 'Ankauf NRW',
    metaTitle: 'Maschinen-Ankauf NRW | Stapler, Elektromotoren, Baumaschinen – HB-Metalle',
    metaDesc: 'Maschinen-Ankauf in NRW: Stapler, Elektromotoren, Baumaschinen & Industrieanlagen. Auch defekt! Barankauf vor Ort. HB-Metalle Hamm.',
    eyebrow: 'Stapler · Motoren · Baumaschinen',
    heroSub: 'Ankauf von Gabelstaplern, Elektromotoren, Baumaschinen und Industrieanlagen in ganz NRW. Auch defekte Geräte! Faire Preise und Barankauf vor Ort.',
    sections: [
      {
        title: 'Was kaufen wir an?',
        eyebrow: 'Ankauf-Kategorien',
        content: `<p>HB-Metalle kauft Maschinen und Geräte aller Art an – funktionstüchtig oder defekt. Entscheidend ist der Material- und Restwert. Unser Fokus:</p>
        <div class="card-grid">
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg></div><h3>Gabelstapler</h3><p>Diesel-, Gas- und Elektrostapler aller Hersteller. Auch defekte und verschrottungsreife Stapler mit hohem Materialwert.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Elektromotoren</h3><p>Drehstrommotoren, Servomotoren, Gleichstrommotoren – der Kupferanteil bestimmt den Preis.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg></div><h3>Baumaschinen</h3><p>Minibagger, Radlader, Kompressoren, Generatoren und andere Baugeräte – auch mit Mängeln.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l6.59-6.59L20 9l-8 8z"/></svg></div><h3>Industrieanlagen</h3><p>Produktionslinien, Förderbänder, Pressen, Stanzen und Werkzeugmaschinen jeder Größe.</p></div>
        </div>`,
      },
      {
        title: 'Warum Maschinen an HB-Metalle verkaufen?',
        eyebrow: 'Ihre Vorteile',
        content: `<p>Viele Maschinen sind mehr wert als ihr Schrottpreis vermuten lässt. Wir bewerten nicht nur den Materialwert, sondern auch den möglichen Wiederverwendungswert:</p>
        <ul class="checklist">
          <li><strong>Faire Bewertung:</strong> Wir prüfen Material- UND Restwert – nicht nur Schrottpreise</li>
          <li><strong>Barankauf vor Ort:</strong> Sofortige Bezahlung in bar oder per Überweisung</li>
          <li><strong>Auch defekte Geräte:</strong> Selbst nicht funktionsfähige Maschinen haben Materialwert</li>
          <li><strong>Kompletter Service:</strong> Demontage, Verladung und Abtransport übernehmen wir</li>
          <li><strong>NRW-weit:</strong> Wir holen Maschinen in ganz NRW ab – auch Einzelstücke</li>
        </ul>`,
      },
    ],
    faq: [
      ['Kaufen Sie auch defekte Stapler an?', 'Ja, auch defekte und nicht fahrbereite Gabelstapler kaufen wir an. Entscheidend ist der Material- und Restwert.'],
      ['Ab welcher Größe kaufen Sie Elektromotoren?', 'Wir kaufen Elektromotoren ab 5 kg Gewicht an. Je größer der Motor, desto höher der Kupferanteil und damit der Preis.'],
      ['Wie wird der Preis für Maschinen ermittelt?', 'Wir berücksichtigen Materialwert, Restwert und Zustand. Nach einer Besichtigung erhalten Sie ein verbindliches Angebot.'],
      ['Können Sie schwere Maschinen selbst verladen?', 'Ja, wir verfügen über Kranfahrzeuge und Schwerlasttransport für Maschinen bis zu mehreren Tonnen.'],
    ],
  },
  {
    slug: 'demontage',
    title: 'Demontage & Rückbau NRW',
    h1_line1: 'Demontage &',
    h1_line2: 'Rückbau NRW',
    metaTitle: 'Industriedemontage NRW | Rückbau & Maschinendemontage – HB-Metalle Hamm',
    metaDesc: 'Industriedemontage & Rückbau in NRW – fachgerechte Demontage von Maschinen, Produktionsanlagen & Stahlkonstruktionen. HB-Metalle Hamm. Jetzt anfragen!',
    eyebrow: 'Industriedemontage',
    heroSub: 'Professionelle Demontage und Rückbau von Industrieanlagen, Produktionslinien und Stahlkonstruktionen in ganz NRW. Fachgerecht und termingerecht.',
    sections: [
      {
        title: 'Unsere Demontage-Leistungen',
        eyebrow: 'Leistungsumfang',
        content: `<p>HB-Metalle bietet professionelle Demontagearbeiten für Industrie und Gewerbe. Von der Einzelmaschine bis zur kompletten Hallenräumung übernehmen wir die fachgerechte Zerlegung und Verwertung.</p>
        <div class="card-grid">
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div><h3>Maschinendemontage</h3><p>Produktionsanlagen, CNC-Maschinen, Pressen, Stanzen – fachgerechte Zerlegung und Verwertung.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l6.59-6.59L20 9l-8 8z"/></svg></div><h3>Stahlbau-Rückbau</h3><p>Stahlhallen, Regalsysteme, Stahlkonstruktionen, Treppen und Geländer.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Rohrleitungen</h3><p>Demontage von Rohrinstallationen, Heizungsanlagen und Kupferleitungen mit Materialankauf.</p></div>
          <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 13h-2V7h2v6zm0 4h-2v-2h2v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg></div><h3>Elektroinstallation</h3><p>Rückbau von Kabeltrassen, Verteilerkästen und Elektroleitungen – Kupfer wird angekauft.</p></div>
        </div>`,
      },
      {
        title: 'Ablauf einer Industriedemontage',
        eyebrow: 'Prozess',
        content: `<p>Jedes Demontageprojekt beginnt mit einer sorgfältigen Planung:</p>
        <ul class="checklist">
          <li><strong>Besichtigung:</strong> Aufnahme des Ist-Zustands, Bewertung der Materialien, Sicherheitscheck</li>
          <li><strong>Angebot:</strong> Detailliertes Festpreisangebot mit Zeitplan und Verwertungskonzept</li>
          <li><strong>Demontage:</strong> Fachgerechte Zerlegung unter Berücksichtigung aller Sicherheitsvorschriften</li>
          <li><strong>Abtransport:</strong> Verladen und Abtransport aller demontierten Materialien</li>
          <li><strong>Verwertung:</strong> Sortenreine Trennung und bestmögliche Verwertung aller Materialien</li>
          <li><strong>Abrechnung:</strong> Transparente Abrechnung – Materialerlöse werden selbstverständlich angerechnet</li>
        </ul>`,
      },
    ],
    faq: [
      ['Was kostet eine Industriedemontage?', 'Die Kosten variieren je nach Umfang und Materialwert. In vielen Fällen werden die Demontagekosten durch den Materialerlös teilweise oder vollständig gedeckt.'],
      ['Wie lange dauert eine Maschinendemontage?', 'Einzelmaschinen: 1-2 Tage. Komplette Produktionslinien: 1-4 Wochen je nach Umfang und Komplexität.'],
      ['Sind Sie für Industriedemontagen zertifiziert?', 'Ja, wir arbeiten nach allen geltenden Sicherheitsvorschriften und Umweltauflagen und sind als Entsorgungsfachbetrieb zertifiziert.'],
      ['Können Sie auch am Wochenende arbeiten?', 'Ja, für Betriebe mit laufender Produktion bieten wir Wochenend- und Feiertagsarbeit an, um Produktionsausfälle zu minimieren.'],
    ],
  },
];

// ─── Template Functions ───────────────────────────

function headerHTML(backPath, activeSlug) {
  return `<a class="skip-link" href="#main">Zum Inhalt springen</a>
<header class="site-header" id="header">
  <div class="header-inner">
    <a href="${backPath}" class="logo" aria-label="HB-Metalle – zur Startseite">
      <div class="logo-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
      </div>
      <span class="logo-name">HB-<span>Metalle</span></span>
    </a>
    <nav aria-label="Hauptnavigation">
      <a href="${backPath}#leistungen">Leistungen</a>
      <a href="${backPath}#ueber-uns">Über uns</a>
      <a href="${backPath}#einsatzgebiet">Einsatzgebiet</a>
      <a href="${backPath}#kontakt">Kontakt</a>
    </nav>
    <a href="tel:${TEL}" class="btn-call" aria-label="Jetzt anrufen">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      Anrufen
    </a>
  </div>
</header>`;
}

function footerHTML(backPath) {
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-col">
        <a href="${backPath}" class="logo" style="margin-bottom:12px;display:inline-flex;align-items:center;gap:8px;text-decoration:none">
          <div class="logo-icon" aria-hidden="true" style="width:30px;height:30px;background:var(--c-green);border-radius:50%;display:flex;align-items:center;justify-content:center">
            <svg viewBox="0 0 24 24" fill="#000" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          </div>
          <span class="logo-name" style="font-size:1.2rem">HB-<span>Metalle</span></span>
        </a>
        <p>Ihr Partner für Schrottabholung und Metallankauf in Hamm und ganz NRW.</p>
      </div>
      <div class="footer-col">
        <h4>Leistungen</h4>
        <ul>
          <li><a href="${backPath}schrottabholung/hamm/">Schrottabholung</a></li>
          <li><a href="${backPath}metallankauf/">Metallankauf</a></li>
          <li><a href="${backPath}maschinen-ankauf/">Maschinen-Ankauf</a></li>
          <li><a href="${backPath}containerdienst/">Containerdienst</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Weitere Services</h4>
        <ul>
          <li><a href="${backPath}demontage/">Demontage</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <ul>
          <li><a href="tel:${TEL}">${TEL_DISPLAY}</a></li>
          <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
          <li><a href="${backPath}#kontakt">Anfrage stellen</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 HB-Metalle, Hamm. Alle Rechte vorbehalten.</p>
      <div><a href="${backPath}impressum/">Impressum</a> · <a href="${backPath}datenschutz/">Datenschutz</a></div>
    </div>
  </div>
</footer>`;
}

function faqHTML(faqs, schemaPageUrl) {
  const detailsHTML = faqs.map(([q, a]) => `      <details>
        <summary>${q}</summary>
        <p>${a}</p>
      </details>`).join('\n');

  const schemaItems = faqs.map(([q, a], i) => `    {
      "@type": "Question",
      "name": "${q.replace(/"/g, '\\"')}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${a.replace(/"/g, '\\"')}"
      }
    }`).join(',\n');

  return `<section class="section faq-section">
    <span class="section-eyebrow">Häufige Fragen</span>
    <h2>FAQ <span>– Ihre Fragen, unsere Antworten</span></h2>
    <div class="faq-grid">
${detailsHTML}
    </div>
  </section>`;
}

function ctaHTML() {
  return `<section class="cta-section">
    <h2>Jetzt <span>kostenlos anfragen</span></h2>
    <p>Rufen Sie uns an oder senden Sie eine Nachricht. Wir melden uns schnellstmöglich bei Ihnen – kostenlos und unverbindlich.</p>
    <a href="tel:${TEL}" class="cta-tel">${TEL_DISPLAY}</a>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="tel:${TEL}" class="btn-primary">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        Jetzt anrufen
      </a>
      <a href="${WA_LINK}" class="btn-secondary" target="_blank" rel="noopener noreferrer">
        WhatsApp Nachricht
      </a>
    </div>
  </section>`;
}

function whatsappFAB() {
  return `<a href="${WA_LINK}" class="whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Nachricht senden">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>`;
}

function revealScript() {
  return `<script>
  // Header scroll
  const hdr=document.getElementById('header');
  if(hdr) window.addEventListener('scroll',()=>{hdr.classList.toggle('scrolled',window.scrollY>60)},{passive:true});
  // Reveal
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');obs.unobserve(x.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  // FAQ grid responsive
  const fg=document.querySelector('.faq-grid');
  if(fg){const m=window.matchMedia('(max-width:768px)'),f=q=>fg.style.gridTemplateColumns=q.matches?'1fr':'1fr 1fr';m.addEventListener('change',f);f(m)}
</script>`;
}

// ─── Generate City Pages ───────────────────────────

function generateCityPage(city) {
  const backPath = '../../';
  const canonicalUrl = `${DOMAIN}/schrottabholung/${city.slug}/`;
  const nearbyLinks = cities
    .filter(c => c.slug !== city.slug)
    .slice(0, 6)
    .map(c => `<li><a href="../${c.slug}/">Schrottabholung ${c.name}</a></li>`)
    .join('\n            ');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schrottabholung ${city.name} | Kostenlos abholen – HB-Metalle</title>
  <meta name="description" content="Schrottabholung ${city.name} – kostenlos abholen lassen! HB-Metalle holt Schrott, NE-Metalle &amp; Altmetall in ${city.name} ab. Barankauf möglich. ☎ Jetzt anrufen!">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="geo.region" content="DE-NW">
  <meta name="geo.placename" content="${city.name}, Nordrhein-Westfalen">
  <meta name="geo.position" content="${city.lat};${city.lon}">
  <meta name="ICBM" content="${city.lat}, ${city.lon}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="Schrottabholung ${city.name} | HB-Metalle">
  <meta property="og:description" content="Kostenlose Schrottabholung in ${city.name}. Faire Preise, Barankauf möglich.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:locale" content="de_DE">
  <link rel="stylesheet" href="${backPath}assets/fonts.css">
  <link rel="stylesheet" href="${backPath}assets/subpage.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Schrottabholung ${city.name}",
    "serviceType": "Schrottabholung",
    "description": "Kostenlose Schrottabholung in ${city.name} und Umgebung. Altmetall, NE-Metalle, Maschinen – faire Preise und Barankauf vor Ort.",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "${DOMAIN}/#business",
      "name": "HB-Metalle",
      "telephone": "${TEL}",
      "address": {"@type":"PostalAddress","addressLocality":"Hamm","addressRegion":"NRW","addressCountry":"DE"}
    },
    "areaServed": {"@type": "City", "name": "${city.name}", "address": {"@type":"PostalAddress","postalCode":"${city.plz}","addressRegion":"NRW","addressCountry":"DE"}},
    "availableChannel": {"@type":"ServiceChannel","servicePhone":{"@type":"ContactPoint","telephone":"${TEL}","contactType":"customer service"}}
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type":"ListItem","position":1,"name":"Startseite","item":"${DOMAIN}/"},
      {"@type":"ListItem","position":2,"name":"Schrottabholung","item":"${DOMAIN}/schrottabholung/hamm/"},
      {"@type":"ListItem","position":3,"name":"${city.name}","item":"${canonicalUrl}"}
    ]
  }
  </script>
</head>
<body>
${headerHTML(backPath, 'schrottabholung')}

<nav class="breadcrumb-bar" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="${backPath}">Startseite</a></li>
    <li><a href="../hamm/">Schrottabholung</a></li>
    <li aria-current="page">${city.name}</li>
  </ol>
</nav>

<section class="page-hero">
  <div class="page-hero-inner">
    <span class="hero-eyebrow">Schrottabholung ${city.name}</span>
    <h1>Schrottabholung<br><span>${city.name}</span></h1>
    <p class="hero-sub">${city.intro}</p>
    <div class="hero-ctas">
      <a href="tel:${TEL}" class="btn-primary">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        Jetzt anrufen
      </a>
      <a href="${backPath}#kontakt" class="btn-secondary">Kostenlos anfragen</a>
    </div>
  </div>
</section>

<nav class="usp-bar" aria-label="Vorteile">
  <div class="usp-grid">
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Kostenlose Abholung</div>
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Barankauf vor Ort</div>
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Faire Tagespreise</div>
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> ${city.dist} von Hamm</div>
  </div>
</nav>

<main id="main" class="page-content">
  <article>
    <section class="section reveal">
      <span class="section-eyebrow">Schrottabholung in ${city.name}</span>
      <h2>Kostenlose Schrottabholung <span>in ${city.name}</span></h2>
      <p class="lead">HB-Metalle bietet professionelle Schrottabholung in ${city.name} (${city.plz}) und allen Ortsteilen: ${city.districts.join(', ')}.</p>
      <p>${city.text}</p>
      <p>${city.besonderheit}</p>
    </section>

    <hr>

    <section class="section reveal">
      <span class="section-eyebrow">Unsere Leistungen</span>
      <h2>Was wir in <span>${city.name}</span> abholen</h2>
      <p class="lead">Von Altmetall über NE-Metalle bis zu ganzen Maschinen – wir holen alles, was Metall enthält.</p>
      <div class="card-grid">
        <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Altmetall & Mischschrott</h3><p>Eisen, Stahl, Heizkörper, Metallzäune, Garagentore, Fahrräder, Gartengeräte und mehr.</p></div>
        <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>NE-Metalle</h3><p>Kupfer, Messing, Aluminium, Zink, Blei – Barankauf zu fairen Tagespreisen direkt in ${city.name}.</p></div>
        <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Kabelschrott</h3><p>Kupferkabel, Alukabel, Starkstromkabel – lose oder auf Trommel, auch Kleinstmengen.</p></div>
        <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Maschinen & Motoren</h3><p>Elektromotoren, Stapler, Kompressoren, Werkzeugmaschinen und Industriegeräte.</p></div>
        <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>KFZ-Teile</h3><p>Katalysatoren, Alufelgen, Autobatterien, Anlasser, Lichtmaschinen.</p></div>
        <div class="card"><div class="card-icon"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg></div><h3>Haushaltsschrott</h3><p>Waschmaschinen, Herde, Spülmaschinen, Heizkessel und andere metallhaltige Geräte.</p></div>
      </div>
    </section>

    <hr>

    <section class="section reveal">
      <span class="section-eyebrow">So funktioniert es</span>
      <h2>Ablauf der Schrottabholung <span>in ${city.name}</span></h2>
      <ul class="checklist">
        <li><strong>Kontakt aufnehmen:</strong> Rufen Sie an oder schreiben Sie per WhatsApp. Beschreiben Sie kurz Art und Menge.</li>
        <li><strong>Termin vereinbaren:</strong> Wir finden schnell einen passenden Termin – oft schon innerhalb weniger Werktage.</li>
        <li><strong>Kostenlose Abholung:</strong> Unser Team kommt mit dem passenden Fahrzeug direkt zu Ihnen nach ${city.name}.</li>
        <li><strong>Barankauf vor Ort:</strong> Hochwertige Metalle wie Kupfer und Messing kaufen wir direkt bei Ihnen an.</li>
      </ul>
    </section>

    <hr>

    <section class="section reveal">
      <span class="section-eyebrow">Einsatzgebiet</span>
      <h2>Weitere Städte <span>in der Nähe</span></h2>
      <p>Neben ${city.name} sind wir auch in diesen Städten regelmäßig für Sie unterwegs:</p>
      <ul class="checklist" style="column-count:2;column-gap:2rem">
        ${nearbyLinks}
      </ul>
    </section>

    ${faqHTML([
      [`Wie läuft die Schrottabholung in ${city.name} ab?`, `Anruf oder WhatsApp genügt. Wir vereinbaren einen Termin, kommen direkt nach ${city.name} und holen den Schrott kostenlos ab. Bei NE-Metallen ist Barankauf vor Ort möglich.`],
      [`Ist die Schrottabholung in ${city.name} wirklich kostenlos?`, `Ja, bei ausreichender Menge holen wir kostenlos ab. Bei hochwertigen Metallen wie Kupfer oder Messing zahlen wir sogar einen Ankaufspreis.`],
      [`Wie schnell können Sie nach ${city.name} kommen?`, `${city.name} liegt ${city.dist} von unserem Standort Hamm. Wir sind regelmäßig vor Ort und können meist innerhalb weniger Werktage abholen.`],
      [`Welche Metalle kaufen Sie in ${city.name} an?`, `Alle NE-Metalle: Kupfer, Messing, Aluminium, Zink, Blei, Edelstahl, Kabelschrott sowie Elektromotoren und Maschinen.`],
    ], canonicalUrl)}

    ${ctaHTML()}
  </article>
</main>

${footerHTML(backPath)}
${whatsappFAB()}
${revealScript()}
</body>
</html>`;
}

// ─── Generate Service Pages ───────────────────────────

function generateServicePage(svc) {
  const backPath = '../';
  const canonicalUrl = `${DOMAIN}/${svc.slug}/`;

  const sectionsHTML = svc.sections.map(s => `
    <section class="section reveal">
      <span class="section-eyebrow">${s.eyebrow}</span>
      <h2>${s.title.replace(/&/g, '&amp;')}</h2>
      ${s.content}
    </section>
    <hr>`).join('\n');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${svc.metaTitle}</title>
  <meta name="description" content="${svc.metaDesc}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="geo.region" content="DE-NW">
  <meta name="geo.placename" content="Hamm, Nordrhein-Westfalen">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${svc.metaTitle}">
  <meta property="og:description" content="${svc.metaDesc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:locale" content="de_DE">
  <link rel="stylesheet" href="${backPath}assets/fonts.css">
  <link rel="stylesheet" href="${backPath}assets/subpage.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "${svc.title}",
    "serviceType": "${svc.title}",
    "description": "${svc.metaDesc}",
    "provider": {"@type":"LocalBusiness","@id":"${DOMAIN}/#business","name":"HB-Metalle"},
    "areaServed": {"@type":"State","name":"Nordrhein-Westfalen"}
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type":"ListItem","position":1,"name":"Startseite","item":"${DOMAIN}/"},
      {"@type":"ListItem","position":2,"name":"${svc.title}","item":"${canonicalUrl}"}
    ]
  }
  </script>
</head>
<body>
${headerHTML(backPath, svc.slug)}

<nav class="breadcrumb-bar" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="${backPath}">Startseite</a></li>
    <li aria-current="page">${svc.title}</li>
  </ol>
</nav>

<section class="page-hero">
  <div class="page-hero-inner">
    <span class="hero-eyebrow">${svc.eyebrow}</span>
    <h1>${svc.h1_line1}<br><span>${svc.h1_line2}</span></h1>
    <p class="hero-sub">${svc.heroSub}</p>
    <div class="hero-ctas">
      <a href="tel:${TEL}" class="btn-primary">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        Jetzt anrufen
      </a>
      <a href="${backPath}#kontakt" class="btn-secondary">Kostenlos anfragen</a>
    </div>
  </div>
</section>

<nav class="usp-bar" aria-label="Vorteile">
  <div class="usp-grid">
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Kostenlos anfragen</div>
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Barankauf vor Ort</div>
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Ganz NRW</div>
    <div class="usp-item"><svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Faire Preise</div>
  </div>
</nav>

<main id="main" class="page-content">
  <article>
    ${sectionsHTML}

    ${faqHTML(svc.faq, canonicalUrl)}

    ${ctaHTML()}
  </article>
</main>

${footerHTML(backPath)}
${whatsappFAB()}
${revealScript()}
</body>
</html>`;
}

// ─── Write All Pages ───────────────────────────

let count = 0;

// City pages
cities.forEach(city => {
  const dir = path.join(BASE, 'schrottabholung', city.slug);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  fs.writeFileSync(filePath, generateCityPage(city), 'utf8');
  count++;
  console.log(`✓ ${filePath}`);
});

// Service pages
services.forEach(svc => {
  const dir = path.join(BASE, svc.slug);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  fs.writeFileSync(filePath, generateServicePage(svc), 'utf8');
  count++;
  console.log(`✓ ${filePath}`);
});

console.log(`\n✅ ${count} Seiten erfolgreich generiert!`);
