import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const supportsFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(pointer: fine)').matches;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const sparkleLayerRef = useRef(null);

  useEffect(() => {
    if (!supportsFinePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const sparkleLayer = sparkleLayerRef.current;
    if (!dot || !sparkleLayer) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;
    let currentScale = 1;
    let lastSparkleTime = 0;
    let rafId;
    let visible = false;

    const showCursor = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = '1';
    };

    const hideCursor = () => {
      visible = false;
      dot.style.opacity = '0';
    };

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        posX = mouseX;
        posY = mouseY;
      }
      showCursor();
    };

    const spawnSparkle = (x, y) => {
      const sparkle = document.createElement('span');
      sparkle.className = 'cursor-sparkle';
      const offsetX = (Math.random() - 0.5) * 14;
      const offsetY = (Math.random() - 0.5) * 14;
      const size = 3 + Math.random() * 4;
      const drift = 14 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      sparkle.style.left = `${x + offsetX}px`;
      sparkle.style.top = `${y + offsetY}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.setProperty('--dx', `${Math.cos(angle) * drift}px`);
      sparkle.style.setProperty('--dy', `${Math.sin(angle) * drift}px`);
      sparkleLayer.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
    };

    const tick = (now) => {
      posX += (mouseX - posX) * 0.22;
      posY += (mouseY - posY) * 0.22;

      const moveDist = Math.hypot(mouseX - lastX, mouseY - lastY);
      lastX = mouseX;
      lastY = mouseY;

      const targetScale = Math.min(1 + moveDist / 16, 2.2);
      currentScale += (targetScale - currentScale) * (targetScale > currentScale ? 0.35 : 0.08);

      dot.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(${currentScale})`;

      if (moveDist > 3 && now - lastSparkleTime > 35) {
        lastSparkleTime = now;
        spawnSparkle(posX, posY);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      <div className="custom-cursor-dot" ref={dotRef} />
      <div className="custom-cursor-sparkles" ref={sparkleLayerRef} />
    </>
  );
}
