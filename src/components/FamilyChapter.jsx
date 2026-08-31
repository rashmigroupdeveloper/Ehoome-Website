import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';
import './FamilyChapter.css';

function SkuRow({ sku }) {
  return (
    <Link to={`/products/${sku.slug}`} className="fc-sku">
      <span className="fc-sku-media">
        <img src={sku.image} alt="" loading="lazy" />
      </span>
      <span className="fc-sku-body">
        <span className="fc-sku-name">{sku.name}</span>
        <span className="fc-sku-tag">{sku.tagline}</span>
        <span className="fc-sku-chips">
          {sku.chips.map((chip) => (
            <span key={chip} className="fc-chip">
              {chip}
            </span>
          ))}
        </span>
      </span>
      <span className="fc-sku-cta">
        Open line
        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * One family chapter: editorial split + SKU rows.
 * Mask-reveals the object frame on enter; staggers rows. Videos pause off-screen.
 */
export default function FamilyChapter({ chapter, index }) {
  const root = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const num = String(index + 1).padStart(2, '0');
  const count = String(chapter.skus.length).padStart(2, '0');

  useEffect(() => {
    const video = videoRef.current;
    const section = root.current;
    if (!video || !section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (reduce) {
        gsap.set('.fc-reveal, .fc-sku, .fc-frame', { clearProps: 'all', opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.fc-reveal', {
          y: 18,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 78%',
            once: true,
          },
        });

        gsap.fromTo(
          '.fc-frame',
          { clipPath: 'inset(18% 14% round 4px)' },
          {
            clipPath: 'inset(0% 0% round 4px)',
            duration: 1.05,
            ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 72%',
              once: true,
            },
          }
        );

        gsap.from('.fc-sku', {
          y: 16,
          opacity: 0,
          duration: 0.7,
          stagger: 0.045,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.fc-skus',
            start: 'top 88%',
            once: true,
          },
        });
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && root.current?.contains(st.trigger)) st.kill();
        });
      };
    },
    { scope: root, dependencies: [reduce, chapter.id] }
  );

  const showVideo = chapter.media?.video && !reduce;

  const tone = index % 2 === 1 ? 'is-dark' : 'is-light';

  return (
    <section
      id={chapter.id}
      className={`fc-chapter fc-chapter-${chapter.id} ${tone}`}
      ref={root}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className="wrap fc-inner">
        <div className="fc-split">
          <div className="fc-copy">
            <p className="fc-kicker fc-reveal">
              <span>{num}</span>
              <span aria-hidden="true">/</span>
              <span>{count} lines</span>
            </p>
            <h2 id={`${chapter.id}-title`} className="fc-title fc-reveal">
              {chapter.title}
              <span className="flourish-period">.</span>
            </h2>
            <p className="fc-sentence fc-reveal">{chapter.sentence}</p>
          </div>

          <div className="fc-visual fc-reveal">
            <div className="fc-bezel">
              <div className="fc-frame">
                {showVideo ? (
                  <video
                    ref={videoRef}
                    className="fc-media"
                    src={chapter.media.video}
                    poster={chapter.media.poster || chapter.media.image}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    className="fc-media"
                    src={chapter.media.image}
                    alt=""
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="fc-skus">
          {chapter.skus.map((sku) => (
            <SkuRow key={sku.slug} sku={sku} />
          ))}
        </div>
      </div>
    </section>
  );
}
