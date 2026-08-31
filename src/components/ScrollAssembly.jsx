import { useRef } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import './ScrollAssembly.css';

const MILESTONES = [
  { threshold: 0.00, label: 'Paste print', sub: 'Solder paste applied to the bare board' },
  { threshold: 0.18, label: 'SPI', sub: 'Paste coverage verified in 3-D' },
  { threshold: 0.36, label: 'Component place', sub: 'Fuji NXT III · 13 modules per line' },
  { threshold: 0.54, label: 'Reflow', sub: 'Nitrogen atmosphere · 13 thermal zones' },
  { threshold: 0.72, label: 'AOI & X-ray', sub: 'Optical + hidden-joint inspection in sequence' },
  { threshold: 0.90, label: 'Dispatch ready', sub: 'Board to branded carton, on one floor' },
];

function milestoneAt(progress) {
  let activeIdx = 0;
  for (let i = 0; i < MILESTONES.length; i += 1) {
    if (progress >= MILESTONES[i].threshold) activeIdx = i;
  }
  return { activeIdx, milestone: MILESTONES[activeIdx] };
}

export default function ScrollAssembly() {
  const wrap = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const labelRef = useRef(null);
  const subRef = useRef(null);
  const counterRef = useRef(null);
  const reduce = useReducedMotion();

  useGSAP(
    (_ctx, contextSafe) => {
      const video = videoRef.current;
      const section = wrap.current;
      if (!video || !section) return;

      let lastIdx = 0;
      let duration = video.duration || 0;

      const animateHud = contextSafe((targets) => {
        gsap.fromTo(
          targets,
          { y: 8 },
          { y: 0, duration: 0.25, ease: 'power2.out', stagger: 0.04, overwrite: 'auto' }
        );
      });

      const paintHud = (progress) => {
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }

        const { activeIdx, milestone } = milestoneAt(progress);
        if (activeIdx === lastIdx) return;
        lastIdx = activeIdx;

        if (labelRef.current) labelRef.current.textContent = milestone.label;
        if (subRef.current) subRef.current.textContent = milestone.sub;
        if (counterRef.current) {
          counterRef.current.textContent = `${String(activeIdx + 1).padStart(2, '0')} / ${String(MILESTONES.length).padStart(2, '0')}`;
        }

        if (reduce) return;
        animateHud([labelRef.current, subRef.current]);
      };

      const scrubVideo = (progress) => {
        if (duration > 0) {
          const nextTime = progress * Math.max(duration - 0.04, 0);
          if (Math.abs(video.currentTime - nextTime) > 0.008) {
            video.currentTime = nextTime;
          }
        }
        paintHud(progress);
      };

      if (reduce) {
        paintHud(0);
        return;
      }

      video.pause();
      video.preload = 'auto';

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => (window.matchMedia('(max-width: 640px)').matches ? '+=180%' : '+=280%'),
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => scrubVideo(self.progress),
      });

      const syncDuration = () => {
        duration = video.duration || 0;
        video.pause();
        scrubVideo(st.progress);
      };

      video.addEventListener('loadedmetadata', syncDuration);
      if (video.readyState >= 1) {
        syncDuration();
      }

      return () => {
        video.removeEventListener('loadedmetadata', syncDuration);
        gsap.killTweensOf([labelRef.current, subRef.current]);
        gsap.set([labelRef.current, subRef.current], { clearProps: 'opacity,transform' });
        st.kill();
      };
    },
    { scope: wrap, dependencies: [reduce], revertOnUpdate: true }
  );

  return (
    <section className="scroll-asm" ref={wrap} aria-label="Assembly process">
      <div className="scroll-asm-stage-frame">
        <video
          ref={videoRef}
          className="scroll-asm-video"
          src="/assets/cinematic/pcb-assemble-scrub.mp4"
          poster="/assets/cinematic/pcb-assemble-poster.jpg"
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
        />
        <div className="scroll-asm-scrim" aria-hidden="true" />

        <div className="scroll-asm-head">
          <p className="scroll-asm-kicker">Scroll through the line</p>
          <h2 className="scroll-asm-headline">
            One plant.<br />
            Every product layer.
          </h2>
        </div>

        <div className="scroll-asm-stage" aria-live="polite">
          <span className="scroll-asm-stage-label" ref={labelRef}>{MILESTONES[0].label}</span>
          <span className="scroll-asm-stage-sub" ref={subRef}>{MILESTONES[0].sub}</span>
        </div>

        <div className="scroll-asm-counter" ref={counterRef} aria-hidden="true">
          01 / 06
        </div>

        <div className="scroll-asm-track" aria-hidden="true">
          <div className="scroll-asm-bar" ref={progressRef} />
        </div>
      </div>
    </section>
  );
}
