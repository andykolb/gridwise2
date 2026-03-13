import { Topic, DailyNugget, QuizQuestion, LeaderboardUser, Achievement } from '@/types';

interface TopicInfo {
  id: Topic;
  label: { en: string; de: string };
  icon: string;
}

export const topics: TopicInfo[] = [
  { id: 'energy-basics', label: { en: 'Energy Markets Basics', de: 'Energiemarkt-Grundlagen' }, icon: '⚡' },
  { id: 'price-drivers', label: { en: 'Power Price Drivers', de: 'Strompreistreiber' }, icon: '📊' },
  { id: 'renewables', label: { en: 'Renewables & Flexibility', de: 'Erneuerbare & Flexibilität' }, icon: '🌱' },
  { id: 'grid-dso', label: { en: 'Grid / DSOs', de: 'Netz / Verteilnetzbetreiber' }, icon: '🔌' },
  { id: 'regulation', label: { en: 'Regulation & Policy', de: 'Regulierung & Politik' }, icon: '📜' },
  { id: 'trading', label: { en: 'Trading & Hedging', de: 'Handel & Absicherung' }, icon: '📈' },
  { id: 'retail', label: { en: 'Customer & Retail Energy', de: 'Kunden & Energievertrieb' }, icon: '🏠' },
];

