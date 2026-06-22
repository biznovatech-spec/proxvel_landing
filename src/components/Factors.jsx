import { useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { CRITERIA } from '../data/content';
import './Factors.css';

function ArrowUpRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function Factors() {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  // Cursor position → spring-smoothed so the preview trails like the 21st showcase
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.45 });
  const y = useSpring(my, { stiffness: 170, damping: 22, mass: 0.45 });

  const handleMove = (e) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <section
      className="factors"
      id="factores"
      onMouseMove={handleMove}
      onMouseLeave={() => setActive(null)}
    >
      <div className="container factors__container">
        <div className="factors__head reveal">
          <span className="factors__eyebrow">Lo que analizamos</span>
          <h2 className="factors__title">
            Siete dimensiones que{' '}
            <span className="factors__title-accent">ninguna lista considera.</span>
          </h2>
        </div>

        <ul className="factors__list reveal" data-delay="1">
          {CRITERIA.map((c, i) => (
            <li
              key={c.id}
              className={`factors__row ${active === i ? 'is-active' : ''} ${
                active !== null && active !== i ? 'is-dimmed' : ''
              }`}
              onMouseEnter={() => setActive(i)}
              style={{ '--accent': c.accent }}
            >
              <span className="factors__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="factors__main">
                <h3 className="factors__name">
                  {c.label}
                  <span className="factors__underline" aria-hidden="true" />
                </h3>
                <p className="factors__desc">{c.desc}</p>
              </div>
              <span className="factors__dot" aria-hidden="true" />
              <span className="factors__arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating preview that follows the cursor (desktop only) */}
      {!reduce && (
        <motion.div className="factors__preview" style={{ x, y }} aria-hidden="true">
          <div className={`factors__preview-card ${active !== null ? 'is-on' : ''}`}>
            {CRITERIA.map((c, i) => (
              <div
                key={c.id}
                className="factors__preview-img"
                style={{
                  backgroundImage: `url(${c.image})`,
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'scale(1)' : 'scale(1.12)',
                  filter: active === i ? 'blur(0px)' : 'blur(12px)',
                }}
              />
            ))}
            <div className="factors__preview-shade" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
