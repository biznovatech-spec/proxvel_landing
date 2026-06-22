import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import Icon from './Icon';
import { BRAND } from '../data/content';
import logo from '../assets/logo.png';
import './BetaAccess.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BetaAccess() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1000);
  };

  return (
    <section className="beta section" id="beta">
      <div className="container">
        <div className="beta__panel glass reveal">
          <div className="beta__glow" aria-hidden="true" />

          <div className="beta__intro">
            <span className="eyebrow">Accede a PROXVEL</span>
            <h2 className="beta__title">
              La inteligencia de PROXVEL,<br />
              <span className="gold-text">en tu mano.</span>
            </h2>
            <p className="beta__sub">
              Descarga la app Android y lleva el motor de recomendación contigo.
              Gratis durante toda la beta — sin compromisos.
            </p>

            <ul className="beta__perks">
              <li><Icon name="check" size={16} /> Acceso completo sin costo</li>
              <li><Icon name="check" size={16} /> Recomendaciones en tiempo real</li>
              <li><Icon name="lock" size={16} /> Tus datos se mantienen privados</li>
            </ul>

            <span className="beta__soon">
              <Icon name="googlePlay" size={18} />
              Próximamente en Google Play
            </span>
          </div>

          <div className="beta__methods">
            {/* QR card */}
            <div className="beta__qr">
              <div className="beta__qr-tile">
                <QRCodeSVG
                  value={BRAND.betaApkUrl}
                  size={150}
                  bgColor="#ffffff"
                  fgColor="#0b1322"
                  level="M"
                  marginSize={2}
                  imageSettings={{
                    src: logo,
                    height: 34,
                    width: 34,
                    excavate: true,
                  }}
                />
              </div>
              <p className="beta__qr-title">
                <Icon name="scan" size={16} /> Escanea para instalar
              </p>
              <p className="beta__qr-note">Apunta la cámara de tu teléfono al código</p>
              <a
                className="btn btn-ghost btn-block"
                href={BRAND.betaApkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="smartphone" size={17} />
                Descargar APK
              </a>
            </div>

            <div className="beta__or"><span>o</span></div>

            {/* Email card */}
            <div className="beta__email">
              {status === 'success' ? (
                <div className="beta__success" role="status">
                  <span className="beta__success-ic"><Icon name="check" size={26} /></span>
                  <h3>¡Enlace en camino!</h3>
                  <p>
                    Enviaremos el acceso beta a{' '}
                    <strong style={{ color: 'var(--gold-300)' }}>{email}</strong>.
                    Revisa tu bandeja en unos minutos.
                  </p>
                  <button
                    className="beta__reset"
                    onClick={() => {
                      setEmail('');
                      setStatus('idle');
                    }}
                  >
                    Usar otro correo
                  </button>
                </div>
              ) : (
                <form className="beta__form" onSubmit={onSubmit} noValidate>
                  <p className="beta__form-title">
                    <Icon name="mail" size={16} /> Recíbelo por correo
                  </p>
                  <label htmlFor="beta-email" className="beta__form-label">
                    Tu correo electrónico
                  </label>
                  <div 
                    className="beta__input-wrap"
                    onMouseMove={handleMouseMove}
                  >
                    <motion.div
                      className="beta__input-glare"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            120px circle at ${mouseX}px ${mouseY}px,
                            rgba(233, 196, 106, 0.6),
                            transparent 80%
                          )
                        `,
                      }}
                    />
                    <input
                      id="beta-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className={`beta__input ${status === 'error' ? 'is-error' : ''}`}
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      aria-invalid={status === 'error'}
                      aria-describedby={status === 'error' ? 'beta-email-err' : undefined}
                    />
                  </div>
                  {status === 'error' && (
                    <span className="beta__err" id="beta-email-err">
                      Ingresa un correo válido para continuar.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-lg"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="beta__spinner" /> Enviando…
                      </>
                    ) : (
                      <>
                        <Icon name="zap" size={18} /> Enviar enlace de acceso
                      </>
                    )}
                  </button>
                  <p className="beta__fine">
                    Solo te escribimos sobre PROXVEL. Cancela cuando quieras.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
