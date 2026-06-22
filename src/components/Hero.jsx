import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import Icon from './Icon';
import MagneticButton from './MagneticButton';
import logo from '../assets/logo.png';
import './Hero.css';

const SCROLL_HEIGHT = 1500;

export default function Hero() {
  const { scrollY } = useScroll();

  // ── Fase 1 (0 → 1500px): clip-path se expande de rectángulo a pantalla completa ──
  const clipStart = useTransform(scrollY, [0, SCROLL_HEIGHT], [25, 0]);
  const clipEnd   = useTransform(scrollY, [0, SCROLL_HEIGHT], [75, 100]);
  const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  // Zoom-out sincronizado con la apertura del clip
  const bgSize = useTransform(scrollY, [0, SCROLL_HEIGHT + 500], ['170%', '110%']);

  // ── Fase 2 (1100 → 1500px): texto aparece solo cuando la imagen casi llena la pantalla ──
  const contentOpacity = useTransform(scrollY, [1100, SCROLL_HEIGHT], [0, 1]);
  const contentY       = useTransform(scrollY, [1100, SCROLL_HEIGHT], [36, 0]);

  return (
    <section className="hero" id="top" aria-label="PROXVEL — inicio">

      {/* Fondo animado: clip-path se abre mientras el usuario scrollea */}
      <motion.div
        className="hero__bg"
        style={{ clipPath, willChange: 'clip-path' }}
      >
        <motion.div
          className="photo hero__photo"
          data-scene="hero"
          style={{ backgroundSize: bgSize }}
          aria-hidden="true"
        />
        <div className="hero__overlay" aria-hidden="true" />
      </motion.div>

      {/* Contenido: sticky superpuesto, aparece solo cuando la imagen ya llenó la pantalla */}
      <div className="hero__layer">
        <motion.div
          className="hero__layer-inner"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="hero__content container">
            <div className="hero__inner">
              <p className="hero__eyebrow">
                <img src={logo} alt="" width="22" height="22" className="hero__eyebrow-logo" />
                PROXVEL · Turismo inteligente para el Perú
              </p>

              <h1 className="hero__headline">
                El destino<br />
                perfecto<br />
                <em>existe.</em>
              </h1>

              <p className="hero__sub">
                La primera plataforma de recomendación turística inteligente del Perú.
                Siete factores. Una recomendación. La tuya.
              </p>

              <MagneticButton href="#motor" className="btn btn-primary btn-lg hero__cta">
                Explorar destinos
                <Icon name="arrowRight" size={18} />
              </MagneticButton>
            </div>
          </div>

          <div className="hero__scroll" aria-hidden="true">
            <span>Scroll</span>
            <div className="hero__scroll-line" />
          </div>
        </motion.div>

        {/* Strip siempre visible (ancla visual durante el scroll) */}
        <div className="hero__strip" aria-hidden="true">
          {['Preferencias', 'Seguridad', 'Costo', 'Limpieza', 'Clima', 'Afluencia', 'Afinidad'].map((f) => (
            <span key={f} className="hero__strip-item">{f}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
