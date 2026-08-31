// The configurator's domain model.
//
// Everything derived here traces back to a real figure on the Capabilities page
// — 2 SMT lines, 2 MI/DIP, 7 FATP, four QC gates, 450,000 units a month mixed,
// MES serialisation, the RF/BOSA/PoE benches. Nothing is invented, and there is
// deliberately no price: an EMS quote needs a BOM, and a number pulled from the
// air would be the one thing on this page a buyer could catch us out on.

export const PLANT_MONTHLY_CAPACITY = 450000;

export const VOLUME_STEPS = [250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000];

export const STAGES = [
  {
    id: 'programme',
    label: 'Programme',
    question: 'What are we building?',
    options: [
      { id: 'btp', label: 'Build to print', note: 'Your design, our line.' },
      { id: 'box', label: 'PCBA + box build', note: 'Board through to sealed carton.' },
      { id: 'odm', label: 'Turnkey ODM', note: 'We design, certify and build.' },
      { id: 'rework', label: 'Rework programme', note: 'Field returns and repair.' },
    ],
  },
  {
    id: 'layers',
    label: 'Board',
    question: 'How many layers?',
    options: [
      { id: '2', label: '2 layer' },
      { id: '4', label: '4 layer' },
      { id: '6', label: '6 layer' },
      { id: '8', label: '8+ layer' },
    ],
  },
  {
    id: 'assembly',
    label: 'Assembly',
    question: 'What sits on the board?',
    options: [
      { id: 'smt', label: 'SMT only', note: 'Surface mount throughout.' },
      { id: 'mixed', label: 'SMT + through-hole', note: 'Connectors, magnetics, headers.' },
      { id: 'press', label: 'SMT + THT + press-fit', note: 'Backplane and high-current parts.' },
    ],
  },
  {
    id: 'package',
    label: 'Density',
    question: 'Finest package on the BOM?',
    options: [
      { id: '0402', label: '0402 and larger' },
      { id: '0201', label: '0201' },
      { id: 'bga', label: 'BGA' },
      { id: 'ubga', label: 'µBGA / fine pitch' },
    ],
  },
  {
    id: 'sourcing',
    label: 'Materials',
    question: 'Who buys the components?',
    options: [
      { id: 'turnkey', label: 'Turnkey', note: 'We source the full BOM.' },
      { id: 'consigned', label: 'Consigned', note: 'You ship kits to Noida.' },
      { id: 'hybrid', label: 'Hybrid', note: 'You free-issue the long-lead parts.' },
    ],
  },
  {
    id: 'standard',
    label: 'Standard',
    question: 'Workmanship class?',
    options: [
      { id: 'class2', label: 'IPC-A-610 Class 2', note: 'Dedicated service electronics.' },
      { id: 'class3', label: 'IPC-A-610 Class 3', note: 'High reliability, no compromise.' },
    ],
  },
  {
    id: 'enclosure',
    label: 'Enclosure',
    question: 'What does the box build involve?',
    multi: true,
    when: (sel) => sel.programme === 'box' || sel.programme === 'odm',
    options: [
      { id: 'plastic', label: 'Moulded enclosure', note: 'Snap or screw housing.' },
      { id: 'metal', label: 'Sheet metal chassis', note: 'Rack and wall-mount.' },
      { id: 'harness', label: 'Cable harness', note: 'Loom build and dress.' },
      { id: 'ip', label: 'Sealed to IP rating', note: 'Gasket, vent and leak test.' },
      { id: 'hipot', label: 'HiPot and earth bond', note: 'Mains-facing safety test.' },
    ],
  },
  {
    id: 'test',
    label: 'Test',
    question: 'Which benches does this job need?',
    multi: true,
    options: [
      { id: 'fct', label: 'Functional test bench' },
      { id: 'rf', label: 'RF calibration' },
      { id: 'bosa', label: 'BOSA calibration', note: 'PON optics.' },
      { id: 'poe', label: 'PoE load, all ports' },
      { id: 'env', label: 'Environmental', note: 'Temperature, water, air.' },
      { id: 'ageing', label: 'Powered ageing' },
    ],
  },
  {
    id: 'release',
    label: 'Release',
    question: 'How does it leave the building?',
    multi: true,
    options: [
      { id: 'serial', label: 'MES serialisation', note: 'IMEI, MEID and MAC write.' },
      { id: 'retail', label: 'Retail packing', note: 'Branded carton and insert.' },
      { id: 'cert', label: 'Certification support', note: 'TEC, CE, BIS files.' },
      { id: 'drop', label: 'Direct dispatch', note: 'We ship to your customer.' },
    ],
  },
];

