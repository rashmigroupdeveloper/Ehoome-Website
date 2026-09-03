import { useMemo, useRef, useState } from 'react';
import ProductStage from './ProductStage';
import JobTraveller from './JobTraveller';
import { ChipSet, Field, NotchScale, Segmented } from './ConfigControls';
import { gsap, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import {
  DEFAULT_SELECTION,
  VOLUME_STEPS,
  annualBand,
  deriveSpec,
  labelFor,
  specToEnquiry,
  visibleStages,
} from '../data/specModel';
import { FAMILIES, defaultProductSelection, describeSku, familyById } from '../data/configurator';
import './SpecBuilder.css';

const OPEN_MFG = ['sourcing', 'standard'];

const FAMILY_STILL = {
  switch: '/assets/stock/products/switching-hero.jpg',
  olt: '/assets/stock/products/fiber-detail.jpg',
  ont: '/assets/stock/products/ports-detail.jpg',
  ap: '/assets/stock/products/access-hero.jpg',
  router: '/assets/stock/products/hero-poster.jpg',
  charger: '/assets/stock/products/power-usb.jpg',
  soundbox: '/assets/stock/products/devices-hero.jpg',
};

const stillFor = (id) => FAMILY_STILL[id] ?? FAMILY_STILL.switch;

const countNote = (list) => (list.length ? `${list.length} selected` : 'None');

function GroupControl({ group, value, onChange }) {
  if (group.type === 'scale') {
    return (
      <NotchScale
        label={group.label}
        steps={group.steps}
        suffix={group.suffix ?? ''}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (group.multi) {
    return <ChipSet label={group.label} options={group.options} value={value} onChange={onChange} />;
  }
  return <Segmented label={group.label} options={group.options} value={value} onChange={onChange} />;
}

function noteFor(group, value) {
  if (group.multi) return countNote(value);
  return '';
}

function Panel({ title, meta, children }) {
  return (
    <section className="pnl">
      <header className="pnl-head">
        <h3 className="pnl-title">{title}</h3>
        <span className="pnl-meta">{meta}</span>
      </header>
      <div className="pnl-body">{children}</div>
    </section>
  );
}

export default function SpecBuilder() {
  const deckRef = useRef(null);
  const reduce = useReducedMotion();
  const [familyId, setFamilyId] = useState(FAMILIES[0].id);
  const [products, setProducts] = useState(defaultProductSelection);
  const [mfgOverrides, setMfgOverrides] = useState({});
  const [copied, setCopied] = useState(false);

  const family = familyById(familyId);
  const productSel = products[familyId];

  const refine = useMemo(() => family.refine?.(productSel) ?? {}, [family, productSel]);

  const mfg = useMemo(
    () => ({ ...DEFAULT_SELECTION, ...family.implies, ...(refine.mfg ?? {}), ...mfgOverrides }),
    [family, refine, mfgOverrides]
  );

  const derived = useMemo(() => {
    const base = deriveSpec(mfg);
    return {
      ...base,
      inspection: [...base.inspection, ...(refine.inspection ?? [])],
      inputs: [...base.inputs, ...(refine.inputs ?? [])],
      flags: [...base.flags, ...(refine.flags ?? [])],
    };
  }, [mfg, refine]);

  const sku = describeSku(family, productSel);
  const summary = useMemo(() => `${sku}\n\n${specToEnquiry(mfg, derived)}`, [sku, mfg, derived]);

  const enquiryHref = `/contact?${new URLSearchParams({
    need: 'Configure a custom build',
    volume: annualBand(mfg.volume),
    spec: summary,
  })}`;

  const setProduct = (groupId, value) =>
    setProducts((prev) => ({ ...prev, [familyId]: { ...prev[familyId], [groupId]: value } }));

  const setMfg = (stageId, value) => setMfgOverrides((prev) => ({ ...prev, [stageId]: value }));

  const copySpec = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const stages = visibleStages(mfg);
  const openStages = stages.filter((s) => OPEN_MFG.includes(s.id));
  const deepStages = stages.filter((s) => !OPEN_MFG.includes(s.id));
  const chassis = family.chassisFor?.(productSel) ?? family.chassis;

  useGSAP(
    () => {
      if (reduce || !deckRef.current) return;
      const items = gsap.utils.toArray('.sb-deck-intro, .pnl, .sb-deep');
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: deckRef.current,
            start: 'top 86%',
            once: true,
          },
        }
      );
    },
    { scope: deckRef, dependencies: [reduce] }
  );

  return (
    <section className="sb" id="configure">
      <div className="wrap">
        <p className="sb-index-label">Product family</p>

        <div className="sb-strip" role="radiogroup" aria-label="Product family">
          {FAMILIES.map((f) => (
            <button
              type="button"
              key={f.id}
              role="radio"
              aria-checked={f.id === familyId}
              className={`sb-fam${f.id === familyId ? ' is-on' : ''}`}
              onClick={() => setFamilyId(f.id)}
            >
              <span className="sb-fam-frame">
                <img src={stillFor(f.id)} alt="" loading="lazy" />
              </span>
              <span className="sb-fam-name">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="wrap sb-bench">
        <div className="sb-stage">
          <div className="sb-stage-head">
            <h2 className="sb-stage-title">{family.label}</h2>
            <span className="sb-stage-chassis">{chassis}</span>
          </div>

          <div className="sb-bay">
            <ProductStage family={family} selection={productSel} />
          </div>

          <p className="sb-stage-note">{family.tagline}</p>
        </div>

        <div className="sb-deck" ref={deckRef}>
          <header className="sb-deck-intro">
            <span className="sb-deck-label">Build controls</span>
            <p className="sb-deck-name">Configure {family.label}</p>
          </header>

          <Panel title="Faceplate" meta={`${family.groups.length} control groups`}>
            {family.groups.map((group) => (
              <Field key={group.id} label={group.label} note={noteFor(group, productSel[group.id])}>
                <GroupControl
                  group={group}
                  value={productSel[group.id]}
                  onChange={(v) => setProduct(group.id, v)}
                />
              </Field>
            ))}
          </Panel>

          <Panel title="Run" meta={`${openStages.length + 1} control groups`}>
            <Field label="Units per month" note={`${annualBand(mfg.volume)} a year`}>
              <NotchScale
                sparse
                label="Units per month"
                steps={VOLUME_STEPS}
                suffix="/ month"
                value={mfg.volume}
                format={(v) => v.toLocaleString('en-US')}
                onChange={(v) => setMfg('volume', v)}
              />
            </Field>

            {openStages.map((stage) => (
              <Field key={stage.id} label={stage.label} note={noteFor(stage, mfg[stage.id])}>
                <GroupControl group={stage} value={mfg[stage.id]} onChange={(v) => setMfg(stage.id, v)} />
              </Field>
            ))}
          </Panel>

          <details className="sb-deep">
            <summary>
              Process options
              <em>{deepStages.length}</em>
            </summary>
            <div className="sb-deep-body">
              {deepStages.map((stage) => (
                <Field
                  key={stage.id}
                  label={stage.label}
                  tag={stage.id in family.implies && !(stage.id in mfgOverrides) ? 'Assumed' : null}
                  note={noteFor(stage, mfg[stage.id])}
                >
                  <GroupControl group={stage} value={mfg[stage.id]} onChange={(v) => setMfg(stage.id, v)} />
                </Field>
              ))}
            </div>
          </details>
        </div>
      </div>

      <JobTraveller
        derived={derived}
        sku={sku}
        standard={labelFor('standard', mfg.standard)}
        volume={mfg.volume}
        enquiryHref={enquiryHref}
        onCopy={copySpec}
        copied={copied}
      />
    </section>
  );
}
