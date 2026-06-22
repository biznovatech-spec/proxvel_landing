import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import Icon from './Icon';
import MagneticButton from './MagneticButton';
import logo from '../assets/logo.png';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="PROXVEL — inicio">
      
      {/* CAPA 1: Cielo (Estático al fondo) */}
      <motion.div
        className="hero__layer hero__layer--sky"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      {/* CAPA 2: Texto Gigante Intermedio (Amanecer) */}
      <motion.div 
        className="hero__layer hero__layer--giant-text"
        initial={{ opacity: 0, y: '50vh' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <span className="hero__giant-word">PROXVEL</span>
      </motion.div>

      {/* CAPA 3: Montañas en primer plano (PNG transparente) */}
      <motion.div
        className="hero__layer hero__layer--mountains"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      {/* CAPA 4: UI Frontal */}
      <motion.div
        className="hero__layer hero__layer--front-ui"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero__content container">
          <div className="hero__inner">
            <p className="hero__sub">
              La primera plataforma de recomendación turística inteligente del Perú.
            </p>

            <MagneticButton href="#motor" className="btn btn-primary btn-lg hero__cta">
              Explorar destinos
              <Icon name="arrowRight" size={18} />
            </MagneticButton>
          </div>
        </div>

        {/* Strip siempre visible (ancla visual) */}
        <div className="hero__strip" aria-hidden="true">
          {['Preferencias', 'Seguridad', 'Costo', 'Limpieza', 'Clima', 'Afluencia', 'Afinidad'].map((f) => (
            <span key={f} className="hero__strip-item">{f}</span>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