export const dailyNuggets: DailyNugget[] = [
  {
    id: 'nugget-1',
    title: { en: 'Power Price Drivers', de: 'Strompreistreiber' },
    content: {
      en: 'German power prices are primarily driven by fuel costs (especially gas), CO2 prices, renewable generation, and demand patterns. The interplay of these factors creates the wholesale price.',
      de: 'Deutsche Strompreise werden hauptsächlich durch Brennstoffkosten (insbesondere Gas), CO2-Preise, erneuerbare Erzeugung und Nachfragemuster bestimmt.'
    },
    learnMore: {
      en: 'The merit order principle determines which power plants set the price. Plants are stacked from cheapest to most expensive marginal cost. The last plant needed to meet demand sets the market clearing price for all generators.',
      de: 'Das Merit-Order-Prinzip bestimmt, welche Kraftwerke den Preis setzen. Kraftwerke werden von den günstigsten zu den teuersten Grenzkosten gestapelt. Das letzte Kraftwerk, das zur Deckung der Nachfrage benötigt wird, setzt den Markträumungspreis.'
    },
    topic: 'price-drivers',
  },
  {
    id: 'nugget-2',
    title: { en: 'The Merit Order', de: 'Die Merit Order' },
    content: {
      en: 'The merit order ranks power plants by their marginal cost of production. Renewables (near-zero marginal cost) are dispatched first, followed by nuclear, coal, and gas plants.',
      de: 'Die Merit Order ordnet Kraftwerke nach ihren Grenzkosten der Produktion. Erneuerbare (nahezu null Grenzkosten) werden zuerst eingesetzt, gefolgt von Kernkraft, Kohle und Gaskraftwerken.'
    },
    learnMore: {
      en: 'When renewable generation is high, expensive gas plants are pushed out of the merit order, lowering wholesale prices. This is called the "merit order effect" of renewables and is a key factor in the energy transition.',
      de: 'Wenn die erneuerbare Erzeugung hoch ist, werden teure Gaskraftwerke aus der Merit Order verdrängt, was die Großhandelspreise senkt. Dies wird als "Merit-Order-Effekt" der Erneuerbaren bezeichnet.'
    },
    topic: 'energy-basics',
  },
  {
    id: 'nugget-3',
    title: { en: 'Spot vs. Futures Markets', de: 'Spot- vs. Terminmärkte' },
    content: {
      en: 'The day-ahead spot market (EPEX SPOT) trades power for delivery the next day. Futures markets (EEX) allow hedging months or years ahead, providing price certainty for producers and consumers.',
      de: 'Der Day-Ahead-Spotmarkt (EPEX SPOT) handelt Strom für die Lieferung am nächsten Tag. Terminmärkte (EEX) ermöglichen Absicherung Monate oder Jahre im Voraus.'
    },
    learnMore: {
      en: 'The intraday market allows trading up to 5 minutes before delivery, helping balance short-term forecast errors. This market has become increasingly important with growing renewable penetration.',
      de: 'Der Intraday-Markt ermöglicht den Handel bis 5 Minuten vor Lieferung und hilft, kurzfristige Prognosefehler auszugleichen. Dieser Markt hat mit zunehmender erneuerbarer Durchdringung an Bedeutung gewonnen.'
    },
    topic: 'trading',
  },
  {
    id: 'nugget-4',
    title: { en: 'Balancing Energy', de: 'Regelenergie' },
    content: {
      en: 'TSOs use balancing energy to maintain grid frequency at 50 Hz. Three types exist: FCR (seconds), aFRR (minutes), and mFRR (15 minutes), each progressively slower but with larger capacity.',
      de: 'ÜNBs nutzen Regelenergie, um die Netzfrequenz bei 50 Hz zu halten. Drei Arten: FCR (Sekunden), aFRR (Minuten) und mFRR (15 Minuten).'
    },
    learnMore: {
      en: 'Germany has four TSOs: 50Hertz, Amprion, TenneT, and TransnetBW. They cooperate to procure balancing reserves through a common platform called PICASSO (aFRR) and MARI (mFRR).',
      de: 'Deutschland hat vier ÜNBs: 50Hertz, Amprion, TenneT und TransnetBW. Sie kooperieren bei der Beschaffung von Regelreserven über die gemeinsamen Plattformen PICASSO (aFRR) und MARI (mFRR).'
    },
    topic: 'grid-dso',
  },
  {
    id: 'nugget-5',
    title: { en: 'DSO Operations', de: 'Verteilnetzbetrieb' },
    content: {
      en: 'Distribution System Operators (DSOs) manage the local grid (below 110 kV). In Germany, about 870 DSOs operate distribution networks, delivering power to end consumers.',
      de: 'Verteilnetzbetreiber (VNB) verwalten das lokale Netz (unter 110 kV). In Deutschland betreiben etwa 870 VNBs Verteilnetze und liefern Strom an Endverbraucher.'
    },
    learnMore: {
      en: 'DSOs face growing challenges from distributed generation (rooftop solar, batteries) and new loads (EVs, heat pumps). Smart grid technologies and flexibility markets help manage these bidirectional power flows.',
      de: 'VNBs stehen vor wachsenden Herausforderungen durch dezentrale Erzeugung (Dach-Solar, Batterien) und neue Lasten (EVs, Wärmepumpen). Smart-Grid-Technologien und Flexibilitätsmärkte helfen bei der Bewältigung.'
    },
    topic: 'grid-dso',
  },
  {
    id: 'nugget-6',
    title: { en: 'Gas-to-Power Link', de: 'Gas-Strom-Verbindung' },
    content: {
      en: 'Natural gas prices directly impact electricity prices because gas-fired power plants often set the marginal price in the merit order. The TTF hub in the Netherlands is the key European gas benchmark.',
      de: 'Erdgaspreise beeinflussen direkt Strompreise, da Gaskraftwerke oft den Grenzpreis in der Merit Order setzen. Der TTF-Hub in den Niederlanden ist die wichtigste europäische Gas-Benchmark.'
    },
    learnMore: {
      en: 'The 2022 energy crisis demonstrated this link dramatically: when Russian gas supplies were curtailed, TTF prices spiked to over €300/MWh, pushing power prices above €500/MWh in some hours.',
      de: 'Die Energiekrise 2022 zeigte diesen Zusammenhang dramatisch: Als russische Gaslieferungen reduziert wurden, stiegen TTF-Preise auf über 300€/MWh und Strompreise in einigen Stunden auf über 500€/MWh.'
    },
    topic: 'price-drivers',
  },
  {
    id: 'nugget-7',
    title: { en: 'Redispatch', de: 'Redispatch' },
    content: {
      en: 'When grid congestion occurs, TSOs order redispatch: increasing generation on one side of a bottleneck and decreasing it on the other. Redispatch 2.0 now includes renewable plants and costs billions annually.',
      de: 'Bei Netzengpässen ordnen ÜNBs Redispatch an: Erhöhung der Erzeugung auf einer Seite eines Engpasses und Verringerung auf der anderen. Redispatch 2.0 umfasst jetzt auch erneuerbare Anlagen.'
    },
    learnMore: {
      en: 'Redispatch costs in Germany exceeded €4 billion in 2022. The north-south congestion is a major issue, as wind power is concentrated in the north while demand centers are in the south.',
      de: 'Redispatch-Kosten in Deutschland überstiegen 2022 4 Milliarden Euro. Die Nord-Süd-Engpässe sind ein Hauptproblem, da Windkraft im Norden konzentriert ist, während Verbrauchszentren im Süden liegen.'
    },
    topic: 'grid-dso',
  },
  {
    id: 'nugget-8',
    title: { en: 'CO2 Pricing (EU ETS)', de: 'CO2-Bepreisung (EU ETS)' },
    content: {
      en: 'The EU Emissions Trading System caps total emissions from power and industrial sectors. Companies must buy EU Allowances (EUAs) for each tonne of CO2 emitted, currently priced around €60-80/tonne.',
      de: 'Das EU-Emissionshandelssystem begrenzt die Gesamtemissionen aus Energie- und Industriesektoren. Unternehmen müssen EU-Zertifikate (EUAs) für jede Tonne CO2 kaufen, aktuell ca. 60-80€/Tonne.'
    },
    learnMore: {
      en: 'Higher CO2 prices make coal plants more expensive to run relative to gas plants, accelerating the coal-to-gas switching. The Market Stability Reserve (MSR) removes surplus allowances to maintain price signals.',
      de: 'Höhere CO2-Preise machen Kohlekraftwerke relativ zu Gaskraftwerken teurer, was den Umstieg von Kohle auf Gas beschleunigt. Die Marktstabilitätsreserve (MSR) entfernt überschüssige Zertifikate.'
    },
    topic: 'regulation',
  },
  {
    id: 'nugget-9',
    title: { en: 'Retail Electricity Pricing', de: 'Strompreise für Endkunden' },
    content: {
      en: 'Only about 25-30% of a German household electricity bill reflects the actual wholesale energy cost. The rest consists of network charges, taxes, levies, and the retail margin.',
      de: 'Nur etwa 25-30% einer deutschen Haushaltsstromrechnung spiegelt die tatsächlichen Großhandels-Energiekosten wider. Der Rest besteht aus Netzentgelten, Steuern, Umlagen und der Vertriebsmarge.'
    },
    learnMore: {
      en: 'Key components include: network charges (~25%), electricity tax, concession levy, offshore network levy, and the retail margin (~5%). The EEG surcharge, which funded renewable expansion, was abolished in mid-2022.',
      de: 'Hauptkomponenten sind: Netzentgelte (~25%), Stromsteuer, Konzessionsabgabe, Offshore-Netzumlage und die Vertriebsmarge (~5%). Die EEG-Umlage, die den Ausbau der Erneuerbaren finanzierte, wurde Mitte 2022 abgeschafft.'
    },
    topic: 'retail',
  },
  {
    id: 'nugget-10',
    title: { en: 'Wind & Solar Complementarity', de: 'Wind- & Solar-Komplementarität' },
    content: {
      en: 'Wind and solar generation patterns complement each other: solar peaks in summer at midday, while wind generation is often stronger in winter and at night, providing better overall coverage.',
      de: 'Wind- und Solarerzeugungsmuster ergänzen sich: Solar erreicht seinen Höhepunkt im Sommer mittags, während Windenergie oft im Winter und nachts stärker ist.'
    },
    learnMore: {
      en: 'Germany targets 80% renewable electricity by 2030, up from about 50% in 2023. Achieving this requires massive expansion: 215 GW solar and 115 GW onshore wind by 2030, plus storage and demand-side flexibility.',
      de: 'Deutschland strebt 80% erneuerbaren Strom bis 2030 an, gegenüber etwa 50% im Jahr 2023. Dies erfordert massiven Ausbau: 215 GW Solar und 115 GW Onshore-Wind bis 2030, plus Speicher und Nachfrageflexibilität.'
    },
    topic: 'renewables',
  },
];