export const DEFAULT_SELECTION = {
  programme: 'box',
  layers: '4',
  assembly: 'mixed',
  package: 'bga',
  sourcing: 'turnkey',
  standard: 'class2',
  enclosure: ['plastic', 'harness'],
  test: ['fct', 'poe'],
  release: ['serial', 'retail'],
  volume: 25000,
};

const LABELS = Object.fromEntries(
  STAGES.map((stage) => [
    stage.id,
    Object.fromEntries(stage.options.map((opt) => [opt.id, opt.label])),
  ])
);

export function labelFor(stageId, optionId) {
  return LABELS[stageId]?.[optionId] ?? optionId;
}

export function formatVolume(units) {
  if (units >= 1000) return `${units / 1000}K`;
  return String(units);
}

const has = (list, id) => Array.isArray(list) && list.includes(id);

// Enclosure answers stay in state when the programme moves away from box build
// so switching back does not wipe them, which means every derivation has to ask
// whether they currently apply rather than just whether they are set.
const isBoxBuild = (sel) => sel.programme === 'box' || sel.programme === 'odm';
const boxHas = (sel, id) => isBoxBuild(sel) && has(sel.enclosure, id);

export function visibleStages(sel) {
  return STAGES.filter((stage) => !stage.when || stage.when(sel));
}

// Which lines the job actually touches. This is the part a manufacturing buyer
// reads first — it tells them whether the plant is shaped like their product.
function routeLines(sel) {
  const lines = [
    { line: 'SMT', count: '2 lines', note: 'Print, place, reflow, inspect.' },
  ];
  if (sel.assembly !== 'smt') {
    lines.push({
      line: 'MI / DIP',
      count: '2 lines',
      note: sel.assembly === 'press' ? 'Wave, press-fit and touch-up.' : 'Insertion, wave solder, touch-up.',
    });
  }
  if (sel.programme === 'box' || sel.programme === 'odm') {
    lines.push({ line: 'FATP', count: '7 lines', note: 'Assembly, provisioning, ageing, packing.' });
  }
  if (sel.programme === 'rework') {
    lines.push({ line: 'Repair cell', count: 'Dedicated', note: 'Diagnosis, reballing, retest.' });
  }
  lines.push({ line: 'Quality', count: '4 gates', note: 'IQC, PQC, FQC, OQC.' });
  return lines;
}

// Inspection is not a menu. Some of it is forced by the board you just
// described, and saying so — with the reason — is the whole point.
function inspectionStack(sel) {
  const stack = [
    { label: 'SPI — 3D paste inspection', reason: 'In-line on both SMT lines', locked: true },
    { label: 'AOI — pre and post reflow', reason: 'In-line on both SMT lines', locked: true },
  ];

  if (sel.package === 'bga' || sel.package === 'ubga') {
    stack.push({
      label: 'X-ray — hidden joints',
      reason: `${labelFor('package', sel.package)} has joints no camera can see`,
      locked: true,
    });
  }
  if (sel.package === 'ubga') {
    stack.push({
      label: 'First-article cross-section',
      reason: 'Fine pitch needs a destructive check on the first panel',
      locked: true,
    });
  }
  if (sel.standard === 'class3') {
    stack.push({
      label: '100% X-ray plus coupon retention',
      reason: 'Class 3 removes the sampling allowance',
      locked: true,
    });
  }
  if (sel.assembly !== 'smt') {
    stack.push({ label: 'Selective touch-up gate', reason: 'Through-hole joints are hand-finished', locked: true });
  }

  if (boxHas(sel, 'ip')) {
    stack.push({
      label: 'Waterproof and airtight test',
      reason: 'An IP claim has to be proven on the line, not on the datasheet',
      locked: true,
    });
  }
  if (boxHas(sel, 'hipot')) {
    stack.push({
      label: 'HiPot and earth continuity',
      reason: 'Mains-facing assembly, 100% tested',
      locked: true,
    });
  }
  if (boxHas(sel, 'harness')) {
    stack.push({ label: 'Harness continuity and pull test', reason: 'Loom build in the FATP cell', locked: true });
  }

  const benches = {
    fct: 'Functional test bench',
    rf: 'Automated RF test and calibration',
    bosa: 'BOSA calibration for PON optics',
    poe: 'PoE load test, all ports',
    env: 'Temperature, waterproof and airtight',
    ageing: 'Powered ageing',
  };
  for (const [id, label] of Object.entries(benches)) {
    if (has(sel.test, id)) stack.push({ label, reason: 'Selected', locked: false });
  }
  return stack;
}

