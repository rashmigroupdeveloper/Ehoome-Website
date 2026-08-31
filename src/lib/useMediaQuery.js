import { useEffect, useState } from 'react';

// Same shape as useReducedMotion. Needed where a layout decision cannot be made
// in CSS — SVG text scales with its viewBox, so a drawing that is legible on a
// desktop renders its labels at about five pixels on a phone.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