export const quizQuestions: QuizQuestion[] = [
  // ENERGY BASICS - Easy
  {
    id: 'q1',
    question: {
      en: 'What is the standard frequency of the European electricity grid?',
      de: 'Was ist die Standardfrequenz des europäischen Stromnetzes?'
    },
    options: {
      en: ['60 Hz', '50 Hz', '40 Hz', '55 Hz'],
      de: ['60 Hz', '50 Hz', '40 Hz', '55 Hz']
    },
    correctIndex: 1,
    explanation: {
      en: 'The European grid operates at 50 Hz. Deviations indicate supply-demand imbalance.',
      de: 'Das europäische Netz arbeitet mit 50 Hz. Abweichungen zeigen ein Angebot-Nachfrage-Ungleichgewicht an.'
    },
    topic: 'energy-basics',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    question: {
      en: 'What does "baseload" refer to in power markets?',
      de: 'Was bedeutet "Grundlast" im Strommarkt?'
    },
    options: {
      en: ['Peak demand hours', 'Minimum continuous demand level', 'Maximum grid capacity', 'Emergency power supply'],
      de: ['Spitzenlaststunden', 'Minimales kontinuierliches Nachfrageniveau', 'Maximale Netzkapazität', 'Notstromversorgung']
    },
    correctIndex: 1,
    explanation: {
      en: 'Baseload is the minimum level of demand on a power grid over a 24-hour period.',
      de: 'Grundlast ist das minimale Nachfrageniveau im Stromnetz über einen 24-Stunden-Zeitraum.'
    },
    topic: 'energy-basics',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    question: {
      en: 'Which unit is commonly used for wholesale electricity prices in Europe?',
      de: 'Welche Einheit wird für Großhandelsstrompreise in Europa verwendet?'
    },
    options: {
      en: ['$/kWh', '€/MWh', '€/GJ', '£/kW'],
      de: ['$/kWh', '€/MWh', '€/GJ', '£/kW']
    },
    correctIndex: 1,
    explanation: {
      en: 'European wholesale power prices are quoted in euros per megawatt-hour (€/MWh).',
      de: 'Europäische Großhandelspreise werden in Euro pro Megawattstunde (€/MWh) angegeben.'
    },
    topic: 'energy-basics',
    difficulty: 'easy',
  },
  {
    id: 'q4',
    question: {
      en: 'What is 1 MWh equivalent to?',
      de: 'Wem entspricht 1 MWh?'
    },
    options: {
      en: ['100 kWh', '1,000 kWh', '10,000 kWh', '1,000,000 kWh'],
      de: ['100 kWh', '1.000 kWh', '10.000 kWh', '1.000.000 kWh']
    },
    correctIndex: 1,
    explanation: {
      en: '1 Megawatt-hour = 1,000 kilowatt-hours. An average German household uses about 3,500 kWh per year.',
      de: '1 Megawattstunde = 1.000 Kilowattstunden. Ein durchschnittlicher deutscher Haushalt verbraucht ca. 3.500 kWh pro Jahr.'
    },
    topic: 'energy-basics',
    difficulty: 'easy',
  },
  // PRICE DRIVERS - Easy
  {
    id: 'q5',
    question: {
      en: 'What is the merit order in electricity markets?',
      de: 'Was ist die Merit Order im Strommarkt?'
    },
    options: {
      en: ['A ranking of consumers by demand', 'A ranking of power plants by marginal cost', 'A list of grid operators by size', 'A schedule of maintenance outages'],
      de: ['Eine Rangliste der Verbraucher nach Bedarf', 'Eine Rangliste der Kraftwerke nach Grenzkosten', 'Eine Liste der Netzbetreiber nach Größe', 'Ein Wartungsplan']
    },
    correctIndex: 1,
    explanation: {
      en: 'The merit order ranks power plants from lowest to highest marginal production cost. The most expensive plant needed to meet demand sets the market price.',
      de: 'Die Merit Order ordnet Kraftwerke von den niedrigsten zu den höchsten Grenzproduktionskosten. Das teuerste benötigte Kraftwerk setzt den Marktpreis.'
    },
    topic: 'price-drivers',
    difficulty: 'easy',
  },
  {
    id: 'q6',
    question: {
      en: 'Which fuel most commonly sets the marginal price in the German merit order?',
      de: 'Welcher Brennstoff setzt am häufigsten den Grenzpreis in der deutschen Merit Order?'
    },
    options: {
      en: ['Coal', 'Natural gas', 'Nuclear', 'Wind'],
      de: ['Kohle', 'Erdgas', 'Kernkraft', 'Wind']
    },
    correctIndex: 1,
    explanation: {
      en: 'Natural gas plants often set the marginal price because they have higher fuel costs but are needed for flexibility.',
      de: 'Gaskraftwerke setzen oft den Grenzpreis, da sie höhere Brennstoffkosten haben, aber für Flexibilität benötigt werden.'
    },
    topic: 'price-drivers',
    difficulty: 'easy',
  },
  // PRICE DRIVERS - Medium
  {
    id: 'q7',
    question: {
      en: 'What is the "spark spread"?',
      de: 'Was ist der "Spark Spread"?'
    },
    options: {
      en: ['Difference between peak and off-peak prices', 'Profit margin of gas-fired power plants', 'Voltage difference in the grid', 'Price spread between exchanges'],
      de: ['Differenz zwischen Spitzen- und Schwachlastpreisen', 'Gewinnmarge von Gaskraftwerken', 'Spannungsdifferenz im Netz', 'Preisdifferenz zwischen Börsen']
    },
    correctIndex: 1,
    explanation: {
      en: 'The spark spread is the theoretical profit margin of a gas-fired power plant: power price minus gas cost and CO2 cost.',
      de: 'Der Spark Spread ist die theoretische Gewinnmarge eines Gaskraftwerks: Strompreis minus Gaskosten und CO2-Kosten.'
    },
    learnMore: {
      en: 'A clean spark spread also accounts for CO2 costs. When the clean spark spread is negative, gas plants lose money generating power and may shut down.',
      de: 'Ein Clean Spark Spread berücksichtigt auch CO2-Kosten. Wenn der Clean Spark Spread negativ ist, verlieren Gaskraftwerke Geld bei der Stromerzeugung.'
    },
    topic: 'price-drivers',
    difficulty: 'medium',
  },
  {
    id: 'q8',
    question: {
      en: 'What typically happens to wholesale power prices on a sunny, windy day?',
      de: 'Was passiert typischerweise mit Großhandelsstrompreisen an einem sonnigen, windigen Tag?'
    },
    options: {
      en: ['Prices increase', 'Prices decrease or go negative', 'Prices stay the same', 'Trading is suspended'],
      de: ['Preise steigen', 'Preise sinken oder werden negativ', 'Preise bleiben gleich', 'Handel wird ausgesetzt']
    },
    correctIndex: 1,
    explanation: {
      en: 'High renewable generation pushes expensive fossil plants out of the merit order, lowering wholesale prices. In extreme cases, prices can become negative.',
      de: 'Hohe erneuerbare Erzeugung verdrängt teure fossile Kraftwerke aus der Merit Order und senkt die Großhandelspreise. In extremen Fällen können Preise negativ werden.'
    },
    topic: 'price-drivers',
    difficulty: 'medium',
  },
  // RENEWABLES - Easy
  {
    id: 'q9',
    question: {
      en: 'What does the capacity factor of a wind farm measure?',
      de: 'Was misst der Kapazitätsfaktor eines Windparks?'
    },
    options: {
      en: ['Maximum output in MW', 'Actual output vs. maximum possible output', 'Number of turbines', 'Grid connection capacity'],
      de: ['Maximale Leistung in MW', 'Tatsächliche vs. maximal mögliche Erzeugung', 'Anzahl der Turbinen', 'Netzanschlusskapazität']
    },
    correctIndex: 1,
    explanation: {
      en: 'Capacity factor is the ratio of actual electricity produced to what would be produced if the plant ran at full capacity 24/7. Onshore wind in Germany averages about 20-25%.',
      de: 'Der Kapazitätsfaktor ist das Verhältnis der tatsächlichen Stromerzeugung zur maximal möglichen. Onshore-Wind in Deutschland liegt bei durchschnittlich ca. 20-25%.'
    },
    topic: 'renewables',
    difficulty: 'easy',
  },
  {
    id: 'q10',
    question: {
      en: 'What is "curtailment" in the context of renewable energy?',
      de: 'Was bedeutet "Abregelung" im Kontext erneuerbarer Energien?'
    },
    options: {
      en: ['Building new renewable plants', 'Deliberately reducing output when supply exceeds demand or grid capacity', 'Shutting down fossil plants', 'Importing power from abroad'],
      de: ['Bau neuer Erneuerbare-Anlagen', 'Bewusste Reduktion der Erzeugung bei Überangebot oder Netzengpässen', 'Abschaltung fossiler Kraftwerke', 'Import von Strom aus dem Ausland']
    },
    correctIndex: 1,
    explanation: {
      en: 'Curtailment means intentionally reducing renewable output, usually due to grid congestion or oversupply. Germany curtailed about 8 TWh of renewables in 2022.',
      de: 'Abregelung bedeutet die absichtliche Reduktion erneuerbarer Erzeugung, meist aufgrund von Netzengpässen oder Überangebot.'
    },
    topic: 'renewables',
    difficulty: 'easy',
  },
  // RENEWABLES - Medium
  {
    id: 'q11',
    question: {
      en: 'What is a Power Purchase Agreement (PPA)?',
      de: 'Was ist ein Power Purchase Agreement (PPA)?'
    },
    options: {
      en: ['A government subsidy for renewables', 'A long-term contract to buy electricity directly from a generator', 'A grid connection permit', 'A consumer tariff plan'],
      de: ['Eine staatliche Subvention für Erneuerbare', 'Ein langfristiger Vertrag zum direkten Strombezug von einem Erzeuger', 'Eine Netzanschlussgenehmigung', 'Ein Verbrauchertarifplan']
    },
    correctIndex: 1,
    explanation: {
      en: 'PPAs are long-term contracts (typically 10-20 years) where a buyer agrees to purchase electricity at a fixed or indexed price directly from a renewable energy project.',
      de: 'PPAs sind langfristige Verträge (typischerweise 10-20 Jahre), bei denen ein Käufer Strom zu einem festen oder indexierten Preis direkt von einem erneuerbaren Energieprojekt bezieht.'
    },
    topic: 'renewables',
    difficulty: 'medium',
  },
  {
    id: 'q12',
    question: {
      en: 'What role do battery storage systems play in the energy transition?',
      de: 'Welche Rolle spielen Batteriespeichersysteme in der Energiewende?'
    },
    options: {
      en: ['They generate electricity', 'They store excess renewable energy for later use', 'They transmit power over long distances', 'They reduce CO2 emissions directly'],
      de: ['Sie erzeugen Strom', 'Sie speichern überschüssige erneuerbare Energie für späteren Verbrauch', 'Sie übertragen Strom über lange Strecken', 'Sie reduzieren CO2-Emissionen direkt']
    },
    correctIndex: 1,
    explanation: {
      en: 'Battery storage absorbs excess renewable generation and releases it when needed, providing flexibility and helping balance supply and demand.',
      de: 'Batteriespeicher nehmen überschüssige erneuerbare Erzeugung auf und geben sie bei Bedarf ab, um Angebot und Nachfrage auszugleichen.'
    },
    topic: 'renewables',
    difficulty: 'medium',
  },
  // GRID/DSO - Easy
  {
    id: 'q13',
    question: {
      en: 'How many Transmission System Operators (TSOs) does Germany have?',
      de: 'Wie viele Übertragungsnetzbetreiber (ÜNBs) hat Deutschland?'
    },
    options: {
      en: ['1', '2', '4', '16'],
      de: ['1', '2', '4', '16']
    },
    correctIndex: 2,
    explanation: {
      en: 'Germany has four TSOs: 50Hertz, Amprion, TenneT, and TransnetBW, each managing a control area.',
      de: 'Deutschland hat vier ÜNBs: 50Hertz, Amprion, TenneT und TransnetBW, die jeweils eine Regelzone verwalten.'
    },
    topic: 'grid-dso',
    difficulty: 'easy',
  },
  {
    id: 'q14',
    question: {
      en: 'What voltage level do DSOs typically manage?',
      de: 'Welche Spannungsebene verwalten Verteilnetzbetreiber typischerweise?'
    },
    options: {
      en: ['Above 380 kV', 'Above 220 kV', 'Below 110 kV', 'Exactly 50 kV'],
      de: ['Über 380 kV', 'Über 220 kV', 'Unter 110 kV', 'Genau 50 kV']
    },
    correctIndex: 2,
    explanation: {
      en: 'DSOs manage the distribution network at voltages below 110 kV (medium and low voltage), delivering power to homes and businesses.',
      de: 'VNBs verwalten das Verteilnetz bei Spannungen unter 110 kV (Mittel- und Niederspannung) und liefern Strom an Haushalte und Unternehmen.'
    },
    topic: 'grid-dso',
    difficulty: 'easy',
  },
  // GRID/DSO - Medium
  {
    id: 'q15',
    question: {
      en: 'What is "Redispatch 2.0"?',
      de: 'Was ist "Redispatch 2.0"?'
    },
    options: {
      en: ['A new trading platform', 'An extended congestion management system including renewables', 'A grid expansion program', 'A consumer switching service'],
      de: ['Eine neue Handelsplattform', 'Ein erweitertes Engpassmanagement-System inklusive Erneuerbarer', 'Ein Netzausbau-Programm', 'Ein Anbieterwechsel-Service']
    },
    correctIndex: 1,
    explanation: {
      en: 'Redispatch 2.0 extended congestion management to include renewable and CHP plants above 100 kW, requiring them to reduce output when grid congestion occurs.',
      de: 'Redispatch 2.0 erweiterte das Engpassmanagement um erneuerbare und KWK-Anlagen über 100 kW, die bei Netzengpässen ihre Erzeugung reduzieren müssen.'
    },
    topic: 'grid-dso',
    difficulty: 'medium',
  },
  // REGULATION - Easy
  {
    id: 'q16',
    question: {
      en: 'What does the EU ETS stand for?',
      de: 'Wofür steht EU ETS?'
    },
    options: {
      en: ['European Union Energy Trading System', 'European Union Emissions Trading System', 'European Utility Electricity Tariff Schedule', 'EU Energy Transition Strategy'],
      de: ['Europäisches Energiehandelssystem', 'Europäisches Emissionshandelssystem', 'Europäischer Stromtarifplan', 'EU Energietransitionsstrategie']
    },
    correctIndex: 1,
    explanation: {
      en: 'The EU Emissions Trading System is a cap-and-trade system that limits greenhouse gas emissions from power plants and industrial installations.',
      de: 'Das EU-Emissionshandelssystem ist ein Cap-and-Trade-System, das Treibhausgasemissionen von Kraftwerken und Industrieanlagen begrenzt.'
    },
    topic: 'regulation',
    difficulty: 'easy',
  },
  {
    id: 'q17',
    question: {
      en: 'What is the German "Energiewende"?',
      de: 'Was ist die deutsche "Energiewende"?'
    },
    options: {
      en: ['A power trading platform', 'Germany\'s transition to renewable energy', 'A type of power plant', 'An electricity tariff'],
      de: ['Eine Stromhandelsplattform', 'Deutschlands Übergang zu erneuerbarer Energie', 'Ein Kraftwerkstyp', 'Ein Stromtarif']
    },
    correctIndex: 1,
    explanation: {
      en: 'The Energiewende is Germany\'s long-term strategy to transition from fossil fuels and nuclear to renewable energy sources while maintaining energy security.',
      de: 'Die Energiewende ist Deutschlands langfristige Strategie für den Übergang von fossilen und nuklearen zu erneuerbaren Energiequellen bei gleichzeitiger Versorgungssicherheit.'
    },
    topic: 'regulation',
    difficulty: 'easy',
  },
  // REGULATION - Medium
  {
    id: 'q18',
    question: {
      en: 'What is the role of the Bundesnetzagentur?',
      de: 'Was ist die Rolle der Bundesnetzagentur?'
    },
    options: {
      en: ['Generating electricity', 'Regulating energy networks, telecom, and postal services', 'Trading electricity on exchanges', 'Building power plants'],
      de: ['Stromerzeugung', 'Regulierung von Energienetzen, Telekommunikation und Post', 'Stromhandel an Börsen', 'Bau von Kraftwerken']
    },
    correctIndex: 1,
    explanation: {
      en: 'The Bundesnetzagentur (BNetzA) is Germany\'s federal network agency, responsible for regulating electricity, gas, telecom, post, and railway markets.',
      de: 'Die Bundesnetzagentur (BNetzA) ist die deutsche Regulierungsbehörde für Strom-, Gas-, Telekommunikations-, Post- und Eisenbahnmärkte.'
    },
    topic: 'regulation',
    difficulty: 'medium',
  },
  // REGULATION - Hard
  {
    id: 'q19',
    question: {
      en: 'What is the Market Stability Reserve (MSR) in the EU ETS?',
      de: 'Was ist die Marktstabilitätsreserve (MSR) im EU ETS?'
    },
    options: {
      en: ['A financial reserve for market crashes', 'A mechanism to adjust the supply of emission allowances', 'An emergency power reserve', 'A carbon tax on imports'],
      de: ['Eine Finanzreserve für Markteinbrüche', 'Ein Mechanismus zur Anpassung des Angebots an Emissionszertifikaten', 'Eine Notstromreserve', 'Eine CO2-Steuer auf Importe']
    },
    correctIndex: 1,
    explanation: {
      en: 'The MSR automatically adjusts the supply of EU emission allowances by absorbing surplus or releasing permits when needed, supporting the carbon price signal.',
      de: 'Die MSR passt das Angebot an EU-Emissionszertifikaten automatisch an, indem sie Überschüsse absorbiert oder Zertifikate bei Bedarf freigibt.'
    },
    topic: 'regulation',
    difficulty: 'hard',
  },
  // TRADING - Easy
  {
    id: 'q20',
    question: {
      en: 'Where is the main European day-ahead power market?',
      de: 'Wo ist der wichtigste europäische Day-Ahead-Strommarkt?'
    },
    options: {
      en: ['NYSE', 'EPEX SPOT', 'NASDAQ', 'London Stock Exchange'],
      de: ['NYSE', 'EPEX SPOT', 'NASDAQ', 'Londoner Börse']
    },
    correctIndex: 1,
    explanation: {
      en: 'EPEX SPOT operates the day-ahead and intraday power markets for Germany, France, Austria, Belgium, Netherlands, and other European countries.',
      de: 'EPEX SPOT betreibt die Day-Ahead- und Intraday-Strommärkte für Deutschland, Frankreich, Österreich, Belgien, Niederlande und andere europäische Länder.'
    },
    topic: 'trading',
    difficulty: 'easy',
  },
  {
    id: 'q21',
    question: {
      en: 'What is "hedging" in energy trading?',
      de: 'Was ist "Hedging" im Energiehandel?'
    },
    options: {
      en: ['Speculating on price increases', 'Reducing price risk through forward contracts', 'Physical delivery of electricity', 'Grid balancing operations'],
      de: ['Spekulation auf Preissteigerungen', 'Reduzierung des Preisrisikos durch Termingeschäfte', 'Physische Lieferung von Strom', 'Netzbilanzierung']
    },
    correctIndex: 1,
    explanation: {
      en: 'Hedging means using forward or futures contracts to lock in future prices, reducing exposure to volatile spot market prices.',
      de: 'Hedging bedeutet die Nutzung von Termin- oder Futures-Kontrakten zur Fixierung zukünftiger Preise, um die Exposition gegenüber volatilen Spotmarktpreisen zu reduzieren.'
    },
    topic: 'trading',
    difficulty: 'easy',
  },
  // TRADING - Medium
  {
    id: 'q22',
    question: {
      en: 'What is the difference between the day-ahead and intraday market?',
      de: 'Was ist der Unterschied zwischen Day-Ahead- und Intraday-Markt?'
    },
    options: {
      en: ['Day-ahead trades monthly, intraday trades yearly', 'Day-ahead closes the day before delivery, intraday trades up to delivery', 'There is no difference', 'Day-ahead is for gas, intraday is for power'],
      de: ['Day-Ahead handelt monatlich, Intraday handelt jährlich', 'Day-Ahead schließt am Tag vor der Lieferung, Intraday handelt bis zur Lieferung', 'Es gibt keinen Unterschied', 'Day-Ahead ist für Gas, Intraday für Strom']
    },
    correctIndex: 1,
    explanation: {
      en: 'The day-ahead market sets hourly prices for the next day via auction. The intraday market allows continuous trading up to 5 minutes before delivery to adjust positions.',
      de: 'Der Day-Ahead-Markt setzt stündliche Preise für den nächsten Tag per Auktion. Der Intraday-Markt ermöglicht kontinuierlichen Handel bis 5 Minuten vor Lieferung.'
    },
    topic: 'trading',
    difficulty: 'medium',
  },
  // TRADING - Hard
  {
    id: 'q23',
    question: {
      en: 'What is the "Phelix" baseload index?',
      de: 'Was ist der "Phelix" Grundlast-Index?'
    },
    options: {
      en: ['A renewable energy index', 'The Physical Electricity Index for German/Austrian baseload power', 'A grid frequency metric', 'A consumer price index'],
      de: ['Ein Erneuerbare-Energien-Index', 'Der Physical Electricity Index für deutsche/österreichische Grundlaststrom', 'Eine Netzfrequenz-Metrik', 'Ein Verbraucherpreisindex']
    },
    correctIndex: 1,
    explanation: {
      en: 'Phelix (Physical Electricity Index) is the average day-ahead price for baseload (all hours) power in Germany. It serves as the key reference for power derivatives.',
      de: 'Phelix (Physical Electricity Index) ist der durchschnittliche Day-Ahead-Preis für Grundlaststrom in Deutschland und dient als Referenz für Stromderivate.'
    },
    topic: 'trading',
    difficulty: 'hard',
  },
  // RETAIL - Easy
  {
    id: 'q24',
    question: {
      en: 'What percentage of a German household electricity bill is the actual energy cost?',
      de: 'Welcher Anteil einer deutschen Haushaltsstromrechnung sind die tatsächlichen Energiekosten?'
    },
    options: {
      en: ['About 80%', 'About 50%', 'About 25-30%', 'About 10%'],
      de: ['Etwa 80%', 'Etwa 50%', 'Etwa 25-30%', 'Etwa 10%']
    },
    correctIndex: 2,
    explanation: {
      en: 'Only about 25-30% of a German household bill reflects wholesale energy costs. The rest is grid fees, taxes, and levies.',
      de: 'Nur etwa 25-30% einer deutschen Haushaltsrechnung spiegeln die Großhandels-Energiekosten wider. Der Rest sind Netzentgelte, Steuern und Umlagen.'
    },
    topic: 'retail',
    difficulty: 'easy',
  },
  {
    id: 'q25',
    question: {
      en: 'What is "Anbieterwechsel" in the German energy market?',
      de: 'Was ist ein "Anbieterwechsel" im deutschen Energiemarkt?'
    },
    options: {
      en: ['Building a new power plant', 'Switching electricity supplier', 'Installing solar panels', 'Connecting to the grid'],
      de: ['Bau eines neuen Kraftwerks', 'Wechsel des Stromanbieters', 'Installation von Solaranlagen', 'Anschluss ans Netz']
    },
    correctIndex: 1,
    explanation: {
      en: 'German consumers can freely switch their electricity supplier. The process typically takes a few weeks and the DSO ensures uninterrupted supply during the switch.',
      de: 'Deutsche Verbraucher können ihren Stromanbieter frei wechseln. Der Prozess dauert typischerweise einige Wochen, und der VNB stellt eine unterbrechungsfreie Versorgung sicher.'
    },
    topic: 'retail',
    difficulty: 'easy',
  },
  // RETAIL - Medium
  {
    id: 'q26',
    question: {
      en: 'What are "Netzentgelte" (network charges)?',
      de: 'Was sind "Netzentgelte"?'
    },
    options: {
      en: ['Fees paid to use the electricity grid', 'Costs for building new power lines', 'Taxes on electricity consumption', 'Charges for smart meters'],
      de: ['Gebühren für die Nutzung des Stromnetzes', 'Kosten für den Bau neuer Stromleitungen', 'Steuern auf den Stromverbrauch', 'Gebühren für Smart Meter']
    },
    correctIndex: 0,
    explanation: {
      en: 'Netzentgelte are regulated fees paid to grid operators (TSOs and DSOs) for transporting electricity through their networks. They make up about 25% of the total electricity bill.',
      de: 'Netzentgelte sind regulierte Gebühren an Netzbetreiber (ÜNBs und VNBs) für den Transport von Strom. Sie machen etwa 25% der gesamten Stromrechnung aus.'
    },
    topic: 'retail',
    difficulty: 'medium',
  },
  // ENERGY BASICS - Medium
  {
    id: 'q27',
    question: {
      en: 'What is the difference between energy (kWh) and power (kW)?',
      de: 'Was ist der Unterschied zwischen Energie (kWh) und Leistung (kW)?'
    },
    options: {
      en: ['They are the same thing', 'Power is the rate of energy use; energy is power over time', 'Energy is measured in watts, power in joules', 'Power is only used for renewables'],
      de: ['Sie sind dasselbe', 'Leistung ist die Rate des Energieverbrauchs; Energie ist Leistung über Zeit', 'Energie wird in Watt gemessen, Leistung in Joule', 'Leistung wird nur für Erneuerbare verwendet']
    },
    correctIndex: 1,
    explanation: {
      en: 'Power (kW) is the instantaneous rate of energy transfer. Energy (kWh) is power multiplied by time. A 100 W light bulb running for 10 hours uses 1 kWh.',
      de: 'Leistung (kW) ist die momentane Rate der Energieübertragung. Energie (kWh) ist Leistung multipliziert mit Zeit.'
    },
    topic: 'energy-basics',
    difficulty: 'medium',
  },
  // RENEWABLES - Hard
  {
    id: 'q28',
    question: {
      en: 'What is the "duck curve" in power systems?',
      de: 'Was ist die "Enten-Kurve" in Stromsystemen?'
    },
    options: {
      en: ['A waterfowl migration pattern', 'The net load shape showing midday dip from solar and evening ramp', 'A type of wind turbine', 'A gas pipeline route'],
      de: ['Ein Wasservogel-Migrationsmuster', 'Die Nettolastkurve mit Mittagstal durch Solar und Abendanstieg', 'Ein Windturbinentyp', 'Eine Gaspipeline-Route']
    },
    correctIndex: 1,
    explanation: {
      en: 'The duck curve shows how high solar generation creates a midday dip in net load (demand minus renewables), followed by a steep evening ramp as solar drops and demand peaks.',
      de: 'Die Enten-Kurve zeigt, wie hohe Solarerzeugung ein Mittagstal in der Nettolast erzeugt, gefolgt von einem steilen Abendanstieg, wenn Solar nachlässt und die Nachfrage steigt.'
    },
    topic: 'renewables',
    difficulty: 'hard',
  },
  // GRID - Hard
  {
    id: 'q29',
    question: {
      en: 'What is "sector coupling" in the energy transition?',
      de: 'Was ist "Sektorenkopplung" in der Energiewende?'
    },
    options: {
      en: ['Merging utility companies', 'Linking electricity, heat, transport, and industry sectors', 'Connecting national grids', 'Combining solar and wind farms'],
      de: ['Fusion von Energieunternehmen', 'Verknüpfung von Strom-, Wärme-, Verkehrs- und Industriesektoren', 'Verbindung nationaler Netze', 'Kombination von Solar- und Windparks']
    },
    correctIndex: 1,
    explanation: {
      en: 'Sector coupling integrates electricity with heating (heat pumps), transport (EVs), and industry (green hydrogen) to decarbonize all sectors using renewable electricity.',
      de: 'Sektorenkopplung integriert Strom mit Wärme (Wärmepumpen), Verkehr (E-Autos) und Industrie (grüner Wasserstoff) zur Dekarbonisierung aller Sektoren.'
    },
    topic: 'grid-dso',
    difficulty: 'hard',
  },
  // PRICE DRIVERS - Hard
  {
    id: 'q30',
    question: {
      en: 'What are "negative prices" in electricity markets?',
      de: 'Was sind "negative Preise" in Strommärkten?'
    },
    options: {
      en: ['Prices below the regulated minimum', 'When generators pay consumers to take their electricity', 'Accounting errors', 'Prices during grid failures'],
      de: ['Preise unter dem regulierten Minimum', 'Wenn Erzeuger Verbraucher für Stromabnahme bezahlen', 'Buchungsfehler', 'Preise bei Netzausfällen']
    },
    correctIndex: 1,
    explanation: {
      en: 'Negative prices occur when supply exceeds demand and inflexible generators (nuclear, must-run renewables) pay to keep running rather than incur costly shutdowns.',
      de: 'Negative Preise treten auf, wenn das Angebot die Nachfrage übersteigt und inflexible Erzeuger für den Weiterbetrieb zahlen, statt kostspielige Abschaltungen in Kauf zu nehmen.'
    },
    topic: 'price-drivers',
    difficulty: 'hard',
  },
];

