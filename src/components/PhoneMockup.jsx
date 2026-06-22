import { useEffect, useState } from 'react';
import Icon from './Icon';
import DestinationScene from './DestinationScene';
import logo from '../assets/logo.png';
import './PhoneMockup.css';

const MINI = [
  { label: 'Seguridad', value: 88 },
  { label: 'Limpieza', value: 92 },
  { label: 'Clima', value: 80 },
];

export default function PhoneMockup() {
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLit(true), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="phone" role="img" aria-label="Pantalla de PROXVEL mostrando a Machu Picchu como recomendación con 96% de afinidad">
      <div className="phone__frame">
        <div className="phone__notch" />
        <div className="phone__screen">
          {/* status bar */}
          <div className="phone__status">
            <span>9:41</span>
            <span className="phone__status-dots">
              <i /><i /><i />
            </span>
          </div>

          {/* app header */}
          <div className="phone__head">
            <img src={logo} alt="" className="phone__logo" />
            <div>
              <p className="phone__hi">Hola, viajero</p>
              <p className="phone__sub">Tu recomendación de hoy</p>
            </div>
            <span className="phone__bell"><Icon name="bell" size={16} /></span>
          </div>

          {/* hero recommendation */}
          <div className="phone__card">
            <div className="phone__scene">
              <DestinationScene scene="machupicchu" />
              <span className="phone__match">
                <Icon name="target" size={13} />
                96% afín
              </span>
              <div className="phone__caption">
                <p className="phone__place">Machu Picchu</p>
                <p className="phone__region"><Icon name="mapPin" size={12} /> Cusco · Andes</p>
              </div>
            </div>

            <div className="phone__factors">
              {MINI.map((m, i) => (
                <div className="phone__factor" key={m.label}>
                  <span className="phone__factor-label">{m.label}</span>
                  <span className="phone__bar">
                    <i style={{ width: lit ? `${m.value}%` : 0, transitionDelay: `${i * 120}ms` }} />
                  </span>
                </div>
              ))}
            </div>

            <button className="phone__cta">
              Ver ruta completa
              <Icon name="arrowRight" size={16} />
            </button>
          </div>

          {/* quick chips */}
          <div className="phone__chips">
            <span><Icon name="mountain" size={13} /> Aventura</span>
            <span><Icon name="landmark" size={13} /> Cultura</span>
          </div>
        </div>
      </div>

      {/* glow ring */}
      <span className="phone__ring" aria-hidden="true" />
    </div>
  );
}
