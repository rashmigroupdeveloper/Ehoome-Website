import { useEffect, useMemo, useRef, useState } from 'react';
import ProductStage from './ProductStage';
import JobTraveller from './JobTraveller';
import { ChipSet, Field, NotchScale, Segmented } from './ConfigControls';
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

// The bench. Left is the object under construction, right is the panel that
// shapes it, and underneath is the traveller the plant would print.
//
// Two manufacturing questions sit in the open because every buyer has an
// opinion on them; the rest of the process spec is assumed from the family and
// waits under a disclosure for the people who care.
const OPEN_MFG = ['sourcing', 'standard'];

const FAMILY_SCENE = {
  switch: {
    still: '/assets/stock/products/switching-hero.jpg',
    loop: '/assets/stock/products/switching-smt.mp4',
  },
  olt: { still: '/assets/stock/products/fiber-detail.jpg' },
  ont: { still: '/assets/stock/products/ports-detail.jpg' },
  ap: { still: '/assets/stock/products/access-hero.jpg' },
  router: { still: '/assets/stock/products/hero-poster.jpg' },
  charger: { still: '/assets/stock/products/power-usb.jpg' },
  soundbox: { still: '/assets/stock/products/devices-hero.jpg' },
};

const sceneFor = (id) => FAMILY_SCENE[id] ?? FAMILY_SCENE.switch;

const countNote = (list) => (list.length ? `${list.length} selected` : 'None');

// One group, one control. The shape of the data decides which: an ordered
// numeric run gets a detented rail, an open set gets boxes, and a short list of
// alternatives gets a segmented switch.
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

function Panel({ mark, title, lead, children }) {
  return (
    <section className="pnl">
      <header className="pnl-head">
        <span className="pnl-mark">{mark}</span>
        <h3>{title}</h3>
        {lead ? <p>{lead}</p> : null}
      </header>
      {children}
    </section>
  );
}

export default function SpecBuilder() {
  const [familyId, setFamilyId] = useState(FAMILIES[0].id);
  const [products, setProducts] = useState(defaultProductSelection);
  const [mfgOverrides, setMfgOverrides] = useState({});
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const plateVideo = useRef(null);

  const family = familyById(familyId);
  const productSel = products[familyId];
  const scene = sceneFor(familyId);

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
  const familyIndex = FAMILIES.findIndex((f) => f.id === familyId) + 1;

  useEffect(() => {
    const video = plateVideo.current;
    if (!video) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [scene.loop, reduce]);

  return (
    <section className="sb" id="configure">
      {/* ---- family index ------------------------------------------------ */}
      <div className="wrap">
        <div className="sb-index">
          <p className="sb-index-label">
            <span>01</span> Pick the family
          </p>
          <p className="sb-index-count">
            {String(familyIndex).padStart(2, '0')} / {String(FAMILIES.length).padStart(2, '0')}
          </p>
        </div>

        <div className="sb-strip" role="radiogroup" aria-label="Product family">
          {FAMILIES.map((f, i) => (
            <button
              type="button"
              key={f.id}
              role="radio"
              aria-checked={f.id === familyId}
              className={`sb-fam${f.id === familyId ? ' is-on' : ''}`}
              onClick={() => setFamilyId(f.id)}
            >
              <span className="sb-fam-frame">
                <img src={sceneFor(f.id).still} alt="" loading="lazy" />
                <span className="sb-fam-n">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="sb-fam-name">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- bench -------------------------------------------------------- */}
      <div className="wrap sb-bench">
        <div className="sb-stage">
          <div className="sb-stage-head">
            <span className="sb-stage-title">{family.label}</span>
            <span className="sb-stage-chassis">{chassis}</span>
          </div>

          <div className="sb-bay">
            {scene.loop && !reduce ? (
              <video
                key={scene.loop}
                ref={plateVideo}
                className="sb-bay-media"
                src={scene.loop}
                poster={scene.still}
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img key={scene.still} className="sb-bay-media" src={scene.still} alt="" />
            )}
            <div className="sb-bay-wash" />
            <div className="sb-bay-plate">
              <ProductStage family={family} selection={productSel} sku={sku} />
            </div>
          </div>

          <p className="sb-stage-note">{family.tagline}</p>
        </div>

        <div className="sb-deck">
          <Panel mark="02" title="The product" lead="The shape of the thing itself — what sits on the faceplate, and the shell it lands in.">
            {family.groups.map((group, i) => (
              <Field
                key={group.id}
                index={i + 1}
                label={group.label}
                note={noteFor(group, productSel[group.id])}
              >
                <GroupControl
                  group={group}
                  value={productSel[group.id]}
                  onChange={(v) => setProduct(group.id, v)}
                />
              </Field>
            ))}
          </Panel>

          <Panel mark="03" title="The run" lead="Volume sets the schedule, and the schedule sets everything else.">
            <Field index={1} label="Units per month" note={`${annualBand(mfg.volume)} a year`}>
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

            {openStages.map((stage, i) => (
              <Field
                key={stage.id}
                index={i + 2}
                label={stage.label}
                note={noteFor(stage, mfg[stage.id])}
              >
                <GroupControl group={stage} value={mfg[stage.id]} onChange={(v) => setMfg(stage.id, v)} />
              </Field>
            ))}
          </Panel>

          <details className="sb-deep">
            <summary>
              <span className="pnl-mark">04</span>
              Process spec — assumed from the family
              <em>{deepStages.length} settings</em>
            </summary>
            <div className="sb-deep-body">
              {deepStages.map((stage, i) => (
                <Field
                  key={stage.id}
                  index={i + 1}
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

      {/* ---- traveller ---------------------------------------------------- */}
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
