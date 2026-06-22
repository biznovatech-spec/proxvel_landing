import { DESTINATIONS } from '../data/content';
import './CinematicDestinations.css';

function DestCard({ dest, large = false }) {
  return (
    <div className={`dest-card ${large ? 'dest-card--large' : ''}`}>
      <div
        className="photo dest-card__photo"
        data-scene={dest.scene}
        role="img"
        aria-label={dest.name}
      />
      <div className="dest-card__overlay" aria-hidden="true" />
      <div className="dest-card__caption">
        <div className="dest-card__tags">
          {dest.tags.map((t) => (
            <span key={t} className="dest-card__tag">{t}</span>
          ))}
        </div>
        <h3 className="dest-card__name">
          {dest.name}
          <span className="dest-card__underline" aria-hidden="true" />
        </h3>
        <p className="dest-card__region">{dest.region}</p>
        {dest.quote && (
          <p className="dest-card__quote">{dest.quote}</p>
        )}
      </div>
    </div>
  );
}

export default function CinematicDestinations() {
  const [
    machupicchu,  // 0
    limacentro,   // 1
    circuito,     // 2
    huaca,        // 3
    santacatalina,// 4
    colca,        // 5
    nasca,        // 6
    paracas,      // 7
    sipan,        // 8
    kuelap,       // 9
  ] = DESTINATIONS;

  return (
    <section className="cin-dest" id="destinos">
      <div className="container">
        <div className="cin-dest__head section-head reveal">
          <span className="eyebrow">Destinos</span>
          <h2 className="section-title">
            El Perú que<br />
            <span className="gold-text">PROXVEL descubre</span><br />
            para ti.
          </h2>
          <p className="section-sub">
            Desde las alturas de los Andes hasta las costas del Pacífico,
            cada destino analizado en profundidad.
          </p>
        </div>
      </div>

      <div className="cin-dest__mosaic">

        {/* Fila 1: Machu Picchu grande + Kuélap + Paracas apilados */}
        <div className="cin-dest__row cin-dest__row--featured">
          <div className="reveal" style={{ gridArea: 'a' }}>
            <DestCard dest={machupicchu} large />
          </div>
          <div className="reveal" data-delay="1" style={{ gridArea: 'b' }}>
            <DestCard dest={kuelap} />
          </div>
          <div className="reveal" data-delay="2" style={{ gridArea: 'c' }}>
            <DestCard dest={paracas} />
          </div>
        </div>

        {/* Fila 2: Colca · Santa Catalina · Nasca */}
        <div className="cin-dest__row cin-dest__row--trio">
          <div className="reveal" data-delay="1">
            <DestCard dest={colca} />
          </div>
          <div className="reveal" data-delay="2">
            <DestCard dest={santacatalina} />
          </div>
          <div className="reveal" data-delay="3">
            <DestCard dest={nasca} />
          </div>
        </div>

        {/* Fila 3: Lima · Circuito · Huaca · Sipán */}
        <div className="cin-dest__row cin-dest__row--quartet">
          <div className="reveal" data-delay="1">
            <DestCard dest={limacentro} />
          </div>
          <div className="reveal" data-delay="2">
            <DestCard dest={circuito} />
          </div>
          <div className="reveal" data-delay="3">
            <DestCard dest={huaca} />
          </div>
          <div className="reveal" data-delay="4">
            <DestCard dest={sipan} />
          </div>
        </div>

      </div>
    </section>
  );
}
