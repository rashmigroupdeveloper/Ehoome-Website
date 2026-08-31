// Placeholder content — copy and stats are drafted from facts already published
// elsewhere on the site (Home stat bar, Quality page certifications) and are
// meant to be edited with real per-product figures.

const FACTORY = {
  process: [
    '/assets/ehome-iot-img/Factory View/img_1.jpeg',
    '/assets/ehome-iot-img/Factory View/img_6.jpeg',
    '/assets/ehome-iot-img/Factory View/img_9.jpeg',
  ],
  engineered: [
    '/assets/ehome-iot-img/Factory View/img_4.jpeg',
    '/assets/ehome-iot-img/Factory View/img_8.jpeg',
    '/assets/ehome-iot-img/Factory View/img_11.jpeg',
  ],
  scale: [
    '/assets/ehome-iot-img/Factory View/img_3.jpeg',
    '/assets/ehome-iot-img/Factory View/img_7.jpeg',
    '/assets/ehome-iot-img/Factory View/img_13.jpeg',
  ],
};

// Shared across every product page — same facility, same certifications.
export const SCALE_STATS = [
  { value: '50,000', label: 'Sq ft production floor', image: FACTORY.scale[0] },
  { value: '450K', label: 'Units/month capacity', image: FACTORY.scale[1] },
  { value: '9M', label: 'Components placed/day', image: FACTORY.scale[2] },
];

export const ENGINEERED_TILES = [
  { type: 'image', image: FACTORY.engineered[0] },
  { type: 'color', color: 'ink', title: 'Certified Quality Systems', description: 'ISO 9001, ISO 14001 and ISO 45001 govern every stage of the line.' },
  { type: 'color', color: 'rashmi', title: 'Backed by the Rashmi Group', description: '29 companies strong, with the scale to support long production runs.' },
  { type: 'image', image: FACTORY.engineered[1] },
  { type: 'image', image: FACTORY.engineered[2] },
  { type: 'color', color: 'moss', title: 'PLI-Approved Manufacturing', description: "Recognised under the Government of India's PLI scheme for networking hardware." },
];

export const CLOSING_FEATURES = [
  { title: 'Smart Factories, Smarter Processes', description: 'Industry 4.0-enabled lines with automated placement, AOI and X-ray inspection for unmatched precision.' },
  { title: 'Certified Quality Assurance', description: 'ISO 9001, ISO 14001 and ISO 45001 certifications ensure consistent, compliant output.' },
  { title: 'Scalable & Sustainable', description: '450K units/month capacity, built on energy-conscious, high-volume production.' },
  { title: 'Collaborative Expertise', description: 'Our in-house engineering team works closely with your brand from design to delivery.' },
];