// Weeks, as a band. Ranges rather than a single number because a single number
// would be a promise we cannot keep before seeing a BOM.
function leadTime(sel) {
  let min = 3;
  let max = 4;

  if (sel.volume > 50000) { min += 2; max += 3; }
  else if (sel.volume > 5000) { min += 1; max += 2; }
  else if (sel.volume <= 500) { min -= 1; max -= 1; }

  if (sel.sourcing === 'turnkey') { min += 2; max += 4; }
  else if (sel.sourcing === 'hybrid') { min += 1; max += 2; }

  if (sel.programme === 'odm') { min += 6; max += 10; }
  else if (sel.programme === 'box') { min += 1; max += 1; }
  else if (sel.programme === 'rework') { min = 2; max = 3; }

  if (sel.standard === 'class3') max += 1;
  if (boxHas(sel, 'plastic') || boxHas(sel, 'metal')) { min += 1; max += 2; }
  if (boxHas(sel, 'harness')) max += 1;
  if (has(sel.release, 'cert')) { min += 2; max += 4; }

  const headline = sel.volume <= 500 ? 'First articles' : 'Production release';
  return { min, max, headline };
}

function capacity(sel) {
  const share = (sel.volume / PLANT_MONTHLY_CAPACITY) * 100;
  const pct = share < 1 ? share.toFixed(1) : Math.round(share);
  let verdict = 'Absorbed inside current shift pattern.';
  if (share > 45) verdict = 'Needs the third shift and a scheduled ramp.';
  else if (share > 18) verdict = 'Needs a dedicated line allocation.';
  return { pct, verdict };
}

// What the customer has to hand over. Buyers screenshot this list, which is a
// better outcome for us than another contact form.
function inputsNeeded(sel) {
  if (sel.programme === 'odm') {
    return ['Product requirement brief', 'Target landed cost', 'Target markets for certification', 'Volume forecast by quarter'];
  }
  if (sel.programme === 'rework') {
    return ['Failure symptoms and rate', 'Original build records', 'Return quantity and condition', 'Disposition rules'];
  }
  const inputs = ['Gerber or ODB++', 'BOM with approved MPNs', 'Pick-and-place / CPL file', 'Stencil and paste data'];
  if (sel.test?.length) inputs.push('Test specification and limits');
  if (boxHas(sel, 'plastic') || boxHas(sel, 'metal')) inputs.push('Enclosure STEP model and 2D drawings');
  if (boxHas(sel, 'harness')) inputs.push('Harness drawing and wire schedule');
  if (boxHas(sel, 'ip')) inputs.push('Target IP rating and gasket specification');
  if (has(sel.release, 'retail')) inputs.push('Carton and insert artwork');
  if (sel.sourcing !== 'turnkey') inputs.push('Kit packing list and delivery schedule');
  return inputs;
}

