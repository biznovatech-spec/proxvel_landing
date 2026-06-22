import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { FAQS } from '../data/content';
import './Faq.css';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq section" id="faq">
      <div className="container faq__wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 className="section-title">
            Todo lo que <span className="gold-text">quieres saber</span>
          </h2>
          <p className="section-sub">
            ¿Algo más en mente? Déjanos tu correo en la sección de beta y te respondemos.
          </p>
        </div>

        <div className="faq__list reveal" data-delay="1">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div 
                layout
                className={`faq__item ${isOpen ? 'is-open' : ''}`} 
                key={i}
                initial={{ borderRadius: 16 }}
              >
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq__chevron">
                    <Icon name="chevronDown" size={20} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="faq__a-inner">
                        <p>{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
