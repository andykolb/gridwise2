import { DailyNugget, QuizQuestion, Achievement, Topic } from '@/types';

export const topics: { id: Topic; label: { en: string; de: string }; icon: string }[] = [
  { id: 'energy-basics', label: { en: 'Energy Markets Basics', de: 'Energiemarkt Grundlagen' }, icon: '⚡' },
  { id: 'price-drivers', label: { en: 'Power Price Drivers', de: 'Strompreistreiber' }, icon: '📈' },
  { id: 'renewables', label: { en: 'Renewables & Flexibility', de: 'Erneuerbare & Flexibilität' }, icon: '🌱' },
  { id: 'grid-dso', label: { en: 'Grid / DSOs', de: 'Netz / Verteilnetzbetreiber' }, icon: '🔌' },
  { id: 'regulation', label: { en: 'Regulation & Policy', de: 'Regulierung & Politik' }, icon: '📋' },
  { id: 'trading', label: { en: 'Trading & Hedging', de: 'Handel & Absicherung' }, icon: '💹' },
  { id: 'retail', label: { en: 'Customer & Retail Energy', de: 'Kunden & Energievertrieb' }, icon: '🏠' },
];

export const dailyNuggets: DailyNugget[] = [
  {
    id: '1',
    title: { en: 'What drives power prices in Germany?', de: 'Was treibt die Strompreise in Deutschland?' },
    content: {
      en: 'Power prices are primarily driven by fuel costs (especially gas), CO2 prices, renewable generation, and demand patterns. When wind and solar are high, prices drop. When gas prices spike, electricity follows.',
      de: 'Strompreise werden hauptsächlich durch Brennstoffkosten (insbesondere Gas), CO2-Preise, erneuerbare Erzeugung und Nachfragemuster bestimmt. Bei hoher Wind- und Solarproduktion sinken die Preise. Steigen die Gaspreise, folgt der Strom.'
    },
    learnMore: {
      en: 'The German power market is one of the most complex in Europe due to its ambitious energy transition (Energiewende). Natural gas prices have become increasingly influential since the phase-out of nuclear power, as gas plants often set the marginal price during peak demand hours. The EU Emissions Trading System (ETS) adds another layer of cost, with CO2 allowances now exceeding €80 per tonne. Weather patterns directly impact supply—Germany can generate over 70% of its electricity from renewables on optimal days, but cloudy, windless periods require backup from conventional plants, driving prices up significantly.',
      de: 'Der deutsche Strommarkt ist aufgrund der ambitionierten Energiewende einer der komplexesten in Europa. Erdgaspreise sind seit dem Atomausstieg immer einflussreicher geworden, da Gaskraftwerke oft den Grenzpreis in Spitzenlastzeiten setzen. Das EU-Emissionshandelssystem (ETS) fügt eine weitere Kostenebene hinzu, wobei CO2-Zertifikate mittlerweile über 80€ pro Tonne kosten. Wettermuster beeinflussen das Angebot direkt—Deutschland kann an optimalen Tagen über 70% seines Stroms aus Erneuerbaren erzeugen, aber wolkige, windstille Perioden erfordern konventionelle Kraftwerke als Backup, was die Preise deutlich steigen lässt.'
    },
    topic: 'price-drivers'
  },
  {
    id: '2',
    title: { en: 'Spot vs. Futures Markets', de: 'Spot- vs. Terminmärkte' },
    content: {
      en: 'Spot markets trade electricity for immediate delivery (day-ahead, intraday). Futures markets trade contracts for future delivery, helping companies hedge against price volatility.',
      de: 'Spotmärkte handeln Strom für sofortige Lieferung (Day-ahead, Intraday). Terminmärkte handeln Verträge für zukünftige Lieferung und helfen Unternehmen, sich gegen Preisschwankungen abzusichern.'
    },
    learnMore: {
      en: 'The day-ahead market closes at noon for delivery the next day, with hourly products traded on EPEX SPOT. Intraday trading continues until 5 minutes before delivery, allowing market participants to balance their positions as forecasts improve. Futures contracts on the EEX cover periods from weeks to years ahead, enabling utilities and large consumers to lock in prices and manage risk. The spread between spot and futures prices reflects market expectations about future supply, demand, and fuel costs—a crucial indicator for trading strategies.',
      de: 'Der Day-ahead-Markt schließt mittags für die Lieferung am nächsten Tag, wobei stündliche Produkte an der EPEX SPOT gehandelt werden. Der Intraday-Handel läuft bis 5 Minuten vor Lieferung weiter, sodass Marktteilnehmer ihre Positionen anpassen können, wenn sich Prognosen verbessern. Terminkontrakte an der EEX decken Zeiträume von Wochen bis Jahren ab und ermöglichen es Versorgern und Großverbrauchern, Preise zu fixieren und Risiken zu managen. Der Spread zwischen Spot- und Terminpreisen spiegelt Markterwartungen über zukünftiges Angebot, Nachfrage und Brennstoffkosten wider—ein entscheidender Indikator für Handelsstrategien.'
    },
    topic: 'trading'
  },
  {
    id: '3',
    title: { en: 'Why balancing energy matters', de: 'Warum Regelenergie wichtig ist' },
    content: {
      en: 'Grid frequency must stay at 50Hz. Balancing energy (primary, secondary, tertiary reserves) keeps supply and demand matched in real-time. TSOs activate these reserves when forecasts deviate.',
      de: 'Die Netzfrequenz muss bei 50Hz bleiben. Regelenergie (Primär-, Sekundär-, Tertiärreserve) gleicht Angebot und Nachfrage in Echtzeit aus. ÜNBs aktivieren diese Reserven bei Prognoseabweichungen.'
    },
    learnMore: {
      en: 'Primary reserve (FCR) responds within seconds automatically to frequency deviations. Secondary reserve (aFRR) activates within 5 minutes to restore frequency and relieve primary reserve. Tertiary reserve (mFRR) activates within 15 minutes for longer imbalances. In Germany, four TSOs (50Hertz, Amprion, TenneT, TransnetBW) coordinate through a common balancing market. With increasing renewable penetration, balancing needs are growing, creating opportunities for flexible assets like batteries, demand response, and virtual power plants to participate in these lucrative markets.',
      de: 'Primärreserve (FCR) reagiert innerhalb von Sekunden automatisch auf Frequenzabweichungen. Sekundärreserve (aFRR) aktiviert sich innerhalb von 5 Minuten, um die Frequenz wiederherzustellen und die Primärreserve zu entlasten. Tertiärreserve (mFRR) aktiviert sich innerhalb von 15 Minuten bei längeren Ungleichgewichten. In Deutschland koordinieren vier ÜNBs (50Hertz, Amprion, TenneT, TransnetBW) über einen gemeinsamen Regelenergiemarkt. Mit zunehmender erneuerbarer Durchdringung wächst der Regelenergiebedarf und schafft Chancen für flexible Anlagen wie Batterien, Laststeuerung und virtuelle Kraftwerke, an diesen lukrativen Märkten teilzunehmen.'
    },
    topic: 'grid-dso'
  },
  {
    id: '4',
    title: { en: 'What DSOs do', de: 'Was Verteilnetzbetreiber tun' },
    content: {
      en: 'Distribution System Operators (DSOs) manage medium and low voltage grids. They connect customers, maintain infrastructure, and increasingly manage grid congestion from distributed renewables.',
      de: 'Verteilnetzbetreiber (VNB) verwalten Mittel- und Niederspannungsnetze. Sie schließen Kunden an, warten die Infrastruktur und managen zunehmend Netzengpässe durch dezentrale Erneuerbare.'
    },
    learnMore: {
      en: 'Germany has over 800 DSOs, ranging from large regional operators like E.ON-affiliated companies to small municipal utilities. Their role is evolving dramatically with the energy transition. As solar panels, heat pumps, and EV chargers proliferate at the distribution level, DSOs must invest in grid reinforcement, smart grid technologies, and congestion management systems. The regulatory framework (ARegV) incentivizes efficiency improvements while ensuring reliable service. Future DSOs will act more like system operators, actively managing bidirectional power flows rather than simply delivering electricity downstream.',
      de: 'Deutschland hat über 800 VNBs, von großen regionalen Betreibern wie E.ON-verbundenen Unternehmen bis hin zu kleinen Stadtwerken. Ihre Rolle entwickelt sich mit der Energiewende dramatisch weiter. Da Solaranlagen, Wärmepumpen und E-Auto-Ladestationen auf Verteilnetzebene zunehmen, müssen VNBs in Netzverstärkung, Smart-Grid-Technologien und Engpassmanagementsysteme investieren. Der regulatorische Rahmen (ARegV) fördert Effizienzverbesserungen bei gleichzeitiger Gewährleistung zuverlässiger Versorgung. Künftige VNBs werden eher wie Systembetreiber agieren und bidirektionale Stromflüsse aktiv steuern, anstatt Strom nur nach unten zu verteilen.'
    },
    topic: 'grid-dso'
  },
  {
    id: '5',
    title: { en: 'Merit Order Explained', de: 'Merit Order erklärt' },
    content: {
      en: 'Power plants are dispatched by marginal cost (merit order). Renewables bid at zero, then nuclear, coal, and gas. The last plant needed to meet demand sets the price for all.',
      de: 'Kraftwerke werden nach Grenzkosten (Merit Order) eingesetzt. Erneuerbare bieten zu null, dann Kernkraft, Kohle und Gas. Das letzte zur Deckung benötigte Kraftwerk setzt den Preis für alle.'
    },
    learnMore: {
      en: 'The merit order principle ensures economic efficiency by dispatching the cheapest available generation first. However, it creates the so-called "merit order effect"—when renewables flood the market, they push expensive gas plants out of the stack, lowering wholesale prices. This effect was particularly visible during the 2022 energy crisis, when high gas prices made gas plants extremely expensive, pushing electricity prices to record highs whenever they were needed. Some policymakers debate whether this marginal pricing system should be reformed, but it remains the foundation of European electricity markets.',
      de: 'Das Merit-Order-Prinzip gewährleistet wirtschaftliche Effizienz, indem die günstigste verfügbare Erzeugung zuerst eingesetzt wird. Es erzeugt jedoch den sogenannten "Merit-Order-Effekt"—wenn Erneuerbare den Markt fluten, verdrängen sie teure Gaskraftwerke aus dem Stack und senken die Großhandelspreise. Dieser Effekt war während der Energiekrise 2022 besonders sichtbar, als hohe Gaspreise Gaskraftwerke extrem teuer machten und die Strompreise auf Rekordhöhen trieben, wann immer sie benötigt wurden. Einige Politiker diskutieren, ob dieses Grenzpreissystem reformiert werden sollte, aber es bleibt das Fundament der europäischen Strommärkte.'
    },
    topic: 'energy-basics'
  },
  {
    id: '6',
    title: { en: 'Impact of renewables on volatility', de: 'Einfluss Erneuerbarer auf Volatilität' },
    content: {
      en: 'Renewable generation is weather-dependent, creating price volatility. Sunny, windy days can push prices negative. Calm, cloudy days see price spikes. Flexibility and storage become crucial.',
      de: 'Erneuerbare Erzeugung ist wetterabhängig und erzeugt Preisvolatilität. Sonnige, windige Tage können negative Preise verursachen. Windstille, bedeckte Tage sehen Preisspitzen. Flexibilität und Speicher werden entscheidend.'
    },
    learnMore: {
      en: 'Germany experienced over 300 hours of negative electricity prices in 2023, a record driven by renewable oversupply during low-demand periods. This volatility creates both challenges and opportunities. Industrial consumers can shift production to low-price hours, while battery storage operators arbitrage price differences. The correlation between weather forecasts and price movements has made meteorological data essential for energy trading. As renewable capacity continues to grow toward Germany\'s 80% target by 2030, managing this volatility through storage, demand flexibility, and grid expansion becomes increasingly critical.',
      de: 'Deutschland erlebte 2023 über 300 Stunden negativer Strompreise, ein Rekord getrieben durch Überangebot Erneuerbarer in Niedriglastzeiten. Diese Volatilität schafft Herausforderungen und Chancen zugleich. Industrieverbraucher können ihre Produktion in Niedrigpreisstunden verlagern, während Batteriespeicherbetreiber Preisdifferenzen arbitrieren. Die Korrelation zwischen Wetterprognosen und Preisbewegungen hat meteorologische Daten für den Energiehandel unverzichtbar gemacht. Mit weiterem Ausbau der erneuerbaren Kapazitäten in Richtung Deutschlands 80%-Ziel bis 2030 wird das Management dieser Volatilität durch Speicher, Lastflexibilität und Netzausbau zunehmend kritisch.'
    },
    topic: 'renewables'
  },
  {
    id: '7',
    title: { en: 'Gas-to-power link', de: 'Gas-Strom-Verbindung' },
    content: {
      en: 'Gas plants often set the marginal price in Europe. When gas prices rise (like during the 2022 crisis), electricity prices follow. This "gas-to-power spread" is a key market indicator.',
      de: 'Gaskraftwerke setzen oft den Grenzpreis in Europa. Steigen Gaspreise (wie in der Krise 2022), folgen Strompreise. Dieser "Gas-Strom-Spread" ist ein wichtiger Marktindikator.'
    },
    learnMore: {
      en: 'The gas-to-power spread (also called spark spread) measures the profit margin for gas-fired power generation. It\'s calculated as the electricity price minus gas costs (adjusted for plant efficiency) and CO2 costs. A positive spark spread means gas plants are profitable to run. During the 2022 crisis, TTF gas prices spiked to €340/MWh, driving German baseload electricity to over €500/MWh. Understanding this linkage is crucial for forecasting electricity prices, as gas typically sets the marginal price during 40-60% of hours in Germany, depending on renewable output.',
      de: 'Der Gas-Strom-Spread (auch Spark Spread genannt) misst die Gewinnmarge für gasbefeuerte Stromerzeugung. Er wird als Strompreis minus Gaskosten (angepasst an Anlageneffizienz) und CO2-Kosten berechnet. Ein positiver Spark Spread bedeutet, dass Gaskraftwerke profitabel laufen. Während der Krise 2022 stiegen TTF-Gaspreise auf €340/MWh und trieben deutschen Baseload-Strom auf über €500/MWh. Das Verständnis dieser Verknüpfung ist entscheidend für die Strompreisprognose, da Gas typischerweise in 40-60% der Stunden in Deutschland den Grenzpreis setzt, abhängig von der erneuerbaren Erzeugung.'
    },
    topic: 'price-drivers'
  },
  {
    id: '8',
    title: { en: 'What is Redispatch?', de: 'Was ist Redispatch?' },
    content: {
      en: 'Redispatch adjusts power plant output to relieve grid congestion. Plants behind the bottleneck reduce output; plants on the other side increase. Costs are socialized through grid fees.',
      de: 'Redispatch passt die Kraftwerksleistung an, um Netzengpässe zu entlasten. Anlagen hinter dem Engpass reduzieren; Anlagen auf der anderen Seite erhöhen. Kosten werden über Netzentgelte sozialisiert.'
    },
    learnMore: {
      en: 'Redispatch costs in Germany exceeded €4 billion in 2022, highlighting the urgency of grid expansion. The main bottleneck runs north-south, as wind power generated in the North Sea and Baltic regions struggles to reach industrial consumers in Bavaria and Baden-Württemberg. Redispatch 2.0, introduced in 2021, expanded the system to include smaller renewable plants and storage systems. The participating assets receive compensation for curtailment or increased generation. New HVDC transmission lines (SuedLink, SuedOstLink) are under construction to reduce these costly interventions by 2030.',
      de: 'Redispatch-Kosten in Deutschland überstiegen 2022 €4 Milliarden und unterstreichen die Dringlichkeit des Netzausbaus. Der Hauptengpass verläuft Nord-Süd, da Windstrom aus der Nord- und Ostsee Schwierigkeiten hat, Industrieverbraucher in Bayern und Baden-Württemberg zu erreichen. Redispatch 2.0, eingeführt 2021, erweiterte das System um kleinere Erneuerbare-Anlagen und Speichersysteme. Teilnehmende Anlagen erhalten Vergütung für Abregelung oder erhöhte Erzeugung. Neue HGÜ-Leitungen (SuedLink, SuedOstLink) sind im Bau, um diese kostspieligen Eingriffe bis 2030 zu reduzieren.'
    },
    topic: 'grid-dso'
  },
  {
    id: '9',
    title: { en: 'CO2 Pricing Explained', de: 'CO2-Bepreisung erklärt' },
    content: {
      en: 'The EU ETS puts a price on carbon emissions. Companies buy allowances to emit CO2. Higher CO2 prices make fossil fuels more expensive and renewables more competitive.',
      de: 'Das EU-ETS bepreist CO2-Emissionen. Unternehmen kaufen Zertifikate für CO2-Ausstoß. Höhere CO2-Preise machen fossile Brennstoffe teurer und Erneuerbare wettbewerbsfähiger.'
    },
    learnMore: {
      en: 'The EU Emissions Trading System is the world\'s largest carbon market, covering power generation, heavy industry, and aviation. The "Fit for 55" reforms tightened the cap on allowances, driving prices from under €30 in 2020 to over €80 by 2023. For power generation, each MWh from a coal plant requires about 0.9 allowances, while gas plants need about 0.4. This cost difference accelerates the coal-to-gas switch and improves renewable economics. Germany also has a national CO2 price for heating and transport fuels, starting at €25 in 2021 and rising annually.',
      de: 'Das EU-Emissionshandelssystem ist der weltweit größte Kohlenstoffmarkt und deckt Stromerzeugung, Schwerindustrie und Luftfahrt ab. Die "Fit for 55"-Reformen verschärften die Obergrenze für Zertifikate und trieben die Preise von unter €30 in 2020 auf über €80 bis 2023. Für die Stromerzeugung benötigt jede MWh aus einem Kohlekraftwerk etwa 0,9 Zertifikate, während Gaskraftwerke etwa 0,4 brauchen. Dieser Kostenunterschied beschleunigt den Wechsel von Kohle zu Gas und verbessert die Wirtschaftlichkeit Erneuerbarer. Deutschland hat auch einen nationalen CO2-Preis für Heiz- und Kraftstoffe, der 2021 bei €25 startete und jährlich steigt.'
    },
    topic: 'regulation'
  },
  {
    id: '10',
    title: { en: 'Energy Retail Margins', de: 'Energievertriebsmargen' },
    content: {
      en: 'Retail energy margins are thin (1-3%). Suppliers manage procurement, balance supply/demand, and handle customer service. Differentiation comes from pricing models, green products, and digital services.',
      de: 'Energievertriebsmargen sind dünn (1-3%). Lieferanten managen Beschaffung, gleichen Angebot/Nachfrage aus und bieten Kundenservice. Differenzierung durch Preismodelle, grüne Produkte und digitale Services.'
    },
    learnMore: {
      en: 'The German retail electricity market is highly competitive with over 1,000 suppliers. The typical residential bill breaks down roughly as: wholesale costs (25-35%), grid fees (20-25%), taxes and levies (25-30%), and supplier margin (3-5%). The 2022 price crisis forced many suppliers into insolvency as wholesale costs exceeded their fixed-price contracts. Successful retailers increasingly focus on value-added services: smart home integration, solar+storage bundles, EV charging solutions, and dynamic tariffs that pass wholesale price signals to consumers. E.ON and other major players are investing heavily in digital customer platforms.',
      de: 'Der deutsche Stromeinzelhandelsmarkt ist mit über 1.000 Anbietern hochkompetitiv. Die typische Haushaltsrechnung gliedert sich grob in: Großhandelskosten (25-35%), Netzentgelte (20-25%), Steuern und Abgaben (25-30%) und Lieferantenmarge (3-5%). Die Preiskrise 2022 zwang viele Anbieter in die Insolvenz, als Großhandelskosten ihre Festpreisverträge überstiegen. Erfolgreiche Einzelhändler konzentrieren sich zunehmend auf Mehrwertdienste: Smart-Home-Integration, Solar+Speicher-Bundles, E-Auto-Ladelösungen und dynamische Tarife, die Großhandelspreissignale an Verbraucher weitergeben. E.ON und andere große Player investieren stark in digitale Kundenplattformen.'
    },
    topic: 'retail'
  },
  // === NEW DAILY NUGGETS ===
  {
    id: '11',
    title: { en: 'Capacity Markets Explained', de: 'Kapazitätsmärkte erklärt' },
    content: {
      en: 'Some countries pay power plants just for being available (capacity payments), not just for generating electricity. This ensures enough backup exists for peak demand or renewable droughts.',
      de: 'Einige Länder bezahlen Kraftwerke allein für ihre Verfügbarkeit (Kapazitätszahlungen), nicht nur für die Stromerzeugung. Dies stellt sicher, dass genügend Backup für Spitzenlast oder erneuerbare Flauten existiert.'
    },
    learnMore: {
      en: 'Capacity markets address the "missing money problem": in energy-only markets, flexible plants may not earn enough from spot prices alone to justify staying open. Countries like the UK, France, and Poland have capacity markets. Germany has opted for a strategic reserve instead, keeping plants available as emergency backup without distorting the energy market. The debate continues about whether Germany needs a full capacity market as coal and nuclear phase out and renewable intermittency grows.',
      de: 'Kapazitätsmärkte adressieren das "Missing-Money-Problem": In reinen Energiemärkten verdienen flexible Anlagen möglicherweise nicht genug aus Spotpreisen, um den Weiterbetrieb zu rechtfertigen. Länder wie UK, Frankreich und Polen haben Kapazitätsmärkte. Deutschland hat sich für eine strategische Reserve entschieden, die Anlagen als Notfallbackup bereithält, ohne den Energiemarkt zu verzerren. Die Debatte geht weiter, ob Deutschland einen vollständigen Kapazitätsmarkt braucht, wenn Kohle und Kernkraft auslaufen und die Intermittenz der Erneuerbaren zunimmt.'
    },
    topic: 'regulation'
  },
  {
    id: '12',
    title: { en: 'Ancillary Services: The Grid\'s Insurance', de: 'Systemdienstleistungen: Die Versicherung des Netzes' },
    content: {
      en: 'Beyond just supplying energy, the grid needs services like frequency regulation, voltage support, and black start capability. These ancillary services are essential for reliability and increasingly provided by batteries and demand response.',
      de: 'Über die reine Energieversorgung hinaus braucht das Netz Dienste wie Frequenzregelung, Spannungsstützung und Schwarzstartfähigkeit. Diese Systemdienstleistungen sind essentiell für die Zuverlässigkeit und werden zunehmend von Batterien und Lastmanagement erbracht.'
    },
    learnMore: {
      en: 'Ancillary services markets are evolving rapidly. Traditionally dominated by large thermal plants, batteries now capture growing shares of FCR (primary reserve) markets due to their millisecond response times. In Germany, the FCR market alone is worth hundreds of millions per year. Battery operators can earn €50,000-150,000/MW/year from FCR alone. New products like FFR (Fast Frequency Response) specifically designed for batteries are being introduced across Europe.',
      de: 'Systemdienstleistungsmärkte entwickeln sich rasant. Traditionell von großen thermischen Anlagen dominiert, erobern Batterien dank ihrer Millisekunden-Reaktionszeiten wachsende Anteile der FCR-Märkte (Primärreserve). Allein der deutsche FCR-Markt ist Hunderte Millionen pro Jahr wert. Batteriebetreiber können €50.000-150.000/MW/Jahr allein aus FCR verdienen. Neue Produkte wie FFR (Fast Frequency Response), speziell für Batterien konzipiert, werden europaweit eingeführt.'
    },
    topic: 'grid-dso'
  },
  {
    id: '13',
    title: { en: 'Corporate PPAs: Industry Goes Green', de: 'Corporate PPAs: Industrie wird grün' },
    content: {
      en: 'Major corporations are bypassing traditional utilities by signing Power Purchase Agreements directly with wind and solar farms. These 10-20 year contracts provide price certainty for buyers and revenue security for developers.',
      de: 'Große Unternehmen umgehen traditionelle Versorger, indem sie Power Purchase Agreements direkt mit Wind- und Solarparks abschließen. Diese 10-20 Jahre-Verträge bieten Preissicherheit für Käufer und Einnahmesicherheit für Entwickler.'
    },
    learnMore: {
      en: 'The corporate PPA market in Europe has grown exponentially, with over 10 GW contracted in 2023 alone. Companies like Google, Amazon, BASF, and Mercedes are major buyers. PPAs come in various structures: physical (direct delivery), virtual/financial (contracts for difference), and sleeved (via an intermediary). Key challenges include volume risk (matching corporate demand with variable renewable output), credit risk (long-term counterparty exposure), and basis risk (price differences between PPA and market reference points).',
      de: 'Der Corporate-PPA-Markt in Europa ist exponentiell gewachsen, mit über 10 GW allein in 2023 kontrahiert. Unternehmen wie Google, Amazon, BASF und Mercedes sind große Abnehmer. PPAs gibt es in verschiedenen Strukturen: physisch (direkte Lieferung), virtuell/finanziell (Differenzverträge) und sleeved (über einen Intermediär). Wesentliche Herausforderungen sind Mengenrisiko (Abstimmung der Firmennachfrage mit variabler erneuerbarer Erzeugung), Kreditrisiko (langfristiges Kontrahentenrisiko) und Basisrisiko (Preisdifferenzen zwischen PPA und Markt-Referenzpunkten).'
    },
    topic: 'trading'
  },
  {
    id: '14',
    title: { en: 'The Hydrogen Rainbow', de: 'Der Wasserstoff-Regenbogen' },
    content: {
      en: 'Hydrogen comes in colors: Green (from renewable electrolysis), Grey (from natural gas), Blue (grey with carbon capture), Pink (from nuclear), and Turquoise (methane pyrolysis). Only green hydrogen is truly zero-carbon.',
      de: 'Wasserstoff kommt in Farben: Grün (aus erneuerbarer Elektrolyse), Grau (aus Erdgas), Blau (Grau mit CO2-Abscheidung), Pink (aus Kernkraft) und Türkis (Methanpyrolyse). Nur grüner Wasserstoff ist wirklich CO2-frei.'
    },
    learnMore: {
      en: 'Germany\'s National Hydrogen Strategy targets 10 GW of electrolyser capacity by 2030. Green hydrogen is currently 3-5x more expensive than grey, but costs are falling rapidly as electrolysers scale up. Key applications include steel production (replacing coal in blast furnaces), chemical feedstock (replacing grey hydrogen in ammonia production), heavy transport (trucks, ships, aviation via synthetic fuels), and seasonal energy storage. The EU\'s hydrogen backbone plan envisions 40,000 km of pipelines, largely repurposing existing gas infrastructure.',
      de: 'Deutschlands Nationale Wasserstoffstrategie zielt auf 10 GW Elektrolyseurkapazität bis 2030. Grüner Wasserstoff ist derzeit 3-5x teurer als Grauer, aber die Kosten fallen schnell mit der Skalierung von Elektrolyseuren. Wichtige Anwendungen sind Stahlproduktion (Ersatz von Kohle in Hochöfen), chemischer Grundstoff (Ersatz von grauem Wasserstoff in Ammoniakproduktion), Schwertransport (LKW, Schiffe, Luftfahrt über synthetische Kraftstoffe) und saisonale Energiespeicherung. Der EU-Wasserstoff-Backbone-Plan sieht 40.000 km Pipelines vor, weitgehend durch Umwidmung bestehender Gasinfrastruktur.'
    },
    topic: 'renewables'
  },
  {
    id: '15',
    title: { en: 'Battery Storage Economics', de: 'Batteriespeicher-Wirtschaftlichkeit' },
    content: {
      en: 'Battery storage costs have fallen 90% in a decade. Revenue comes from multiple sources: spot price arbitrage, frequency regulation, peak shaving, and capacity payments. This "revenue stacking" makes batteries increasingly profitable.',
      de: 'Batteriespeicherkosten sind in einem Jahrzehnt um 90% gefallen. Einnahmen stammen aus mehreren Quellen: Spotpreis-Arbitrage, Frequenzregelung, Spitzenlastreduzierung und Kapazitätszahlungen. Dieses "Revenue Stacking" macht Batterien zunehmend profitabel.'
    },
    learnMore: {
      en: 'Lithium-ion battery pack prices have dropped from $1,100/kWh in 2010 to under $140/kWh in 2023. Utility-scale batteries (100+ MW) are being deployed across Europe. In Germany, the installed battery capacity exceeded 10 GWh in 2023. Key business models include: standalone storage (pure arbitrage/frequency), co-located with renewables (smoothing output, capturing higher prices), behind-the-meter (reducing peak demand charges), and virtual power plant aggregation. The next frontier is long-duration storage (iron-air, flow batteries) for 8-100+ hour durations.',
      de: 'Lithium-Ionen-Batteriepackpreise sind von $1.100/kWh in 2010 auf unter $140/kWh in 2023 gefallen. Großbatterien (100+ MW) werden europaweit installiert. In Deutschland überstieg die installierte Batteriekapazität 2023 10 GWh. Wichtige Geschäftsmodelle sind: eigenständige Speicher (reine Arbitrage/Frequenz), gekoppelt mit Erneuerbaren (Glättung der Erzeugung, höhere Preise), Behind-the-Meter (Reduktion von Spitzenlastgebühren) und virtuelle Kraftwerks-Aggregation. Die nächste Grenze ist Langzeitspeicherung (Eisen-Luft, Flussbatterien) für 8-100+ Stunden.'
    },
    topic: 'renewables'
  },
  {
    id: '16',
    title: { en: 'Virtual Power Plants: Strength in Numbers', de: 'Virtuelle Kraftwerke: Stärke in der Menge' },
    content: {
      en: 'Virtual Power Plants (VPPs) aggregate thousands of small energy resources—rooftop solar, home batteries, EV chargers, heat pumps—into a single controllable portfolio that can participate in wholesale and balancing markets.',
      de: 'Virtuelle Kraftwerke (VKWs) aggregieren Tausende kleiner Energieressourcen—Dach-Solar, Hausbatterien, E-Auto-Ladestationen, Wärmepumpen—zu einem einzigen steuerbaren Portfolio, das an Großhandels- und Regelleistungsmärkten teilnehmen kann.'
    },
    learnMore: {
      en: 'Companies like Next Kraftwerke (now Shell), Sonnen, and Tibber operate VPPs in Germany with combined capacity exceeding several GW. A VPP operator uses sophisticated software to forecast, optimize, and dispatch distributed resources in real-time. Revenue streams include: day-ahead and intraday energy trading, FCR/aFRR balancing services, redispatch participation, and peak shaving services for DSOs. The EU Clean Energy Package explicitly enables aggregation, requiring market access for small-scale resources through aggregators.',
      de: 'Unternehmen wie Next Kraftwerke (jetzt Shell), Sonnen und Tibber betreiben VKWs in Deutschland mit kombinierter Kapazität von mehreren GW. Ein VKW-Betreiber nutzt ausgefeilte Software, um verteilte Ressourcen in Echtzeit zu prognostizieren, zu optimieren und zu steuern. Einnahmequellen umfassen: Day-ahead- und Intraday-Energiehandel, FCR/aFRR-Regelleistung, Redispatch-Teilnahme und Spitzenlastreduzierung für VNBs. Das EU Clean Energy Package ermöglicht explizit Aggregation und fordert Marktzugang für Kleinanlagen durch Aggregatoren.'
    },
    topic: 'renewables'
  },
  {
    id: '17',
    title: { en: 'REMIT: Market Surveillance', de: 'REMIT: Marktüberwachung' },
    content: {
      en: 'REMIT (Regulation on Energy Market Integrity and Transparency) prohibits insider trading and market manipulation in wholesale energy markets. ACER monitors transactions worth billions across Europe daily.',
      de: 'REMIT (Verordnung über Integrität und Transparenz des Energiemarktes) verbietet Insiderhandel und Marktmanipulation in Energiegroßhandelsmärkten. ACER überwacht täglich Transaktionen im Wert von Milliarden in ganz Europa.'
    },
    learnMore: {
      en: 'REMIT was introduced after concerns about manipulation in European energy markets. It requires all market participants to register, report transactions, and disclose inside information (like unplanned outages) promptly. ACER processes over 1 billion trade records annually. Violations can result in fines up to €1 million or more. Key prohibitions include: wash trades (fake transactions), spoofing (placing orders intended to be cancelled), and withholding generation capacity to manipulate prices. REMIT II (2024) expanded scope to include organized OTC platforms and improved data collection.',
      de: 'REMIT wurde nach Bedenken über Manipulation in europäischen Energiemärkten eingeführt. Es verlangt von allen Marktteilnehmern Registrierung, Transaktionsmeldung und prompte Offenlegung von Insiderinformationen (wie ungeplante Ausfälle). ACER verarbeitet jährlich über 1 Milliarde Handelsdatensätze. Verstöße können Geldstrafen bis zu 1 Million Euro oder mehr nach sich ziehen. Hauptverbote umfassen: Wash Trades (Scheingeschäfte), Spoofing (Aufgabe von Aufträgen mit der Absicht, sie zu stornieren) und Zurückhalten von Erzeugungskapazität zur Preismanipulation. REMIT II (2024) erweiterte den Anwendungsbereich auf organisierte OTC-Plattformen und verbesserte Datenerhebung.'
    },
    topic: 'regulation'
  },
  {
    id: '18',
    title: { en: 'Dynamic Tariffs: The Future of Pricing', de: 'Dynamische Tarife: Die Zukunft der Preisgestaltung' },
    content: {
      en: 'From 2025, all EU electricity suppliers must offer dynamic tariffs. These pass hourly wholesale prices to consumers, rewarding flexible consumption with lower bills and enabling smart home automation.',
      de: 'Ab 2025 müssen alle EU-Stromversorger dynamische Tarife anbieten. Diese geben stündliche Großhandelspreise an Verbraucher weiter, belohnen flexiblen Verbrauch mit niedrigeren Rechnungen und ermöglichen Smart-Home-Automatisierung.'
    },
    learnMore: {
      en: 'Dynamic tariffs expose consumers to real-time market signals. Early adopters in Scandinavia (via Tibber, Octopus Energy) have shown 15-30% bill savings by shifting EV charging, dishwashers, and heat pump operation to low-price hours. Smart home hubs can automate this entirely. Challenges include: consumer protection (preventing bill shock during price spikes), ensuring equitable access (not everyone can shift consumption), and metering infrastructure (smart meters required). The business model flips from selling kWh to optimizing consumption timing.',
      de: 'Dynamische Tarife setzen Verbraucher Echtzeit-Marktsignalen aus. Frühe Anwender in Skandinavien (via Tibber, Octopus Energy) haben 15-30% Rechnungseinsparungen gezeigt, indem sie E-Auto-Laden, Geschirrspüler und Wärmepumpenbetrieb in Niedrigpreisstunden verschoben haben. Smart-Home-Hubs können dies vollständig automatisieren. Herausforderungen umfassen: Verbraucherschutz (Verhinderung von Rechnungsschock bei Preisspitzen), gerechter Zugang (nicht jeder kann den Verbrauch verschieben) und Messinfrastruktur (Smart Meter erforderlich). Das Geschäftsmodell kehrt sich um: von kWh-Verkauf zu Verbrauchsoptimierung.'
    },
    topic: 'retail'
  },
  {
    id: '19',
    title: { en: 'Cross-Border Electricity Trading', de: 'Grenzüberschreitender Stromhandel' },
    content: {
      en: 'European electricity markets are deeply interconnected. Market coupling allows power to flow automatically from low-price to high-price areas, improving efficiency and reducing costs for all consumers.',
      de: 'Europäische Strommärkte sind tief miteinander verbunden. Marktkopplung ermöglicht automatischen Stromfluss von Niedrig- zu Hochpreisgebieten, verbessert Effizienz und senkt Kosten für alle Verbraucher.'
    },
    learnMore: {
      en: 'Single Day-Ahead Coupling (SDAC) covers 27 countries, making it the world\'s largest coupled electricity market. The algorithm (EUPHEMIA) simultaneously determines prices and cross-border flows for all bidding zones. In 2023, Germany exported 30+ TWh, mainly to Austria and France. Cross-border capacity is allocated through implicit auctions (day-ahead) and explicit auctions (longer-term). Flow-based market coupling in Central-Western Europe optimizes trade considering actual grid physics rather than simplified capacity limits, increasing cross-border trade by ~20%.',
      de: 'Single Day-Ahead Coupling (SDAC) umfasst 27 Länder und ist damit der weltgrößte gekoppelte Strommarkt. Der Algorithmus (EUPHEMIA) bestimmt gleichzeitig Preise und grenzüberschreitende Flüsse für alle Gebotszonen. 2023 exportierte Deutschland 30+ TWh, hauptsächlich nach Österreich und Frankreich. Grenzüberschreitende Kapazität wird durch implizite Auktionen (Day-ahead) und explizite Auktionen (längerfristig) zugeteilt. Flussbasierte Marktkopplung in Zentralwesteuropa optimiert den Handel unter Berücksichtigung der tatsächlichen Netzphysik statt vereinfachter Kapazitätsgrenzen und erhöht den grenzüberschreitenden Handel um ~20%.'
    },
    topic: 'trading'
  },
  {
    id: '20',
    title: { en: 'Redispatch 2.0: A New Era', de: 'Redispatch 2.0: Eine neue Ära' },
    content: {
      en: 'Since 2021, Redispatch 2.0 expanded congestion management to include small renewables and storage. Any plant above 100 kW must participate, creating new responsibilities but also revenue opportunities.',
      de: 'Seit 2021 erweitert Redispatch 2.0 das Engpassmanagement auf kleine Erneuerbare und Speicher. Jede Anlage über 100 kW muss teilnehmen, was neue Verantwortlichkeiten aber auch Einnahmemöglichkeiten schafft.'
    },
    learnMore: {
      en: 'Redispatch 2.0 was a paradigm shift in German grid management. Previously, only large conventional plants (>10 MW) participated. Now, over 400,000 installations are included, from rooftop solar to small wind turbines. The key changes: DSOs can now actively manage congestion in their networks; curtailed renewable operators receive full compensation based on a standardized calculation; all data exchange follows a unified format (Connect+). Implementation challenges included complex IT systems, data quality issues, and coordination between 800+ DSOs and 4 TSOs.',
      de: 'Redispatch 2.0 war ein Paradigmenwechsel im deutschen Netzmanagement. Zuvor nahmen nur große konventionelle Anlagen (>10 MW) teil. Jetzt sind über 400.000 Installationen einbezogen, von Dachsolar bis zu kleinen Windturbinen. Die wichtigsten Änderungen: VNBs können Engpässe in ihren Netzen jetzt aktiv managen; abgeregelte Erneuerbare-Betreiber erhalten volle Entschädigung nach standardisierter Berechnung; der gesamte Datenaustausch folgt einem einheitlichen Format (Connect+). Umsetzungsherausforderungen umfassten komplexe IT-Systeme, Datenqualitätsprobleme und Koordination zwischen 800+ VNBs und 4 ÜNBs.'
    },
    topic: 'grid-dso'
  },
  {
    id: '21',
    title: { en: 'CBAM: Carbon at the Border', de: 'CBAM: CO2 an der Grenze' },
    content: {
      en: 'The EU\'s Carbon Border Adjustment Mechanism prevents "carbon leakage" by requiring importers of steel, cement, and aluminum to buy CO2 certificates matching EU ETS prices. This levels the playing field with non-EU producers.',
      de: 'Der CO2-Grenzausgleichsmechanismus der EU verhindert "Carbon Leakage", indem Importeure von Stahl, Zement und Aluminium CO2-Zertifikate kaufen müssen, die den EU-ETS-Preisen entsprechen. Dies schafft gleiche Wettbewerbsbedingungen mit Nicht-EU-Produzenten.'
    },
    learnMore: {
      en: 'CBAM entered its transitional phase in 2023, with full implementation from 2026. Initially covering steel, cement, aluminum, fertilizers, electricity, and hydrogen, it may expand to other products. Importers must report embedded emissions and purchase CBAM certificates at the weekly EU ETS price. As free ETS allowances phase out (2026-2034), CBAM fills the gap, ensuring EU climate ambition doesn\'t simply push production to countries with weaker carbon policies. Trading partners like Turkey, India, and China are closely watching—some are developing their own carbon pricing in response.',
      de: 'CBAM trat 2023 in seine Übergangsphase ein, mit vollständiger Implementierung ab 2026. Zunächst für Stahl, Zement, Aluminium, Düngemittel, Strom und Wasserstoff geltend, könnte er auf andere Produkte erweitert werden. Importeure müssen eingebettete Emissionen melden und CBAM-Zertifikate zum wöchentlichen EU-ETS-Preis kaufen. Wenn kostenlose ETS-Zertifikate auslaufen (2026-2034), füllt CBAM die Lücke und stellt sicher, dass EU-Klimaambitionen die Produktion nicht einfach in Länder mit schwächerer CO2-Politik verschieben. Handelspartner wie Türkei, Indien und China beobachten genau—einige entwickeln eigene CO2-Bepreisung als Reaktion.'
    },
    topic: 'regulation'
  },
  {
    id: '22',
    title: { en: 'Energy Communities: Power to the People', de: 'Energiegemeinschaften: Strom für die Menschen' },
    content: {
      en: 'EU regulations now empower citizen-led energy communities to collectively generate, share, store, and sell renewable energy. This democratizes the energy transition and keeps value local.',
      de: 'EU-Regulierungen ermächtigen jetzt bürgergeführte Energiegemeinschaften, gemeinsam erneuerbare Energie zu erzeugen, zu teilen, zu speichern und zu verkaufen. Dies demokratisiert die Energiewende und hält die Wertschöpfung lokal.'
    },
    learnMore: {
      en: 'The EU Clean Energy Package defines two types: Renewable Energy Communities (RECs) and Citizen Energy Communities (CECs). Members can jointly invest in solar, wind, and storage; share electricity within the community (often at reduced rates); and collectively participate in energy markets. Germany\'s implementation allows communities to benefit from reduced grid fees for locally consumed energy. Successful examples include Energiegenossenschaft Darmstadt and citizen wind parks in Schleswig-Holstein. Challenges include complex regulatory requirements, financing structures, and ensuring inclusive participation.',
      de: 'Das EU Clean Energy Package definiert zwei Typen: Erneuerbare-Energien-Gemeinschaften (RECs) und Bürgerenergiegemeinschaften (CECs). Mitglieder können gemeinsam in Solar, Wind und Speicher investieren; Strom innerhalb der Gemeinschaft teilen (oft zu reduzierten Tarifen); und kollektiv an Energiemärkten teilnehmen. Deutschlands Umsetzung erlaubt Gemeinschaften, von reduzierten Netzentgelten für lokal verbrauchte Energie zu profitieren. Erfolgreiche Beispiele sind die Energiegenossenschaft Darmstadt und Bürgerwindparks in Schleswig-Holstein. Herausforderungen umfassen komplexe regulatorische Anforderungen, Finanzierungsstrukturen und inklusive Beteiligung.'
    },
    topic: 'retail'
  },
  {
    id: '23',
    title: { en: 'Smart Meters & Flexibility Markets', de: 'Smart Meter & Flexibilitätsmärkte' },
    content: {
      en: 'Smart meters are the gateway to flexibility markets. By measuring consumption in real-time, they enable dynamic tariffs, demand response participation, and grid-friendly optimization of EVs, heat pumps, and batteries.',
      de: 'Smart Meter sind das Tor zu Flexibilitätsmärkten. Durch Echtzeit-Verbrauchsmessung ermöglichen sie dynamische Tarife, Lastmanagement-Teilnahme und netzfreundliche Optimierung von E-Autos, Wärmepumpen und Batterien.'
    },
    learnMore: {
      en: 'Germany\'s smart meter rollout was one of the slowest in Europe but is accelerating under the 2023 law (GNDEW). By 2030, all consumers above 6,000 kWh/year and all prosumers must have smart meters. The German smart meter gateway (SMGW) has the highest security standards globally (BSI-certified). Beyond metering, smart meters enable: 15-minute interval billing for dynamic tariffs, remote grid monitoring for DSOs, automated demand response via the CLS (controllable local systems) interface, and EV smart charging coordination. The combination of smart meters + heat pumps + EVs + home batteries creates massive potential for flexibility.',
      de: 'Deutschlands Smart-Meter-Rollout war einer der langsamsten in Europa, beschleunigt aber unter dem 2023-Gesetz (GNDEW). Bis 2030 müssen alle Verbraucher über 6.000 kWh/Jahr und alle Prosumer Smart Meter haben. Das deutsche Smart Meter Gateway (SMGW) hat die höchsten Sicherheitsstandards weltweit (BSI-zertifiziert). Über die Messung hinaus ermöglichen Smart Meter: 15-Minuten-Intervallabrechnung für dynamische Tarife, Fernüberwachung für VNBs, automatisiertes Lastmanagement über die CLS-Schnittstelle (steuerbare lokale Systeme) und koordiniertes E-Auto-Laden. Die Kombination von Smart Metern + Wärmepumpen + E-Autos + Hausbatterien schafft enormes Flexibilitätspotenzial.'
    },
    topic: 'grid-dso'
  },
  {
    id: '24',
    title: { en: 'Offshore Wind: Europe\'s Powerhouse', de: 'Offshore-Wind: Europas Kraftwerk' },
    content: {
      en: 'The North Sea is becoming Europe\'s largest power plant. With 300+ GW of offshore wind planned by 2050, it will provide a massive, relatively stable renewable energy source for the continent.',
      de: 'Die Nordsee wird Europas größtes Kraftwerk. Mit 300+ GW geplanter Offshore-Windkraft bis 2050 wird sie eine massive, relativ stabile erneuerbare Energiequelle für den Kontinent bieten.'
    },
    learnMore: {
      en: 'The Ostend Declaration (2023) committed nine North Sea countries to 120 GW of offshore wind by 2030 and 300 GW by 2050. Germany alone targets 30 GW by 2030 and 70 GW by 2045. Offshore wind has key advantages: higher capacity factors (40-50%), more consistent generation, and less public opposition. Challenges include: grid connection costs (€1-2 billion per connection), long lead times (5-10 years), supply chain bottlenecks, and environmental impacts on marine ecosystems. Floating offshore wind opens up deeper waters, potentially unlocking vast new areas in the Atlantic and Mediterranean.',
      de: 'Die Ostende-Erklärung (2023) verpflichtete neun Nordsee-Anrainerstaaten zu 120 GW Offshore-Wind bis 2030 und 300 GW bis 2050. Deutschland allein zielt auf 30 GW bis 2030 und 70 GW bis 2045. Offshore-Wind hat entscheidende Vorteile: höhere Kapazitätsfaktoren (40-50%), konstantere Erzeugung und weniger öffentlicher Widerstand. Herausforderungen umfassen: Netzanschlusskosten (€1-2 Milliarden pro Anschluss), lange Vorlaufzeiten (5-10 Jahre), Lieferketten-Engpässe und Umweltauswirkungen auf marine Ökosysteme. Schwimmende Offshore-Windkraft erschließt tiefere Gewässer und potenziell riesige neue Gebiete im Atlantik und Mittelmeer.'
    },
    topic: 'renewables'
  },
  {
    id: '25',
    title: { en: 'Heat Pumps & Grid Integration', de: 'Wärmepumpen & Netzintegration' },
    content: {
      en: 'Germany plans 6 million heat pumps by 2030. While they electrify heating (good for climate), they add significant load to the grid. Smart controls and thermal storage are key to making them grid-friendly.',
      de: 'Deutschland plant 6 Millionen Wärmepumpen bis 2030. Während sie die Heizung elektrifizieren (gut fürs Klima), belasten sie das Netz erheblich. Intelligente Steuerungen und Wärmespeicher sind Schlüssel zur Netzverträglichkeit.'
    },
    learnMore: {
      en: 'A typical household heat pump adds 3-5 kW of demand. Multiply by millions, and the grid impact is massive—especially on cold winter evenings when both heating demand and electricity demand peak simultaneously. The solution is "smart" heat pumps that can: preheat buildings during cheap/windy hours using thermal inertia; reduce output during evening peaks without comfort loss; respond to DSO signals to prevent local grid overloads; and participate in flexibility markets through aggregators. German regulations (§14a EnWG) allow DSOs to temporarily reduce heat pump power during congestion, in exchange for reduced grid fees.',
      de: 'Eine typische Haushaltswärmepumpe fügt 3-5 kW Nachfrage hinzu. Multipliziert mit Millionen ist die Netzauswirkung massiv—besonders an kalten Winterabenden, wenn Heiz- und Stromnachfrage gleichzeitig ihren Höhepunkt erreichen. Die Lösung sind "smarte" Wärmepumpen, die: Gebäude in günstigen/windigen Stunden unter Nutzung thermischer Trägheit vorheizen; die Leistung in Abendspitzen ohne Komfortverlust reduzieren; auf VNB-Signale zur Vermeidung lokaler Netzüberlastungen reagieren; und über Aggregatoren an Flexibilitätsmärkten teilnehmen. Deutsche Regulierungen (§14a EnWG) erlauben VNBs, die Wärmepumpenleistung bei Engpässen vorübergehend zu reduzieren, im Austausch für reduzierte Netzentgelte.'
    },
    topic: 'grid-dso'
  },
];

