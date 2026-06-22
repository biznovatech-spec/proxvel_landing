import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import MagneticButton from './MagneticButton';
import { NAV } from '../data/content';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={close} aria-label="PROXVEL — inicio">
          <img src={logo} alt="" className="nav__logo" width="32" height="32" />
          <span className="nav__word">PROXVEL</span>
        </a>

        <nav className="nav__links" aria-label="Navegación principal" onMouseLeave={() => setHoveredNav(null)}>
          {NAV.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="nav__link"
              onMouseEnter={() => setHoveredNav(item.href)}
            >
              {hoveredNav === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav__pill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="nav__link-text">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a href="#beta" className="nav__btn-outline">
            Descargar beta
          </a>
          <a href="#beta" className="nav__btn-circle">
            <Icon name="arrowUpRight" size={16} />
          </a>
          <button
            className="nav__burger"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <div className={`nav__sheet ${open ? 'is-open' : ''}`}>
        <nav aria-label="Navegación móvil">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav__sheet-link" onClick={close}>
              {item.label}
              <Icon name="arrowUpRight" size={18} />
            </a>
          ))}
        </nav>
        <a href="#beta" className="btn btn-primary btn-block btn-lg" onClick={close}>
          <Icon name="zap" size={18} />
          Descargar beta
        </a>
      </div>
      {open && <div className="nav__scrim" onClick={close} />}
    </header>
  );
}
