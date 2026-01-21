import { DailyNugget, QuizQuestion, LeaderboardUser, Achievement, Topic } from '@/types';

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
];

export const mockLeaderboard: LeaderboardUser[] = [
  { rank: 1, name: 'Leo Birnbaum', xp: 4850, level: 'expert', avatar: '👨‍💼', streak: 45 },
  { rank: 2, name: 'Victoria Ossadnik', xp: 4320, level: 'expert', avatar: '👩‍💻', streak: 32 },
  { rank: 3, name: 'Thomas König', xp: 3890, level: 'advanced', avatar: '👨‍🔬', streak: 28 },
  { rank: 4, name: 'Sabine Trundle', xp: 3450, level: 'advanced', avatar: '👩‍🏫', streak: 21 },
  { rank: 5, name: 'Chris D\'arcy', xp: 3120, level: 'advanced', avatar: '👨‍⚕️', streak: 19 },
  { rank: 6, name: 'Michael Braun', xp: 2780, level: 'intermediate', avatar: '👨‍🔧', streak: 15 },
  { rank: 7, name: 'Julia Wagner', xp: 2340, level: 'intermediate', avatar: '👩‍🎓', streak: 12 },
  { rank: 8, name: 'Anna Becker', xp: 1980, level: 'intermediate', avatar: '👩‍💼', streak: 9 },
  { rank: 9, name: 'Laura Hoffmann', xp: 1650, level: 'beginner', avatar: '👩‍🏭', streak: 7 },
  { rank: 10, name: 'Stefan Koch', xp: 1420, level: 'beginner', avatar: '👨‍🎨', streak: 5 },
];

export const achievements: Achievement[] = [
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
];

export const mockAIResponses: Record<string, { en: string; de: string }> = {
  default: {
    en: "I'm here to help you understand energy markets! Feel free to ask me about power pricing, renewables, trading, or any other energy topic.",
    de: "Ich bin hier, um Ihnen zu helfen, Energiemärkte zu verstehen! Fragen Sie mich gerne zu Strompreisen, Erneuerbaren, Handel oder anderen Energiethemen."
  },
  price: {
    en: "Power prices in Europe are influenced by several key factors:\n\n**1. Fuel Costs:** Gas prices are particularly important as gas-fired plants often set the marginal price.\n\n**2. Carbon Prices:** EU ETS allowances add to the cost of fossil fuel generation.\n\n**3. Renewable Output:** High wind/solar pushes prices down; low renewable generation pushes prices up.\n\n**4. Demand Patterns:** Prices typically peak during morning and evening hours.\n\n**5. Interconnector Flows:** Cross-border trading affects local prices.",
    de: "Strompreise in Europa werden von mehreren Schlüsselfaktoren beeinflusst:\n\n**1. Brennstoffkosten:** Gaspreise sind besonders wichtig, da Gaskraftwerke oft den Grenzpreis setzen.\n\n**2. CO2-Preise:** EU-ETS-Zertifikate erhöhen die Kosten fossiler Erzeugung.\n\n**3. Erneuerbare Erzeugung:** Hohe Wind-/Solarerzeugung drückt Preise; niedrige treibt sie hoch.\n\n**4. Nachfragemuster:** Preise steigen typischerweise morgens und abends.\n\n**5. Grenzüberschreitende Flüsse:** Internationaler Handel beeinflusst lokale Preise."
  },
  renewables: {
    en: "Renewable energy integration is reshaping electricity markets:\n\n**Variable Generation:** Wind and solar output depends on weather, creating volatility.\n\n**Zero Marginal Cost:** Renewables bid at €0, displacing fossil plants in merit order.\n\n**Negative Prices:** Occur when high renewable output exceeds demand.\n\n**Flexibility Needs:** Storage, demand response, and flexible generation become crucial.\n\n**Grid Challenges:** Variable flows require grid upgrades and smart management.",
    de: "Die Integration erneuerbarer Energien verändert Strommärkte:\n\n**Variable Erzeugung:** Wind- und Solarproduktion hängt vom Wetter ab und erzeugt Volatilität.\n\n**Null Grenzkosten:** Erneuerbare bieten zu 0€, verdrängen fossile Anlagen in der Merit Order.\n\n**Negative Preise:** Treten auf, wenn hohe erneuerbare Erzeugung die Nachfrage übersteigt.\n\n**Flexibilitätsbedarf:** Speicher, Lastmanagement und flexible Erzeugung werden entscheidend.\n\n**Netzherausforderungen:** Variable Flüsse erfordern Netzausbau und intelligentes Management."
  },
  grid: {
    en: "The power grid is a complex system requiring constant balance:\n\n**TSOs vs DSOs:** TSOs manage high-voltage transmission; DSOs handle distribution.\n\n**Frequency Control:** Grid must stay at 50Hz; reserves correct deviations.\n\n**Congestion Management:** Redispatch adjusts plant output when lines are full.\n\n**Grid Fees:** Cover infrastructure costs, represent ~25% of retail prices.\n\n**Smart Grids:** Digitalization enables better forecasting and real-time control.",
    de: "Das Stromnetz ist ein komplexes System, das ständige Balance erfordert:\n\n**ÜNB vs VNB:** ÜNB betreiben Hochspannungsübertragung; VNB die Verteilung.\n\n**Frequenzregelung:** Netz muss bei 50Hz bleiben; Reserven korrigieren Abweichungen.\n\n**Engpassmanagement:** Redispatch passt Kraftwerksleistung an, wenn Leitungen voll sind.\n\n**Netzentgelte:** Decken Infrastrukturkosten, machen ~25% der Endkundenpreise aus.\n\n**Smart Grids:** Digitalisierung ermöglicht bessere Prognosen und Echtzeitsteuerung."
  },
  trading: {
    en: "Energy trading occurs across multiple timeframes:\n\n**Futures Markets:** Trade years ahead for hedging and price discovery.\n\n**Day-Ahead Market:** Auction for next-day delivery, closes at noon.\n\n**Intraday Market:** Continuous trading until close to delivery.\n\n**Balancing Market:** TSO activates reserves for real-time balance.\n\n**Key Products:** Base (24/7), Peak (8am-8pm), and hourly products.",
    de: "Energiehandel findet über mehrere Zeithorizonte statt:\n\n**Terminmärkte:** Handel Jahre voraus für Absicherung und Preisfindung.\n\n**Day-Ahead-Markt:** Auktion für Lieferung am nächsten Tag, schließt mittags.\n\n**Intraday-Markt:** Kontinuierlicher Handel bis kurz vor Lieferung.\n\n**Regelenergiemarkt:** ÜNB aktiviert Reserven für Echtzeitbilanz.\n\n**Schlüsselprodukte:** Base (24/7), Peak (8-20 Uhr) und Stundenprodukte."
  }
};
