import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { STEPS } from '../data/content';
import './HowItWorks.css';

const Card = ({ step, i, progress, range, targetScale }) => {
  const container = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Colores para alternar fondos oscuros y claros si se desea, 
  // pero usaremos imágenes oscuras así que el texto será claro.
  return (
    <div ref={container} className="how-card-container">
      <motion.div 
        className="how-card"
        style={{ 
          scale, 
          top: 0,
          zIndex: i 
        }}
      >
        <div className="how-card-inner">
          <div className="how-card-body">
            <span className="how-card-n">{step.n}</span>
            <h3 className="how-card-title">{step.title}</h3>
            <p className="how-card-desc">{step.desc}</p>
          </div>
          <div className="how-card-img-wrap">
            {/* Dark overlay for text readability */}
            <div className="how-card-overlay" />
            <motion.img
              style={{ scale: imageScale }}
              src={`/images/step-${i + 1}.webp`}
              alt={step.title}
              className={`how-card-img ${loaded ? 'is-loaded' : ''}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                // Fallback incase user hasn't generated all images yet
                e.target.src = 'https://images.unsplash.com/photo-1518182170546-076616fdcb8b?q=80&w=2000&auto=format&fit=crop';
                setLoaded(true);
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function HowItWorks() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={container} className="how section" id="proceso">
      <div className="how__head container section-head reveal">
        <span className="how__eyebrow">Proceso</span>
        <h2 className="how__title">Así funciona.</h2>
        <p className="how__sub">
          De tu perfil a tu destino. Sin complejidad, sin decisiones difíciles.
        </p>
      </div>

      <div className="how__cards-wrapper">
        {STEPS.map((step, i) => {
          const targetScale = 1 - ((STEPS.length - i) * 0.04);
          return (
            <Card 
              key={step.n} 
              i={i} 
              step={step} 
              progress={scrollYProgress} 
              range={[i * 0.25, 1]} 
              targetScale={targetScale} 
            />
          );
        })}
      </div>
    </section>
  );
}