export const leaderboardUsers: LeaderboardUser[] = [
  { rank: 1, name: 'Maximilian W.', xp: 4850, level: 'expert', avatar: '🧑‍💼', streak: 21 },
  { rank: 2, name: 'Sophie M.', xp: 4200, level: 'expert', avatar: '👩‍🔬', streak: 14 },
  { rank: 3, name: 'Lukas B.', xp: 3750, level: 'expert', avatar: '👨‍💻', streak: 10 },
  { rank: 4, name: 'Anna K.', xp: 2900, level: 'advanced', avatar: '👩‍🏫', streak: 8 },
  { rank: 5, name: 'Felix R.', xp: 2500, level: 'advanced', avatar: '🧑‍🔧', streak: 5 },
  { rank: 6, name: 'Laura S.', xp: 2100, level: 'advanced', avatar: '👩‍💼', streak: 4 },
  { rank: 7, name: 'Jonas H.', xp: 1800, level: 'intermediate', avatar: '👨‍🎓', streak: 3 },
  { rank: 8, name: 'Marie T.', xp: 1400, level: 'intermediate', avatar: '👩‍🎓', streak: 6 },
  { rank: 9, name: 'David F.', xp: 900, level: 'intermediate', avatar: '🧑‍💼', streak: 2 },
  { rank: 10, name: 'Clara N.', xp: 450, level: 'beginner', avatar: '👩‍🔬', streak: 1 },
];

