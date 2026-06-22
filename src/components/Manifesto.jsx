import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView
} from 'framer-motion';
import './Manifesto.css';

function WordReveal({ text, delayOffset = 0 }) {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delayOffset },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 15,
    },
  };

  return (
    <motion.span
      className="word-reveal-wrap"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="word-reveal-word">
          {word}{' '}
        </motion.span>
      ))}
    </motion.span>
  );
}

const PILLARS = [
  {
    n: '01',
    title: 'Un motor, no un mapa.',
    body: 'PROXVEL no muestra listas de destinos populares. Analiza tu perfil y encuentra lo que encaja contigo, no con la mayoría.',
  },
  {
    n: '02',
    title: 'Hecho para el Perú.',
    body: 'Costa, sierra y selva. PROXVEL conoce el Perú entero y te guía dentro de él, desde la Costa Norte hasta los Andes y la Amazonía.',
  },
  {
    n: '03',
    title: 'Inteligencia real.',
    body: 'Siete dimensiones ponderadas por tu perfil. No algoritmos opacos: transparencia total sobre por qué cada destino es para ti.',
  },
];

export default function Manifesto() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Normalized cursor position relative to section center (-0.5 … 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring-smoothed so movement feels weighted, never twitchy
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.5 });

  // Layered parallax — the quote drifts a little, "el tuyo" drifts more (depth)
  const quoteX = useTransform(sx, (v) => v * 14);
  const quoteY = useTransform(sy, (v) => v * 9);
  const emX = useTransform(sx, (v) => v * 30);
  const emY = useTransform(sy, (v) => v * 16);

  // Spotlight glow trails the cursor across the stage
  const glowX = useTransform(sx, (v) => v * 70);
  const glowY = useTransform(sy, (v) => v * 28);

  const handleMove = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      className="manifesto section--void"
      id="manifesto"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="manifesto__glow"
        style={{ x: glowX, y: glowY }}
        aria-hidden="true"
      />

      <div className="manifesto__inner container">
        <div className="manifesto__statement">
          <div className="manifesto__rule" aria-hidden="true" />
          <motion.p className="manifesto__quote" style={{ x: quoteX, y: quoteY }}>
            <WordReveal text='No hay un "mejor destino".' delayOffset={0.1} />
            <br />
            <WordReveal text='Hay ' delayOffset={0.7} />
            <motion.em 
              style={{ x: emX, y: emY, display: 'inline-block' }}
              initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.9 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              el tuyo.
            </motion.em>
          </motion.p>
          <div className="manifesto__rule" aria-hidden="true" />
        </div>

        <div className="manifesto__pillars">
          {PILLARS.map((p, i) => (
            <div
              key={p.n}
              className="manifesto__pillar reveal"
              data-delay={String(i + 1)}
            >
              <p className="manifesto__n">{p.n}</p>
              <h3 className="manifesto__pillar-title">{p.title}</h3>
              <p className="manifesto__pillar-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
