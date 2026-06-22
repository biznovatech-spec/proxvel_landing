import { useMemo, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Icon from './Icon';
import { PROFILES, DESTINATIONS } from '../data/content';
import './Engine.css';

function scoreFor(dest, profile) {
  const w = profile.weight;
  let s = 0;
  let wsum = 0;
  for (const f of Object.keys(w)) {
    s += w[f] * dest.scores[f];
    wsum += w[f];
  }
  let base = s / wsum;
  const matches = dest.tags.filter((t) => profile.preferTags.includes(t)).length;
  base += matches * 5;
  return Math.min(99, Math.round(base));
}

export default function Engine() {
  const [profileId, setProfileId] = useState('aventura');
  const [fading, setFading] = useState(false);
  const [displayId, setDisplayId] = useState('aventura');
  const revealRef = useRef(null);

  // 3D Tilt logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!revealRef.current) return;
    const rect = revealRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getTop = (pid) => {
    const profile = PROFILES.find((p) => p.id === pid);
    const ranked = DESTINATIONS.map((d) => ({ ...d, _score: scoreFor(d, profile) })).sort(
      (a, b) => b._score - a._score
    );
    // Curated signature destination per profile guarantees each reveal is
    // visually and thematically distinct; scoring still runs underneath.
    const curated = profile.topId && ranked.find((d) => d.id === profile.topId);
    return curated || ranked[0];
  };

  const top = useMemo(() => getTop(displayId), [displayId]);
  const currentProfile = PROFILES.find((p) => p.id === profileId);

  const handleSelect = (id) => {
    if (id === profileId) return;
    setProfileId(id);
    setFading(true);
    setTimeout(() => {
      setDisplayId(id);
      setFading(false);
    }, 320);
  };

  return (
    <section className="engine section" id="motor">
      <div className="engine__head container">
        <div className="section-head reveal">
          <span className="eyebrow">Motor PROXVEL</span>
          <h2 className="section-title">
            ¿Cómo viajas <em style={{ fontStyle: 'italic' }}>tú</em>?
          </h2>
          <p className="section-sub">
            Elige tu perfil y PROXVEL reordena el Perú en tiempo real.
            Sin listas genéricas. Solo tu destino.
          </p>
        </div>

        {/* Profile selector */}
        <div
          className="engine__profiles reveal"
          data-delay="1"
          role="group"
          aria-label="Perfil de viaje"
        >
          {PROFILES.map((p) => (
            <motion.button
              key={p.id}
              className={`engine__profile-btn ${p.id === profileId ? 'is-active' : ''}`}
              aria-pressed={p.id === profileId}
              onClick={() => handleSelect(p.id)}
              whileHover="hover"
            >
              <motion.span 
                style={{ display: 'inline-flex' }}
                variants={{ hover: { scale: 1.15, y: -2, rotate: 5 } }}
              >
                <Icon name={p.icon} size={18} />
              </motion.span>
              {p.label}
            </motion.button>
          ))}
        </div>

        <p className="engine__tagline reveal" data-delay="2">
          "{currentProfile.line}"
        </p>
      </div>

      {/* Full-bleed destination reveal with 3D Tilt */}
      <div 
        className={`engine__reveal ${fading ? 'engine__reveal--fading' : ''}`} 
        aria-live="polite"
        ref={revealRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1200px' }}
      >
        <motion.div 
          className="engine__reveal-tilt-container"
          style={{ rotateX, rotateY, width: '100%', height: '100%', position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
        >
          {/* Wrapper for the photo to maintain Z-depth without conflicting with CSS animation transform */}
          <div style={{ position: 'absolute', inset: '-5%', transform: 'translateZ(-20px)' }}>
            <div
              className="photo engine__photo"
              data-scene={top.scene}
              data-label={top.region}
              role="img"
              aria-label={top.name}
            />
          </div>
          <div 
            className="engine__reveal-overlay" 
            aria-hidden="true" 
            style={{ position: 'absolute', inset: '-5%', transform: 'translateZ(0px)' }} 
          />
          <div className="engine__caption container" style={{ transform: 'translateZ(40px)' }}>
            <p className="engine__caption-region">
              <Icon name="mapPin" size={13} />
              {top.region}
            </p>
            <h3 className="engine__caption-name">{top.name}</h3>
            <p className="engine__caption-quote">{top.quote}</p>
            <div className="engine__caption-tags">
              {top.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
