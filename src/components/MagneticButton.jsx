import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { gsap, useGSAP } from '../lib/gsap';
import { useReducedMotion } from '../lib/useReducedMotion';

export default function MagneticButton({
  to,
  href,
  children,
  variant = 'signal',
  icon = true,
  className = '',
}) {
  const ref = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !ref.current) {
        xTo.current = null;
        yTo.current = null;
        return;
      }
      // quickTo reuses one tween per property instead of allocating a new one
      // on every mousemove — the reason this is cheap enough to run on hover.
      const opts = { duration: 0.5, ease: 'power3' };
      xTo.current = gsap.quickTo(ref.current, 'x', opts);
      yTo.current = gsap.quickTo(ref.current, 'y', opts);
    },
    { dependencies: [reduce] }
  );

  const onMove = (e) => {
    if (!xTo.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    xTo.current((e.clientX - rect.left - rect.width / 2) * 0.28);
    yTo.current((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const onLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="btn-icon" aria-hidden="true">
          <ArrowUpRight size={16} weight="bold" />
        </span>
      )}
    </>
  );

  const shared = {
    ref,
    className: `btn btn-${variant} ${className}`.trim(),
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (to) {
    return (
      <Link to={to} {...shared}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} {...shared}>
      {content}
    </a>
  );
}
