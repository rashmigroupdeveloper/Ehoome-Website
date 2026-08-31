import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Replaces motion/react's hook of the same name. It was the only reason three
// components pulled in the whole animation library alongside GSAP.
export function useReducedMotion() {
  const [reduce, setReduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduce;
}