export const achievements: Achievement[] = [
  {
    id: 'welcome',
    name: { en: 'Welcome!', de: 'Willkommen!' },
    description: { en: 'Completed the onboarding', de: 'Onboarding abgeschlossen' },
    icon: '🎉',
    unlocked: false,
  },
  {
    id: 'first-quiz',
    name: { en: 'First Steps', de: 'Erste Schritte' },
    description: { en: 'Completed your first quiz', de: 'Erstes Quiz abgeschlossen' },
    icon: '🏁',
    unlocked: false,
  },
  {
    id: 'streak-3',
    name: { en: '3-Day Streak', de: '3-Tage-Serie' },
    description: { en: 'Maintained a 3-day streak', de: '3-Tage-Serie gehalten' },
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'streak-7',
    name: { en: 'Weekly Warrior', de: 'Wochenkämpfer' },
    description: { en: 'Maintained a 7-day streak', de: '7-Tage-Serie gehalten' },
    icon: '⚔️',
    unlocked: false,
  },
  {
    id: 'quiz-champion',
    name: { en: 'Quiz Champion', de: 'Quiz-Champion' },
    description: { en: 'Completed 10 quizzes', de: '10 Quizze abgeschlossen' },
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'curious-mind',
    name: { en: 'Curious Mind', de: 'Wissbegierig' },
    description: { en: 'Asked 5 questions to the AI agent', de: '5 Fragen an den KI-Agenten gestellt' },
    icon: '🧠',
    unlocked: false,
  },
  {
    id: 'level-up',
    name: { en: 'Expert Level', de: 'Experten-Level' },
    description: { en: 'Reached expert level', de: 'Experten-Level erreicht' },
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'perfect-score',
    name: { en: 'Perfect Score', de: 'Perfekte Punktzahl' },
    description: { en: 'Got all questions right in a quiz', de: 'Alle Fragen in einem Quiz richtig beantwortet' },
    icon: '💯',
    unlocked: false,
  },
  {
    id: 'social-butterfly',
    name: { en: 'Social Butterfly', de: 'Netzwerker' },
    description: { en: 'Invited a colleague', de: 'Einen Kollegen eingeladen' },
    icon: '🦋',
    unlocked: false,
  },
];

