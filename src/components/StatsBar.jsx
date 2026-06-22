import { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView';
import { STATS } from '../data/content';
import './StatsBar.css';

function CountUp({ value, suffix }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const dur = 1300;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="stat__num">
      {n}
      <span className="stat__suffix">{suffix}</span>
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="stats" aria-label="PROXVEL en cifras">
      <div className="container">
        <div className="stats__bar glass reveal">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <CountUp value={s.value} suffix={s.suffix} />
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
