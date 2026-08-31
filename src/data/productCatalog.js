// Hardware lookbook catalog for /products.
// Groups all 10 OEM lines into four scroll chapters with correct detail slugs.

export const CATALOG_CHAPTERS = [
  {
    id: 'switching',
    label: 'Switching',
    title: 'Switching',
    sentence: 'Managed, unmanaged and PoE — chassis the OEM ships under its own name.',
    media: {
      image: '/assets/stock/products/switching-hero.jpg',
      video: '/assets/stock/products/switching-smt.mp4',
      poster: '/assets/stock/products/switching-poster.jpg',
    },
    skus: [
      {
        slug: 'un-managed',
        name: 'Unmanaged Switches',
        tagline: 'Simple, reliable network switching',
        image: '/assets/ehome-iot-img/Products/Switch Series/MMS6710-P.jpeg',
        chips: ['Plug-and-play', '8–48 ports', 'Desktop / rack'],
      },
      {
        slug: 'managed-switches',
        name: 'Managed Switches',
        tagline: 'Reliable connectivity, built to scale',
        image: '/assets/ehome-iot-img/Products/Switch Series/MMS6728-P.jpeg',
        chips: ['L2 / L3', 'PoE to 90 W', 'Campus / industrial'],
      },
      {
        slug: 'poe',
        name: 'PoE Solutions',
        tagline: 'Power and data, one cable',
        image: '/assets/ehome-iot-img/Products/Home Router Series/AX3000 Router (MWE1024X5).jpeg',
        chips: ['802.3af / at / bt', 'Load tested', 'Thermal soak'],
      },
    ],
  },
  {
    id: 'access',
    label: 'Access',
    title: 'Access & wireless',
    sentence: 'Last-mile and wireless hardware for fibre, CPE and fixed outdoor duty.',
    media: {
      image: '/assets/stock/products/access-hero.jpg',
      video: null,
      poster: '/assets/stock/products/access-hero.jpg',
    },
    skus: [
      {
        slug: 'sotto-router',
        name: 'Sotto Router',
        tagline: 'Whole-home Wi-Fi, simplified',
        image: '/assets/ehome-iot-img/Products/Mi-Fi & LTE CPE Series/5G CPE (EC5E422Y).jpeg',
        chips: ['Wi-Fi 6', 'CPE / mesh', 'RF chamber tested'],
      },
      {
        slug: 'idu-odu',
        name: 'IDU / ODU',
        tagline: 'Indoor and outdoor units for fixed wireless',
        image: '/assets/ehome-iot-img/Products/Access Point Series/Wi-Fi6 AP (MAP-M901).jpeg',
        chips: ['IP-rated ODU', 'Wi-Fi 6 AP', 'Field sealed'],
      },
    ],
  },
  {
    id: 'power',
    label: 'Power',
    title: 'Power',
    sentence: 'PD and Quick Charge bricks built on the same floor as the networking lines.',
    media: {
      image: '/assets/stock/products/power-hero.jpg',
      video: null,
      poster: '/assets/stock/products/power-hero.jpg',
    },
    skus: [
      {
        slug: 'pd-qc-chargers',
        name: 'PD-QC Chargers',
        tagline: 'Fast, safe charging for every device',
        image: '/assets/img/prod-charger.png',
        chips: ['USB-PD', 'Quick Charge', 'Safety burned-in'],
      },
    ],
  },
  {
    id: 'devices',
    label: 'Devices',
    title: 'Devices',
    sentence: 'Handsets, panels, hearables and retail sound — volume programmes under one roof.',
    media: {
      image: '/assets/stock/products/devices-hero.jpg',
      video: null,
      poster: '/assets/stock/products/devices-hero.jpg',
    },
    skus: [
      {
        slug: 'mobile-phones',
        name: 'Mobile Phones',
        tagline: 'Precision-built handsets, at volume',
        image: '/assets/img/mobile_phone.jpg',
        chips: ['PCBA → FATP', 'RF / camera QC', 'ODM / JDM'],
      },
      {
        slug: 'display',
        name: 'Display',
        tagline: 'From panel to product',
        image: '/assets/generated/display-panel.webp',
        chips: ['Panel + driver', 'Colour calibrated', 'Uniformity QC'],
      },
      {
        slug: 'hearables',
        name: 'Hearables',
        tagline: 'Sound engineering, perfected',
        image: '/assets/img/hearables.jpeg',
        chips: ['Micro-assembly', 'BT pairing', 'Acoustic tune'],
      },
      {
        slug: 'payment-sound-box',
        name: 'Payment Sound Box',
        tagline: 'Instant confirmation, every transaction',
        image: '/assets/img/sound_box.webp',
        chips: ['SIM / Wi-Fi', 'Audio verified', 'Retail ready'],
      },
    ],
  },
];

export const CATALOG_SKU_COUNT = CATALOG_CHAPTERS.reduce((n, c) => n + c.skus.length, 0);

export const CATALOG_INDEX = CATALOG_CHAPTERS.map((c) => ({
  id: c.id,
  label: c.label,
  count: c.skus.length,
}));