export const mockAIResponses: Record<string, { en: string; de: string }> = {
  default: {
    en: "That's a great question about energy markets! The European energy landscape is complex and constantly evolving. Key factors include the merit order principle, renewable integration, grid operations, and regulatory frameworks. Could you be more specific about what aspect you'd like to explore?",
    de: "Das ist eine großartige Frage zum Energiemarkt! Die europäische Energielandschaft ist komplex und entwickelt sich ständig weiter. Schlüsselfaktoren sind das Merit-Order-Prinzip, die Integration Erneuerbarer, Netzbetrieb und regulatorische Rahmenbedingungen. Könnten Sie genauer angeben, welchen Aspekt Sie erkunden möchten?"
  },
  price: {
    en: "German electricity prices are determined by several key factors:\n\n1. **Fuel costs**: Natural gas (TTF) and coal prices directly impact the cost of thermal generation\n2. **CO2 prices**: EU ETS allowances add to fossil fuel plant costs (~€60-80/tonne)\n3. **Renewable feed-in**: High wind/solar reduces spot prices through the merit order effect\n4. **Demand patterns**: Industrial demand, weather, and time of day affect consumption\n5. **Interconnector flows**: Cross-border trading can import cheaper power or export surpluses\n\nThe day-ahead auction at EPEX SPOT sets hourly prices, while futures on EEX allow forward hedging.",
    de: "Deutsche Strompreise werden durch mehrere Schlüsselfaktoren bestimmt:\n\n1. **Brennstoffkosten**: Erdgas (TTF) und Kohlepreise beeinflussen die Kosten der thermischen Erzeugung\n2. **CO2-Preise**: EU-ETS-Zertifikate erhöhen die Kosten fossiler Kraftwerke (~60-80€/Tonne)\n3. **Erneuerbare Einspeisung**: Hohe Wind-/Solarleistung senkt Spotpreise durch den Merit-Order-Effekt\n4. **Nachfragemuster**: Industrienachfrage, Wetter und Tageszeit beeinflussen den Verbrauch\n5. **Interkonnektorflüsse**: Grenzüberschreitender Handel kann günstigeren Strom importieren"
  },
  renewables: {
    en: "Germany's renewable energy landscape is one of the most ambitious in Europe:\n\n- **Wind onshore**: ~60 GW installed, targeting 115 GW by 2030\n- **Wind offshore**: ~8 GW installed, targeting 30 GW by 2030\n- **Solar PV**: ~80 GW installed, targeting 215 GW by 2030\n- **Biomass**: ~9 GW providing baseload renewable power\n\nKey challenges include grid integration, storage needs, and permitting bottlenecks. The Renewable Energy Sources Act (EEG) has been the primary support mechanism, though market-based PPAs are increasingly common.",
    de: "Deutschlands Erneuerbare-Energien-Landschaft ist eine der ambitioniertesten in Europa:\n\n- **Wind onshore**: ~60 GW installiert, Ziel 115 GW bis 2030\n- **Wind offshore**: ~8 GW installiert, Ziel 30 GW bis 2030\n- **Solar PV**: ~80 GW installiert, Ziel 215 GW bis 2030\n- **Biomasse**: ~9 GW für erneuerbare Grundlast\n\nHerausforderungen sind Netzintegration, Speicherbedarf und Genehmigungsengpässe."
  },
  grid: {
    en: "The German electricity grid operates at multiple levels:\n\n**Transmission (TSOs)**: Four operators (50Hertz, Amprion, TenneT, TransnetBW) manage the 220-380 kV high-voltage grid\n\n**Distribution (DSOs)**: ~870 operators manage medium/low voltage networks below 110 kV\n\n**Key challenges**:\n- North-south congestion (wind in north, demand in south)\n- Redispatch costs exceeding €4 billion/year\n- Integration of distributed resources (solar, EVs, heat pumps)\n- Grid expansion projects like SuedLink and SuedOstLink\n\nSmart grid technologies and flexibility markets are essential for managing bidirectional power flows.",
    de: "Das deutsche Stromnetz arbeitet auf mehreren Ebenen:\n\n**Übertragung (ÜNBs)**: Vier Betreiber (50Hertz, Amprion, TenneT, TransnetBW) verwalten das 220-380 kV Hochspannungsnetz\n\n**Verteilung (VNBs)**: ~870 Betreiber verwalten Mittel-/Niederspannungsnetze unter 110 kV\n\n**Herausforderungen**:\n- Nord-Süd-Engpässe\n- Redispatch-Kosten über 4 Mrd. €/Jahr\n- Integration dezentraler Ressourcen"
  },
  trading: {
    en: "European energy trading operates across several key venues:\n\n**Spot Markets (EPEX SPOT)**:\n- Day-ahead: Hourly auction for next-day delivery\n- Intraday: Continuous trading up to 5 min before delivery\n\n**Futures Markets (EEX)**:\n- Monthly, quarterly, yearly contracts\n- Used for hedging and portfolio management\n\n**Key products**:\n- Baseload (all hours) and peakload (Mon-Fri 8:00-20:00)\n- Calendar year forwards (most liquid)\n\n**Risk management**: Companies use forwards, futures, and options to hedge price exposure. A typical utility hedges 60-80% of its portfolio 1-3 years ahead.",
    de: "Der europäische Energiehandel findet an mehreren wichtigen Handelsplätzen statt:\n\n**Spotmärkte (EPEX SPOT)**:\n- Day-Ahead: Stündliche Auktion für Lieferung am nächsten Tag\n- Intraday: Kontinuierlicher Handel bis 5 Min. vor Lieferung\n\n**Terminmärkte (EEX)**:\n- Monats-, Quartals-, Jahreskontrakte\n- Für Hedging und Portfoliomanagement\n\n**Risikomanagement**: Unternehmen nutzen Forwards, Futures und Optionen zur Absicherung."
  },
};
