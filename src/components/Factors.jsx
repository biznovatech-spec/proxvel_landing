import { useState } from 'react';
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

  return (
    <section
      className="factors"
      id="factores"
      onMouseLeave={() => setActive(null)}
    >
      {/* Background Gallery */}
      <div className="factors__bg-gallery" aria-hidden="true">
        {CRITERIA.map((c, i) => (
          <div
            key={c.id}
            className="factors__bg-img"
            style={{
              backgroundImage: `url(${c.image})`,
              opacity: active === i ? 1 : 0,
              transform: active === i ? 'scale(1)' : 'scale(1.05)',
            }}
          />
        ))}
        <div className="factors__bg-overlay" />
      </div>
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
    </section>
  );
}
