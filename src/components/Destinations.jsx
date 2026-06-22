import Icon from './Icon';
import DestinationCard from './DestinationCard';
import { DESTINATIONS } from '../data/content';
import './Destinations.css';

export default function Destinations() {
  return (
    <section className="destinations section" id="destinos">
      <div className="container">
        <div className="destinations__head reveal">
          <div className="section-head" style={{ margin: 0 }}>
            <span className="eyebrow">Destinos analizados</span>
            <h2 className="section-title">
              El Perú, puntuado <span className="gold-text">para ti</span>
            </h2>
          </div>
          <p className="destinations__intro">
            De la costa a la cordillera: cada destino llega con su desglose completo de
            seguridad, costo, limpieza, clima, tranquilidad y afinidad.
          </p>
        </div>

        <div className="destinations__grid">
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.id} dest={d} />
          ))}
        </div>

        <div className="destinations__foot reveal">
          <Icon name="compass" size={18} />
          <span>Y más de 24 regiones esperándote dentro de la app.</span>
        </div>
      </div>
    </section>
  );
}
