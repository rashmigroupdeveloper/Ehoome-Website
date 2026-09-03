// Product-led entry into the configurator.
//
// A buyer does not arrive thinking "6 layer, mixed assembly, BGA". They arrive
// thinking "a 24-port PoE switch". So the family is picked first, and the
// manufacturing spec it implies is filled in behind them — visible in the
// traveller, overridable under Advanced, but never a form they have to complete
// before the page tells them anything.

export const FAMILIES = [
  {
    id: 'switch',
    label: 'Managed switch',
    tagline: 'Campus and industrial switching, PoE to 90 W.',
    photo: '/assets/ehome-iot-img/Products/Switch Series/MMS6728-P.jpeg',
    chassis: '1U steel chassis',
    groups: [
      { id: 'access', label: 'Access ports', type: 'scale', steps: [8, 16, 24, 48], suffix: '× RJ45' },
      {
        id: 'uplink',
        label: 'Uplinks',
        options: [
          { id: 'none', label: 'None' },
          { id: 'sfp2', label: '2× SFP' },
          { id: 'sfp4', label: '4× SFP+' },
        ],
      },
      {
        id: 'poe',
        label: 'PoE budget',
        options: [
          { id: 'none', label: 'No PoE' },
          { id: 'af', label: '802.3af', note: '15.4 W' },
          { id: 'at', label: '802.3at', note: '30 W' },
          { id: 'bt', label: '802.3bt', note: '90 W' },
        ],
      },
      {
        id: 'mgmt',
        label: 'Management',
        options: [
          { id: 'unmanaged', label: 'Unmanaged' },
          { id: 'l2', label: 'L2 managed' },
          { id: 'l3', label: 'L3 lite' },
        ],
      },
      {
        id: 'form',
        label: 'Form factor',
        options: [
          { id: 'desktop', label: 'Desktop' },
          { id: 'rack', label: '1U rack' },
          { id: 'din', label: 'DIN rail' },
        ],
      },
      {
        id: 'temp',
        label: 'Temperature grade',
        options: [
          { id: 'commercial', label: 'Commercial', note: '0 to 45 °C' },
          { id: 'industrial', label: 'Industrial', note: '−40 to 75 °C' },
        ],
      },
    ],
    defaults: { access: 24, uplink: 'sfp2', poe: 'at', mgmt: 'l2', form: 'rack', temp: 'commercial' },
    refine: (s) => ({
      mfg: { enclosure: s.form === 'desktop' ? ['plastic'] : ['metal'] },
      inspection:
        s.temp === 'industrial'
          ? [{ label: 'Extended temperature soak', reason: '−40 to 75 °C grade claimed', locked: true }]
          : [],
      flags:
        s.temp === 'industrial'
          ? ['Industrial grade changes the BOM before it changes the line — connectors, magnetics and electrolytics all need the wider rating confirmed.']
          : [],
      inputs: s.form === 'din' ? ['DIN clip drawing and rail standard'] : [],
    }),
    implies: {
      programme: 'box', layers: '6', assembly: 'mixed', package: 'bga',
      standard: 'class2', enclosure: ['metal'], test: ['fct', 'poe'],
      release: ['serial', 'retail'],
    },
    chassisFor: (s) => ({ desktop: 'Moulded desktop housing', rack: '1U steel chassis', din: 'DIN rail chassis' }[s.form]),
    faceplate: (s) => ({
      rows: [
        { type: 'rj45', count: s.access, label: `${s.access}× RJ45${s.poe === 'none' ? '' : ' PoE'}` },
        ...(s.uplink === 'sfp2' ? [{ type: 'sfp', count: 2, label: '2× SFP uplink' }] : []),
        ...(s.uplink === 'sfp4' ? [{ type: 'sfp', count: 4, label: '4× SFP+ uplink' }] : []),
        { type: 'dc', count: 1, label: 'Internal PSU' },
      ],
      antennas: 0,
    }),
  },
  {
    id: 'olt',
    label: 'GPON / EPON OLT',
    tagline: 'Fibre head-end for the access network.',
    photo: '/assets/ehome-iot-img/Products/OLT Series/8 PORT GPON OLT (EC2108P2).jpeg',
    chassis: '1U rack, dual PSU',
    groups: [
      { id: 'pon', label: 'PON ports', type: 'scale', steps: [4, 8, 16], suffix: '× PON' },
      {
        id: 'standard',
        label: 'PON standard',
        options: [
          { id: 'epon', label: 'EPON' },
          { id: 'gpon', label: 'GPON' },
          { id: 'xgs', label: 'XGS-PON' },
        ],
      },
      {
        id: 'uplink',
        label: 'Uplinks',
        options: [
          { id: 'ge4', label: '4× GE' },
          { id: 'sfp4', label: '4× SFP+' },
          { id: 'sfp8', label: '8× SFP+' },
        ],
      },
      {
        id: 'psu',
        label: 'Power',
        options: [
          { id: 'ac', label: 'AC single' },
          { id: 'dual', label: 'AC + DC redundant' },
          { id: 'dc', label: '-48 V DC' },
        ],
      },
    ],
    defaults: { pon: 8, standard: 'gpon', uplink: 'sfp4', psu: 'dual' },
    implies: {
      programme: 'box', layers: '8', assembly: 'mixed', package: 'ubga',
      standard: 'class3', enclosure: ['metal', 'hipot'], test: ['fct', 'bosa', 'rf', 'ageing'],
      release: ['serial', 'retail'],
    },
    faceplate: (s) => ({
      rows: [
        { type: 'pon', count: s.pon, label: `${s.pon}× ${s.standard.toUpperCase()}` },
        { type: 'sfp', count: s.uplink === 'sfp8' ? 8 : 4, label: s.uplink === 'ge4' ? '4× GE uplink' : `${s.uplink === 'sfp8' ? 8 : 4}× SFP+ uplink` },
        { type: 'dc', count: s.psu === 'dual' ? 2 : 1, label: s.psu === 'dual' ? 'Redundant PSU' : 'Single PSU' },
      ],
      antennas: 0,
    }),
  },
  {
    id: 'ont',
    label: 'ONT / CPE',
    tagline: 'Subscriber-side fibre termination.',
    photo: '/assets/ehome-iot-img/Products/ONT Series/AC1200 GPON ONT (EC3142Z).jpeg',
    chassis: 'Moulded desktop housing',
    groups: [
      { id: 'lan', label: 'LAN ports', type: 'scale', steps: [1, 2, 4], suffix: '× RJ45' },
      {
        id: 'wifi',
        label: 'Wi-Fi',
        options: [
          { id: 'none', label: 'Wired only' },
          { id: 'ac', label: 'Wi-Fi 5 AC1200' },
          { id: 'ax', label: 'Wi-Fi 6 AX1800' },
        ],
      },
      {
        id: 'voice',
        label: 'Voice',
        options: [
          { id: 'none', label: 'No POTS' },
          { id: 'fxs1', label: '1× FXS' },
          { id: 'fxs2', label: '2× FXS' },
        ],
      },
      {
        id: 'poeout',
        label: 'PoE out',
        options: [
          { id: 'none', label: 'None' },
          { id: 'lan1', label: 'PoE on LAN1', note: 'Powers a camera or AP' },
        ],
      },
    ],
    defaults: { lan: 4, wifi: 'ax', voice: 'fxs1', poeout: 'none' },
    refine: (s) => ({
      inspection:
        s.poeout === 'lan1'
          ? [{ label: 'PoE injection and load test', reason: 'Power sourcing on LAN1', locked: true }]
          : [],
    }),
    implies: {
      programme: 'box', layers: '4', assembly: 'mixed', package: 'bga',
      standard: 'class2', enclosure: ['plastic'], test: ['fct', 'rf', 'bosa'],
      release: ['serial', 'retail'],
    },
    faceplate: (s) => ({
      rows: [
        { type: 'pon', count: 1, label: 'PON uplink' },
        { type: 'rj45', count: s.lan, label: `${s.lan}× RJ45 LAN` },
        ...(s.voice !== 'none' ? [{ type: 'rj45', count: s.voice === 'fxs2' ? 2 : 1, label: `${s.voice === 'fxs2' ? 2 : 1}× FXS voice` }] : []),
        { type: 'dc', count: 1, label: '12 V barrel' },
      ],
      antennas: s.wifi === 'ax' ? 4 : s.wifi === 'ac' ? 2 : 0,
    }),
  },
  {
    id: 'ap',
    label: 'Access point',
    tagline: 'Indoor and outdoor Wi-Fi at density.',
    photo: '/assets/ehome-iot-img/Products/Access Point Series/Wi-Fi6 AP (MAP-M901).jpeg',
    chassis: 'Ceiling or pole mount',
    groups: [
      {
        id: 'radio',
        label: 'Radio',
        options: [
          { id: 'ac', label: 'Wi-Fi 5' },
          { id: 'ax', label: 'Wi-Fi 6' },
          { id: 'axe', label: 'Wi-Fi 6E', note: '6 GHz' },
        ],
      },
      { id: 'chains', label: 'Antenna chains', type: 'scale', steps: [2, 4, 8], suffix: '× chain' },
      {
        id: 'mount',
        label: 'Deployment',
        options: [
          { id: 'indoor', label: 'Indoor' },
          { id: 'outdoor', label: 'Outdoor', note: 'IP67' },
        ],
      },
      {
        id: 'power',
        label: 'Power',
        options: [
          { id: 'poe', label: 'PoE in' },
          { id: 'poeplus', label: 'PoE+ in' },
          { id: 'dc', label: 'DC adapter' },
        ],
      },
    ],
    defaults: { radio: 'ax', chains: 4, mount: 'indoor', power: 'poeplus' },
    implies: {
      programme: 'box', layers: '6', assembly: 'mixed', package: 'bga',
      standard: 'class2', enclosure: ['plastic'], test: ['fct', 'rf', 'poe'],
      release: ['serial', 'retail'],
    },
    faceplate: (s) => ({
      rows: [
        { type: 'rj45', count: 1, label: s.power === 'dc' ? '1× RJ45 uplink' : '1× RJ45 PoE in' },
        ...(s.power === 'dc' ? [{ type: 'dc', count: 1, label: '12 V barrel' }] : []),
      ],
      antennas: s.chains,
    }),
  },
  {
    id: 'router',
    label: 'Router / Mi-Fi',
    tagline: 'Home and enterprise access, LTE and 5G.',
    photo: '/assets/ehome-iot-img/Products/Mi-Fi & LTE CPE Series/5G CPE (EC5E422Y).jpeg',
    chassis: 'Moulded desktop housing',
    groups: [
      { id: 'lan', label: 'LAN ports', type: 'scale', steps: [0, 1, 2, 4], suffix: '× RJ45' },
      {
        id: 'wan',
        label: 'WAN',
        options: [
          { id: 'eth', label: 'Ethernet' },
          { id: 'lte', label: '4G LTE Cat 4' },
          { id: 'lte6', label: '4G LTE Cat 6' },
          { id: 'nr', label: '5G NR' },
        ],
      },
      {
        id: 'wifi',
        label: 'Wi-Fi',
        options: [
          { id: 'n', label: 'N300' },
          { id: 'ac', label: 'AC1200' },
          { id: 'ax', label: 'AX1800' },
          { id: 'ax3', label: 'AX3000' },
        ],
      },
      {
        id: 'battery',
        label: 'Battery',
        options: [
          { id: 'none', label: 'Mains only' },
          { id: 'li', label: 'Li-ion pack' },
        ],
      },
    ],
    defaults: { lan: 4, wan: 'nr', wifi: 'ax', battery: 'none' },
    implies: {
      programme: 'box', layers: '6', assembly: 'mixed', package: 'bga',
      standard: 'class2', enclosure: ['plastic'], test: ['fct', 'rf'],
      release: ['serial', 'retail', 'cert'],
    },
    faceplate: (s) => ({
      rows: [
        ...(s.wan === 'eth' ? [{ type: 'rj45', count: 1, label: '1× RJ45 WAN' }] : [{ type: 'sim', count: 1, label: `SIM — ${s.wan === 'nr' ? '5G NR' : 'LTE'}` }]),
        ...(s.lan > 0 ? [{ type: 'rj45', count: s.lan, label: `${s.lan}× RJ45 LAN` }] : []),
        ...(s.battery === 'li' ? [{ type: 'usbc', count: 1, label: 'USB-C charge' }] : [{ type: 'dc', count: 1, label: '12 V barrel' }]),
      ],
      antennas: s.wifi === 'ax3' ? 4 : s.wifi === 'n' ? 2 : 3,
    }),
  },
  {
    id: 'charger',
    label: 'PD / QC charger',
    tagline: 'USB-PD and Quick Charge on the same floor.',
    photo: '/assets/img/prod-charger.png',
    chassis: 'Moulded wall plug',
    groups: [
      { id: 'usbc', label: 'USB-C ports', type: 'scale', steps: [1, 2, 3], suffix: '× USB-C' },
      { id: 'usba', label: 'USB-A ports', type: 'scale', steps: [0, 1, 2], suffix: '× USB-A' },
      {
        id: 'watt',
        label: 'Total output',
        options: [
          { id: '20', label: '20 W' },
          { id: '45', label: '45 W' },
          { id: '65', label: '65 W', note: 'GaN' },
          { id: '140', label: '140 W', note: 'GaN' },
        ],
      },
      {
        id: 'protocols',
        label: 'Fast-charge protocols',
        multi: true,
        options: [
          { id: 'pd', label: 'USB PD 3.1', note: 'Open standard' },
          { id: 'pps', label: 'PPS', note: 'Programmable supply' },
          { id: 'qc', label: 'Quick Charge 4+', note: 'Qualcomm' },
          { id: 'vooc', label: 'VOOC', note: 'OPPO, licensed' },
          { id: 'svooc', label: 'SuperVOOC', note: 'OPPO, licensed' },
          { id: 'afc', label: 'AFC', note: 'Samsung' },
          { id: 'fcp', label: 'FCP / SCP', note: 'Huawei' },
        ],
      },
      {
        id: 'plug',
        label: 'Plug standard',
        multi: true,
        options: [
          { id: 'in', label: 'India — Type D' },
          { id: 'eu', label: 'Europe — Type C' },
          { id: 'uk', label: 'UK — Type G' },
          { id: 'us', label: 'US — Type A/B' },
        ],
      },
    ],
    defaults: { usbc: 2, usba: 1, watt: '65', protocols: ['pd', 'pps', 'vooc'], plug: ['in'] },
    refine: (s) => {
      const licensed = ['vooc', 'svooc'].filter((id) => s.protocols.includes(id));
      return {
        inspection: s.protocols.length
          ? [{
              label: 'Fast-charge protocol conformance',
              reason: `${s.protocols.length} protocol${s.protocols.length > 1 ? 's' : ''} negotiated on the bench`,
              locked: true,
            }]
          : [],
        inputs: [
          ...(s.protocols.length ? ['Protocol matrix and negotiation limits'] : []),
          ...(licensed.length ? ['Licence agreement or authorised controller part number'] : []),
          ...(s.plug.length > 1 ? ['Plug pin drawings for each market'] : []),
        ],
        flags: [
          ...(licensed.length
            ? [`${licensed.map((id) => (id === 'vooc' ? 'VOOC' : 'SuperVOOC')).join(' and ')} are licensed protocols. We need the licence agreement or the authorised controller part number before we can quote — the silicon is not open market.`]
            : []),
          ...(Number(s.watt) >= 140
            ? ['At 140 W the thermal design drives the enclosure, not the other way round. Expect a thermal review before tooling is cut.']
            : []),
          ...(s.plug.length > 1
            ? [`${s.plug.length} plug standards means ${s.plug.length} safety files and ${s.plug.length} tooling inserts. Worth confirming which markets ship first.`]
            : []),
        ],
      };
    },
    implies: {
      programme: 'box', layers: '2', assembly: 'mixed', package: '0402',
      standard: 'class2', enclosure: ['plastic', 'hipot'], test: ['fct', 'env'],
      release: ['retail', 'cert'],
    },
    faceplate: (s) => ({
      rows: [
        { type: 'usbc', count: s.usbc, label: `${s.usbc}× USB-C PD` },
        ...(s.usba > 0 ? [{ type: 'usba', count: s.usba, label: `${s.usba}× USB-A QC` }] : []),
      ],
      antennas: 0,
    }),
  },
  {
    id: 'soundbox',
    label: 'Payment sound box',
    tagline: 'Merchant audio confirmation over cellular.',
    photo: '/assets/img/sound_box.webp',
    chassis: 'Moulded handheld shell',
    groups: [
      {
        id: 'net',
        label: 'Connectivity',
        options: [
          { id: 'wifi', label: 'Wi-Fi only' },
          { id: 'lte', label: '4G LTE' },
          { id: 'both', label: '4G + Wi-Fi' },
        ],
      },
      {
        id: 'display',
        label: 'Display',
        options: [
          { id: 'none', label: 'Audio only' },
          { id: 'led', label: 'LED segment' },
          { id: 'lcd', label: 'Colour LCD' },
        ],
      },
      {
        id: 'battery',
        label: 'Battery',
        options: [
          { id: '2000', label: '2000 mAh' },
          { id: '4000', label: '4000 mAh' },
        ],
      },
      {
        id: 'mount',
        label: 'Mounting',
        options: [
          { id: 'handheld', label: 'Handheld' },
          { id: 'counter', label: 'Counter stand' },
          { id: 'wall', label: 'Wall bracket' },
        ],
      },
    ],
    defaults: { net: 'both', display: 'led', battery: '4000', mount: 'counter' },
    implies: {
      programme: 'box', layers: '4', assembly: 'mixed', package: 'bga',
      standard: 'class2', enclosure: ['plastic'], test: ['fct', 'rf', 'ageing'],
      release: ['serial', 'retail', 'cert'],
    },
    faceplate: (s) => ({
      rows: [
        { type: 'speaker', count: 1, label: 'Speaker driver' },
        ...(s.net !== 'wifi' ? [{ type: 'sim', count: 1, label: 'SIM — 4G LTE' }] : []),
        { type: 'usbc', count: 1, label: `USB-C — ${s.battery} mAh` },
      ],
      antennas: s.net === 'both' ? 2 : 1,
    }),
  },
];

export const familyById = (id) => FAMILIES.find((f) => f.id === id) ?? FAMILIES[0];

export function defaultProductSelection() {
  return Object.fromEntries(FAMILIES.map((f) => [f.id, { ...f.defaults }]));
}

// A one-line human summary of the SKU, used in the traveller and the enquiry.
export function describeSku(family, sel) {
  const parts = family.groups.flatMap((g) => {
    const value = sel[g.id];
    if (g.type === 'scale') return [`${value}${g.suffix ?? ''}`];
    if (g.multi) {
      if (!value?.length) return [];
      return [value.map((id) => g.options.find((o) => o.id === id)?.label ?? id).join(' + ')];
    }
    return [g.options.find((o) => o.id === value)?.label ?? value];
  });
  return `${family.label}: ${parts.join(', ')}`;
}
