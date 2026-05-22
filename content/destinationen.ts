export type Destination = {
  slug: string;
  titel: string;
  eyebrow: string;
  region: string;
  reiseart: string[];
  dauer: number;
  preisAb: number;
  beschreibung: string;
  kurzbeschreibung: string;
  heroImage: string;
  cardImage: string;
  highlights: string[];
  besteReisezeit: string;
  inklusivLeistungen: string[];
  reiseroute: { tag: number; titel: string; beschreibung: string }[];
  wasErwartet: string;
};

export const destinationen: Destination[] = [
  {
    slug: "patagonien-ende-der-welt",
    titel: "Patagonien – Ende der Welt",
    eyebrow: "Argentinien & Chile",
    region: "Amerika",
    reiseart: ["Rundreisen", "Aktiv & Wandern"],
    dauer: 14,
    preisAb: 8900,
    beschreibung:
      "Wo die Anden ins Meer stürzen, beginnt eine Welt aus Gletschern, Gauchos und unendlichem Horizont. Wir bringen Sie an Orte, die kaum jemand kennt.",
    kurzbeschreibung:
      "Eine Reise ans Ende der Welt – zwischen Gletschern, Gauchos und der endlosen Weite Patagoniens.",
    heroImage:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80",
    highlights: [
      "Torres del Paine Nationalpark mit privatem Guide",
      "Perito-Moreno-Gletscher hautnah erleben",
      "Übernachtung auf einer authentischen Estancia",
      "Bootsfahrt durch die Fjorde Feuerlands",
      "Wanderung zum Fitz-Roy-Massiv",
    ],
    besteReisezeit: "November bis März (Südsommer)",
    inklusivLeistungen: [
      "Internationale Flüge ab Zürich",
      "Alle Inlandflüge und Transfers",
      "13 Übernachtungen in ausgewählten Lodges und Hotels",
      "Halbpension (Frühstück und Abendessen)",
      "Privater, deutschsprachiger Guide an allen Tagen",
      "Alle Nationalparkgebühren",
      "Reiseunterlagen und persönliches Briefing",
    ],
    reiseroute: [
      {
        tag: 1,
        titel: "Ankunft in Buenos Aires",
        beschreibung:
          "Empfang am Flughafen, Transfer ins charmante Boutique-Hotel in San Telmo. Erster Abend in der Hauptstadt.",
      },
      {
        tag: 2,
        titel: "Buenos Aires – El Calafate",
        beschreibung:
          "Flug in den Süden. Nachmittags Ankunft in El Calafate, am Ufer des Lago Argentino.",
      },
      {
        tag: 3,
        titel: "Perito-Moreno-Gletscher",
        beschreibung:
          "Ganztägiger Ausflug zum Gletscher. Bootstour entlang der Eiswand, Wanderung auf den Stegen.",
      },
      {
        tag: 4,
        titel: "Estancia-Tag",
        beschreibung:
          "Besuch einer authentischen Gaucho-Ranch. Reitausflug, traditionelles Asado am Abend.",
      },
      {
        tag: 5,
        titel: "Transfer nach El Chaltén",
        beschreibung:
          "Fahrt durch die patagonische Steppe. Ankunft im Trekkingparadies El Chaltén.",
      },
      {
        tag: 6,
        titel: "Fitz-Roy-Wanderung",
        beschreibung:
          "Ganztägige Wanderung zum Laguna de los Tres mit Blick auf das Fitz-Roy-Massiv.",
      },
      {
        tag: 7,
        titel: "Torres del Paine – Ankunft",
        beschreibung:
          "Grenzübertritt nach Chile. Ankunft im Torres del Paine Nationalpark.",
      },
      {
        tag: 8,
        titel: "Torres del Paine – Grey-Gletscher",
        beschreibung:
          "Bootsfahrt über den Lago Grey zum Grey-Gletscher. Nachmittags leichte Wanderung.",
      },
      {
        tag: 9,
        titel: "Torres del Paine – Wanderung",
        beschreibung:
          "Wanderung zu den namensgebenden Torres. Eines der ikonischsten Panoramen der Welt.",
      },
      {
        tag: 10,
        titel: "Punta Arenas",
        beschreibung:
          "Fahrt in die südlichste Grossstadt der Welt. Nachmittags frei für Erkundungen.",
      },
      {
        tag: 11,
        titel: "Feuerland – Ushuaia",
        beschreibung:
          "Flug nach Ushuaia, der südlichsten Stadt der Welt. Nachmittags Bootsfahrt im Beagle-Kanal.",
      },
      {
        tag: 12,
        titel: "Tierra del Fuego Nationalpark",
        beschreibung:
          "Ganztägige Wanderung im Nationalpark. Küstenwälder, Torfmoore und subantarktische Landschaften.",
      },
      {
        tag: 13,
        titel: "Rückflug via Buenos Aires",
        beschreibung:
          "Flug zurück nach Buenos Aires. Letzter freier Abend in der Stadt.",
      },
      {
        tag: 14,
        titel: "Heimreise",
        beschreibung:
          "Transfer zum Flughafen, Rückflug in die Schweiz.",
      },
    ],
    wasErwartet:
      "Patagonien ist das Reiseziel für alle, die die Natur in ihrer elementarsten Form erleben wollen. Zwischen den schroffen Gipfeln der Anden und den weiten Steppen im Süden Argentiniens und Chiles liegt eine Landschaft, die sich kaum in Worte fassen lässt. Türkisfarbene Gletscherseen, kalbende Eismassen, endlose Horizonte und eine Stille, die man nur hier findet. Unsere Reise verbindet die Highlights beider Länder – von der urbanen Energie Buenos Aires' über die Gauchokultur der Estancias bis zu den legendären Trekkingrouten im Torres del Paine.",
  },
  {
    slug: "marokko-koenigsstaedte-und-wueste",
    titel: "Marokko – Königsstädte und Wüste",
    eyebrow: "Nordafrika",
    region: "Afrika",
    reiseart: ["Rundreisen", "Kulturreisen"],
    dauer: 10,
    preisAb: 4200,
    beschreibung:
      "Von den Souks von Marrakesch bis in die Stille der Sahara. Eine sinnliche Reise durch ein Land voller Kontraste.",
    kurzbeschreibung:
      "Zwischen den Souks von Marrakesch und der Stille der Sahara – eine sinnliche Reise durch tausend Kontraste.",
    heroImage:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
    highlights: [
      "Private Führung durch die Medina von Fes",
      "Übernachtung im Luxus-Wüstencamp unter Sternen",
      "Kochkurs in einem Riad in Marrakesch",
      "Sonnenaufgang über den Dünen von Merzouga",
      "Besuch der blauen Stadt Chefchaouen",
    ],
    besteReisezeit: "März bis Mai, September bis November",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Marrakesch, retour ab Casablanca",
      "Alle Transfers im klimatisierten Fahrzeug",
      "9 Übernachtungen in handverlesenen Riads und Boutique-Hotels",
      "Halbpension mit lokalen Spezialitäten",
      "Privater, deutschsprachiger Kulturguide",
      "Alle Eintritte und Aktivitäten laut Programm",
    ],
    reiseroute: [
      {
        tag: 1,
        titel: "Ankunft in Marrakesch",
        beschreibung:
          "Empfang am Flughafen, Transfer ins Riad in der Medina. Erster Rundgang durch die Gassen.",
      },
      {
        tag: 2,
        titel: "Marrakesch entdecken",
        beschreibung:
          "Besuch der Koutoubia-Moschee, Bahia-Palast und Jardin Majorelle. Nachmittags Kochkurs.",
      },
      {
        tag: 3,
        titel: "Über den Atlas nach Aït-Ben-Haddou",
        beschreibung:
          "Fahrt über den Tizi n'Tichka-Pass. Besuch der UNESCO-Welterbe-Kasbah.",
      },
      {
        tag: 4,
        titel: "Dades-Schlucht",
        beschreibung:
          "Fahrt durch die Strasse der Kasbahs. Übernachtung in der spektakulären Dades-Schlucht.",
      },
      {
        tag: 5,
        titel: "Sahara – Merzouga",
        beschreibung:
          "Ankunft an den Dünen von Erg Chebbi. Kamelritt in die Wüste, Übernachtung im Luxus-Camp.",
      },
      {
        tag: 6,
        titel: "Wüste – Fes",
        beschreibung:
          "Sonnenaufgang über der Sahara. Ganztägige Fahrt durch das Ziz-Tal nach Fes.",
      },
      {
        tag: 7,
        titel: "Fes – die älteste Königsstadt",
        beschreibung:
          "Ganztägige Erkundung der Medina mit privatem Guide. Gerberviertel, Medersa Bou Inania.",
      },
      {
        tag: 8,
        titel: "Chefchaouen",
        beschreibung:
          "Fahrt in die blaue Stadt im Rif-Gebirge. Freier Nachmittag zum Flanieren.",
      },
      {
        tag: 9,
        titel: "Rabat und Casablanca",
        beschreibung:
          "Besuch der Hauptstadt Rabat, weiter nach Casablanca. Hassan-II-Moschee am Abend.",
      },
      {
        tag: 10,
        titel: "Heimreise",
        beschreibung:
          "Transfer zum Flughafen Casablanca, Rückflug in die Schweiz.",
      },
    ],
    wasErwartet:
      "Marokko ist ein Land, das alle Sinne anspricht. Der Duft von Gewürzen in den Souks, das Spiel von Licht und Schatten in den Medinas, die Stille der Sahara bei Nacht. Unsere Reise führt Sie durch die grossen Königsstädte – Marrakesch, Fes, Rabat – und hinaus in die Wüste, wo die Zeit still steht. Übernachten Sie in liebevoll restaurierten Riads, kochen Sie mit lokalen Familien und erleben Sie ein Marokko, das weit über die Klischees hinausgeht.",
  },
  {
    slug: "japan-fruehlingsbuete",
    titel: "Japan – Frühlingsblüte",
    eyebrow: "Ostasien",
    region: "Asien",
    reiseart: ["Rundreisen", "Kulturreisen"],
    dauer: 8,
    preisAb: 6500,
    beschreibung:
      "Eine Woche zwischen Kyoto und Tokio, während die Kirschblüten fallen. Tradition und Moderne, in perfektem Gleichgewicht.",
    kurzbeschreibung:
      "Zwischen Tempeln und Wolkenkratzern, während die Kirschblüten fallen – Japan im perfekten Moment.",
    heroImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    highlights: [
      "Kirschblüte in den Tempeln von Kyoto",
      "Teezeremonie mit einer Meisterin in Uji",
      "Übernachtung in einem traditionellen Ryokan",
      "Shinkansen-Erlebnis Tokio–Kyoto",
      "Tagesausflug nach Nara mit den heiligen Hirschen",
    ],
    besteReisezeit: "Ende März bis Mitte April (Kirschblüte)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Tokio, retour ab Osaka",
      "Japan Rail Pass für 7 Tage",
      "7 Übernachtungen: Mix aus Boutique-Hotels und Ryokan",
      "Frühstück täglich, 3 besondere Abendessen",
      "Privater Guide an 4 Tagen",
      "Teezeremonie und Kochkurs inklusive",
    ],
    reiseroute: [
      {
        tag: 1,
        titel: "Ankunft in Tokio",
        beschreibung:
          "Empfang am Flughafen Narita, Transfer ins Hotel in Shinjuku. Erster Abend in der Metropole.",
      },
      {
        tag: 2,
        titel: "Tokio – Tradition und Moderne",
        beschreibung:
          "Morgens Meiji-Schrein und Harajuku. Nachmittags Senso-ji in Asakusa. Abends Shibuya Crossing.",
      },
      {
        tag: 3,
        titel: "Tokio – Kulinarik und Kultur",
        beschreibung:
          "Tsukiji Outer Market, TeamLab Borderless. Nachmittags freie Zeit in Ginza.",
      },
      {
        tag: 4,
        titel: "Shinkansen nach Kyoto",
        beschreibung:
          "Fahrt mit dem Hochgeschwindigkeitszug. Nachmittags Fushimi Inari-Schrein und Geisha-Viertel Gion.",
      },
      {
        tag: 5,
        titel: "Kyoto – Tempel und Gärten",
        beschreibung:
          "Kinkaku-ji, Arashiyama Bambuswald, Philosophenweg. Die Kirschblüte in ihrer schönsten Form.",
      },
      {
        tag: 6,
        titel: "Tagesausflug nach Nara",
        beschreibung:
          "Die alte Kaiserstadt mit dem grossen Buddha und den zahmen Hirschen im Park.",
      },
      {
        tag: 7,
        titel: "Uji und Teezeremonie",
        beschreibung:
          "Besuch der Teeregion Uji. Teezeremonie mit einer Meisterin, Besuch des Byodo-in-Tempels.",
      },
      {
        tag: 8,
        titel: "Heimreise ab Osaka",
        beschreibung:
          "Morgens kurzer Besuch in Osaka (Dotonbori). Transfer zum Flughafen Kansai, Rückflug.",
      },
    ],
    wasErwartet:
      "Japan ist ein Land der Gegensätze, die sich auf wundersame Weise ergänzen. Jahrhundertealte Tempel stehen neben futuristischen Wolkenkratzern, stille Zen-Gärten grenzen an pulsierende Neonstrassen. Unsere Reise fällt bewusst in die Kirschblütenzeit – jene wenigen Wochen, in denen ganz Japan in zartes Rosa getaucht ist. Von der Energie Tokios über die Stille Kyotos bis zur Gastfreundschaft eines traditionellen Ryokan erleben Sie ein Japan, das lange nachklingt.",
  },
  {
    slug: "island-feuer-und-eis",
    titel: "Island – Feuer und Eis",
    eyebrow: "Nordeuropa",
    region: "Europa",
    reiseart: ["Rundreisen", "Aktiv & Wandern"],
    dauer: 10,
    preisAb: 5800,
    beschreibung:
      "Geysire, Gletscher und die Mitternachtssonne – eine Reise durch die elementarste Landschaft Europas.",
    kurzbeschreibung:
      "Wo Vulkane auf Gletscher treffen und die Nacht nie ganz dunkel wird.",
    heroImage:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
    highlights: [
      "Golden Circle mit privatem Guide",
      "Gletscherwanderung auf dem Vatnajökull",
      "Walbeobachtung in Húsavík",
      "Blaue Lagune bei Sonnenuntergang",
      "Jökulsárlón Gletscherlagune",
    ],
    besteReisezeit: "Juni bis August (Mitternachtssonne)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Reykjavík retour",
      "Geländewagen mit Vollkasko für 10 Tage",
      "9 Übernachtungen in Gästehäusern und Boutique-Hotels",
      "Frühstück täglich",
      "Geführte Gletscherwanderung und Walbeobachtung",
      "Eintritt Blaue Lagune Premium",
    ],
    reiseroute: [
      {
        tag: 1,
        titel: "Ankunft in Reykjavík",
        beschreibung:
          "Übernahme des Geländewagens. Erkundung der kleinen Hauptstadt.",
      },
      {
        tag: 2,
        titel: "Golden Circle",
        beschreibung:
          "Þingvellir, Geysir, Gullfoss – Islands berühmteste Route an einem Tag.",
      },
      {
        tag: 3,
        titel: "Südküste",
        beschreibung:
          "Seljalandsfoss, Skógafoss, schwarzer Strand von Vík.",
      },
      {
        tag: 4,
        titel: "Vatnajökull und Jökulsárlón",
        beschreibung:
          "Gletscherwanderung am grössten Gletscher Europas. Bootsfahrt auf der Gletscherlagune.",
      },
      {
        tag: 5,
        titel: "Ostfjorde",
        beschreibung:
          "Fahrt durch die einsamsten Fjorde Islands. Kleine Fischerdörfer und spektakuläre Küsten.",
      },
      {
        tag: 6,
        titel: "Mývatn-Region",
        beschreibung:
          "Vulkanische Landschaften, heisse Quellen, Pseudokrater am See.",
      },
      {
        tag: 7,
        titel: "Húsavík – Walbeobachtung",
        beschreibung:
          "Bootstour zur Walbeobachtung. Europas beste Chance auf Buckelwale.",
      },
      {
        tag: 8,
        titel: "Akureyri und Nordisland",
        beschreibung:
          "Die Hauptstadt des Nordens. Godafoss, botanischer Garten.",
      },
      {
        tag: 9,
        titel: "Snæfellsnes-Halbinsel",
        beschreibung:
          "Der Kirkjufell-Berg, Lavafelder und der mystische Snæfellsjökull.",
      },
      {
        tag: 10,
        titel: "Reykjavík und Heimreise",
        beschreibung:
          "Blaue Lagune am Morgen, dann Rückgabe des Wagens und Heimflug.",
      },
    ],
    wasErwartet:
      "Island ist ein Land im Werden – geologisch jung, wild und von einer Schönheit, die sprachlos macht. Auf dieser Rundreise umrunden Sie die gesamte Insel auf der berühmten Ringstrasse und erleben dabei Europas letzte grosse Wildnis: dampfende Geysire, kalbende Gletscher, tosende Wasserfälle und Strände aus schwarzem Lavasand.",
  },
  {
    slug: "tansania-serengeti-und-sansibar",
    titel: "Tansania – Serengeti und Sansibar",
    eyebrow: "Ostafrika",
    region: "Afrika",
    reiseart: ["Safari", "Strand & Erholung"],
    dauer: 12,
    preisAb: 7400,
    beschreibung:
      "Die grosse Migration in der Serengeti erleben und danach auf Sansibar die Seele baumeln lassen.",
    kurzbeschreibung:
      "Von der Serengeti ans Meer – Safari-Abenteuer und Inselidylle in einer Reise.",
    heroImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    highlights: [
      "Pirschfahrten in der Serengeti mit privatem Guide",
      "Ngorongoro-Krater – das achte Weltwunder",
      "Heissluftballonfahrt über die Savanne",
      "Strandtage auf Sansibar mit Gewürztour",
      "Sonnenuntergang auf einer Dhow vor Stone Town",
    ],
    besteReisezeit: "Juni bis Oktober (Trockenzeit, grosse Migration)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Kilimanjaro, retour ab Sansibar",
      "Alle Inlandflüge (Serengeti–Sansibar)",
      "7 Nächte Safari-Lodges und Tented Camps",
      "4 Nächte Boutique-Beach-Resort auf Sansibar",
      "Vollpension auf Safari, Halbpension auf Sansibar",
      "Privater Fahrer-Guide auf Safari",
      "Alle Nationalparkgebühren",
    ],
    reiseroute: [
      {
        tag: 1,
        titel: "Ankunft am Kilimanjaro",
        beschreibung: "Empfang und Transfer zur Lodge am Rande des Nationalparks.",
      },
      {
        tag: 2,
        titel: "Tarangire Nationalpark",
        beschreibung: "Erste Pirschfahrt. Elefantenherden und Baobab-Bäume.",
      },
      {
        tag: 3,
        titel: "Ngorongoro-Krater",
        beschreibung:
          "Abfahrt in den Krater. Flamingos, Löwen, Nashörner auf engstem Raum.",
      },
      {
        tag: 4,
        titel: "Serengeti – Ankunft",
        beschreibung:
          "Fahrt in die endlose Ebene. Erstes Tented Camp mitten in der Wildnis.",
      },
      {
        tag: 5,
        titel: "Serengeti – Pirschfahrten",
        beschreibung: "Ganztägige Pirschfahrten. Big Five, Gnus, Zebras.",
      },
      {
        tag: 6,
        titel: "Serengeti – Ballonfahrt",
        beschreibung:
          "Optionale Heissluftballonfahrt bei Sonnenaufgang. Champagner-Frühstück in der Savanne.",
      },
      {
        tag: 7,
        titel: "Serengeti – letzter Safari-Tag",
        beschreibung: "Letzte Pirschfahrt, dann Flug nach Sansibar.",
      },
      {
        tag: 8,
        titel: "Sansibar – Ankunft",
        beschreibung:
          "Ankunft auf der Gewürzinsel. Nachmittags am Strand oder im Pool.",
      },
      {
        tag: 9,
        titel: "Stone Town",
        beschreibung:
          "Geführter Rundgang durch die UNESCO-Altstadt. Gewürztour am Nachmittag.",
      },
      {
        tag: 10,
        titel: "Sansibar – Strandtag",
        beschreibung: "Freier Tag. Schnorcheln, Kajakfahren oder einfach entspannen.",
      },
      {
        tag: 11,
        titel: "Sansibar – Dhow-Sunset",
        beschreibung:
          "Letzter Tag am Meer. Abends Sunset-Cruise auf einer traditionellen Dhow.",
      },
      {
        tag: 12,
        titel: "Heimreise",
        beschreibung: "Transfer zum Flughafen, Rückflug in die Schweiz.",
      },
    ],
    wasErwartet:
      "Diese Reise vereint zwei Traumziele in einem: Die endlose Weite der Serengeti mit ihren Raubtieren, Herden und dramatischen Sonnenuntergängen – und die tropische Gelassenheit Sansibars mit türkisem Meer, Gewürzmärkten und historischem Stone Town. Eine perfekte Kombination aus Abenteuer und Erholung.",
  },
  {
    slug: "norwegen-fjorde-und-nordlichter",
    titel: "Norwegen – Fjorde und Nordlichter",
    eyebrow: "Skandinavien",
    region: "Europa",
    reiseart: ["Rundreisen", "Aktiv & Wandern"],
    dauer: 9,
    preisAb: 5200,
    beschreibung:
      "Durch die tiefsten Fjorde Norwegens bis hinauf zu den Lofoten – wo das Nordlicht über den Bergen tanzt.",
    kurzbeschreibung:
      "Fjorde, Fischerdörfer und Nordlichter – Norwegens Norden in seiner schönsten Form.",
    heroImage:
      "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&q=80",
    highlights: [
      "Postschifffahrt entlang der norwegischen Küste",
      "Wanderung zum Reinebringen auf den Lofoten",
      "Nordlichter-Safari mit lokalem Experten",
      "Kayaktour im Geirangerfjord",
      "Übernachtung im Rorbu (traditionelles Fischerhaus)",
    ],
    besteReisezeit:
      "September bis März (Nordlichter), Juni bis August (Mitternachtssonne)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Bergen, retour ab Tromsø",
      "Alle Inlandflüge und Fährpassagen",
      "8 Übernachtungen in Boutique-Hotels und Rorbuer",
      "Frühstück täglich, 4 Abendessen",
      "Nordlichter-Safari und Fjord-Kayaktour",
    ],
    reiseroute: [
      {
        tag: 1,
        titel: "Ankunft in Bergen",
        beschreibung:
          "Ankunft in der Hansestadt. Erkundung von Bryggen, Abendessen am Fischmarkt.",
      },
      {
        tag: 2,
        titel: "Geirangerfjord",
        beschreibung: "Fahrt zum schönsten Fjord Norwegens. Kayaktour am Nachmittag.",
      },
      {
        tag: 3,
        titel: "Ålesund",
        beschreibung:
          "Die Jugendstilstadt am Meer. Wanderung zum Aksla mit Panoramablick.",
      },
      {
        tag: 4,
        titel: "Küstenfahrt nach Norden",
        beschreibung:
          "Postschiff entlang der spektakulären norwegischen Küste.",
      },
      {
        tag: 5,
        titel: "Lofoten – Ankunft",
        beschreibung:
          "Ankunft auf den Lofoten. Bezug des Rorbu direkt am Wasser.",
      },
      {
        tag: 6,
        titel: "Lofoten – Wanderung",
        beschreibung:
          "Wanderung zum Reinebringen. Einer der schönsten Aussichtspunkte Europas.",
      },
      {
        tag: 7,
        titel: "Lofoten – freier Tag",
        beschreibung:
          "Fischerdörfer erkunden, Stockfisch probieren, Ruhe geniessen.",
      },
      {
        tag: 8,
        titel: "Tromsø",
        beschreibung:
          "Flug nach Tromsø. Abends Nordlichter-Safari (saisonabhängig).",
      },
      {
        tag: 9,
        titel: "Heimreise",
        beschreibung: "Letzter Morgen in Tromsø, Rückflug in die Schweiz.",
      },
    ],
    wasErwartet:
      "Norwegen gehört zu den dramatischsten Landschaften Europas. Steile Fjorde, die tief ins Landesinnere schneiden, einsame Lofoten-Inseln mit ihren bunten Fischerhäusern, und darüber – in den Wintermonaten – das magische Nordlicht. Diese Reise führt Sie von der Hansestadt Bergen entlang der Küste bis hinauf zu den Lofoten und nach Tromsø.",
  },
  {
    slug: "neuseeland-aotearoa-entdecken",
    titel: "Neuseeland – Aotearoa entdecken",
    eyebrow: "Ozeanien",
    region: "Ozeanien",
    reiseart: ["Rundreisen", "Aktiv & Wandern"],
    dauer: 16,
    preisAb: 9400,
    beschreibung:
      "Von den geothermischen Wundern der Nordinsel bis zu den Fjorden des Südens – Neuseeland ist Natur in ihrer reinsten Form.",
    kurzbeschreibung:
      "Vulkane, Fjorde und endlose Weite – Neuseeland von Nord nach Süd.",
    heroImage:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80",
    highlights: [
      "Milford Sound per Boot und Kayak",
      "Tongariro Alpine Crossing – eine der schönsten Tageswanderungen der Welt",
      "Māori-Kulturerlebnis in Rotorua",
      "Sternenhimmel am Lake Tekapo (Dark Sky Reserve)",
      "Queenstown – Abenteuerhauptstadt am Wakatipu-See",
    ],
    besteReisezeit: "November bis März (Südsommer)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Auckland, retour ab Christchurch",
      "Mietwagen mit Vollkasko für 16 Tage",
      "15 Übernachtungen in Boutique-Lodges und B&Bs",
      "Frühstück täglich",
      "Milford-Sound-Bootstour und Kayak-Erlebnis",
      "Māori-Kulturabend mit Hangi-Dinner",
      "Geführte Tongariro-Wanderung",
    ],
    reiseroute: [
      { tag: 1, titel: "Ankunft in Auckland", beschreibung: "Empfang am Flughafen, Übernahme des Mietwagens. Erster Abend in der City of Sails." },
      { tag: 2, titel: "Coromandel-Halbinsel", beschreibung: "Fahrt zur Ostküste. Cathedral Cove, Hot Water Beach." },
      { tag: 3, titel: "Rotorua", beschreibung: "Geothermisches Wunderland: Geysire, heisse Quellen, Māori-Kulturerlebnis am Abend." },
      { tag: 4, titel: "Tongariro National Park", beschreibung: "Fahrt ins Vulkangebiet. Nachmittags Erkundung der Landschaft." },
      { tag: 5, titel: "Tongariro Alpine Crossing", beschreibung: "Ganztägige Wanderung über den aktiven Vulkan. Emerald Lakes, Red Crater." },
      { tag: 6, titel: "Wellington", beschreibung: "Fahrt in die Hauptstadt. Te Papa Museum, Craft-Beer-Szene, Cable Car." },
      { tag: 7, titel: "Fähre zur Südinsel", beschreibung: "Überfahrt durch die Cook Strait nach Picton. Nachmittags Marlborough Sounds." },
      { tag: 8, titel: "Abel Tasman", beschreibung: "Küstenwanderung im Abel Tasman National Park. Goldene Strände, türkises Wasser." },
      { tag: 9, titel: "West Coast", beschreibung: "Fahrt über die Alpen zur Westküste. Franz-Josef-Gletscher." },
      { tag: 10, titel: "Wanaka", beschreibung: "Fahrt nach Wanaka. Roys Peak Wanderung am Nachmittag." },
      { tag: 11, titel: "Queenstown", beschreibung: "Abenteuerhauptstadt am Wakatipu-See. Freier Tag für Aktivitäten." },
      { tag: 12, titel: "Milford Sound", beschreibung: "Tagesausflug zum berühmtesten Fjord Neuseelands. Bootstour und Kayaking." },
      { tag: 13, titel: "Te Anau – Mount Cook", beschreibung: "Fahrt durch das Mackenzie Country zum höchsten Berg Neuseelands." },
      { tag: 14, titel: "Lake Tekapo", beschreibung: "Church of the Good Shepherd, Sternenhimmel im Dark Sky Reserve." },
      { tag: 15, titel: "Christchurch", beschreibung: "Ankunft in der grössten Stadt der Südinsel. Botanischer Garten, Street Art." },
      { tag: 16, titel: "Heimreise", beschreibung: "Rückgabe des Mietwagens, Rückflug in die Schweiz." },
    ],
    wasErwartet:
      "Neuseeland ist ein Land, das für seine Grösse eine unglaubliche Vielfalt bietet. Auf der Nordinsel brodeln Vulkane und dampfen Geysire, die Māori-Kultur ist lebendig und allgegenwärtig. Die Südinsel kontrastiert mit alpinen Gipfeln, stillen Fjorden und endlosen Küsten. Unsere Route verbindet beide Inseln und führt Sie von Auckland bis Christchurch durch die schönsten Ecken Aotearoas.",
  },
  {
    slug: "vietnam-entlang-der-kueste",
    titel: "Vietnam – Entlang der Küste",
    eyebrow: "Südostasien",
    region: "Asien",
    reiseart: ["Rundreisen", "Kulturreisen"],
    dauer: 12,
    preisAb: 4800,
    beschreibung:
      "Von den Kalksteinfelsen der Halong-Bucht bis zu den Reisfeldern im Mekong-Delta – Vietnam überrascht an jeder Ecke.",
    kurzbeschreibung:
      "Zwischen Kalksteinfelsen und Reisfeldern – Vietnam von Nord nach Süd.",
    heroImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    highlights: [
      "Übernachtung auf einer Dschunke in der Halong-Bucht",
      "Altstadt von Hoi An bei Laternenlicht",
      "Strassenküchen-Tour durch Hanoi",
      "Bootsfahrt im Mekong-Delta",
      "Kaiserstadt Huế mit privatem Guide",
    ],
    besteReisezeit: "Oktober bis April (Trockenzeit)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Hanoi, retour ab Ho-Chi-Minh-Stadt",
      "Alle Inlandflüge und Transfers",
      "11 Übernachtungen in Boutique-Hotels und Homestays",
      "Halbpension mit lokaler Küche",
      "Privater, deutschsprachiger Guide",
      "Dschunken-Übernachtung in der Halong-Bucht",
      "Kochkurs in Hoi An",
    ],
    reiseroute: [
      { tag: 1, titel: "Ankunft in Hanoi", beschreibung: "Empfang am Flughafen, Transfer ins Hotel im Altstadtviertel. Erster Spaziergang um den Hoan-Kiem-See." },
      { tag: 2, titel: "Hanoi entdecken", beschreibung: "Ho-Chi-Minh-Mausoleum, Literaturtempel, Wasserpuppentheater. Abends Strassenküchen-Tour." },
      { tag: 3, titel: "Halong-Bucht", beschreibung: "Fahrt zur Bucht, Einschiffen auf der Dschunke. Kayakfahrt zwischen Kalksteinfelsen." },
      { tag: 4, titel: "Halong – Hanoi – Huế", beschreibung: "Sonnenaufgang auf dem Wasser. Rückkehr und Flug nach Huế." },
      { tag: 5, titel: "Kaiserstadt Huế", beschreibung: "Besuch der Zitadelle, Königsgräber, Parfüm-Fluss per Drachenboot." },
      { tag: 6, titel: "Hai-Van-Pass nach Hoi An", beschreibung: "Fahrt über den legendären Küstenpass. Ankunft in der Laternenstadt." },
      { tag: 7, titel: "Hoi An", beschreibung: "Altstadt, japanische Brücke, Kochkurs am Morgen. Nachmittags Strand oder Radtour." },
      { tag: 8, titel: "Hoi An – freier Tag", beschreibung: "Schneidern lassen, Keramikdorf Thanh Ha besuchen, oder einfach geniessen." },
      { tag: 9, titel: "Flug nach Ho-Chi-Minh-Stadt", beschreibung: "Ankunft in Saigon. Nachmittags Wiedervereinigungspalast und Notre-Dame." },
      { tag: 10, titel: "Cu-Chi-Tunnel und Chinatown", beschreibung: "Morgens Cu-Chi-Tunnel, nachmittags Cholon (Chinatown) und Ben-Thanh-Markt." },
      { tag: 11, titel: "Mekong-Delta", beschreibung: "Tagesausflug: Bootsfahrt durch Kanäle, schwimmende Märkte, Obstgärten." },
      { tag: 12, titel: "Heimreise", beschreibung: "Letzter Morgen in Saigon, Transfer zum Flughafen, Rückflug." },
    ],
    wasErwartet:
      "Vietnam ist ein Land in Bewegung – pulsierend, farbenfroh und voller Kontraste. Im Norden die mystische Halong-Bucht und das chaotisch-charmante Hanoi, im Zentrum die Kaiserstadt Huế und das verträumte Hoi An, im Süden das energiegeladene Saigon und das üppige Mekong-Delta. Unsere Reise folgt der Küste von Nord nach Süd und zeigt Ihnen ein Land, das trotz aller Modernisierung seine Seele bewahrt hat.",
  },
  {
    slug: "griechenland-inselhuepfen-aegaeis",
    titel: "Griechenland – Inselhüpfen in der Ägäis",
    eyebrow: "Mittelmeer",
    region: "Europa",
    reiseart: ["Strand & Erholung", "Kulturreisen"],
    dauer: 10,
    preisAb: 3900,
    beschreibung:
      "Weisse Dörfer, türkises Meer und jahrtausendealte Geschichte – Inselhüpfen in der Ägäis ist Griechenland in seiner schönsten Form.",
    kurzbeschreibung:
      "Von Insel zu Insel durch die Ägäis – weisse Dörfer, antike Tempel und türkises Meer.",
    heroImage:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    highlights: [
      "Sonnenuntergang in Oia auf Santorini",
      "Akropolis-Besuch mit privatem Archäologen",
      "Segeltörn zwischen den Kykladen",
      "Weinverkostung auf Santorini (Assyrtiko)",
      "Versteckte Strände auf Naxos und Paros",
    ],
    besteReisezeit: "Mai bis Juni, September bis Oktober",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Athen, retour ab Santorini",
      "Alle Fährpassagen zwischen den Inseln",
      "9 Übernachtungen in Boutique-Hotels",
      "Frühstück täglich, 3 Abendessen",
      "Privater Archäologie-Guide in Athen",
      "Halbtägiger Segeltörn auf den Kykladen",
    ],
    reiseroute: [
      { tag: 1, titel: "Ankunft in Athen", beschreibung: "Transfer ins Hotel in Plaka. Erster Abend mit Blick auf die beleuchtete Akropolis." },
      { tag: 2, titel: "Athen – Antike und Moderne", beschreibung: "Akropolis mit privatem Guide, Agora, Akropolis-Museum. Nachmittags freie Zeit in Monastiraki." },
      { tag: 3, titel: "Fähre nach Naxos", beschreibung: "Überfahrt zur grössten Kykladeninsel. Nachmittags Chora erkunden, Portara bei Sonnenuntergang." },
      { tag: 4, titel: "Naxos – Strand und Hinterland", beschreibung: "Morgens Plaka Beach, nachmittags Dörfer im Landesinneren. Lokaler Käse und Kitron-Likör." },
      { tag: 5, titel: "Fähre nach Paros", beschreibung: "Kurze Überfahrt. Naoussa erkunden, Abendessen am Fischerhafen." },
      { tag: 6, titel: "Paros – Segeltörn", beschreibung: "Halbtägiger Segeltörn zu versteckten Buchten. Nachmittags Lefkes und die alte Marmorstrasse." },
      { tag: 7, titel: "Fähre nach Santorini", beschreibung: "Ankunft auf der Vulkaninsel. Check-in in Fira, erster Spaziergang entlang der Caldera." },
      { tag: 8, titel: "Santorini – Oia und Wein", beschreibung: "Wanderung von Fira nach Oia entlang der Caldera. Weinverkostung am Nachmittag. Sonnenuntergang in Oia." },
      { tag: 9, titel: "Santorini – freier Tag", beschreibung: "Red Beach, Akrotiri (das Pompeji der Ägäis), oder einfach am Pool geniessen." },
      { tag: 10, titel: "Heimreise", beschreibung: "Transfer zum Flughafen Santorini, Rückflug in die Schweiz." },
    ],
    wasErwartet:
      "Die griechischen Kykladen sind der Inbegriff des Mittelmeer-Traums: weissgetünchte Häuser vor tiefblauem Meer, Windmühlen auf Hügeln, versteckte Buchten und Dörfer, in denen die Zeit langsamer vergeht. Unsere Route führt von den antiken Monumenten Athens über die ruhigeren Inseln Naxos und Paros bis zum spektakulären Santorini – und zeigt Ihnen ein Griechenland, das weit über die Postkartenmotive hinausgeht.",
  },
  {
    slug: "costa-rica-pura-vida",
    titel: "Costa Rica – Pura vida",
    eyebrow: "Zentralamerika",
    region: "Amerika",
    reiseart: ["Rundreisen", "Aktiv & Wandern"],
    dauer: 14,
    preisAb: 5600,
    beschreibung:
      "Regenwald, Vulkane und karibische Strände – Costa Rica packt eine unglaubliche Vielfalt in ein kleines Land.",
    kurzbeschreibung:
      "Vom Nebelwald zum Karibikstrand – Costa Ricas ganze Vielfalt auf einer Reise.",
    heroImage:
      "https://images.unsplash.com/photo-1518259102261-b713f9ee0390?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1518259102261-b713f9ee0390?w=800&q=80",
    highlights: [
      "Hängebrücken im Nebelwald von Monteverde",
      "Vulkan Arenal bei Sonnenuntergang",
      "Schildkröten-Beobachtung in Tortuguero",
      "Zip-Lining durch den Regenwald-Canopy",
      "Schnorcheln im Cahuita-Nationalpark",
    ],
    besteReisezeit: "Dezember bis April (Trockenzeit)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach San José retour",
      "Alle Transfers und Inlandsfahrten",
      "13 Übernachtungen in Eco-Lodges und Boutique-Hotels",
      "Halbpension",
      "Geführte Naturwanderungen mit Biologen",
      "Bootsfahrt durch die Kanäle von Tortuguero",
      "Alle Nationalparkgebühren",
    ],
    reiseroute: [
      { tag: 1, titel: "Ankunft in San José", beschreibung: "Empfang am Flughafen, Transfer ins Hotel im Stadtzentrum." },
      { tag: 2, titel: "Tortuguero", beschreibung: "Fahrt und Bootsfahrt in den Tortuguero-Nationalpark. Kanalfahrt am Nachmittag." },
      { tag: 3, titel: "Tortuguero – Dschungel", beschreibung: "Frühwanderung: Affen, Tukane, Kaimane. Nachmittags Schildkrötenstation (saisonal)." },
      { tag: 4, titel: "Karibikküste – Cahuita", beschreibung: "Fahrt an die Karibikküste. Schnorcheln im Cahuita-Nationalpark, Reggae-Vibes." },
      { tag: 5, titel: "Puerto Viejo", beschreibung: "Freier Tag an der Karibik. Playa Cocles, Schokoladentour bei den Bribri." },
      { tag: 6, titel: "Arenal-Vulkan", beschreibung: "Fahrt ins Hochland zum Vulkan Arenal. Nachmittags heisse Quellen." },
      { tag: 7, titel: "Arenal – Abenteuer", beschreibung: "Hängebrücken-Tour, Zip-Lining über den Regenwald-Canopy. Lava-Trail-Wanderung." },
      { tag: 8, titel: "Monteverde", beschreibung: "Fahrt in den Nebelwald. Geführte Nachtwanderung: Frösche, Schlangen, Insekten." },
      { tag: 9, titel: "Monteverde – Nebelwald", beschreibung: "Biologische Station: Hängebrücken, Kolibri-Garten, Kaffeeplantage." },
      { tag: 10, titel: "Pazifikküste – Manuel Antonio", beschreibung: "Fahrt an die Pazifikküste. Erster Nachmittag am Strand." },
      { tag: 11, titel: "Manuel Antonio Nationalpark", beschreibung: "Wanderung im Nationalpark: Kapuzineraffen, Faultiere, versteckte Strände." },
      { tag: 12, titel: "Manuel Antonio – freier Tag", beschreibung: "Kayak, Stand-Up-Paddling, oder einfach am Strand entspannen." },
      { tag: 13, titel: "Rückfahrt nach San José", beschreibung: "Gemütliche Fahrt zurück. Letztes Abendessen in einem lokalen Restaurant." },
      { tag: 14, titel: "Heimreise", beschreibung: "Transfer zum Flughafen, Rückflug in die Schweiz." },
    ],
    wasErwartet:
      "Costa Rica beweist, dass Grösse nichts mit Vielfalt zu tun hat. Auf einer Fläche kleiner als die Schweiz finden Sie Regenwälder, Vulkane, Nebelwälder, karibische und pazifische Strände, und eine Tierwelt, die ihresgleichen sucht. «Pura vida» – das pure Leben – ist hier nicht nur ein Spruch, sondern eine Lebenseinstellung. Unsere Reise führt Sie von den Kanälen Tortugueros über den imposanten Arenal bis an die Traumstrände von Manuel Antonio.",
  },
  {
    slug: "sri-lanka-insel-der-tausend-gesichter",
    titel: "Sri Lanka – Insel der tausend Gesichter",
    eyebrow: "Südasien",
    region: "Asien",
    reiseart: ["Rundreisen", "Kulturreisen"],
    dauer: 11,
    preisAb: 4500,
    beschreibung:
      "Uralte Tempel, Teeplantagen im Hochland und wilde Elefanten an der Küste – Sri Lanka ist ein ganzer Kontinent auf einer Insel.",
    kurzbeschreibung:
      "Tempel, Teeplantagen und Tropenstrände – eine ganze Welt auf einer Insel.",
    heroImage:
      "https://images.unsplash.com/photo-1586394532085-28cecfcee498?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1586394532085-28cecfcee498?w=800&q=80",
    highlights: [
      "Sigiriya-Felsenfestung bei Sonnenaufgang",
      "Zugfahrt durch die Teeplantagen von Ella",
      "Safari im Yala-Nationalpark (Leoparden)",
      "Altstadt von Galle (UNESCO-Welterbe)",
      "Ayurveda-Behandlung in einem Heritage-Hotel",
    ],
    besteReisezeit: "Dezember bis März (Westküste), Mai bis September (Ostküste)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Colombo retour",
      "Alle Transfers im klimatisierten Fahrzeug",
      "10 Übernachtungen in Heritage-Hotels und Boutique-Resorts",
      "Halbpension",
      "Privater, deutschsprachiger Fahrer-Guide",
      "Safari im Yala-Nationalpark",
      "Alle Tempeleintritte",
    ],
    reiseroute: [
      { tag: 1, titel: "Ankunft in Colombo", beschreibung: "Empfang und Transfer. Erste Eindrücke der Hauptstadt." },
      { tag: 2, titel: "Dambulla und Sigiriya", beschreibung: "Höhlentempel von Dambulla (UNESCO). Nachmittags Aufstieg zur Sigiriya-Felsenfestung." },
      { tag: 3, titel: "Polonnaruwa", beschreibung: "Antike Ruinenstadt per Fahrrad. Riesige Buddha-Statuen und heilige Bäume." },
      { tag: 4, titel: "Kandy", beschreibung: "Fahrt ins Hochland. Zahntempel, Botanischer Garten, Kandyan-Dance am Abend." },
      { tag: 5, titel: "Teeplantagen – Nuwara Eliya", beschreibung: "Besuch einer Teefabrik, Wanderung durch Plantagen. Das «Little England» Sri Lankas." },
      { tag: 6, titel: "Zugfahrt nach Ella", beschreibung: "Die berühmteste Zugstrecke der Welt: durch Teeplantagen, über Brücken, vorbei an Wasserfällen." },
      { tag: 7, titel: "Ella", beschreibung: "Little Adams Peak, Nine Arch Bridge, Ravana-Wasserfall. Entspannter Tag im Hochland." },
      { tag: 8, titel: "Yala-Nationalpark", beschreibung: "Morgens und nachmittags Pirschfahrt. Elefanten, Krokodile, mit Glück ein Leopard." },
      { tag: 9, titel: "Südküste – Mirissa", beschreibung: "Fahrt an die Südküste. Nachmittags am Strand. Optional: Walbeobachtung (saisonal)." },
      { tag: 10, titel: "Galle", beschreibung: "Die holländische Festungsstadt (UNESCO). Antiquitätenläden, Cafés, Leuchtturm." },
      { tag: 11, titel: "Heimreise", beschreibung: "Fahrt zum Flughafen Colombo, Rückflug in die Schweiz." },
    ],
    wasErwartet:
      "Sri Lanka wird oft als Träne Indiens bezeichnet – und tatsächlich konzentriert diese kleine Insel eine fast unglaubliche Dichte an Erlebnissen. Jahrtausendealte Tempelanlagen im kulturellen Dreieck, das kühle Hochland mit seinen endlosen Teeplantagen, wilde Leoparden im Yala-Nationalpark und die koloniale Eleganz von Galle an der Südküste. Unsere Route führt Sie einmal quer über die Insel und zeigt alle Facetten dieses faszinierenden Landes.",
  },
  {
    slug: "namibia-weite-und-wildnis",
    titel: "Namibia – Weite und Wildnis",
    eyebrow: "Südliches Afrika",
    region: "Afrika",
    reiseart: ["Safari", "Aktiv & Wandern"],
    dauer: 13,
    preisAb: 6800,
    beschreibung:
      "Rote Dünen, endlose Wüsten und eine Tierwelt, die frei durch die älteste Wüste der Welt streift – Namibia ist Afrika in seiner ursprünglichsten Form.",
    kurzbeschreibung:
      "Rote Dünen, Wüstenelefanten und endlose Horizonte – Namibia pur.",
    heroImage:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1509310202330-aec5af561c6b?w=800&q=80",
    highlights: [
      "Sonnenaufgang über den Dünen von Sossusvlei",
      "Wüstenelefanten im Damaraland",
      "Pirschfahrten im Etosha-Nationalpark",
      "Shipwreck-Küste an der Skeleton Coast",
      "Sternenbeobachtung in der Namib-Wüste",
    ],
    besteReisezeit: "Mai bis Oktober (Trockenzeit, kühlere Temperaturen)",
    inklusivLeistungen: [
      "Flüge ab Zürich nach Windhoek retour",
      "Geländewagen mit Campingausrüstung oder Lodge-Variante",
      "12 Übernachtungen in Lodges und Gästehäusern",
      "Halbpension",
      "Geführte Pirschfahrten in Etosha",
      "Living-Desert-Tour bei Swakopmund",
      "Alle Nationalparkgebühren",
    ],
    reiseroute: [
      { tag: 1, titel: "Ankunft in Windhoek", beschreibung: "Empfang am Flughafen, Übernahme des Geländewagens. Erkundung der Hauptstadt." },
      { tag: 2, titel: "Kalahari-Wüste", beschreibung: "Fahrt in die rote Kalahari. Sundowner auf den Dünen, Sternenhimmel." },
      { tag: 3, titel: "Sossusvlei", beschreibung: "Sonnenaufgang an der Düne 45. Wanderung zum Deadvlei mit den versteinerten Bäumen." },
      { tag: 4, titel: "Sesriem-Canyon", beschreibung: "Morgens Canyon-Wanderung. Nachmittags Fahrt Richtung Küste durch den Kuiseb-Pass." },
      { tag: 5, titel: "Swakopmund", beschreibung: "Deutsche Kolonialarchitektur am Atlantik. Living-Desert-Tour am Nachmittag." },
      { tag: 6, titel: "Skeleton Coast", beschreibung: "Fahrt entlang der Skelettküste. Schiffswracks, Robbenkolonie am Cape Cross." },
      { tag: 7, titel: "Damaraland", beschreibung: "Twyfelfontein-Felsgravuren (UNESCO). Nachmittags Suche nach Wüstenelefanten." },
      { tag: 8, titel: "Damaraland – Palmwag", beschreibung: "Wanderung in der Palmwag-Konzession. Wüstenangepasste Nashörner und Giraffen." },
      { tag: 9, titel: "Etosha – Süden", beschreibung: "Ankunft im Etosha-Nationalpark. Erste Pirschfahrt am Nachmittag." },
      { tag: 10, titel: "Etosha – Ganztags-Safari", beschreibung: "Pirschfahrten von Wasserloch zu Wasserloch. Löwen, Elefanten, Giraffen, Zebras." },
      { tag: 11, titel: "Etosha – Osten", beschreibung: "Fahrt zum östlichen Teil des Parks. Andere Vegetation, andere Tiere." },
      { tag: 12, titel: "Waterberg-Plateau", beschreibung: "Fahrt zum Waterberg. Wanderung auf dem Plateau mit Panoramablick." },
      { tag: 13, titel: "Heimreise", beschreibung: "Rückfahrt nach Windhoek, Rückflug in die Schweiz." },
    ],
    wasErwartet:
      "Namibia ist das Land der grossen Weite. Nirgendwo sonst in Afrika ist die Landschaft so dramatisch, die Farben so intensiv, die Stille so vollkommen. Von den orangeroten Dünen der Namib – der ältesten Wüste der Welt – über die raue Atlantikküste bis zu den tierreichen Ebenen des Etosha-Nationalparks: Namibia ist ein Land für alle, die das Ungezähmte suchen. Unsere Route führt Sie durch die kontrastreichsten Landschaften des Landes.",
  },
];

export const reisearten = [
  {
    name: "Rundreisen",
    beschreibung: "Länder in ihrer ganzen Vielfalt erleben",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
  },
  {
    name: "Strand & Erholung",
    beschreibung: "Traumstrände und Zeit für sich",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    name: "Aktiv & Wandern",
    beschreibung: "Natur zu Fuss entdecken",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  },
  {
    name: "Kulturreisen",
    beschreibung: "Geschichte und Traditionen hautnah",
    image:
      "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=800&q=80",
  },
  {
    name: "Safari",
    beschreibung: "Wildtiere in ihrem natürlichen Lebensraum",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
  },
  {
    name: "Kreuzfahrten",
    beschreibung: "Die Welt vom Wasser aus erleben",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
  },
];

export const regionen = [
  "Europa",
  "Asien",
  "Afrika",
  "Amerika",
  "Ozeanien",
];