export const productDetails = {
  'un-managed': {
    name: 'Unmanaged Switches',
    tagline: 'Simple, reliable network switching',
    heroImage: '/assets/ehome-iot-img/Products/Switch Series/MMS6710-P.jpeg',
    introHeading: ['Plug-and-Play Networking,', 'Built to Last'],
    processSteps: [
      { title: 'PCB & SMT Assembly', description: 'High-speed placement and reflow for dense switch boards.', image: FACTORY.process[0] },
      { title: 'Box Build & Firmware', description: 'Enclosure assembly with firmware flashed and verified.', image: FACTORY.process[1] },
      { title: 'Functional Testing', description: 'Every port and unit burned in before it ships.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'Unmanaged switches look simple — the manufacturing behind them isn’t. We hold tight tolerances on port timing and thermal performance so they run silent for years.',
  },
  'managed-switches': {
    name: 'Managed Switches',
    tagline: 'Reliable connectivity, built to scale',
    heroImage: '/assets/ehome-iot-img/Products/Switch Series/MMS6728-P.jpeg',
    introHeading: ['Built for Every Point', 'in the Network'],
    processSteps: [
      { title: 'PCB & SMT Assembly', description: 'Automated placement and AOI on every board.', image: FACTORY.process[0] },
      { title: 'Box Build & Config', description: 'Enclosure build with management firmware provisioned.', image: FACTORY.process[1] },
      { title: 'RF & Functional Test', description: 'Full port, PoE and stacking validation before packing.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'From campus L2/L3 to industrial PoE and data-centre switching, our lines are configured to hold consistent quality across every SKU variant.',
  },
  poe: {
    name: 'PoE Solutions',
    tagline: 'Power and data, one cable',
    heroImage: '/assets/ehome-iot-img/Products/Home Router Series/AX3000 Router (MWE1024X5).jpeg',
    introHeading: ['Power Delivery You', 'Can Depend On'],
    processSteps: [
      { title: 'PCB & SMT Assembly', description: 'Power-stage components placed and inspected in-line.', image: FACTORY.process[0] },
      { title: 'Safety & Compliance', description: 'Load, thermal and surge testing on every batch.', image: FACTORY.process[1] },
      { title: 'Final QC & Packing', description: '100% functional check before it leaves the floor.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'PoE hardware lives at the intersection of power and data — our test benches validate both under real load before a unit is approved to ship.',
  },
  'sotto-router': {
    name: 'Sotto Router',
    tagline: 'Whole-home Wi-Fi, simplified',
    heroImage: '/assets/ehome-iot-img/Products/Mi-Fi & LTE CPE Series/5G CPE (EC5E422Y).jpeg',
    introHeading: ['Connectivity That', 'Just Works'],
    processSteps: [
      { title: 'PCB & SMT Assembly', description: 'RF and digital sections built on dedicated lines.', image: FACTORY.process[0] },
      { title: 'Box Build & Flashing', description: 'Enclosure assembly with firmware and app pairing.', image: FACTORY.process[1] },
      { title: 'RF & Range Testing', description: 'Signal and throughput verified in a shielded chamber.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'Home routers live in every kind of household — we build and test Sotto for consistent range and throughput regardless of the environment.',
  },
  'idu-odu': {
    name: 'IDU / ODU',
    tagline: 'Indoor and outdoor units for fixed wireless',
    heroImage: '/assets/ehome-iot-img/Products/Access Point Series/Wi-Fi6 AP (MAP-M901).jpeg',
    introHeading: ['Fixed Wireless,', 'Engineered for Field Duty'],
    processSteps: [
      { title: 'PCB & SMT Assembly', description: 'Weatherproof-rated boards built to IP-rated tolerances.', image: FACTORY.process[0] },
      { title: 'Box Build & Sealing', description: 'Enclosure assembly with environmental sealing checks.', image: FACTORY.process[1] },
      { title: 'RF & Environmental Test', description: 'Signal, ingress and thermal cycling before dispatch.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'Outdoor units have to survive the field, not just the lab. Every ODU is built and sealed to hold up against heat, dust and monsoon conditions.',
  },
  'mobile-phones': {
    name: 'Mobile Phones',
    tagline: 'Precision-built handsets, at volume',
    heroImage: '/assets/img/mobile_phone.jpg',
    introHeading: ['Empowering Lives,', 'Redefining Technology'],
    processSteps: [
      { title: 'PCB & SMT Assembly', description: 'Fine-pitch placement for dense mainboards.', image: FACTORY.process[0] },
      { title: 'Box Build & FATP', description: 'Full assembly, test and pack under one roof.', image: FACTORY.process[1] },
      { title: 'Functional & RF Testing', description: 'Camera, RF, touch and battery validated per unit.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'Designing and manufacturing mobile hardware takes in-house expertise from board to box. We deliver innovation at every step, at handset volumes.',
  },
  display: {
    name: 'Display',
    tagline: 'From panel to product',
    heroImage: '/assets/generated/display-panel.webp',
    introHeading: ['Bright Ideas,', 'Engineered to Scale'],
    processSteps: [
      { title: 'Panel Integration', description: 'Panels mated to driver boards under clean-room conditions.', image: FACTORY.process[0] },
      { title: 'Driver Board Assembly', description: 'SMT and functional test on every control board.', image: FACTORY.process[1] },
      { title: 'Calibration & QC', description: 'Colour, brightness and uniformity checked per unit.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'Displays live or die on calibration. Every panel that leaves our line is checked for uniformity, brightness and colour accuracy before it ships.',
  },
  hearables: {
    name: 'Hearables',
    tagline: 'Sound engineering, perfected',
    heroImage: '/assets/img/hearables.jpeg',
    introHeading: ['Small Form,', 'Serious Precision'],
    processSteps: [
      { title: 'SMT & Micro-Assembly', description: 'Fine-pitch placement for compact acoustic PCBs.', image: FACTORY.process[0] },
      { title: 'Acoustic Tuning', description: 'Driver and mic placement tuned for clarity.', image: FACTORY.process[1] },
      { title: 'Pairing & QC Testing', description: 'Bluetooth pairing and battery life verified per unit.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'Hearables pack the most engineering into the least space. Our micro-assembly lines are built for exactly that kind of density and precision.',
  },
  'payment-sound-box': {
    name: 'Payment Sound Box',
    tagline: 'Instant confirmation, every transaction',
    heroImage: '/assets/img/sound_box.webp',
    introHeading: ['Built for the', 'Speed of Retail'],
    processSteps: [
      { title: 'PCB & SMT Assembly', description: 'Connectivity and audio sections built and inspected.', image: FACTORY.process[0] },
      { title: 'Firmware & Connectivity', description: 'SIM/Wi-Fi provisioning and firmware flashed per unit.', image: FACTORY.process[1] },
      { title: 'Functional Testing', description: 'Audio, connectivity and battery verified before packing.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'A payment sound box has to work the first time, every time, in the middle of a transaction. We test connectivity and audio output on every unit.',
  },
  'pd-qc-chargers': {
    name: 'PD-QC Chargers',
    tagline: 'Fast, safe charging for every device',
    heroImage: '/assets/img/prod-charger.png',
    introHeading: ['Fast Charging,', 'Engineered Safe'],
    processSteps: [
      { title: 'SMT Assembly', description: 'Power electronics placed and reflowed to spec.', image: FACTORY.process[0] },
      { title: 'Safety & Compliance', description: 'Overload, thermal and short-circuit testing per batch.', image: FACTORY.process[1] },
      { title: 'Final QC & Packing', description: '100% functional and safety check before dispatch.', image: FACTORY.process[2] },
    ],
    engineeredParagraph: 'Charging hardware carries real safety stakes. Every PD-QC charger is load-tested and safety-checked before it’s approved to ship.',
  },
};

export function getProductDetail(slug) {
  return productDetails[slug];
}
