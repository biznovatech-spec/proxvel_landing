import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

export default function GlobalAmbient() {
  // The cursor glow only makes sense with a fine pointer (mouse). On touch
  // devices or with reduced-motion it's wasted work — skip it entirely.
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const y = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  // All hooks must run on every render — keep useMotionTemplate above the
  // early return so hook order never changes when `enabled` flips.
  const bg = useMotionTemplate`radial-gradient(800px circle at ${springX}px ${springY}px, rgba(233, 196, 106, 0.035), transparent 60%)`;

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 8000,
        background: bg,
      }}
      aria-hidden="true"
    />
  );
}
