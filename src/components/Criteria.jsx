import Icon from './Icon';
import { CRITERIA } from '../data/content';
import './Criteria.css';

export default function Criteria() {
  const [featured, ...rest] = CRITERIA;

  return (
    <section className="criteria section" id="criterios">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Siete señales, una decisión</span>
          <h2 className="section-title">
            Cada recomendación, <span className="gold-text">explicada</span>
          </h2>
          <p className="section-sub">
            PROXVEL no esconde su criterio. Estos son los siete factores que pondera para
            encontrar tu destino ideal —con total transparencia.
          </p>
        </div>

        <div className="criteria__grid">
          <article
            className="crit crit--featured reveal"
            style={{ '--accent': featured.accent }}
          >
            <span className="crit__icon">
              <Icon name={featured.icon} size={26} />
            </span>
            <span className="crit__num">01</span>
            <h3 className="crit__title">{featured.label}</h3>
            <p className="crit__desc">{featured.desc}</p>
            <div className="crit__sliders" aria-hidden="true">
              <span><i style={{ width: '78%' }} /></span>
              <span><i style={{ width: '54%' }} /></span>
              <span><i style={{ width: '88%' }} /></span>
            </div>
          </article>

          {rest.map((c, i) => (
            <article
              key={c.id}
              className="crit reveal"
              data-delay={(i % 3) + 1}
              style={{ '--accent': c.accent }}
            >
              <span className="crit__icon">
                <Icon name={c.icon} size={22} />
              </span>
              <span className="crit__num">{String(i + 2).padStart(2, '0')}</span>
              <h3 className="crit__title">{c.label}</h3>
              <p className="crit__desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
