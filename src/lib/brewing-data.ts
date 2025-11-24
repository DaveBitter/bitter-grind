export interface BrewingStep {
  time: number; // seconds from start
  description: string;
  waterAmount?: number; // cumulative water amount in grams
  isPour?: boolean;
}

export interface BrewingTechnique {
  name: string;
  author?: string;
  ratio: number; // water to coffee ratio (e.g., 16 means 1:16)
  defaultCoffeeAmount: number; // grams
  grindSize: "Fine" | "Medium-Fine" | "Medium" | "Medium-Coarse" | "Coarse";
  waterTemp: number; // Celsius
  totalTime: number; // seconds
  description: string;
  history?: string;
  explanation?: string;
  steps: BrewingStep[];
}

export interface BrewingMethod {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  techniques: BrewingTechnique[];
}

export const BREWING_METHODS: BrewingMethod[] = [
  {
    id: "v60",
    name: "Hario V60",
    description: "A cone-shaped dripper with spiral ridges that allows for precise control over the brewing process.",
    icon: "Cone",
    techniques: [
      {
        name: "James Hoffmann's Ultimate V60",
        author: "James Hoffmann",
        ratio: 16.67, // 18g coffee to 300g water
        defaultCoffeeAmount: 18,
        grindSize: "Medium-Fine",
        waterTemp: 100, // Boiling
        totalTime: 210, // 3:30
        description: "A technique focused on high extraction and evenness.",
        history: "James Hoffmann, a World Barista Champion and coffee educator, developed this technique after years of experimentation. Published in 2019, it represents a departure from traditional multi-pour methods, focusing instead on simplicity and scientific principles of extraction.",
        explanation: "This method emphasizes even saturation and controlled extraction. The 2:1 bloom ratio ensures all grounds degas properly, while the single continuous pour minimizes temperature fluctuation. The strategic stirring and swirling create a flat bed, preventing channeling and ensuring uniform extraction. Using boiling water maximizes extraction potential, especially important for light roasts. The technique prioritizes consistency over complexity, making it accessible to beginners while producing exceptional results.",
        steps: [
          { time: 0, description: "Start timer. Add 2x coffee weight in water for bloom.", waterAmount: 36, isPour: true },
          { time: 5, description: "Swirl the brewer to wet all grounds.", isPour: false },
          { time: 45, description: "Pour water up to 60% of total brew weight (180g).", waterAmount: 180, isPour: true },
          { time: 75, description: "Pour remaining water (up to 300g).", waterAmount: 300, isPour: true },
          { time: 105, description: "Stir gently 1 turn clockwise and 1 turn anti-clockwise.", isPour: false },
          { time: 110, description: "Swirl gently to flatten the bed.", isPour: false },
          { time: 210, description: "Drawdown should be complete.", isPour: false },
        ],
      },
      {
        name: "Scott Rao's V60",
        author: "Scott Rao",
        ratio: 16.36, // 18g coffee to ~295g water
        defaultCoffeeAmount: 18,
        grindSize: "Medium-Fine",
        waterTemp: 100,
        totalTime: 180, // 3:00
        description: "Focuses on agitation and preventing channeling.",
        history: "Scott Rao, a coffee consultant and author of 'The Coffee Roaster's Handbook,' developed this technique based on his research into extraction theory. His approach focuses on preventing channeling—the phenomenon where water finds paths of least resistance through the coffee bed, leading to uneven extraction.",
        explanation: "Rao's method uses a larger bloom ratio (3:1) and aggressive 'excavation' stirring to ensure complete saturation. The single continuous pour maintains consistent water level, preventing the coffee bed from drying out and creating channels. The final swirl flattens the bed, creating uniform resistance for the drawdown phase. This technique is particularly effective for achieving high extraction yields without bitterness, making it ideal for specialty coffee enthusiasts seeking maximum flavor clarity.",
        steps: [
          { time: 0, description: "Pour 3x coffee weight for bloom (54g).", waterAmount: 54, isPour: true },
          { time: 5, description: "Excavate the bloom (stir) to wet all grounds.", isPour: false },
          { time: 45, description: "Pour remaining water steadily to reach total weight (295g).", waterAmount: 295, isPour: true },
          { time: 105, description: "Swirl the brewer to flatten the bed.", isPour: false },
          { time: 180, description: "Drawdown complete.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "chemex",
    name: "Chemex",
    description: "An hourglass-shaped flask that produces a clean, bright cup due to its thick paper filters.",
    icon: "FlaskConical",
    techniques: [
      {
        name: "Standard Chemex",
        ratio: 16,
        defaultCoffeeAmount: 20,
        grindSize: "Medium-Coarse",
        waterTemp: 96,
        totalTime: 270, // 4:30
        description: "Classic Chemex brew for a clean cup.",
        history: "The Chemex was invented in 1941 by German chemist Peter Schlumbohm. Its distinctive hourglass shape and thick paper filters were designed to produce exceptionally clean coffee. The design was so elegant that it's now part of the permanent collection at the Museum of Modern Art in New York.",
        explanation: "The Chemex's thick paper filters remove oils and fine particles, resulting in a remarkably clean, tea-like cup. The larger brewing capacity (typically 6-8 cups) requires a coarser grind to prevent over-extraction during the longer drawdown. The spiral pouring technique ensures even saturation of the larger coffee bed. This method excels with light roasts and delicate coffees where clarity and brightness are desired over body and richness.",
        steps: [
          { time: 0, description: "Bloom with 2x coffee weight (40g).", waterAmount: 40, isPour: true },
          { time: 45, description: "Pour water in spirals up to halfway.", waterAmount: 160, isPour: true },
          { time: 105, description: "Pour remaining water steadily.", waterAmount: 320, isPour: true },
          { time: 270, description: "Drawdown complete.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "aeropress",
    name: "AeroPress",
    description: "A versatile immersion brewer that uses air pressure to push coffee through a filter.",
    icon: "Cylinder",
    techniques: [
      {
        name: "James Hoffmann's Ultimate AeroPress",
        author: "James Hoffmann",
        ratio: 18.18, // 17g coffee to ~309g water
        defaultCoffeeAmount: 17,
        grindSize: "Fine",
        waterTemp: 100,
        totalTime: 150, // 2:30
        description: "A simple, reliable recipe for a great cup.",
        history: "The AeroPress was invented in 2005 by Alan Adler, an engineer and inventor. James Hoffmann's technique, published in 2017, simplified the many competing methods into a single, reliable recipe that works consistently across different coffee types.",
        explanation: "Hoffmann's AeroPress method uses full immersion brewing with gentle pressure. The inverted method (inserting the plunger slightly) prevents premature dripping, allowing full immersion time. The fine grind and high water temperature maximize extraction in the short brew time. The gentle swirl redistributes grounds before pressing, ensuring even extraction. The 30-second press creates minimal pressure, avoiding over-extraction. This technique produces a clean, full-bodied cup that bridges the gap between espresso and filter coffee.",
        steps: [
          { time: 0, description: "Add coffee and pour 309g water.", waterAmount: 309, isPour: true },
          { time: 5, description: "Insert plunger slightly to stop dripping.", isPour: false },
          { time: 120, description: "Swirl gently.", isPour: false },
          { time: 150, description: "Press gently for 30 seconds.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "A concentrated coffee brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans.",
    icon: "CupSoda",
    techniques: [
      {
        name: "Standard Espresso",
        ratio: 2, // 1:2
        defaultCoffeeAmount: 18,
        grindSize: "Fine",
        waterTemp: 93,
        totalTime: 30,
        description: "The foundation of modern espresso.",
        history: "Espresso was invented in Italy in the early 20th century, with the first patent filed by Luigi Bezzera in 1901. The modern 1:2 ratio (18g coffee to 36g output) became standard in specialty coffee around 2010, representing a shift from traditional Italian ristretto (1:1) to a more balanced extraction.",
        explanation: "Espresso extraction happens under 9 bars of pressure, forcing hot water through finely-ground, tightly-packed coffee in 25-30 seconds. The 1:2 ratio balances sweetness, acidity, and body. The fine grind creates resistance, allowing proper pressure buildup. Water temperature around 93°C prevents over-extraction while ensuring sufficient extraction of desirable compounds. Proper distribution and tamping create uniform resistance, preventing channeling. The crema—the golden foam on top—indicates fresh coffee and proper extraction. This method requires precision and consistency to achieve the perfect shot.",
        steps: [
          { time: 0, description: "Start pump.", isPour: true },
          { time: 5, description: "First drips should appear.", isPour: false },
          { time: 25, description: "Stop pump when yield reached (36g).", waterAmount: 36, isPour: true },
        ],
      },
    ],
  },
  {
    id: "french-press",
    name: "French Press",
    description: "An immersion brewing method where coarsely ground coffee steeps in hot water before being separated by a metal mesh plunger.",
    icon: "Beaker",
    techniques: [
      {
        name: "James Hoffmann's French Press",
        author: "James Hoffmann",
        ratio: 15, // 20g coffee to 300g water
        defaultCoffeeAmount: 20,
        grindSize: "Coarse",
        waterTemp: 100,
        totalTime: 600, // 10:00 (4 min steep + 6 min settle)
        description: "A technique that minimizes sediment and maximizes clarity.",
        history: "The French Press (cafetière) was patented in 1929 by Italian designer Attilio Calimani. James Hoffmann revolutionized the technique in 2014 by introducing a method that eliminates the traditional plunging step, instead allowing grounds to settle naturally, dramatically reducing sediment.",
        explanation: "Hoffmann's method challenges the traditional French Press approach. Instead of plunging immediately after steeping, the technique involves breaking the crust, skimming off floating grounds, and allowing 6-8 minutes for natural settling. This eliminates the agitation caused by plunging, which forces fine particles through the mesh filter. The result is a remarkably clean cup with full body and rich flavor, without the gritty sediment that plagues traditional French Press coffee. The coarse grind prevents over-extraction during the long steep time, while the extended settling period ensures clarity.",
        steps: [
          { time: 0, description: "Add coffee and pour all water (300g).", waterAmount: 300, isPour: true },
          { time: 5, description: "Stir gently to ensure all grounds are saturated.", isPour: false },
          { time: 240, description: "Break the crust and scoop off foam and floating grounds.", isPour: false },
          { time: 600, description: "Press plunger slowly and serve immediately.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "kalita-wave",
    name: "Kalita Wave",
    description: "A flat-bottomed pour-over dripper with three small holes, promoting even extraction and a balanced cup.",
    icon: "Circle",
    techniques: [
      {
        name: "Standard Kalita Wave",
        ratio: 16, // 19g coffee to 304g water
        defaultCoffeeAmount: 19,
        grindSize: "Medium-Fine",
        waterTemp: 96,
        totalTime: 240, // 4:00
        description: "Even extraction with consistent flow rate.",
        history: "The Kalita Wave was introduced in 2010 by Japanese manufacturer Kalita. Its flat-bottom design with three small holes was engineered to address the uneven extraction common in cone-shaped drippers, providing more consistent flow and temperature stability.",
        explanation: "The Kalita Wave's flat bottom creates a more even extraction compared to cone drippers. The three small holes control flow rate, preventing the fast drawdown that can lead to under-extraction. The wave-patterned filters create air gaps, allowing for better water distribution. The multiple small pours maintain consistent water level, ensuring all grounds extract evenly. This method is particularly forgiving for beginners, as the controlled flow rate reduces the impact of pouring technique. The result is a balanced, clean cup with excellent sweetness and body.",
        steps: [
          { time: 0, description: "Bloom with 2x coffee weight (38g).", waterAmount: 38, isPour: true },
          { time: 45, description: "Pour in circular motions up to 114g.", waterAmount: 114, isPour: true },
          { time: 90, description: "Pour up to 190g, maintaining circular motion.", waterAmount: 190, isPour: true },
          { time: 135, description: "Pour remaining water up to 304g.", waterAmount: 304, isPour: true },
          { time: 240, description: "Drawdown complete.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "A method involving steeping coarse coffee grounds in cold water for 12-24 hours, resulting in a smooth, low-acidity concentrate.",
    icon: "Snowflake",
    techniques: [
      {
        name: "Standard Cold Brew",
        ratio: 8, // 1:8 for concentrate (dilute 1:1 when serving) - 38g coffee to 304g water makes ~300ml concentrate
        defaultCoffeeAmount: 38,
        grindSize: "Coarse",
        waterTemp: 20, // Room temperature
        totalTime: 43200, // 12 hours in seconds
        description: "Smooth, low-acidity coffee concentrate perfect for iced drinks.",
        history: "Cold brew coffee has roots in 17th-century Japan, where it was known as 'Kyoto-style' coffee. Modern cold brew gained popularity in the United States in the 2010s, particularly in specialty coffee shops, as a smoother alternative to iced coffee made from hot-brewed coffee.",
        explanation: "Cold extraction fundamentally changes coffee chemistry. Without heat, fewer acids and bitter compounds dissolve, while sugars and flavor compounds extract slowly over 12-24 hours. The coarse grind prevents over-extraction and makes filtering easier. The 1:8 ratio creates a concentrate that can be diluted 1:1 with water or milk. The extended steeping time allows for full extraction of desirable compounds without the harshness of hot brewing. Cold brew is naturally sweeter and less acidic, making it ideal for those sensitive to coffee's acidity. The concentrate can be stored refrigerated for up to two weeks.",
        steps: [
          { time: 0, description: "Combine coffee and cold water (304g).", waterAmount: 304, isPour: true },
          { time: 5, description: "Stir gently to ensure all grounds are wet.", isPour: false },
          { time: 10, description: "Cover and steep at room temperature for 12-24 hours.", isPour: false },
          { time: 43200, description: "Filter through fine mesh or paper filter.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "moka-pot",
    name: "Moka Pot",
    description: "A stovetop brewer that uses steam pressure to force water through finely ground coffee, producing a strong, espresso-like brew.",
    icon: "Flame",
    techniques: [
      {
        name: "Standard Moka Pot",
        ratio: 7, // 1:7 (stronger than espresso) - 43g coffee to 301g water
        defaultCoffeeAmount: 43,
        grindSize: "Fine",
        waterTemp: 100, // Boiling water in bottom chamber
        totalTime: 300, // 5:00
        description: "Classic stovetop espresso-style coffee.",
        history: "The Moka Pot was invented in 1933 by Italian engineer Alfonso Bialetti. Its iconic octagonal design and mustachioed mascot 'Omino coi baffi' made it a symbol of Italian coffee culture. Over 90% of Italian households own a Moka Pot, making it the most popular home brewing method in Italy.",
        explanation: "The Moka Pot uses steam pressure (about 1.5 bars, much lower than espresso's 9 bars) to force water through coffee grounds. Starting with hot water reduces brewing time and prevents the coffee from being cooked. The fine grind creates resistance, but coarser than espresso to prevent clogging. The key is controlling heat—too high and the coffee burns; too low and extraction is incomplete. The gurgling sound indicates the process is complete. Moka Pot coffee is stronger than drip but milder than espresso, with a rich, full-bodied flavor. It's perfect for making Italian-style coffee at home without expensive equipment.",
        steps: [
          { time: 0, description: "Fill bottom chamber with hot water up to safety valve.", waterAmount: 301, isPour: true },
          { time: 5, description: "Fill filter basket with coffee, level but don't tamp.", isPour: false },
          { time: 10, description: "Assemble pot and place on medium heat.", isPour: false },
          { time: 120, description: "Coffee should start flowing into top chamber.", isPour: false },
          { time: 240, description: "Reduce heat as coffee flows.", isPour: false },
          { time: 300, description: "Remove from heat when gurgling sound appears. Serve immediately.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "clever-dripper",
    name: "Clever Dripper",
    description: "A hybrid immersion and pour-over brewer with a valve mechanism, combining the best of both brewing styles.",
    icon: "Droplet",
    techniques: [
      {
        name: "Standard Clever Dripper",
        ratio: 16, // 19g coffee to 304g water
        defaultCoffeeAmount: 19,
        grindSize: "Medium-Coarse",
        waterTemp: 96,
        totalTime: 240, // 4:00 (2 min steep + 2 min drawdown)
        description: "Full immersion followed by clean filtered drawdown.",
        history: "The Clever Dripper was introduced in 2005, combining the best aspects of French Press (full immersion) and pour-over (paper filtration). Its innovative valve mechanism allows for steeping before controlled release, making it one of the most forgiving brewing methods.",
        explanation: "The Clever Dripper's genius lies in its valve mechanism. When placed on a carafe, the valve opens, allowing coffee to drain. During steeping, the valve remains closed, ensuring full immersion extraction. This combines the even extraction of immersion brewing with the clarity of paper filtration. The medium-coarse grind prevents over-extraction during the steep while allowing reasonable drawdown time. The 2-minute steep ensures full saturation, while the 2-minute drawdown provides clean filtration. This method is extremely forgiving—timing is less critical than other methods, making it perfect for beginners or when you need consistent results without constant attention.",
        steps: [
          { time: 0, description: "Place filter and rinse with hot water.", isPour: true },
          { time: 5, description: "Add coffee and pour all water (304g).", waterAmount: 304, isPour: true },
          { time: 10, description: "Stir gently to ensure saturation.", isPour: false },
          { time: 120, description: "Place on carafe to open valve and begin drawdown.", isPour: false },
          { time: 240, description: "Drawdown complete. Remove dripper.", isPour: false },
        ],
      },
    ],
  },
  {
    id: "siphon",
    name: "Siphon (Vacuum Pot)",
    description: "A visually impressive method using vapor pressure and vacuum to brew coffee, resulting in a clean and aromatic cup.",
    icon: "Flask",
    techniques: [
      {
        name: "Standard Siphon",
        ratio: 16, // 19g coffee to 304g water
        defaultCoffeeAmount: 19,
        grindSize: "Medium",
        waterTemp: 100,
        totalTime: 420, // 7:00
        description: "Theatrical brewing with exceptional clarity.",
        history: "The vacuum coffee maker, or siphon, was invented in the 1840s by a French housewife and later refined by German inventor Loeff. It became popular in the 19th century before falling out of favor. Modern siphon brewing experienced a revival in specialty coffee shops in the 2000s, prized for its theatrical presentation and clean results.",
        explanation: "Siphon brewing uses vapor pressure and vacuum to create a unique extraction process. As the bottom chamber heats, vapor pressure forces water into the top chamber. When heat is removed, a vacuum forms, pulling the brewed coffee back down through a cloth filter. The medium grind allows proper flow while maintaining extraction. The full immersion in the top chamber ensures even extraction, while the cloth filter provides clarity without removing oils like paper filters. The process requires careful heat management—too much heat creates excessive pressure, while too little prevents proper vacuum formation. The result is an exceptionally clean, aromatic cup with bright acidity and delicate flavors, making it ideal for showcasing high-quality, complex coffees.",
        steps: [
          { time: 0, description: "Fill bottom chamber with water (304g).", waterAmount: 304, isPour: true },
          { time: 60, description: "Heat bottom chamber until water rises to top. Add coffee to top chamber when water rises.", isPour: false },
          { time: 90, description: "Stir gently for 10 seconds.", isPour: false },
          { time: 180, description: "Remove heat source.", isPour: false },
          { time: 240, description: "Coffee draws down to bottom chamber.", isPour: false },
          { time: 420, description: "Brewing complete. Serve from bottom chamber.", isPour: false },
        ],
      },
    ],
  },
];