// Notes an engineer would raise on a first read. Framed as consequences, not
// warnings — they exist to prove someone here understands the board.
function flags(sel) {
  const out = [];
  if (sel.package === 'ubga' && sel.layers === '2') {
    out.push('Fine-pitch parts on a 2-layer board usually force a stack-up review before we quote.');
  }
  if (sel.sourcing === 'turnkey' && sel.volume >= 50000) {
    out.push('At this volume turnkey sourcing wants a 12-month forecast so we can hold allocation.');
  }
  if (sel.standard === 'class3' && sel.programme === 'box') {
    out.push('Class 3 through box build means the enclosure and torque steps come under the same audit.');
  }
  if (has(sel.release, 'serial') && sel.programme === 'btp') {
    out.push('Serialisation runs in our MES, so build-to-print still needs your identifier scheme up front.');
  }
  if (has(sel.test, 'bosa') && !has(sel.test, 'rf')) {
    out.push('PON optics normally pair BOSA calibration with the RF bench — worth confirming.');
  }
  if (boxHas(sel, 'ip') && !boxHas(sel, 'plastic') && !boxHas(sel, 'metal')) {
    out.push('An IP rating is a property of the enclosure — tell us who is supplying it before we commit to a seal test.');
  }
  if (boxHas(sel, 'hipot') && sel.standard !== 'class3') {
    out.push('Mains-facing builds usually move to Class 3 workmanship. Worth confirming which standard the safety file assumes.');
  }
  if ((boxHas(sel, 'plastic') || boxHas(sel, 'metal')) && sel.volume >= 50000) {
    out.push('At this volume the enclosure tool becomes the long pole. Tooling lead sits outside the window quoted here.');
  }
  if (sel.assembly === 'press' && sel.volume <= 500) {
    out.push('Press-fit tooling has a fixed setup cost that is hard to absorb at prototype volume.');
  }
  return out;
}

function specCode(sel) {
  const prog = { btp: 'BTP', box: 'BXB', odm: 'ODM', rework: 'RWK' }[sel.programme];
  const cls = sel.standard === 'class3' ? 'C3' : 'C2';
  const t =
    (sel.test?.length ?? 0) +
    (sel.release?.length ?? 0) +
    (isBoxBuild(sel) ? sel.enclosure?.length ?? 0 : 0);
  return `EH-${prog}-L${sel.layers}-${formatVolume(sel.volume)}-${cls}-T${t}`;
}

export function deriveSpec(sel) {
  return {
    code: specCode(sel),
    routing: routeLines(sel),
    inspection: inspectionStack(sel),
    lead: leadTime(sel),
    capacity: capacity(sel),
    inputs: inputsNeeded(sel),
    flags: flags(sel),
  };
}

// Flattened into the enquiry form so the buyer never retypes what they just
// configured, and the engineer reading it sees the same spec code.
export function specToEnquiry(sel, derived) {
  const lines = [
    `Spec code: ${derived.code}`,
    '',
    `Programme: ${labelFor('programme', sel.programme)}`,
    `Board: ${labelFor('layers', sel.layers)}, ${labelFor('assembly', sel.assembly)}, down to ${labelFor('package', sel.package)}`,
    `Materials: ${labelFor('sourcing', sel.sourcing)}`,
    `Standard: ${labelFor('standard', sel.standard)}`,
    `Volume: ${sel.volume.toLocaleString('en-US')} units per month`,
    ...(isBoxBuild(sel)
      ? [`Enclosure: ${(sel.enclosure ?? []).map((id) => labelFor('enclosure', id)).join(', ') || 'None selected'}`]
      : []),
    `Test: ${(sel.test ?? []).map((id) => labelFor('test', id)).join(', ') || 'None selected'}`,
    `Release: ${(sel.release ?? []).map((id) => labelFor('release', id)).join(', ') || 'None selected'}`,
    '',
    `Indicative ${derived.lead.headline.toLowerCase()}: ${derived.lead.min}–${derived.lead.max} weeks`,
  ];
  return lines.join('\n');
}

// The enquiry form asks for annual volume; the configurator thinks in months.
// Mapped here so the two never disagree in front of the customer.
export function annualBand(monthly) {
  const annual = monthly * 12;
  if (annual < 5000) return 'Under 5,000 units';
  if (annual < 20000) return '5,000 – 20,000 units';
  if (annual < 100000) return '20,000 – 100,000 units';
  return '100,000+ units';
}