export const quizQuestions: QuizQuestion[] = [
  // Energy Basics
  {
    id: 'q1',
    question: { en: 'What is the merit order?', de: 'Was ist die Merit Order?' },
    options: {
      en: ['A ranking of power plants by efficiency', 'A ranking of power plants by marginal cost', 'A list of renewable energy sources', 'A grid balancing mechanism'],
      de: ['Eine Rangfolge von Kraftwerken nach Effizienz', 'Eine Rangfolge von Kraftwerken nach Grenzkosten', 'Eine Liste erneuerbarer Energiequellen', 'Ein Netzausgleichsmechanismus']
    },
    correctIndex: 1,
    explanation: {
      en: 'The merit order ranks power plants by their marginal cost of production. Plants with the lowest costs are dispatched first.',
      de: 'Die Merit Order ordnet Kraftwerke nach ihren Grenzkosten der Produktion. Kraftwerke mit den niedrigsten Kosten werden zuerst eingesetzt.'
    },
    learnMore: {
      en: 'The merit order is fundamental to understanding electricity markets. Imagine lining up all power plants from cheapest to most expensive to operate. Renewables like wind and solar have near-zero marginal costs (no fuel needed), so they go first. Then comes nuclear, followed by coal and lignite, and finally gas plants which are typically most expensive. When demand rises, more expensive plants are activated. The last plant needed to meet demand sets the price for ALL electricity sold in that hour – this is called the "marginal pricing" principle.',
      de: 'Die Merit Order ist fundamental für das Verständnis von Strommärkten. Stellen Sie sich vor, alle Kraftwerke werden von günstigsten zu teuersten Betriebskosten aufgereiht. Erneuerbare wie Wind und Solar haben nahezu null Grenzkosten (kein Brennstoff nötig), also kommen sie zuerst. Dann folgt Kernkraft, gefolgt von Kohle und Braunkohle, und schließlich Gaskraftwerke, die typischerweise am teuersten sind. Bei steigender Nachfrage werden teurere Kraftwerke aktiviert. Das letzte zur Deckung benötigte Kraftwerk setzt den Preis für ALLEN in dieser Stunde verkauften Strom – das ist das "Grenzpreisprinzip".'
    },
    topic: 'energy-basics',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: { en: 'What determines the spot market price for electricity?', de: 'Was bestimmt den Spotmarktpreis für Strom?' },
    options: {
      en: ['The average cost of all running plants', 'The marginal cost of the last plant needed', 'Government regulations', 'Consumer demand only'],
      de: ['Die durchschnittlichen Kosten aller laufenden Anlagen', 'Die Grenzkosten des zuletzt benötigten Kraftwerks', 'Staatliche Regulierung', 'Nur die Verbrauchernachfrage']
    },
    correctIndex: 1,
    explanation: {
      en: 'In a liberalized market, the price is set by the marginal cost of the most expensive plant needed to meet demand.',
      de: 'In einem liberalisierten Markt wird der Preis durch die Grenzkosten des teuersten zur Deckung der Nachfrage benötigten Kraftwerks bestimmt.'
    },
    learnMore: {
      en: 'This pricing mechanism, called "marginal pricing" or "pay-as-cleared," means all generators receive the same price – the clearing price set by the most expensive accepted bid. While this may seem unfair (why should wind farms get paid the same as gas plants?), it actually incentivizes efficiency: low-cost plants earn higher profits, encouraging investment in cheaper generation. This is how exchanges like EPEX SPOT in Paris work for day-ahead and intraday markets across Europe.',
      de: 'Dieser Preismechanismus, genannt "Grenzpreisbildung" oder "Pay-as-cleared", bedeutet, dass alle Erzeuger den gleichen Preis erhalten – den Clearingpreis, der durch das teuerste akzeptierte Gebot festgelegt wird. Obwohl dies unfair erscheinen mag (warum sollten Windparks das gleiche wie Gaskraftwerke bekommen?), fördert es tatsächlich Effizienz: Kostengünstige Anlagen erzielen höhere Gewinne, was Investitionen in günstigere Erzeugung anregt. So funktionieren Börsen wie EPEX SPOT in Paris für Day-ahead- und Intraday-Märkte in Europa.'
    },
    topic: 'energy-basics',
    difficulty: 'medium'
  },
  // Price Drivers
  {
    id: 'q3',
    question: { en: 'Why do gas prices affect electricity prices?', de: 'Warum beeinflussen Gaspreise die Strompreise?' },
    options: {
      en: ['Gas is the only fuel for power plants', 'Gas plants often set the marginal price', 'Gas and electricity are the same commodity', 'Government policy links them'],
      de: ['Gas ist der einzige Brennstoff für Kraftwerke', 'Gaskraftwerke setzen oft den Grenzpreis', 'Gas und Strom sind dieselbe Ware', 'Staatliche Politik verbindet sie']
    },
    correctIndex: 1,
    explanation: {
      en: 'Gas-fired power plants frequently are the marginal price-setting units in European electricity markets.',
      de: 'Gaskraftwerke sind häufig die preissetzenden Grenzeinheiten in europäischen Strommärkten.'
    },
    learnMore: {
      en: 'The gas-electricity link became painfully clear during the 2022 energy crisis. Gas plants are flexible and can ramp up/down quickly, making them essential for balancing variable renewables. Because they often set the marginal price, when gas prices spiked from €20/MWh to over €300/MWh, electricity prices followed. This correlation is measured by the "spark spread" (electricity price minus gas cost to generate it). Understanding this link is crucial for energy trading and risk management.',
      de: 'Die Gas-Strom-Verbindung wurde während der Energiekrise 2022 schmerzhaft deutlich. Gaskraftwerke sind flexibel und können schnell hoch-/runterfahren, was sie für den Ausgleich variabler Erneuerbarer unverzichtbar macht. Da sie oft den Grenzpreis setzen, folgten die Strompreise, als die Gaspreise von 20€/MWh auf über 300€/MWh stiegen. Diese Korrelation wird durch den "Spark Spread" gemessen (Strompreis minus Gaskosten zur Erzeugung). Das Verständnis dieser Verbindung ist entscheidend für Energiehandel und Risikomanagement.'
    },
    topic: 'price-drivers',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    question: { en: 'What happens to electricity prices when wind generation is very high?', de: 'Was passiert mit Strompreisen bei sehr hoher Windeinspeisung?' },
    options: {
      en: ['Prices increase', 'Prices decrease or go negative', 'Prices stay stable', 'The market closes'],
      de: ['Preise steigen', 'Preise sinken oder werden negativ', 'Preise bleiben stabil', 'Der Markt schließt']
    },
    correctIndex: 1,
    explanation: {
      en: 'High renewable generation pushes expensive plants out of merit order, lowering prices. In extreme cases, prices can go negative.',
      de: 'Hohe erneuerbare Erzeugung verdrängt teure Kraftwerke aus der Merit Order und senkt die Preise. In Extremfällen können Preise negativ werden.'
    },
    learnMore: {
      en: 'Negative prices occur when there is more electricity supply than demand and storage capacity. Why would anyone sell at a loss? Some plants (nuclear, lignite) are inflexible and costly to shut down. Wind farms receiving feed-in tariffs may still profit even at negative prices. In Germany, negative price hours increased from 134 in 2019 to over 300 in 2023. For energy retailers and industrial consumers, these price patterns create opportunities for flexible consumption and storage arbitrage.',
      de: 'Negative Preise entstehen, wenn mehr Strom angeboten wird als Nachfrage und Speicherkapazität vorhanden sind. Warum sollte jemand mit Verlust verkaufen? Einige Anlagen (Kernkraft, Braunkohle) sind unflexibel und teuer abzuschalten. Windparks mit Einspeisevergütung können selbst bei negativen Preisen profitieren. In Deutschland stiegen die Stunden mit negativen Preisen von 134 im Jahr 2019 auf über 300 im Jahr 2023. Für Energieversorger und Industriekunden schaffen diese Preismuster Chancen für flexible Nutzung und Speicherarbitrage.'
    },
    topic: 'price-drivers',
    difficulty: 'easy'
  },
  // Renewables
  {
    id: 'q5',
    question: { en: 'What is the main challenge with integrating renewables?', de: 'Was ist die Hauptherausforderung bei der Integration von Erneuerbaren?' },
    options: {
      en: ['They are too expensive', 'They have zero marginal cost', 'Their output is variable and hard to predict', 'They cannot connect to the grid'],
      de: ['Sie sind zu teuer', 'Sie haben null Grenzkosten', 'Ihre Erzeugung ist variabel und schwer vorhersagbar', 'Sie können nicht ans Netz angeschlossen werden']
    },
    correctIndex: 2,
    explanation: {
      en: 'Renewables depend on weather, making their output variable. This requires flexibility from other sources, storage, or demand response.',
      de: 'Erneuerbare hängen vom Wetter ab, was ihre Erzeugung variabel macht. Dies erfordert Flexibilität von anderen Quellen, Speichern oder Lastmanagement.'
    },
    learnMore: {
      en: 'The variability challenge has three dimensions: (1) Short-term fluctuations – clouds passing over solar panels can cause output to drop by 50% in minutes; (2) Daily patterns – solar peaks at midday while demand peaks in evening; (3) Seasonal variation – wind is stronger in winter, solar in summer. Solutions include battery storage, pumped hydro, demand response (shifting industrial loads), interconnectors to other regions, and flexible gas plants. Forecasting has improved dramatically – day-ahead wind predictions are now 95%+ accurate.',
      de: 'Die Variabilitätsherausforderung hat drei Dimensionen: (1) Kurzfristige Schwankungen – Wolken über Solarpanelen können die Leistung in Minuten um 50% senken; (2) Tagesmuster – Solar erreicht den Höhepunkt mittags, Nachfrage abends; (3) Saisonale Variation – Wind ist im Winter stärker, Solar im Sommer. Lösungen umfassen Batteriespeicher, Pumpspeicher, Lastmanagement (Verschiebung industrieller Lasten), Interkonnektoren zu anderen Regionen und flexible Gaskraftwerke. Prognosen haben sich dramatisch verbessert – Day-ahead-Windvorhersagen sind heute zu 95%+ genau.'
    },
    topic: 'renewables',
    difficulty: 'easy'
  },
  {
    id: 'q6',
    question: { en: 'What is "flexibility" in energy markets?', de: 'Was ist "Flexibilität" in Energiemärkten?' },
    options: {
      en: ['The ability to change contracts', 'The ability to adjust supply or demand quickly', 'Price negotiation capabilities', 'Customer switching options'],
      de: ['Die Möglichkeit, Verträge zu ändern', 'Die Fähigkeit, Angebot oder Nachfrage schnell anzupassen', 'Preisverhandlungsmöglichkeiten', 'Kundenwechseloptionen']
    },
    correctIndex: 1,
    explanation: {
      en: 'Flexibility means being able to ramp generation up/down or shift demand to balance variable renewable output.',
      de: 'Flexibilität bedeutet, die Erzeugung hoch-/runterfahren oder Nachfrage verschieben zu können, um variable erneuerbare Erzeugung auszugleichen.'
    },
    learnMore: {
      en: 'Flexibility is becoming the most valuable commodity in energy markets. Sources include: (1) Supply-side: gas peakers, hydro, batteries that can ramp in seconds to minutes; (2) Demand-side: industrial processes that can shift timing (aluminum smelters, cold storage, EV charging); (3) Storage: from batteries (minutes-hours) to pumped hydro (hours-days) to hydrogen (seasonal). Flexibility providers can earn revenue from multiple markets: spot price arbitrage, balancing services, and capacity payments. As renewable penetration grows, flexibility premiums increase.',
      de: 'Flexibilität wird zur wertvollsten Ware in Energiemärkten. Quellen umfassen: (1) Angebotsseite: Gas-Spitzenlastkraftwerke, Hydro, Batterien, die in Sekunden bis Minuten hochfahren können; (2) Nachfrageseite: Industrieprozesse, die zeitlich verschoben werden können (Aluminiumschmelzen, Kühlhäuser, E-Auto-Laden); (3) Speicher: von Batterien (Minuten-Stunden) über Pumpspeicher (Stunden-Tage) bis Wasserstoff (saisonal). Flexibilitätsanbieter können Einnahmen aus mehreren Märkten erzielen: Spotpreis-Arbitrage, Regelleistung und Kapazitätszahlungen. Mit steigendem Erneuerbaren-Anteil steigen die Flexibilitätsprämien.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  // Grid/DSO
  {
    id: 'q7',
    question: { en: 'What is the main role of a TSO?', de: 'Was ist die Hauptaufgabe eines ÜNB?' },
    options: {
      en: ['Sell electricity to consumers', 'Operate the high-voltage transmission grid', 'Set electricity prices', 'Build renewable plants'],
      de: ['Strom an Verbraucher verkaufen', 'Das Hochspannungsübertragungsnetz betreiben', 'Strompreise festlegen', 'Erneuerbare Anlagen bauen']
    },
    correctIndex: 1,
    explanation: {
      en: 'Transmission System Operators (TSOs) manage the high-voltage grid and ensure system stability at the national/regional level.',
      de: 'Übertragungsnetzbetreiber (ÜNB) betreiben das Hochspannungsnetz und gewährleisten Systemstabilität auf nationaler/regionaler Ebene.'
    },
    learnMore: {
      en: 'In Germany, there are four TSOs: TenneT, 50Hertz, Amprion, and TransnetBW, each responsible for a region. TSOs have several critical responsibilities: maintaining grid frequency at 50Hz, coordinating cross-border power flows, managing balancing energy markets, planning grid expansion, and ensuring security of supply. They are regulated monopolies – their costs are passed through to consumers via grid fees. The European Network of TSOs (ENTSO-E) coordinates the interconnected grid across 35 countries.',
      de: 'In Deutschland gibt es vier ÜNB: TenneT, 50Hertz, Amprion und TransnetBW, jeder für eine Region verantwortlich. ÜNB haben mehrere kritische Aufgaben: Netzfrequenz bei 50Hz halten, grenzüberschreitende Stromflüsse koordinieren, Regelenergiemärkte betreiben, Netzausbau planen und Versorgungssicherheit gewährleisten. Sie sind regulierte Monopole – ihre Kosten werden über Netzentgelte an Verbraucher weitergegeben. Das Europäische Netzwerk der ÜNB (ENTSO-E) koordiniert das verbundene Netz über 35 Länder.'
    },
    topic: 'grid-dso',
    difficulty: 'easy'
  },
  {
    id: 'q8',
    question: { en: 'What is redispatch used for?', de: 'Wofür wird Redispatch verwendet?' },
    options: {
      en: ['Increasing renewable generation', 'Relieving grid congestion', 'Setting market prices', 'Customer billing'],
      de: ['Erhöhung erneuerbarer Erzeugung', 'Entlastung von Netzengpässen', 'Marktpreisbildung', 'Kundenabrechnung']
    },
    correctIndex: 1,
    explanation: {
      en: 'Redispatch adjusts power plant output to manage congestion when grid capacity is insufficient to transport all generated power.',
      de: 'Redispatch passt die Kraftwerksleistung an, um Engpässe zu managen, wenn die Netzkapazität nicht ausreicht, um allen erzeugten Strom zu transportieren.'
    },
    learnMore: {
      en: 'Redispatch is a major cost driver in Germany – over €4 billion in 2022! The process works like this: when too much wind power in the North cannot flow to demand centers in the South (due to limited transmission capacity), TSOs instruct northern wind farms to curtail output while ramping up southern gas plants. Both get compensated – curtailed plants for lost revenue, activated plants for generation costs. "Redispatch 2.0" since 2021 now includes smaller plants and renewables. Grid expansion (like SuedLink) aims to reduce these costs.',
      de: 'Redispatch ist ein großer Kostentreiber in Deutschland – über 4 Milliarden Euro in 2022! Der Prozess funktioniert so: Wenn zu viel Windstrom im Norden nicht zu Verbrauchszentren im Süden fließen kann (wegen begrenzter Übertragungskapazität), weisen ÜNB nördliche Windparks an, ihre Leistung zu drosseln, während südliche Gaskraftwerke hochfahren. Beide werden entschädigt – gedrosselte Anlagen für entgangene Einnahmen, aktivierte für Erzeugungskosten. "Redispatch 2.0" seit 2021 umfasst jetzt auch kleinere Anlagen und Erneuerbare. Der Netzausbau (wie SuedLink) soll diese Kosten reduzieren.'
    },
    topic: 'grid-dso',
    difficulty: 'medium'
  },
  {
    id: 'q9',
    question: { en: 'What frequency does the European grid operate at?', de: 'Mit welcher Frequenz arbeitet das europäische Netz?' },
    options: {
      en: ['60 Hz', '50 Hz', '100 Hz', '220 Hz'],
      de: ['60 Hz', '50 Hz', '100 Hz', '220 Hz']
    },
    correctIndex: 1,
    explanation: {
      en: 'The European grid operates at 50 Hz. Deviations indicate imbalance between supply and demand.',
      de: 'Das europäische Netz arbeitet mit 50 Hz. Abweichungen zeigen ein Ungleichgewicht zwischen Angebot und Nachfrage an.'
    },
    learnMore: {
      en: 'Grid frequency is the heartbeat of the electricity system. When demand exceeds supply, generators slow down and frequency drops below 50 Hz. When supply exceeds demand, frequency rises. Deviations of just ±0.2 Hz trigger automatic responses: primary reserve activates within seconds, secondary reserve within minutes, and tertiary reserve within 15 minutes. A major frequency deviation (like during the 2021 split of the European grid) can cause blackouts. Fun fact: some older clocks use grid frequency for timekeeping – they gained/lost minutes during the 2018 Kosovo-Serbia grid dispute!',
      de: 'Die Netzfrequenz ist der Herzschlag des Stromsystems. Wenn Nachfrage das Angebot übersteigt, verlangsamen sich Generatoren und die Frequenz fällt unter 50 Hz. Wenn Angebot die Nachfrage übersteigt, steigt die Frequenz. Abweichungen von nur ±0,2 Hz lösen automatische Reaktionen aus: Primärreserve aktiviert in Sekunden, Sekundärreserve in Minuten, Tertiärreserve in 15 Minuten. Eine große Frequenzabweichung (wie bei der Netzaufspaltung 2021) kann Stromausfälle verursachen. Fun Fact: Manche älteren Uhren nutzen die Netzfrequenz zur Zeitmessung – sie gingen während des Kosovo-Serbien-Netzstreits 2018 vor/nach!'
    },
    topic: 'grid-dso',
    difficulty: 'easy'
  },
  // Regulation
  {
    id: 'q10',
    question: { en: 'What is the EU ETS?', de: 'Was ist das EU-ETS?' },
    options: {
      en: ['European Trading System', 'Emissions Trading System', 'Energy Transmission Standard', 'Electric Transport Scheme'],
      de: ['Europäisches Handelssystem', 'Emissionshandelssystem', 'Energieübertragungsstandard', 'Elektrotransportsystem']
    },
    correctIndex: 1,
    explanation: {
      en: 'The EU Emissions Trading System is a cap-and-trade system that puts a price on carbon emissions from power plants and industry.',
      de: 'Das EU-Emissionshandelssystem ist ein Cap-and-Trade-System, das CO2-Emissionen von Kraftwerken und Industrie bepreist.'
    },
    learnMore: {
      en: 'The EU ETS is the world\'s largest carbon market, covering about 40% of EU emissions. Here\'s how it works: the EU sets a cap on total emissions, then issues allowances (each worth 1 tonne CO2). Companies must surrender allowances for their emissions – if they have too few, they must buy more on the market. The cap decreases annually, making allowances scarcer and more expensive. Prices rose from €5 in 2017 to over €100 in 2023. ETS Phase 4 (2021-2030) includes faster cap reduction and carbon border adjustment (CBAM) to prevent carbon leakage.',
      de: 'Das EU-ETS ist der größte Kohlenstoffmarkt der Welt und deckt etwa 40% der EU-Emissionen ab. So funktioniert es: Die EU setzt eine Obergrenze für Gesamtemissionen und gibt Zertifikate aus (jedes für 1 Tonne CO2). Unternehmen müssen Zertifikate für ihre Emissionen abgeben – haben sie zu wenige, müssen sie am Markt zukaufen. Die Obergrenze sinkt jährlich, was Zertifikate knapper und teurer macht. Die Preise stiegen von 5€ in 2017 auf über 100€ in 2023. ETS Phase 4 (2021-2030) beinhaltet schnellere Cap-Reduktion und CO2-Grenzausgleich (CBAM) gegen Carbon Leakage.'
    },
    topic: 'regulation',
    difficulty: 'easy'
  },
  {
    id: 'q11',
    question: { en: 'What is the goal of unbundling in energy markets?', de: 'Was ist das Ziel der Entflechtung in Energiemärkten?' },
    options: {
      en: ['Reduce electricity consumption', 'Separate generation, transmission, and retail', 'Combine all energy services', 'Eliminate competition'],
      de: ['Stromverbrauch reduzieren', 'Erzeugung, Übertragung und Vertrieb trennen', 'Alle Energiedienstleistungen kombinieren', 'Wettbewerb eliminieren']
    },
    correctIndex: 1,
    explanation: {
      en: 'Unbundling separates monopoly activities (grids) from competitive activities (generation, retail) to ensure fair market access.',
      de: 'Entflechtung trennt Monopolaktivitäten (Netze) von wettbewerblichen Aktivitäten (Erzeugung, Vertrieb), um fairen Marktzugang zu gewährleisten.'
    },
    topic: 'regulation',
    difficulty: 'medium'
  },
  // Trading
  {
    id: 'q12',
    question: { en: 'What is the day-ahead market?', de: 'Was ist der Day-Ahead-Markt?' },
    options: {
      en: ['Trading for the next month', 'Trading for the next day', 'Real-time trading', 'Annual contract market'],
      de: ['Handel für den nächsten Monat', 'Handel für den nächsten Tag', 'Echtzeithandel', 'Jahresvertragsmarkt']
    },
    correctIndex: 1,
    explanation: {
      en: 'The day-ahead market trades electricity for delivery the following day. Auctions typically close at noon for next-day delivery.',
      de: 'Der Day-Ahead-Markt handelt Strom für die Lieferung am nächsten Tag. Auktionen schließen typischerweise mittags für die Lieferung am Folgetag.'
    },
    topic: 'trading',
    difficulty: 'easy'
  },
  {
    id: 'q13',
    question: { en: 'Why do companies use futures contracts?', de: 'Warum nutzen Unternehmen Terminverträge?' },
    options: {
      en: ['To speculate on prices', 'To hedge against price volatility', 'To avoid paying taxes', 'To increase consumption'],
      de: ['Um auf Preise zu spekulieren', 'Um sich gegen Preisvolatilität abzusichern', 'Um Steuern zu vermeiden', 'Um den Verbrauch zu erhöhen']
    },
    correctIndex: 1,
    explanation: {
      en: 'Futures contracts lock in prices for future delivery, helping companies manage price risk and budget more predictably.',
      de: 'Terminverträge fixieren Preise für zukünftige Lieferung und helfen Unternehmen, Preisrisiken zu managen und vorhersehbarer zu budgetieren.'
    },
    topic: 'trading',
    difficulty: 'medium'
  },
  {
    id: 'q14',
    question: { en: 'What is intraday trading?', de: 'Was ist Intraday-Handel?' },
    options: {
      en: ['Trading within the same day', 'Trading for the next week', 'International trading', 'Index trading'],
      de: ['Handel innerhalb desselben Tages', 'Handel für die nächste Woche', 'Internationaler Handel', 'Indexhandel']
    },
    correctIndex: 0,
    explanation: {
      en: 'Intraday trading allows market participants to adjust positions close to real-time, correcting for forecast errors.',
      de: 'Intraday-Handel ermöglicht Marktteilnehmern, Positionen nahe Echtzeit anzupassen und Prognosefehler zu korrigieren.'
    },
    topic: 'trading',
    difficulty: 'easy'
  },
  // Retail
  {
    id: 'q15',
    question: { en: 'What is a power purchase agreement (PPA)?', de: 'Was ist ein Power Purchase Agreement (PPA)?' },
    options: {
      en: ['A government subsidy', 'A long-term contract to buy electricity', 'A grid connection fee', 'A retail pricing model'],
      de: ['Eine staatliche Subvention', 'Ein langfristiger Stromkaufvertrag', 'Eine Netzanschlussgebühr', 'Ein Preismodell im Vertrieb']
    },
    correctIndex: 1,
    explanation: {
      en: 'PPAs are long-term contracts between generators and buyers, providing price certainty for both parties, often used for renewables.',
      de: 'PPAs sind langfristige Verträge zwischen Erzeugern und Käufern, die beiden Parteien Preissicherheit bieten, oft für Erneuerbare genutzt.'
    },
    topic: 'retail',
    difficulty: 'medium'
  },
  // More questions for variety
  {
    id: 'q16',
    question: { en: 'What is baseload power?', de: 'Was ist Grundlaststrom?' },
    options: {
      en: ['Power at peak demand', 'Minimum constant power demand', 'Emergency backup power', 'Renewable power only'],
      de: ['Strom bei Spitzenlast', 'Minimaler konstanter Strombedarf', 'Notfall-Reservestrom', 'Nur erneuerbarer Strom']
    },
    correctIndex: 1,
    explanation: {
      en: 'Baseload is the minimum level of demand over 24 hours. Plants with low marginal costs (nuclear, coal) traditionally covered baseload.',
      de: 'Grundlast ist das Mindestniveau der Nachfrage über 24 Stunden. Kraftwerke mit niedrigen Grenzkosten (Kernkraft, Kohle) deckten traditionell die Grundlast.'
    },
    topic: 'energy-basics',
    difficulty: 'medium'
  },
  {
    id: 'q17',
    question: { en: 'What is peak demand?', de: 'Was ist Spitzenlast?' },
    options: {
      en: ['The highest electricity demand period', 'The lowest price period', 'When renewables produce most', 'Nighttime consumption'],
      de: ['Die Zeit der höchsten Stromnachfrage', 'Die Zeit der niedrigsten Preise', 'Wenn Erneuerbare am meisten produzieren', 'Nachtverbrauch']
    },
    correctIndex: 0,
    explanation: {
      en: 'Peak demand typically occurs during morning and evening hours. Peak prices are usually higher due to more expensive plants being dispatched.',
      de: 'Spitzenlast tritt typischerweise morgens und abends auf. Spitzenpreise sind meist höher, da teurere Kraftwerke eingesetzt werden.'
    },
    topic: 'energy-basics',
    difficulty: 'easy'
  },
  {
    id: 'q18',
    question: { en: 'What is a capacity market?', de: 'Was ist ein Kapazitätsmarkt?' },
    options: {
      en: ['A market for electricity storage', 'A market that pays for available generation capacity', 'A consumer switching platform', 'A renewable energy auction'],
      de: ['Ein Markt für Stromspeicher', 'Ein Markt, der für verfügbare Erzeugungskapazität bezahlt', 'Eine Verbraucher-Wechselplattform', 'Eine Erneuerbare-Energien-Auktion']
    },
    correctIndex: 1,
    explanation: {
      en: 'Capacity markets pay generators to keep capacity available, ensuring enough generation exists to meet peak demand.',
      de: 'Kapazitätsmärkte bezahlen Erzeuger, um Kapazität verfügbar zu halten und sicherzustellen, dass genügend Erzeugung für Spitzenlast existiert.'
    },
    topic: 'regulation',
    difficulty: 'hard'
  },
  {
    id: 'q19',
    question: { en: 'What is the spark spread?', de: 'Was ist der Spark Spread?' },
    options: {
      en: ['The difference between gas and electricity prices', 'The efficiency of solar panels', 'The voltage difference in grids', 'A type of energy contract'],
      de: ['Die Differenz zwischen Gas- und Strompreisen', 'Die Effizienz von Solarmodulen', 'Die Spannungsdifferenz in Netzen', 'Eine Art Energievertrag']
    },
    correctIndex: 0,
    explanation: {
      en: 'The spark spread is the gross margin for a gas-fired plant: electricity price minus gas cost. A positive spread means profitable generation.',
      de: 'Der Spark Spread ist die Bruttomarge eines Gaskraftwerks: Strompreis minus Gaskosten. Ein positiver Spread bedeutet profitable Erzeugung.'
    },
    topic: 'trading',
    difficulty: 'hard'
  },
  {
    id: 'q20',
    question: { en: 'What are ancillary services?', de: 'Was sind Systemdienstleistungen?' },
    options: {
      en: ['Customer support services', 'Services to maintain grid stability', 'Energy efficiency consulting', 'Billing and metering'],
      de: ['Kundendienstleistungen', 'Dienste zur Aufrechterhaltung der Netzstabilität', 'Energieeffizienzberatung', 'Abrechnung und Messung']
    },
    correctIndex: 1,
    explanation: {
      en: 'Ancillary services include frequency control, voltage support, and black start capability—essential for reliable grid operation.',
      de: 'Systemdienstleistungen umfassen Frequenzregelung, Spannungsstützung und Schwarzstartfähigkeit—essentiell für zuverlässigen Netzbetrieb.'
    },
    topic: 'grid-dso',
    difficulty: 'medium'
  },
  {
    id: 'q21',
    question: { en: 'What is demand response?', de: 'Was ist Lastmanagement?' },
    options: {
      en: ['Reducing generation during low demand', 'Adjusting consumption based on price signals', 'Increasing grid capacity', 'Building more power plants'],
      de: ['Reduktion der Erzeugung bei niedriger Nachfrage', 'Anpassung des Verbrauchs basierend auf Preissignalen', 'Erhöhung der Netzkapazität', 'Bau weiterer Kraftwerke']
    },
    correctIndex: 1,
    explanation: {
      en: 'Demand response programs incentivize consumers to shift or reduce consumption during peak periods, helping balance the grid.',
      de: 'Lastmanagement-Programme motivieren Verbraucher, den Verbrauch in Spitzenzeiten zu verschieben oder zu reduzieren und helfen, das Netz auszugleichen.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q22',
    question: { en: 'What is a prosumer?', de: 'Was ist ein Prosumer?' },
    options: {
      en: ['A professional consumer', 'Someone who both produces and consumes energy', 'A large industrial customer', 'An energy trader'],
      de: ['Ein professioneller Verbraucher', 'Jemand, der Energie sowohl produziert als auch verbraucht', 'Ein großer Industriekunde', 'Ein Energiehändler']
    },
    correctIndex: 1,
    explanation: {
      en: 'Prosumers have their own generation (often rooftop solar) and can feed excess power back to the grid while also consuming grid electricity.',
      de: 'Prosumer haben eigene Erzeugung (oft Dach-Solar) und können überschüssigen Strom ins Netz einspeisen, während sie auch Netzstrom verbrauchen.'
    },
    topic: 'retail',
    difficulty: 'easy'
  },
  {
    id: 'q23',
    question: { en: 'What is power-to-X?', de: 'Was ist Power-to-X?' },
    options: {
      en: ['Converting electricity to other energy forms', 'Exporting electricity', 'Power quality standards', 'Extra power capacity'],
      de: ['Umwandlung von Strom in andere Energieformen', 'Stromexport', 'Stromqualitätsstandards', 'Zusätzliche Stromkapazität']
    },
    correctIndex: 0,
    explanation: {
      en: 'Power-to-X converts electricity to hydrogen, heat, or synthetic fuels, enabling storage and sector coupling.',
      de: 'Power-to-X wandelt Strom in Wasserstoff, Wärme oder synthetische Kraftstoffe um und ermöglicht Speicherung und Sektorkopplung.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q24',
    question: { en: 'What is the Clean Energy Package?', de: 'Was ist das Clean Energy Package?' },
    options: {
      en: ['An EU policy framework for energy transition', 'A type of green electricity tariff', 'Nuclear power regulations', 'Grid modernization funding'],
      de: ['Ein EU-Politikrahmen für die Energiewende', 'Ein grüner Stromtarif', 'Kernkraftregulierung', 'Förderung der Netzmodernisierung']
    },
    correctIndex: 0,
    explanation: {
      en: 'The Clean Energy Package is comprehensive EU legislation updating energy market rules, renewable targets, and consumer rights.',
      de: 'Das Clean Energy Package ist eine umfassende EU-Gesetzgebung zur Aktualisierung von Energiemarktregeln, Erneuerbaren-Zielen und Verbraucherrechten.'
    },
    topic: 'regulation',
    difficulty: 'hard'
  },
  {
    id: 'q25',
    question: { en: 'What is green hydrogen?', de: 'Was ist grüner Wasserstoff?' },
    options: {
      en: ['Hydrogen from natural gas', 'Hydrogen produced using renewable electricity', 'Any hydrogen used for power', 'Hydrogen from nuclear power'],
      de: ['Wasserstoff aus Erdgas', 'Wasserstoff produziert mit erneuerbarem Strom', 'Jeder für Strom genutzte Wasserstoff', 'Wasserstoff aus Kernkraft']
    },
    correctIndex: 1,
    explanation: {
      en: 'Green hydrogen is produced by electrolysis using renewable electricity, making it a zero-carbon energy carrier.',
      de: 'Grüner Wasserstoff wird durch Elektrolyse mit erneuerbarem Strom produziert und ist damit ein CO2-freier Energieträger.'
    },
    topic: 'renewables',
    difficulty: 'easy'
  },
  {
    id: 'q26',
    question: { en: 'What is curtailment?', de: 'Was ist Abregelung?' },
    options: {
      en: ['Building new power lines', 'Reducing renewable output due to grid constraints', 'Increasing plant efficiency', 'A pricing mechanism'],
      de: ['Bau neuer Stromleitungen', 'Reduzierung erneuerbarer Erzeugung wegen Netzengpässen', 'Erhöhung der Anlageneffizienz', 'Ein Preismechanismus']
    },
    correctIndex: 1,
    explanation: {
      en: 'Curtailment occurs when renewable generation is reduced because the grid cannot transport or absorb all the power produced.',
      de: 'Abregelung tritt auf, wenn erneuerbare Erzeugung reduziert wird, weil das Netz nicht die gesamte produzierte Leistung transportieren oder aufnehmen kann.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q27',
    question: { en: 'What is the role of battery storage in energy markets?', de: 'Welche Rolle spielen Batteriespeicher in Energiemärkten?' },
    options: {
      en: ['Replace all power plants', 'Provide flexibility and arbitrage opportunities', 'Only for emergency backup', 'Increase base load'],
      de: ['Alle Kraftwerke ersetzen', 'Flexibilität und Arbitragemöglichkeiten bieten', 'Nur für Notfallreserve', 'Grundlast erhöhen']
    },
    correctIndex: 1,
    explanation: {
      en: 'Batteries provide flexibility by storing cheap energy and discharging when prices are high. They also provide fast frequency response.',
      de: 'Batterien bieten Flexibilität durch Speicherung günstiger Energie und Entladung bei hohen Preisen. Sie liefern auch schnelle Frequenzregelung.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q28',
    question: { en: 'What are Guarantees of Origin (GoO)?', de: 'Was sind Herkunftsnachweise (HKN)?' },
    options: {
      en: ['Certificates proving electricity source', 'Grid reliability standards', 'Consumer protection laws', 'Import licenses'],
      de: ['Zertifikate, die die Stromquelle belegen', 'Netzzuverlässigkeitsstandards', 'Verbraucherschutzgesetze', 'Importlizenzen']
    },
    correctIndex: 0,
    explanation: {
      en: 'GoOs are tradeable certificates proving that electricity was generated from a specific source, enabling green electricity products.',
      de: 'HKN sind handelbare Zertifikate, die belegen, dass Strom aus einer bestimmten Quelle erzeugt wurde, und ermöglichen grüne Stromprodukte.'
    },
    topic: 'retail',
    difficulty: 'medium'
  },
  {
    id: 'q29',
    question: { en: 'What is market coupling?', de: 'Was ist Marktkopplung?' },
    options: {
      en: ['Connecting isolated markets for efficient pricing', 'Merging energy companies', 'Linking electricity and gas', 'Consumer choice programs'],
      de: ['Verbindung isolierter Märkte für effiziente Preisbildung', 'Fusion von Energieunternehmen', 'Verknüpfung von Strom und Gas', 'Verbraucherwahlprogramme']
    },
    correctIndex: 0,
    explanation: {
      en: 'Market coupling integrates electricity markets across borders, optimizing cross-border flows and converging prices when capacity allows.',
      de: 'Marktkopplung integriert Strommärkte grenzüberschreitend, optimiert grenzüberschreitende Flüsse und führt zu Preiskonvergenz bei verfügbarer Kapazität.'
    },
    topic: 'trading',
    difficulty: 'hard'
  },
  {
    id: 'q30',
    question: { en: 'What is sector coupling?', de: 'Was ist Sektorkopplung?' },
    options: {
      en: ['Merging utility companies', 'Linking electricity, heat, and transport sectors', 'Connecting different voltage levels', 'Coupling spot and futures markets'],
      de: ['Fusion von Versorgungsunternehmen', 'Verknüpfung von Strom-, Wärme- und Verkehrssektoren', 'Verbindung verschiedener Spannungsebenen', 'Kopplung von Spot- und Terminmärkten']
    },
    correctIndex: 1,
    explanation: {
      en: 'Sector coupling uses renewable electricity in heating and transport (EVs, heat pumps), increasing flexibility and decarbonizing other sectors.',
      de: 'Sektorkopplung nutzt erneuerbaren Strom in Wärme und Verkehr (E-Autos, Wärmepumpen), erhöht Flexibilität und dekarbonisiert andere Sektoren.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  // === NEW QUESTIONS: Energy Basics (q31-q38) ===
  {
    id: 'q31',
    question: { en: 'What is the difference between baseload and peakload?', de: 'Was ist der Unterschied zwischen Grund- und Spitzenlast?' },
    options: {
      en: ['Baseload is expensive, peakload is cheap', 'Baseload is minimum constant demand, peakload is maximum demand periods', 'Baseload uses renewables, peakload uses gas', 'There is no difference'],
      de: ['Grundlast ist teuer, Spitzenlast ist günstig', 'Grundlast ist minimaler konstanter Bedarf, Spitzenlast sind maximale Nachfragezeiten', 'Grundlast nutzt Erneuerbare, Spitzenlast nutzt Gas', 'Es gibt keinen Unterschied']
    },
    correctIndex: 1,
    explanation: {
      en: 'Baseload represents minimum constant demand (usually overnight), while peakload covers the highest demand periods (morning/evening). Different plant types serve each.',
      de: 'Grundlast repräsentiert den minimalen konstanten Bedarf (meist nachts), während Spitzenlast die höchsten Nachfragezeiten abdeckt (morgens/abends). Verschiedene Kraftwerkstypen bedienen jeweils.'
    },
    topic: 'energy-basics',
    difficulty: 'easy'
  },
  {
    id: 'q32',
    question: { en: 'What is the EPEX SPOT exchange?', de: 'Was ist die EPEX SPOT Börse?' },
    options: {
      en: ['A futures exchange for oil', 'The European power spot exchange', 'A renewable energy certificate market', 'A gas trading platform'],
      de: ['Eine Terminbörse für Öl', 'Die europäische Strom-Spotbörse', 'Ein Markt für Erneuerbare-Energie-Zertifikate', 'Eine Gashandelsplattform']
    },
    correctIndex: 1,
    explanation: {
      en: 'EPEX SPOT operates the day-ahead and intraday power markets for Germany, France, Austria, Switzerland, and other European countries.',
      de: 'EPEX SPOT betreibt die Day-ahead- und Intraday-Strommärkte für Deutschland, Frankreich, Österreich, die Schweiz und andere europäische Länder.'
    },
    topic: 'energy-basics',
    difficulty: 'medium'
  },
  {
    id: 'q33',
    question: { en: 'What is the EEX (European Energy Exchange)?', de: 'Was ist die EEX (European Energy Exchange)?' },
    options: {
      en: ['A spot market only', 'A derivatives exchange for energy commodities', 'A grid operator', 'A renewable energy subsidy program'],
      de: ['Nur ein Spotmarkt', 'Eine Derivatebörse für Energierohstoffe', 'Ein Netzbetreiber', 'Ein Förderprogramm für Erneuerbare']
    },
    correctIndex: 1,
    explanation: {
      en: 'The EEX is a leading European exchange for energy derivatives, trading futures and options on power, gas, emissions, and more.',
      de: 'Die EEX ist eine führende europäische Börse für Energiederivate und handelt Futures und Optionen auf Strom, Gas, Emissionen und mehr.'
    },
    topic: 'energy-basics',
    difficulty: 'medium'
  },
  {
    id: 'q34',
    question: { en: 'What does "pay-as-cleared" mean in electricity markets?', de: 'Was bedeutet "Pay-as-cleared" in Strommärkten?' },
    options: {
      en: ['Each generator is paid their own bid price', 'All generators receive the same market clearing price', 'Consumers pay different prices per provider', 'Only the cheapest generators are paid'],
      de: ['Jeder Erzeuger erhält seinen eigenen Gebotspreis', 'Alle Erzeuger erhalten den gleichen Markträumungspreis', 'Verbraucher zahlen verschiedene Preise pro Anbieter', 'Nur die günstigsten Erzeuger werden bezahlt']
    },
    correctIndex: 1,
    explanation: {
      en: 'In pay-as-cleared auctions, all accepted generators receive the price set by the marginal (most expensive accepted) bid, ensuring efficient market outcomes.',
      de: 'Bei Pay-as-cleared-Auktionen erhalten alle akzeptierten Erzeuger den Preis des marginalen (teuersten akzeptierten) Gebots, was effiziente Marktergebnisse sichert.'
    },
    topic: 'energy-basics',
    difficulty: 'hard'
  },
  {
    id: 'q35',
    question: { en: 'What is a balancing group (Bilanzkreis)?', de: 'Was ist ein Bilanzkreis?' },
    options: {
      en: ['A group of power plants', 'A virtual account tracking energy supply and demand', 'A consumer cooperative', 'A grid section'],
      de: ['Eine Gruppe von Kraftwerken', 'Ein virtuelles Konto zur Verfolgung von Energieangebot und -nachfrage', 'Eine Verbrauchergenossenschaft', 'Ein Netzabschnitt']
    },
    correctIndex: 1,
    explanation: {
      en: 'A balancing group is a virtual energy account where generation, consumption, and trades must balance. Deviations result in balancing energy costs.',
      de: 'Ein Bilanzkreis ist ein virtuelles Energiekonto, in dem Erzeugung, Verbrauch und Handel ausgeglichen sein müssen. Abweichungen führen zu Ausgleichsenergiekosten.'
    },
    topic: 'energy-basics',
    difficulty: 'hard'
  },
  {
    id: 'q36',
    question: { en: 'What is the residual load?', de: 'Was ist die Residuallast?' },
    options: {
      en: ['Total electricity demand', 'Demand minus renewable generation', 'Excess renewable generation', 'Emergency backup demand'],
      de: ['Gesamtstromnachfrage', 'Nachfrage minus erneuerbare Erzeugung', 'Überschüssige erneuerbare Erzeugung', 'Notfall-Backup-Nachfrage']
    },
    correctIndex: 1,
    explanation: {
      en: 'Residual load is total demand minus non-dispatchable renewable generation. It represents the demand that must be met by conventional or flexible sources.',
      de: 'Die Residuallast ist die Gesamtnachfrage minus nicht steuerbarer erneuerbarer Erzeugung. Sie stellt den Bedarf dar, der von konventionellen oder flexiblen Quellen gedeckt werden muss.'
    },
    topic: 'energy-basics',
    difficulty: 'medium'
  },
  {
    id: 'q37',
    question: { en: 'What is the Energiewende?', de: 'Was ist die Energiewende?' },
    options: {
      en: ['Germany\'s nuclear expansion program', 'Germany\'s transition to renewable energy', 'A European gas pipeline project', 'An electricity pricing reform'],
      de: ['Deutschlands Kernkraft-Ausbauprogramm', 'Deutschlands Übergang zu erneuerbaren Energien', 'Ein europäisches Gaspipeline-Projekt', 'Eine Strompreisreform']
    },
    correctIndex: 1,
    explanation: {
      en: 'The Energiewende is Germany\'s comprehensive energy transition policy, targeting 80% renewable electricity by 2030 and climate neutrality by 2045.',
      de: 'Die Energiewende ist Deutschlands umfassende Energiewendepolitik mit dem Ziel von 80% erneuerbarem Strom bis 2030 und Klimaneutralität bis 2045.'
    },
    topic: 'energy-basics',
    difficulty: 'easy'
  },
  {
    id: 'q38',
    question: { en: 'What is market splitting (bidding zones)?', de: 'Was ist Marktaufteilung (Gebotszonen)?' },
    options: {
      en: ['Dividing a market into price zones based on grid constraints', 'Splitting a company into divisions', 'Separating retail and wholesale markets', 'Creating seasonal pricing'],
      de: ['Aufteilung eines Marktes in Preiszonen basierend auf Netzengpässen', 'Aufteilung eines Unternehmens in Sparten', 'Trennung von Einzel- und Großhandelsmarkt', 'Saisonale Preisgestaltung']
    },
    correctIndex: 0,
    explanation: {
      en: 'Bidding zones are areas where electricity prices are uniform. When transmission between zones is constrained, prices diverge. Germany currently has one zone but splitting is debated.',
      de: 'Gebotszonen sind Gebiete mit einheitlichen Strompreisen. Bei Übertragungsengpässen zwischen Zonen divergieren die Preise. Deutschland hat derzeit eine Zone, aber eine Aufteilung wird diskutiert.'
    },
    topic: 'energy-basics',
    difficulty: 'hard'
  },
  // === NEW QUESTIONS: Price Drivers (q39-q48) ===
  {
    id: 'q39',
    question: { en: 'What is the dark spread?', de: 'Was ist der Dark Spread?' },
    options: {
      en: ['The profit margin for coal-fired generation', 'Nighttime electricity pricing', 'The cost of grid blackouts', 'A carbon trading metric'],
      de: ['Die Gewinnmarge für Kohleverstromung', 'Nächtliche Strompreise', 'Die Kosten von Netzausfällen', 'Eine CO2-Handelsmetrik']
    },
    correctIndex: 0,
    explanation: {
      en: 'The dark spread measures coal plant profitability: electricity price minus coal cost and CO2 cost. Negative dark spreads mean coal is unprofitable.',
      de: 'Der Dark Spread misst die Rentabilität von Kohlekraftwerken: Strompreis minus Kohlekosten und CO2-Kosten. Negative Dark Spreads bedeuten, dass Kohle unrentabel ist.'
    },
    topic: 'price-drivers',
    difficulty: 'hard'
  },
  {
    id: 'q40',
    question: { en: 'How does weather affect electricity prices?', de: 'Wie beeinflusst das Wetter Strompreise?' },
    options: {
      en: ['Weather has no impact on prices', 'It only affects demand, not supply', 'It affects both renewable supply and heating/cooling demand', 'Only extreme weather matters'],
      de: ['Wetter hat keinen Einfluss auf Preise', 'Es beeinflusst nur die Nachfrage, nicht das Angebot', 'Es beeinflusst sowohl das erneuerbare Angebot als auch die Heiz-/Kühlnachfrage', 'Nur Extremwetter ist relevant']
    },
    correctIndex: 2,
    explanation: {
      en: 'Weather drives both supply (wind, solar output) and demand (heating in winter, cooling in summer), making it the single biggest short-term price driver.',
      de: 'Wetter treibt sowohl das Angebot (Wind-, Solarleistung) als auch die Nachfrage (Heizen im Winter, Kühlen im Sommer) und ist damit der größte kurzfristige Preistreiber.'
    },
    topic: 'price-drivers',
    difficulty: 'easy'
  },
  {
    id: 'q41',
    question: { en: 'What is demand elasticity in electricity markets?', de: 'Was ist Nachfrageelastizität in Strommärkten?' },
    options: {
      en: ['Demand changes strongly with price', 'Demand barely responds to price changes', 'Demand is always constant', 'Demand follows a fixed schedule'],
      de: ['Nachfrage ändert sich stark mit dem Preis', 'Nachfrage reagiert kaum auf Preisänderungen', 'Nachfrage ist immer konstant', 'Nachfrage folgt einem festen Zeitplan']
    },
    correctIndex: 1,
    explanation: {
      en: 'Electricity demand is largely price-inelastic in the short term—people and businesses consume power regardless of price, which is why prices can spike dramatically.',
      de: 'Stromnachfrage ist kurzfristig weitgehend preisunelastisch—Menschen und Unternehmen verbrauchen Strom unabhängig vom Preis, weshalb Preise dramatisch steigen können.'
    },
    topic: 'price-drivers',
    difficulty: 'medium'
  },
  {
    id: 'q42',
    question: { en: 'What causes negative electricity prices?', de: 'Was verursacht negative Strompreise?' },
    options: {
      en: ['Government subsidies to consumers', 'Oversupply from renewables combined with inflexible generation', 'Technical errors in the grid', 'Low fuel costs'],
      de: ['Staatliche Subventionen an Verbraucher', 'Überangebot durch Erneuerbare kombiniert mit unflexibler Erzeugung', 'Technische Fehler im Netz', 'Niedrige Brennstoffkosten']
    },
    correctIndex: 1,
    explanation: {
      en: 'Negative prices occur when renewable oversupply coincides with inflexible plants (nuclear, lignite) that cannot economically shut down, forcing prices below zero.',
      de: 'Negative Preise entstehen, wenn erneuerbares Überangebot mit unflexiblen Anlagen (Kernkraft, Braunkohle) zusammentrifft, die nicht wirtschaftlich abgeschaltet werden können.'
    },
    topic: 'price-drivers',
    difficulty: 'medium'
  },
  {
    id: 'q43',
    question: { en: 'What is a carbon floor price?', de: 'Was ist ein CO2-Mindestpreis?' },
    options: {
      en: ['The lowest price carbon can trade at in a specific market', 'A tax on all fossil fuels', 'The cost of carbon capture technology', 'A subsidy for renewable energy'],
      de: ['Der niedrigste Preis, zu dem CO2 in einem bestimmten Markt gehandelt werden kann', 'Eine Steuer auf alle fossilen Brennstoffe', 'Die Kosten der CO2-Abscheidungstechnologie', 'Eine Subvention für erneuerbare Energie']
    },
    correctIndex: 0,
    explanation: {
      en: 'A carbon floor price sets a minimum CO2 cost (e.g., UK\'s Carbon Price Support), ensuring a predictable minimum cost for emitting, even if EU ETS prices drop.',
      de: 'Ein CO2-Mindestpreis setzt minimale CO2-Kosten (z.B. UK Carbon Price Support) und stellt vorhersagbare Mindestkosten für Emissionen sicher, selbst wenn EU-ETS-Preise fallen.'
    },
    topic: 'price-drivers',
    difficulty: 'hard'
  },
  {
    id: 'q44',
    question: { en: 'How do fuel costs affect the merit order?', de: 'Wie beeinflussen Brennstoffkosten die Merit Order?' },
    options: {
      en: ['Higher fuel costs push plants higher in the merit order', 'Fuel costs have no impact', 'Higher fuel costs reduce electricity prices', 'Only gas costs matter'],
      de: ['Höhere Brennstoffkosten schieben Anlagen höher in der Merit Order', 'Brennstoffkosten haben keinen Einfluss', 'Höhere Brennstoffkosten senken Strompreise', 'Nur Gaskosten sind relevant']
    },
    correctIndex: 0,
    explanation: {
      en: 'Higher fuel costs increase a plant\'s marginal cost, pushing it higher in the merit order. This can change which fuel sets the marginal price (e.g., coal-gas switching).',
      de: 'Höhere Brennstoffkosten erhöhen die Grenzkosten einer Anlage und schieben sie höher in der Merit Order. Dies kann ändern, welcher Brennstoff den Grenzpreis setzt (z.B. Kohle-Gas-Wechsel).'
    },
    topic: 'price-drivers',
    difficulty: 'medium'
  },
  {
    id: 'q45',
    question: { en: 'What is the clean spark spread?', de: 'Was ist der Clean Spark Spread?' },
    options: {
      en: ['Spark spread minus CO2 costs', 'The cost of clean energy', 'Revenue from solar panels', 'A green energy certificate'],
      de: ['Spark Spread minus CO2-Kosten', 'Die Kosten sauberer Energie', 'Einnahmen aus Solarmodulen', 'Ein Grünes-Energie-Zertifikat']
    },
    correctIndex: 0,
    explanation: {
      en: 'The clean spark spread deducts CO2 allowance costs from the spark spread, giving a more accurate picture of gas plant profitability under emissions trading.',
      de: 'Der Clean Spark Spread zieht CO2-Zertifikatskosten vom Spark Spread ab und gibt ein genaueres Bild der Gasanlagen-Rentabilität unter dem Emissionshandel.'
    },
    topic: 'price-drivers',
    difficulty: 'hard'
  },
  {
    id: 'q46',
    question: { en: 'What is the "cannibalisation effect" in renewables?', de: 'Was ist der "Kannibalisierungseffekt" bei Erneuerbaren?' },
    options: {
      en: ['Renewables competing with each other for grid access', 'Increasing renewables reduce their own market value', 'Solar panels degrading over time', 'Wind farms blocking each other'],
      de: ['Erneuerbare konkurrieren um Netzzugang', 'Zunehmende Erneuerbare reduzieren ihren eigenen Marktwert', 'Solarmodule, die im Laufe der Zeit degradieren', 'Windparks, die sich gegenseitig blockieren']
    },
    correctIndex: 1,
    explanation: {
      en: 'As more solar/wind is built, they produce at the same times, pushing prices down precisely when they generate—reducing the value of their own output.',
      de: 'Je mehr Solar/Wind gebaut wird, desto mehr produzieren sie zur gleichen Zeit und drücken die Preise genau dann, wenn sie erzeugen—und reduzieren den Wert ihrer eigenen Erzeugung.'
    },
    topic: 'price-drivers',
    difficulty: 'hard'
  },
  {
    id: 'q47',
    question: { en: 'What role does LNG play in European energy prices?', de: 'Welche Rolle spielt LNG für europäische Energiepreise?' },
    options: {
      en: ['LNG has replaced all pipeline gas', 'LNG provides an alternative gas supply, linking European prices to global markets', 'LNG is only used in Asia', 'LNG is cheaper than pipeline gas always'],
      de: ['LNG hat alles Pipeline-Gas ersetzt', 'LNG bietet eine alternative Gasversorgung und verbindet europäische Preise mit globalen Märkten', 'LNG wird nur in Asien genutzt', 'LNG ist immer günstiger als Pipeline-Gas']
    },
    correctIndex: 1,
    explanation: {
      en: 'After the 2022 gas crisis, Europe rapidly expanded LNG imports, connecting its gas (and thus electricity) prices to global LNG markets, especially Asian demand.',
      de: 'Nach der Gaskrise 2022 erweiterte Europa schnell LNG-Importe und verband seine Gas- (und damit Strom-) Preise mit globalen LNG-Märkten, insbesondere der asiatischen Nachfrage.'
    },
    topic: 'price-drivers',
    difficulty: 'medium'
  },
  {
    id: 'q48',
    question: { en: 'What is the "duck curve" in electricity markets?', de: 'Was ist die "Entenkurve" in Strommärkten?' },
    options: {
      en: ['A demand pattern shaped like a duck due to midday solar oversupply', 'A pricing algorithm', 'A type of futures contract', 'A grid frequency pattern'],
      de: ['Ein Nachfragemuster in Entenform durch solare Überproduktion mittags', 'Ein Preisalgorithmus', 'Eine Art Terminkontrakt', 'Ein Netzfrequenzmuster']
    },
    correctIndex: 0,
    explanation: {
      en: 'The duck curve shows how solar generation creates a midday dip in residual load, followed by a steep evening ramp-up as solar fades and demand peaks.',
      de: 'Die Entenkurve zeigt, wie Solarproduktion eine Mittagsdelle in der Residuallast erzeugt, gefolgt von einem steilen Abendanstieg, wenn Solar nachlässt und Nachfrage steigt.'
    },
    topic: 'price-drivers',
    difficulty: 'medium'
  },
  // === NEW QUESTIONS: Renewables & Flexibility (q49-q56) ===
  {
    id: 'q49',
    question: { en: 'What is a virtual power plant (VPP)?', de: 'Was ist ein virtuelles Kraftwerk (VKW)?' },
    options: {
      en: ['A simulated power plant for training', 'An aggregation of distributed energy resources controlled as one unit', 'A power plant in virtual reality', 'A cloud computing center for energy'],
      de: ['Ein simuliertes Kraftwerk für Schulungszwecke', 'Eine Aggregation verteilter Energieressourcen, gesteuert als eine Einheit', 'Ein Kraftwerk in virtueller Realität', 'Ein Cloud-Computing-Zentrum für Energie']
    },
    correctIndex: 1,
    explanation: {
      en: 'VPPs combine distributed resources (solar, batteries, EVs, heat pumps) into a single controllable portfolio, participating in energy and balancing markets.',
      de: 'VKWs kombinieren verteilte Ressourcen (Solar, Batterien, E-Autos, Wärmepumpen) zu einem steuerbaren Portfolio, das an Energie- und Regelleistungsmärkten teilnimmt.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q50',
    question: { en: 'What is revenue stacking for battery storage?', de: 'Was ist Revenue Stacking für Batteriespeicher?' },
    options: {
      en: ['Earning revenue from multiple market services simultaneously', 'Stacking batteries on top of each other', 'Accumulating profits over years', 'A government subsidy program'],
      de: ['Einnahmen aus mehreren Marktdienstleistungen gleichzeitig erzielen', 'Batterien übereinander stapeln', 'Gewinne über Jahre ansammeln', 'Ein staatliches Förderprogramm']
    },
    correctIndex: 0,
    explanation: {
      en: 'Revenue stacking means batteries earn from multiple sources: spot arbitrage, frequency regulation, capacity payments, and peak shaving—maximizing return on investment.',
      de: 'Revenue Stacking bedeutet, dass Batterien aus mehreren Quellen verdienen: Spot-Arbitrage, Frequenzregelung, Kapazitätszahlungen und Spitzenlastreduzierung—zur Maximierung der Rendite.'
    },
    topic: 'renewables',
    difficulty: 'hard'
  },
  {
    id: 'q51',
    question: { en: 'What is the difference between onshore and offshore wind?', de: 'Was ist der Unterschied zwischen Onshore- und Offshore-Wind?' },
    options: {
      en: ['Onshore is cheaper but less consistent; offshore is more expensive but windier', 'There is no difference', 'Offshore wind only works in summer', 'Onshore wind produces more electricity'],
      de: ['Onshore ist günstiger aber weniger konstant; Offshore ist teurer aber windiger', 'Es gibt keinen Unterschied', 'Offshore-Wind funktioniert nur im Sommer', 'Onshore-Wind produziert mehr Strom']
    },
    correctIndex: 0,
    explanation: {
      en: 'Offshore wind has higher capacity factors (40-50% vs 25-35%) due to stronger, more consistent winds, but installation and maintenance costs are significantly higher.',
      de: 'Offshore-Wind hat höhere Kapazitätsfaktoren (40-50% vs. 25-35%) durch stärkere, konstantere Winde, aber Installations- und Wartungskosten sind deutlich höher.'
    },
    topic: 'renewables',
    difficulty: 'easy'
  },
  {
    id: 'q52',
    question: { en: 'What is an energy community?', de: 'Was ist eine Energiegemeinschaft?' },
    options: {
      en: ['A group of citizens jointly producing and sharing energy', 'A power plant co-ownership scheme', 'A government energy program', 'A utility company cooperative'],
      de: ['Eine Gruppe von Bürgern, die gemeinsam Energie erzeugen und teilen', 'Ein Kraftwerks-Miteigentumsprogramm', 'Ein staatliches Energieprogramm', 'Eine Energieversorger-Genossenschaft']
    },
    correctIndex: 0,
    explanation: {
      en: 'Energy communities allow citizens to collectively invest in, produce, and share renewable energy, enabled by EU Clean Energy Package regulations.',
      de: 'Energiegemeinschaften ermöglichen es Bürgern, gemeinsam in erneuerbare Energie zu investieren, sie zu erzeugen und zu teilen, ermöglicht durch EU Clean Energy Package-Regulierungen.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q53',
    question: { en: 'What is the role of hydrogen in seasonal energy storage?', de: 'Welche Rolle spielt Wasserstoff in der saisonalen Energiespeicherung?' },
    options: {
      en: ['Hydrogen can store renewable surplus for months, bridging seasonal gaps', 'Hydrogen storage is only for daily cycling', 'Hydrogen cannot be stored', 'Hydrogen is only used as vehicle fuel'],
      de: ['Wasserstoff kann erneuerbare Überschüsse monatelang speichern und saisonale Lücken überbrücken', 'Wasserstoffspeicherung ist nur für tägliche Zyklen', 'Wasserstoff kann nicht gespeichert werden', 'Wasserstoff wird nur als Fahrzeugkraftstoff genutzt']
    },
    correctIndex: 0,
    explanation: {
      en: 'Unlike batteries (hours), hydrogen can store energy for weeks to months in salt caverns or tanks, making it ideal for bridging winter low-renewable periods.',
      de: 'Im Gegensatz zu Batterien (Stunden) kann Wasserstoff Energie wochen- bis monatelang in Salzkavernen oder Tanks speichern, ideal für die Überbrückung winterlicher Niedrig-Erneuerbare-Perioden.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q54',
    question: { en: 'What is the capacity factor of a power plant?', de: 'Was ist der Kapazitätsfaktor eines Kraftwerks?' },
    options: {
      en: ['Its maximum possible output', 'The ratio of actual output to maximum possible output over time', 'The number of hours it runs per day', 'Its efficiency percentage'],
      de: ['Seine maximal mögliche Leistung', 'Das Verhältnis der tatsächlichen zur maximal möglichen Leistung über Zeit', 'Die Anzahl der Betriebsstunden pro Tag', 'Sein Effizienzprozentsatz']
    },
    correctIndex: 1,
    explanation: {
      en: 'Capacity factor measures actual vs potential output. Solar PV: ~11%, onshore wind: ~25-35%, offshore wind: ~40-50%, nuclear: ~90%, gas CCGT: ~40-60%.',
      de: 'Der Kapazitätsfaktor misst tatsächliche vs. mögliche Leistung. Solar-PV: ~11%, Onshore-Wind: ~25-35%, Offshore-Wind: ~40-50%, Kernkraft: ~90%, Gas-GuD: ~40-60%.'
    },
    topic: 'renewables',
    difficulty: 'medium'
  },
  {
    id: 'q55',
    question: { en: 'What is behind-the-meter storage?', de: 'Was ist Behind-the-Meter-Speicherung?' },
    options: {
      en: ['Battery storage installed at the customer\'s premises', 'Utility-scale storage at substations', 'Hidden storage in the grid', 'Metering equipment batteries'],
      de: ['Batteriespeicher installiert beim Kunden', 'Großspeicher an Umspannwerken', 'Versteckte Speicher im Netz', 'Messequipment-Batterien']
    },
    correctIndex: 0,
    explanation: {
      en: 'Behind-the-meter storage sits at customer locations, reducing grid demand, enabling self-consumption of solar, and providing backup power.',
      de: 'Behind-the-Meter-Speicher befinden sich beim Kunden, reduzieren den Netzbedarf, ermöglichen Eigenverbrauch von Solar und bieten Notstromversorgung.'
    },
    topic: 'renewables',
    difficulty: 'easy'
  },
  {
    id: 'q56',
    question: { en: 'What is the LCOE (Levelized Cost of Energy)?', de: 'Was sind die LCOE (Stromgestehungskosten)?' },
    options: {
      en: ['The spot market price', 'The total lifetime cost per unit of energy produced', 'The grid connection cost', 'The retail electricity price'],
      de: ['Der Spotmarktpreis', 'Die Gesamtlebenszeitkosten pro Einheit erzeugter Energie', 'Die Netzanschlusskosten', 'Der Stromendkundenpreis']
    },
    correctIndex: 1,
    explanation: {
      en: 'LCOE captures all costs (capital, fuel, maintenance, decommissioning) divided by total energy output, enabling fair comparison between technologies.',
      de: 'LCOE erfasst alle Kosten (Kapital, Brennstoff, Wartung, Rückbau) geteilt durch die gesamte Energieerzeugung und ermöglicht einen fairen Technologievergleich.'
    },
    topic: 'renewables',
    difficulty: 'hard'
  },
  // === NEW QUESTIONS: Grid & DSO (q57-q65) ===
  {
    id: 'q57',
    question: { en: 'What is FCR (Frequency Containment Reserve)?', de: 'Was ist FCR (Frequenzhaltereserve)?' },
    options: {
      en: ['Primary reserve that activates within seconds to stabilize frequency', 'A backup power generator', 'A frequency measurement device', 'A grid expansion plan'],
      de: ['Primärreserve, die innerhalb von Sekunden zur Frequenzstabilisierung aktiviert wird', 'Ein Notstromgenerator', 'Ein Frequenzmessgerät', 'Ein Netzausbauplan']
    },
    correctIndex: 0,
    explanation: {
      en: 'FCR activates automatically within 30 seconds to contain frequency deviations. It\'s the fastest balancing product and is procured jointly across Continental Europe.',
      de: 'FCR aktiviert sich automatisch innerhalb von 30 Sekunden, um Frequenzabweichungen einzudämmen. Es ist das schnellste Regelleistungsprodukt und wird gemeinsam in Kontinentaleuropa beschafft.'
    },
    topic: 'grid-dso',
    difficulty: 'hard'
  },
  {
    id: 'q58',
    question: { en: 'What is aFRR (automatic Frequency Restoration Reserve)?', de: 'Was ist aFRR (automatische Frequenzwiederherstellungsreserve)?' },
    options: {
      en: ['Secondary reserve activating within 5 minutes', 'A type of battery storage', 'An automatic grid disconnect', 'A renewable forecasting system'],
      de: ['Sekundärreserve, die innerhalb von 5 Minuten aktiviert wird', 'Eine Art Batteriespeicher', 'Eine automatische Netzabschaltung', 'Ein Erneuerbare-Prognosesystem']
    },
    correctIndex: 0,
    explanation: {
      en: 'aFRR (secondary reserve) activates within 5 minutes to restore frequency to 50 Hz and relieve FCR. It\'s centrally activated by TSOs based on area control error.',
      de: 'aFRR (Sekundärreserve) aktiviert sich innerhalb von 5 Minuten, um die Frequenz auf 50 Hz wiederherzustellen und FCR zu entlasten. Sie wird zentral von ÜNBs basierend auf dem Regelzonenfehler aktiviert.'
    },
    topic: 'grid-dso',
    difficulty: 'hard'
  },
  {
    id: 'q59',
    question: { en: 'What is congestion management in power grids?', de: 'Was ist Engpassmanagement in Stromnetzen?' },
    options: {
      en: ['Measures to relieve overloaded grid sections', 'Managing traffic near power plants', 'Customer queuing for connections', 'Scheduling plant maintenance'],
      de: ['Maßnahmen zur Entlastung überlasteter Netzabschnitte', 'Verkehrsmanagement in der Nähe von Kraftwerken', 'Warteschlangen von Kunden für Anschlüsse', 'Planung von Anlagenwartung']
    },
    correctIndex: 0,
    explanation: {
      en: 'Congestion management uses redispatch, countertrading, or curtailment to prevent grid overloads when power flows exceed line ratings.',
      de: 'Engpassmanagement nutzt Redispatch, Gegenhandel oder Abregelung, um Netzüberlastungen zu verhindern, wenn Stromflüsse die Leitungskapazitäten überschreiten.'
    },
    topic: 'grid-dso',
    difficulty: 'medium'
  },
  {
    id: 'q60',
    question: { en: 'What is the NOVA principle in German grid planning?', de: 'Was ist das NOVA-Prinzip in der deutschen Netzplanung?' },
    options: {
      en: ['Network Optimization before reinforcement before expansion', 'New Onshore Voltage Architecture', 'National Overview of Voltage Assessment', 'Nordic-Occidental Voltage Agreement'],
      de: ['Netzoptimierung vor Verstärkung vor Ausbau', 'Neue Onshore-Spannungsarchitektur', 'Nationale Übersicht der Spannungsbewertung', 'Nordisch-Okzidentale Spannungsvereinbarung']
    },
    correctIndex: 0,
    explanation: {
      en: 'NOVA (Netz-Optimierung vor Verstärkung vor Ausbau) prioritizes optimizing existing grids, then reinforcing, and only then building new lines—minimizing costs and environmental impact.',
      de: 'NOVA (Netz-Optimierung vor Verstärkung vor Ausbau) priorisiert die Optimierung bestehender Netze, dann Verstärkung, und erst dann den Neubau von Leitungen—zur Minimierung von Kosten und Umweltauswirkungen.'
    },
    topic: 'grid-dso',
    difficulty: 'hard'
  },
  {
    id: 'q61',
    question: { en: 'What is a smart meter?', de: 'Was ist ein Smart Meter?' },
    options: {
      en: ['A digital electricity meter with communication capabilities', 'A regular meter with a display', 'A meter that reduces consumption', 'A prepaid electricity meter'],
      de: ['Ein digitaler Stromzähler mit Kommunikationsfähigkeiten', 'Ein regulärer Zähler mit Display', 'Ein Zähler, der den Verbrauch reduziert', 'Ein Prepaid-Stromzähler']
    },
    correctIndex: 0,
    explanation: {
      en: 'Smart meters record consumption in real-time and communicate data to utilities, enabling dynamic tariffs, demand response, and better grid management.',
      de: 'Smart Meter erfassen den Verbrauch in Echtzeit und kommunizieren Daten an Versorger, was dynamische Tarife, Lastmanagement und besseres Netzmanagement ermöglicht.'
    },
    topic: 'grid-dso',
    difficulty: 'easy'
  },
  {
    id: 'q62',
    question: { en: 'What are the four German TSOs?', de: 'Welche vier deutschen ÜNBs gibt es?' },
    options: {
      en: ['TenneT, 50Hertz, Amprion, TransnetBW', 'E.ON, RWE, Vattenfall, EnBW', 'Siemens, ABB, Alstom, GE', 'EDF, Enel, Iberdrola, Endesa'],
      de: ['TenneT, 50Hertz, Amprion, TransnetBW', 'E.ON, RWE, Vattenfall, EnBW', 'Siemens, ABB, Alstom, GE', 'EDF, Enel, Iberdrola, Endesa']
    },
    correctIndex: 0,
    explanation: {
      en: 'Germany has four TSOs, each operating in a specific region: TenneT (North/Central), 50Hertz (East), Amprion (West), and TransnetBW (Southwest).',
      de: 'Deutschland hat vier ÜNBs, jeder in einer bestimmten Region: TenneT (Nord/Mitte), 50Hertz (Ost), Amprion (West) und TransnetBW (Südwest).'
    },
    topic: 'grid-dso',
    difficulty: 'easy'
  },
  {
    id: 'q63',
    question: { en: 'What is the role of HVDC lines like SuedLink?', de: 'Welche Rolle spielen HGÜ-Leitungen wie SuedLink?' },
    options: {
      en: ['Transporting bulk power over long distances with low losses', 'Distributing power to homes', 'Connecting smart meters', 'Storing electricity underground'],
      de: ['Transport großer Strommengen über lange Distanzen mit geringen Verlusten', 'Stromverteilung an Haushalte', 'Verbindung von Smart Metern', 'Unterirdische Stromspeicherung']
    },
    correctIndex: 0,
    explanation: {
      en: 'HVDC (High Voltage Direct Current) lines efficiently transport wind power from northern Germany to southern demand centers, reducing redispatch costs by billions.',
      de: 'HGÜ-Leitungen (Hochspannungs-Gleichstrom-Übertragung) transportieren Windstrom effizient von Norddeutschland zu südlichen Verbrauchszentren und reduzieren Redispatch-Kosten um Milliarden.'
    },
    topic: 'grid-dso',
    difficulty: 'medium'
  },
  {
    id: 'q64',
    question: { en: 'What is a grid connection queue?', de: 'Was ist eine Netzanschlusswarteschlange?' },
    options: {
      en: ['A waiting list for new generators to connect to the grid', 'A physical queue at grid stations', 'A pricing mechanism', 'A smart grid protocol'],
      de: ['Eine Warteliste für neue Erzeuger zum Netzanschluss', 'Eine physische Warteschlange an Netzstationen', 'Ein Preismechanismus', 'Ein Smart-Grid-Protokoll']
    },
    correctIndex: 0,
    explanation: {
      en: 'Many countries face years-long queues for grid connections as renewable projects outpace grid expansion capacity. Germany is working on streamlining the connection process.',
      de: 'Viele Länder haben jahrelange Warteschlangen für Netzanschlüsse, da Erneuerbare-Projekte die Netzausbaukapazität übertreffen. Deutschland arbeitet an der Straffung des Anschlussprozesses.'
    },
    topic: 'grid-dso',
    difficulty: 'medium'
  },
  {
    id: 'q65',
    question: { en: 'What is mFRR (manual Frequency Restoration Reserve)?', de: 'Was ist mFRR (manuelle Frequenzwiederherstellungsreserve)?' },
    options: {
      en: ['Tertiary reserve activating within 15 minutes for longer imbalances', 'An emergency blackout procedure', 'A manual grid frequency adjustment', 'A maintenance reserve fund'],
      de: ['Tertiärreserve, die innerhalb von 15 Minuten bei längeren Ungleichgewichten aktiviert wird', 'Ein Notfall-Blackout-Verfahren', 'Eine manuelle Netzfrequenzanpassung', 'Ein Wartungsreservefonds']
    },
    correctIndex: 0,
    explanation: {
      en: 'mFRR (tertiary reserve) is manually activated within 15 minutes to handle longer-lasting imbalances and relieve aFRR, allowing the system to restore normal operation.',
      de: 'mFRR (Tertiärreserve) wird manuell innerhalb von 15 Minuten aktiviert, um länger anhaltende Ungleichgewichte zu bewältigen und aFRR zu entlasten, damit das System den Normalbetrieb wiederherstellen kann.'
    },
    topic: 'grid-dso',
    difficulty: 'hard'
  },
  // === NEW QUESTIONS: Regulation & Policy (q66-q75) ===
  {
    id: 'q66',
    question: { en: 'What is REMIT?', de: 'Was ist REMIT?' },
    options: {
      en: ['EU regulation on energy market integrity and transparency', 'A renewable energy target', 'A retail electricity standard', 'A grid connection regulation'],
      de: ['EU-Verordnung über Integrität und Transparenz des Energiemarktes', 'Ein Erneuerbare-Energien-Ziel', 'Ein Stromeinzelhandelsstandard', 'Eine Netzanschlussverordnung']
    },
    correctIndex: 0,
    explanation: {
      en: 'REMIT (Regulation on Energy Market Integrity and Transparency) prohibits insider trading and market manipulation in wholesale energy markets, monitored by ACER.',
      de: 'REMIT (Verordnung über Integrität und Transparenz des Energiemarktes) verbietet Insiderhandel und Marktmanipulation in Energiegroßhandelsmärkten, überwacht von ACER.'
    },
    topic: 'regulation',
    difficulty: 'hard'
  },
  {
    id: 'q67',
    question: { en: 'What is the EEG (Erneuerbare-Energien-Gesetz)?', de: 'Was ist das EEG (Erneuerbare-Energien-Gesetz)?' },
    options: {
      en: ['Germany\'s core renewable energy law providing support mechanisms', 'A European electricity trading law', 'An energy efficiency standard', 'A grid expansion regulation'],
      de: ['Deutschlands zentrales Erneuerbare-Energien-Gesetz mit Förderungsmechanismen', 'Ein europäisches Stromhandelsgesetz', 'Ein Energieeffizienzstandard', 'Eine Netzausbauverordnung']
    },
    correctIndex: 0,
    explanation: {
      en: 'The EEG has driven Germany\'s renewable expansion since 2000, evolving from feed-in tariffs to competitive auctions for wind and solar projects.',
      de: 'Das EEG treibt Deutschlands Erneuerbare-Ausbau seit 2000 voran und entwickelte sich von Einspeisevergütungen zu wettbewerblichen Ausschreibungen für Wind- und Solarprojekte.'
    },
    topic: 'regulation',
    difficulty: 'easy'
  },
  {
    id: 'q68',
    question: { en: 'What is CBAM (Carbon Border Adjustment Mechanism)?', de: 'Was ist CBAM (CO2-Grenzausgleichsmechanismus)?' },
    options: {
      en: ['An EU mechanism to price carbon in imports from non-EU countries', 'A carbon capture technology', 'A bilateral emissions agreement', 'A border security system'],
      de: ['Ein EU-Mechanismus zur CO2-Bepreisung von Importen aus Nicht-EU-Ländern', 'Eine CO2-Abscheidungstechnologie', 'Ein bilaterales Emissionsabkommen', 'Ein Grenzsicherheitssystem']
    },
    correctIndex: 0,
    explanation: {
      en: 'CBAM prevents carbon leakage by requiring importers of steel, cement, aluminum, etc. to purchase certificates matching EU ETS carbon prices, leveling the playing field.',
      de: 'CBAM verhindert Carbon Leakage, indem Importeure von Stahl, Zement, Aluminium etc. Zertifikate kaufen müssen, die den EU-ETS-CO2-Preisen entsprechen, um gleiche Wettbewerbsbedingungen zu schaffen.'
    },
    topic: 'regulation',
    difficulty: 'hard'
  },
  {
    id: 'q69',
    question: { en: 'What are network codes in European electricity markets?', de: 'Was sind Netzkodizes in europäischen Strommärkten?' },
    options: {
      en: ['Technical and market rules for cross-border electricity trading', 'Security codes for power plants', 'Customer identification numbers', 'Grid maintenance schedules'],
      de: ['Technische und Marktregeln für grenzüberschreitenden Stromhandel', 'Sicherheitscodes für Kraftwerke', 'Kundenidentifikationsnummern', 'Netzwartungspläne']
    },
    correctIndex: 0,
    explanation: {
      en: 'Network codes are EU-wide rules harmonizing grid operations, market access, and system security across all member states\' electricity systems.',
      de: 'Netzkodizes sind EU-weite Regeln zur Harmonisierung von Netzbetrieb, Marktzugang und Systemsicherheit in allen Stromsystemen der Mitgliedstaaten.'
    },
    topic: 'regulation',
    difficulty: 'medium'
  },
  {
    id: 'q70',
    question: { en: 'What is the Klimaschutzgesetz?', de: 'Was ist das Klimaschutzgesetz?' },
    options: {
      en: ['Germany\'s climate protection act setting binding emission reduction targets', 'A European renewable energy directive', 'A tax on carbon emissions', 'A clean air regulation'],
      de: ['Deutschlands Klimaschutzgesetz mit verbindlichen Emissionsreduktionszielen', 'Eine europäische Erneuerbare-Energien-Richtlinie', 'Eine Steuer auf CO2-Emissionen', 'Eine Luftreinhaltevorschrift']
    },
    correctIndex: 0,
    explanation: {
      en: 'The Klimaschutzgesetz sets sector-specific CO2 budgets for Germany, targeting 65% emission reduction by 2030 and climate neutrality by 2045.',
      de: 'Das Klimaschutzgesetz setzt sektorspezifische CO2-Budgets für Deutschland mit dem Ziel von 65% Emissionsreduktion bis 2030 und Klimaneutralität bis 2045.'
    },
    topic: 'regulation',
    difficulty: 'medium'
  },
  {
    id: 'q71',
    question: { en: 'What is the role of BNetzA (Bundesnetzagentur)?', de: 'Was ist die Rolle der BNetzA (Bundesnetzagentur)?' },
    options: {
      en: ['Germany\'s federal regulator for energy, telecoms, and postal markets', 'A power generation company', 'An environmental agency', 'A consumer rights organization'],
      de: ['Deutschlands Bundesregulierungsbehörde für Energie-, Telekom- und Postmärkte', 'Ein Stromerzeugungsunternehmen', 'Eine Umweltagentur', 'Eine Verbraucherschutzorganisation']
    },
    correctIndex: 0,
    explanation: {
      en: 'BNetzA regulates grid access, approves grid fees, monitors market competition, and oversees renewable energy auctions in Germany.',
      de: 'Die BNetzA reguliert den Netzzugang, genehmigt Netzentgelte, überwacht den Marktwettbewerb und beaufsichtigt Erneuerbare-Energien-Ausschreibungen in Deutschland.'
    },
    topic: 'regulation',
    difficulty: 'easy'
  },
  {
    id: 'q72',
    question: { en: 'What is the ARegV (Anreizregulierungsverordnung)?', de: 'Was ist die ARegV (Anreizregulierungsverordnung)?' },
    options: {
      en: ['Germany\'s incentive regulation for grid operators', 'An air quality regulation', 'A renewable energy auction rule', 'A consumer protection directive'],
      de: ['Deutschlands Anreizregulierung für Netzbetreiber', 'Eine Luftqualitätsverordnung', 'Eine Erneuerbare-Energien-Ausschreibungsregel', 'Eine Verbraucherschutzrichtlinie']
    },
    correctIndex: 0,
    explanation: {
      en: 'The ARegV sets revenue caps for DSOs and TSOs, incentivizing efficiency improvements while ensuring adequate investment in grid infrastructure.',
      de: 'Die ARegV setzt Erlösobergrenzen für VNBs und ÜNBs, fördert Effizienzverbesserungen und stellt gleichzeitig ausreichende Investitionen in die Netzinfrastruktur sicher.'
    },
    topic: 'regulation',
    difficulty: 'hard'
  },
  {
    id: 'q73',
    question: { en: 'What is the "Fit for 55" package?', de: 'Was ist das "Fit for 55"-Paket?' },
    options: {
      en: ['EU legislation package to cut emissions 55% by 2030', 'A fitness program for energy workers', 'A 55-country trade agreement', 'A grid efficiency standard'],
      de: ['EU-Gesetzespaket zur Senkung der Emissionen um 55% bis 2030', 'Ein Fitnessprogramm für Energiearbeiter', 'Ein Handelsabkommen von 55 Ländern', 'Ein Netzeffizienzstandard']
    },
    correctIndex: 0,
    explanation: {
      en: '"Fit for 55" is the EU\'s comprehensive package of proposals to align climate, energy, transport, and taxation policies with the target of reducing net GHG emissions by at least 55% by 2030.',
      de: '"Fit for 55" ist das umfassende EU-Paket von Vorschlägen zur Abstimmung von Klima-, Energie-, Verkehrs- und Steuerpolitik mit dem Ziel, die Netto-THG-Emissionen bis 2030 um mindestens 55% zu senken.'
    },
    topic: 'regulation',
    difficulty: 'medium'
  },
  {
    id: 'q74',
    question: { en: 'What is ACER (Agency for the Cooperation of Energy Regulators)?', de: 'Was ist ACER (Agentur für die Zusammenarbeit der Energieregulierungsbehörden)?' },
    options: {
      en: ['EU agency coordinating energy regulation across member states', 'A carbon trading company', 'An energy storage technology', 'A power plant certification body'],
      de: ['EU-Agentur zur Koordinierung der Energieregulierung in den Mitgliedstaaten', 'Ein CO2-Handelsunternehmen', 'Eine Energiespeichertechnologie', 'Eine Kraftwerks-Zertifizierungsstelle']
    },
    correctIndex: 0,
    explanation: {
      en: 'ACER coordinates national energy regulators, monitors wholesale markets for manipulation (REMIT), and develops framework guidelines for network codes.',
      de: 'ACER koordiniert nationale Energieregulierer, überwacht Großhandelsmärkte auf Manipulation (REMIT) und entwickelt Rahmenleitlinien für Netzkodizes.'
    },
    topic: 'regulation',
    difficulty: 'medium'
  },
  {
    id: 'q75',
    question: { en: 'What is the difference between feed-in tariffs and auctions for renewables?', de: 'Was ist der Unterschied zwischen Einspeisevergütungen und Ausschreibungen für Erneuerbare?' },
    options: {
      en: ['Feed-in tariffs guarantee a fixed price; auctions let developers compete on price', 'Auctions always cost more', 'Feed-in tariffs are more competitive', 'There is no difference'],
      de: ['Einspeisevergütungen garantieren einen festen Preis; Ausschreibungen lassen Entwickler um den Preis konkurrieren', 'Ausschreibungen kosten immer mehr', 'Einspeisevergütungen sind wettbewerbsfähiger', 'Es gibt keinen Unterschied']
    },
    correctIndex: 0,
    explanation: {
      en: 'Feed-in tariffs (FITs) offer guaranteed prices but can lead to overpayment. Competitive auctions drive costs down but may exclude smaller players. Germany transitioned from FITs to auctions in the EEG 2017 reform.',
      de: 'Einspeisevergütungen (FITs) bieten garantierte Preise, können aber zu Überzahlung führen. Wettbewerbliche Ausschreibungen senken die Kosten, können aber kleinere Akteure ausschließen. Deutschland wechselte mit der EEG-Reform 2017 von FITs zu Ausschreibungen.'
    },
    topic: 'regulation',
    difficulty: 'medium'
  },
  // === NEW QUESTIONS: Trading & Hedging (q76-q85) ===
  {
    id: 'q76',
    question: { en: 'What is OTC trading in energy markets?', de: 'Was ist OTC-Handel in Energiemärkten?' },
    options: {
      en: ['Over-the-counter bilateral trading between parties', 'Only transparent contracts', 'Online trading center', 'Official trading committee'],
      de: ['Außerbörslicher bilateraler Handel zwischen Parteien', 'Nur transparente Verträge', 'Online-Handelszentrum', 'Offizielles Handelskomitee']
    },
    correctIndex: 0,
    explanation: {
      en: 'OTC trading is bilateral, privately negotiated between parties (often via brokers), offering more flexibility than exchange trading but with counterparty risk.',
      de: 'OTC-Handel ist bilateral und wird privat zwischen Parteien verhandelt (oft über Makler), bietet mehr Flexibilität als Börsenhandel, aber mit Kontrahentenrisiko.'
    },
    topic: 'trading',
    difficulty: 'medium'
  },
  {
    id: 'q77',
    question: { en: 'What is shape risk in energy trading?', de: 'Was ist Profilrisiko im Energiehandel?' },
    options: {
      en: ['The risk that actual consumption pattern differs from hedged flat volumes', 'Risk of physical damage to trading systems', 'The shape of price curves', 'A regulatory compliance risk'],
      de: ['Das Risiko, dass das tatsächliche Verbrauchsprofil von abgesicherten Flachmengen abweicht', 'Risiko physischer Schäden an Handelssystemen', 'Die Form von Preiskurven', 'Ein regulatorisches Compliance-Risiko']
    },
    correctIndex: 0,
    explanation: {
      en: 'Shape risk arises because futures hedge flat (baseload) volumes, but real consumption varies hourly. The difference must be managed in short-term markets.',
      de: 'Profilrisiko entsteht, weil Futures flache (Grundlast-) Mengen absichern, aber der reale Verbrauch stündlich variiert. Die Differenz muss in kurzfristigen Märkten gemanagt werden.'
    },
    topic: 'trading',
    difficulty: 'hard'
  },
  {
    id: 'q78',
    question: { en: 'What is flow-based market coupling?', de: 'Was ist flussbasierte Marktkopplung?' },
    options: {
      en: ['A method allocating cross-border capacity based on actual power flows', 'Trading based on river hydropower', 'A gas pipeline capacity system', 'A retail billing method'],
      de: ['Eine Methode zur Zuweisung grenzüberschreitender Kapazitäten basierend auf tatsächlichen Stromflüssen', 'Handel basierend auf Flusswasserkraft', 'Ein Gaspipeline-Kapazitätssystem', 'Eine Endkundenabrechnungsmethode']
    },
    correctIndex: 0,
    explanation: {
      en: 'Flow-based market coupling optimizes cross-border trade by considering actual physical flows through the grid, replacing simpler NTC-based methods in Central-Western Europe.',
      de: 'Flussbasierte Marktkopplung optimiert den grenzüberschreitenden Handel durch Berücksichtigung tatsächlicher physischer Flüsse im Netz und ersetzt einfachere NTC-basierte Methoden in Zentralwesteuropa.'
    },
    topic: 'trading',
    difficulty: 'hard'
  },
  {
    id: 'q79',
    question: { en: 'What is a forward curve in energy trading?', de: 'Was ist eine Forward-Kurve im Energiehandel?' },
    options: {
      en: ['A graph showing expected future prices for different delivery periods', 'A chart of historical prices', 'A production forecast curve', 'A demand growth projection'],
      de: ['Ein Graph, der erwartete zukünftige Preise für verschiedene Lieferzeiträume zeigt', 'Ein Diagramm historischer Preise', 'Eine Produktionsprognosekurve', 'Eine Nachfragewachstumsprojektion']
    },
    correctIndex: 0,
    explanation: {
      en: 'The forward curve plots prices for future delivery periods (months, quarters, years ahead), reflecting market expectations and serving as the basis for hedging strategies.',
      de: 'Die Forward-Kurve zeigt Preise für zukünftige Lieferzeiträume (Monate, Quartale, Jahre voraus) und spiegelt Markterwartungen wider, als Basis für Absicherungsstrategien.'
    },
    topic: 'trading',
    difficulty: 'medium'
  },
  {
    id: 'q80',
    question: { en: 'What is a collar strategy in energy hedging?', de: 'Was ist eine Collar-Strategie in der Energieabsicherung?' },
    options: {
      en: ['Buying a price cap and selling a price floor to limit price range', 'A fixed-price contract', 'A short-term trading method', 'An insurance policy for grid failures'],
      de: ['Kauf einer Preisobergrenze und Verkauf einer Preisuntergrenze zur Begrenzung der Preisspanne', 'Ein Festpreisvertrag', 'Eine kurzfristige Handelsmethode', 'Eine Versicherung für Netzausfälle']
    },
    correctIndex: 0,
    explanation: {
      en: 'A collar combines buying a cap (maximum price) and selling a floor (minimum price), creating a price corridor. The floor premium offsets some cap cost.',
      de: 'Ein Collar kombiniert den Kauf eines Caps (Höchstpreis) mit dem Verkauf eines Floors (Mindestpreis) und schafft einen Preiskorridor. Die Floor-Prämie gleicht einen Teil der Cap-Kosten aus.'
    },
    topic: 'trading',
    difficulty: 'hard'
  },
  {
    id: 'q81',
    question: { en: 'What is the role of an energy portfolio manager?', de: 'Was ist die Rolle eines Energieportfoliomanagers?' },
    options: {
      en: ['Optimizing procurement, hedging, and risk across an energy portfolio', 'Managing power plant operations', 'Setting retail electricity prices', 'Building renewable energy projects'],
      de: ['Optimierung von Beschaffung, Absicherung und Risiko in einem Energieportfolio', 'Management von Kraftwerksbetrieb', 'Festlegung von Stromendkundenpreisen', 'Bau von Erneuerbare-Energien-Projekten']
    },
    correctIndex: 0,
    explanation: {
      en: 'Portfolio managers balance procurement timing, hedging ratios, and market exposure to optimize costs while managing volumetric, price, and shape risks.',
      de: 'Portfoliomanager balancieren Beschaffungszeitpunkt, Absicherungsquoten und Marktexposure, um Kosten zu optimieren und gleichzeitig Mengen-, Preis- und Profilrisiken zu managen.'
    },
    topic: 'trading',
    difficulty: 'medium'
  },
  {
    id: 'q82',
    question: { en: 'What is the balancing energy imbalance price?', de: 'Was ist der Ausgleichsenergiepreis?' },
    options: {
      en: ['The price charged for deviations from scheduled energy in a balancing group', 'The cost of building new plants', 'The average wholesale price', 'A network usage fee'],
      de: ['Der Preis für Abweichungen von geplanter Energie in einem Bilanzkreis', 'Die Kosten für den Bau neuer Anlagen', 'Der durchschnittliche Großhandelspreis', 'Eine Netznutzungsgebühr']
    },
    correctIndex: 0,
    explanation: {
      en: 'When a balancing group is short or long on energy, the imbalance is settled at the balancing energy price, which can be very high during system stress, incentivizing accurate scheduling.',
      de: 'Wenn ein Bilanzkreis zu wenig oder zu viel Energie hat, wird die Abweichung zum Ausgleichsenergiepreis abgerechnet, der bei Systemstress sehr hoch sein kann, was genaue Fahrplanplanung fördert.'
    },
    topic: 'trading',
    difficulty: 'hard'
  },
  {
    id: 'q83',
    question: { en: 'What is a swap contract in energy trading?', de: 'Was ist ein Swap-Vertrag im Energiehandel?' },
    options: {
      en: ['An agreement to exchange a floating price for a fixed price', 'Trading physical delivery locations', 'Swapping between gas and electricity', 'An employee exchange program'],
      de: ['Eine Vereinbarung zum Tausch eines variablen Preises gegen einen festen Preis', 'Handel mit physischen Lieferorten', 'Wechsel zwischen Gas und Strom', 'Ein Mitarbeiteraustauschprogramm']
    },
    correctIndex: 0,
    explanation: {
      en: 'Energy swaps allow parties to exchange floating (spot) prices for fixed prices, providing price certainty without physical delivery.',
      de: 'Energie-Swaps ermöglichen es Parteien, variable (Spot-) Preise gegen feste Preise zu tauschen und bieten Preissicherheit ohne physische Lieferung.'
    },
    topic: 'trading',
    difficulty: 'medium'
  },
  {
    id: 'q84',
    question: { en: 'What is mark-to-market valuation?', de: 'Was ist Mark-to-Market-Bewertung?' },
    options: {
      en: ['Valuing open positions based on current market prices', 'Marketing energy products', 'Setting target prices for sales', 'Evaluating employee performance'],
      de: ['Bewertung offener Positionen basierend auf aktuellen Marktpreisen', 'Marketing von Energieprodukten', 'Festlegung von Zielpreisen für Verkäufe', 'Bewertung der Mitarbeiterleistung']
    },
    correctIndex: 0,
    explanation: {
      en: 'Mark-to-market shows the unrealized profit/loss of hedging positions by comparing the contract price to current market price, crucial for risk management.',
      de: 'Mark-to-Market zeigt den unrealisierten Gewinn/Verlust von Absicherungspositionen durch Vergleich des Vertragspreises mit dem aktuellen Marktpreis, entscheidend für das Risikomanagement.'
    },
    topic: 'trading',
    difficulty: 'hard'
  },
  {
    id: 'q85',
    question: { en: 'What is the difference between physical and financial trading?', de: 'Was ist der Unterschied zwischen physischem und finanziellem Handel?' },
    options: {
      en: ['Physical involves actual delivery; financial settles in cash based on price differences', 'There is no difference', 'Physical is always cheaper', 'Financial trading is illegal'],
      de: ['Physisch beinhaltet tatsächliche Lieferung; finanziell wird in bar basierend auf Preisdifferenzen abgerechnet', 'Es gibt keinen Unterschied', 'Physischer Handel ist immer günstiger', 'Finanzieller Handel ist illegal']
    },
    correctIndex: 0,
    explanation: {
      en: 'Physical trading results in actual electricity delivery, requiring grid access. Financial trading settles in cash based on price differences, used for hedging without physical logistics.',
      de: 'Physischer Handel resultiert in tatsächlicher Stromlieferung und erfordert Netzzugang. Finanzieller Handel wird in bar basierend auf Preisdifferenzen abgerechnet, zur Absicherung ohne physische Logistik.'
    },
    topic: 'trading',
    difficulty: 'medium'
  },
  // === NEW QUESTIONS: Retail & Customer (q86-q95) ===
  {
    id: 'q86',
    question: { en: 'What is a dynamic electricity tariff?', de: 'Was ist ein dynamischer Stromtarif?' },
    options: {
      en: ['A tariff where the price changes based on wholesale market prices', 'A fixed-rate contract', 'A government-regulated price', 'A prepaid electricity plan'],
      de: ['Ein Tarif, bei dem sich der Preis basierend auf Großhandelsmarktpreisen ändert', 'Ein Festpreisvertrag', 'Ein staatlich regulierter Preis', 'Ein Prepaid-Stromtarif']
    },
    correctIndex: 0,
    explanation: {
      en: 'Dynamic tariffs pass wholesale price signals to consumers, incentivizing consumption when electricity is cheap (high renewable output) and reducing it when expensive.',
      de: 'Dynamische Tarife geben Großhandelspreissignale an Verbraucher weiter und fördern den Verbrauch bei günstigem Strom (hohe erneuerbare Erzeugung) und reduzieren ihn bei teurem.'
    },
    topic: 'retail',
    difficulty: 'easy'
  },
  {
    id: 'q87',
    question: { en: 'What is white-label energy?', de: 'Was ist White-Label-Energie?' },
    options: {
      en: ['Energy products sold under another company\'s brand', 'Certified green electricity', 'Nuclear power', 'Government-subsidized energy'],
      de: ['Energieprodukte, die unter der Marke eines anderen Unternehmens verkauft werden', 'Zertifizierter Grünstrom', 'Kernkraft', 'Staatlich subventionierte Energie']
    },
    correctIndex: 0,
    explanation: {
      en: 'White-label energy lets non-energy companies (banks, telecoms) offer electricity/gas under their brand, with an energy company handling supply and billing behind the scenes.',
      de: 'White-Label-Energie ermöglicht es Nicht-Energieunternehmen (Banken, Telekoms), Strom/Gas unter ihrer Marke anzubieten, während ein Energieunternehmen Versorgung und Abrechnung im Hintergrund übernimmt.'
    },
    topic: 'retail',
    difficulty: 'medium'
  },
  {
    id: 'q88',
    question: { en: 'What are the main components of a residential electricity bill in Germany?', de: 'Was sind die Hauptbestandteile einer Haushaltsstromrechnung in Deutschland?' },
    options: {
      en: ['Wholesale costs, grid fees, taxes/levies, and supplier margin', 'Only the electricity price', 'Grid fees and taxes only', 'A flat monthly fee'],
      de: ['Großhandelskosten, Netzentgelte, Steuern/Abgaben und Lieferantenmarge', 'Nur der Strompreis', 'Nur Netzentgelte und Steuern', 'Eine pauschale Monatsgebühr']
    },
    correctIndex: 0,
    explanation: {
      en: 'German residential bills include wholesale costs (25-35%), grid fees (20-25%), taxes and levies (25-30%), and supplier margin (3-5%), making it among Europe\'s most expensive.',
      de: 'Deutsche Haushaltsrechnungen umfassen Großhandelskosten (25-35%), Netzentgelte (20-25%), Steuern und Abgaben (25-30%) und Lieferantenmarge (3-5%), was ihn zu einem der teuersten in Europa macht.'
    },
    topic: 'retail',
    difficulty: 'medium'
  },
  {
    id: 'q89',
    question: { en: 'What is demand-side management (DSM)?', de: 'Was ist Demand-Side-Management (DSM)?' },
    options: {
      en: ['Programs to modify consumer demand through incentives and technology', 'Managing supply from power plants', 'A marketing strategy for utilities', 'Grid maintenance scheduling'],
      de: ['Programme zur Änderung der Verbrauchernachfrage durch Anreize und Technologie', 'Steuerung des Angebots von Kraftwerken', 'Eine Marketingstrategie für Versorger', 'Netzwartungsplanung']
    },
    correctIndex: 0,
    explanation: {
      en: 'DSM encompasses load shifting, peak reduction, and efficiency programs. Smart home devices and EV chargers can automatically respond to price signals or grid needs.',
      de: 'DSM umfasst Lastverschiebung, Spitzenlastreduktion und Effizienzprogramme. Smart-Home-Geräte und E-Auto-Ladestationen können automatisch auf Preissignale oder Netzbedürfnisse reagieren.'
    },
    topic: 'retail',
    difficulty: 'medium'
  },
  {
    id: 'q90',
    question: { en: 'What is the switching rate in energy retail?', de: 'Was ist die Wechselquote im Energievertrieb?' },
    options: {
      en: ['The percentage of customers changing energy suppliers per year', 'The rate at which power plants switch fuels', 'The speed of meter installation', 'A voltage conversion metric'],
      de: ['Der Prozentsatz der Kunden, die jährlich den Energieanbieter wechseln', 'Die Rate, mit der Kraftwerke Brennstoffe wechseln', 'Die Geschwindigkeit der Zählerinstallation', 'Eine Spannungsumwandlungsmetrik']
    },
    correctIndex: 0,
    explanation: {
      en: 'Germany\'s switching rate is around 10-15% annually. Higher switching rates indicate competitive markets. Price comparison portals and energy apps have increased switching activity.',
      de: 'Deutschlands Wechselquote liegt bei etwa 10-15% jährlich. Höhere Wechselquoten zeigen wettbewerbliche Märkte an. Preisvergleichsportale und Energie-Apps haben die Wechselaktivität erhöht.'
    },
    topic: 'retail',
    difficulty: 'easy'
  },
  {
    id: 'q91',
    question: { en: 'What is peer-to-peer (P2P) energy trading?', de: 'Was ist Peer-to-Peer (P2P) Energiehandel?' },
    options: {
      en: ['Direct energy trading between consumers/prosumers without a utility', 'Trading between power plants', 'International energy trade', 'A government energy program'],
      de: ['Direkter Energiehandel zwischen Verbrauchern/Prosumern ohne Versorger', 'Handel zwischen Kraftwerken', 'Internationaler Energiehandel', 'Ein staatliches Energieprogramm']
    },
    correctIndex: 0,
    explanation: {
      en: 'P2P trading enables prosumers to sell excess solar generation directly to neighbors, often using blockchain or smart contracts. It\'s still emerging but enabled by EU regulations.',
      de: 'P2P-Handel ermöglicht Prosumern, überschüssige Solarproduktion direkt an Nachbarn zu verkaufen, oft mit Blockchain oder Smart Contracts. Es ist noch im Entstehen, aber durch EU-Regulierungen ermöglicht.'
    },
    topic: 'retail',
    difficulty: 'hard'
  },
  {
    id: 'q92',
    question: { en: 'What is tenant electricity (Mieterstrom)?', de: 'Was ist Mieterstrom?' },
    options: {
      en: ['Solar power from the roof supplied directly to tenants in the building', 'Electricity used for heating rental properties', 'A special tariff for renters', 'Power generated in the basement'],
      de: ['Solarstrom vom Dach, der direkt an Mieter im Gebäude geliefert wird', 'Strom zum Heizen von Mietobjekten', 'Ein spezieller Tarif für Mieter', 'Im Keller erzeugter Strom']
    },
    correctIndex: 0,
    explanation: {
      en: 'Mieterstrom lets landlords install solar on rooftops and sell cheap electricity directly to tenants, supported by German legislation since 2017.',
      de: 'Mieterstrom ermöglicht Vermietern, Solar auf Dächern zu installieren und günstigen Strom direkt an Mieter zu verkaufen, unterstützt durch deutsche Gesetzgebung seit 2017.'
    },
    topic: 'retail',
    difficulty: 'medium'
  },
  {
    id: 'q93',
    question: { en: 'What is an energy management system (EMS)?', de: 'Was ist ein Energiemanagementsystem (EMS)?' },
    options: {
      en: ['Software/hardware to monitor and optimize energy consumption', 'An emergency power system', 'An electricity metering standard', 'A utility billing platform'],
      de: ['Software/Hardware zur Überwachung und Optimierung des Energieverbrauchs', 'Ein Notstromsystem', 'Ein Stromzählerstandard', 'Eine Versorgungsabrechnungsplattform']
    },
    correctIndex: 0,
    explanation: {
      en: 'EMS platforms help businesses and homes optimize energy use, integrate solar + storage, manage EV charging, and reduce costs through automated load management.',
      de: 'EMS-Plattformen helfen Unternehmen und Haushalten, den Energieverbrauch zu optimieren, Solar + Speicher zu integrieren, E-Auto-Laden zu managen und Kosten durch automatisiertes Lastmanagement zu senken.'
    },
    topic: 'retail',
    difficulty: 'easy'
  },
  {
    id: 'q94',
    question: { en: 'How do heat pumps impact the electricity grid?', de: 'Wie beeinflussen Wärmepumpen das Stromnetz?' },
    options: {
      en: ['They increase electricity demand but can provide grid flexibility if smartly controlled', 'They have no impact on the grid', 'They reduce electricity demand', 'They only work off-grid'],
      de: ['Sie erhöhen die Stromnachfrage, können aber bei intelligenter Steuerung Netzflexibilität bieten', 'Sie haben keinen Einfluss auf das Netz', 'Sie reduzieren die Stromnachfrage', 'Sie funktionieren nur netzunabhängig']
    },
    correctIndex: 0,
    explanation: {
      en: 'Heat pumps shift heating from gas to electricity, raising demand. But smart heat pumps with thermal storage can shift load to low-price hours, providing valuable grid flexibility.',
      de: 'Wärmepumpen verlagern die Heizung von Gas auf Strom und erhöhen die Nachfrage. Smarte Wärmepumpen mit Wärmespeicher können Last in Niedrigpreisstunden verschieben und wertvolle Netzflexibilität bieten.'
    },
    topic: 'retail',
    difficulty: 'medium'
  },
  {
    id: 'q95',
    question: { en: 'What is a corporate PPA?', de: 'Was ist ein Corporate PPA?' },
    options: {
      en: ['A long-term renewable energy contract between a generator and a corporate buyer', 'A corporate governance standard', 'A power plant acquisition', 'A public procurement auction'],
      de: ['Ein langfristiger Erneuerbare-Energien-Vertrag zwischen einem Erzeuger und einem Unternehmenskäufer', 'Ein Corporate-Governance-Standard', 'Ein Kraftwerkserwerb', 'Eine öffentliche Beschaffungsauktion']
    },
    correctIndex: 0,
    explanation: {
      en: 'Corporate PPAs let companies like Google, Amazon, or BASF directly contract renewable energy for 10-20 years, securing green power and price certainty.',
      de: 'Corporate PPAs ermöglichen es Unternehmen wie Google, Amazon oder BASF, erneuerbare Energie direkt für 10-20 Jahre zu kontrahieren und Grünstrom sowie Preissicherheit zu sichern.'
    },
    topic: 'retail',
    difficulty: 'hard'
  },
];


export const achievements: Achievement[] = [
  {
    id: 'welcome',
    name: { en: 'Welcome!', de: 'Willkommen!' },
    description: { en: 'Join the learning journey', de: 'Starte deine Lernreise' },
    icon: '👋',
    unlocked: false
  },
  {
    id: 'first-quiz',
    name: { en: 'First Steps', de: 'Erste Schritte' },
    description: { en: 'Complete your first quiz', de: 'Schließe dein erstes Quiz ab' },
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'streak-3',
    name: { en: '3-Day Streak', de: '3-Tage-Serie' },
    description: { en: 'Learn 3 days in a row', de: 'Lerne 3 Tage hintereinander' },
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'market-basics',
    name: { en: 'Market Basics Master', de: 'Marktgrundlagen-Meister' },
    description: { en: 'Score 100% on basics quiz', de: 'Erreiche 100% im Grundlagen-Quiz' },
    icon: '📊',
    unlocked: false
  },
  {
    id: 'quiz-champion',
    name: { en: 'Quiz Champion', de: 'Quiz-Champion' },
    description: { en: 'Complete 10 quizzes', de: 'Schließe 10 Quizze ab' },
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'curious-mind',
    name: { en: 'Curious Mind', de: 'Wissbegieriger Geist' },
    description: { en: 'Ask the agent 5 questions', de: 'Stelle dem Agenten 5 Fragen' },
    icon: '🧠',
    unlocked: false
  },
  {
    id: 'level-up',
    name: { en: 'Level Up!', de: 'Level Up!' },
    description: { en: 'Reach Intermediate level', de: 'Erreiche Fortgeschrittenen-Level' },
    icon: '⬆️',
    unlocked: false
  },
  {
    id: 'streak-7',
    name: { en: 'Week Warrior', de: 'Wochen-Krieger' },
    description: { en: 'Learn 7 days in a row', de: 'Lerne 7 Tage hintereinander' },
    icon: '💪',
    unlocked: false
  },
  {
    id: 'perfect-score',
    name: { en: 'Perfect Score', de: 'Perfekte Punktzahl' },
    description: { en: 'Get all questions right in a quiz', de: 'Beantworte alle Fragen in einem Quiz richtig' },
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'streak-14',
    name: { en: 'Two-Week Champion', de: 'Zwei-Wochen-Champion' },
    description: { en: 'Learn 14 days in a row', de: 'Lerne 14 Tage hintereinander' },
    icon: '🏅',
    unlocked: false
  },
  {
    id: 'streak-30',
    name: { en: 'Monthly Master', de: 'Monats-Meister' },
    description: { en: 'Learn 30 days in a row', de: 'Lerne 30 Tage hintereinander' },
    icon: '👑',
    unlocked: false
  },
  {
    id: 'xp-1000',
    name: { en: 'Rising Star', de: 'Aufsteigender Stern' },
    description: { en: 'Earn 1,000 XP', de: 'Verdiene 1.000 XP' },
    icon: '🌟',
    unlocked: false
  },
  {
    id: 'xp-5000',
    name: { en: 'Energy Guru', de: 'Energie-Guru' },
    description: { en: 'Earn 5,000 XP', de: 'Verdiene 5.000 XP' },
    icon: '🔮',
    unlocked: false
  },
  {
    id: 'quiz-25',
    name: { en: 'Quiz Enthusiast', de: 'Quiz-Enthusiast' },
    description: { en: 'Complete 25 quizzes', de: 'Schließe 25 Quizze ab' },
    icon: '📚',
    unlocked: false
  },
  {
    id: 'quiz-50',
    name: { en: 'Quiz Legend', de: 'Quiz-Legende' },
    description: { en: 'Complete 50 quizzes', de: 'Schließe 50 Quizze ab' },
    icon: '🎖️',
    unlocked: false
  },
  {
    id: 'duel-win',
    name: { en: 'Duel Victor', de: 'Duell-Sieger' },
    description: { en: 'Win a quiz duel', de: 'Gewinne ein Quiz-Duell' },
    icon: '⚔️',
    unlocked: false
  },
  {
    id: 'topic-master',
    name: { en: 'Topic Master', de: 'Themen-Meister' },
    description: { en: '90%+ accuracy on 10+ questions in any topic', de: '90%+ Genauigkeit bei 10+ Fragen in einem Thema' },
    icon: '🎓',
    unlocked: false
  },
];

