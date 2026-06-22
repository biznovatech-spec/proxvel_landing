import { useId } from 'react';
import './DestinationScene.css';

/* Bespoke SVG landscapes for each destination — no stock photography.
   Each scene is a layered gradient illustration with its own palette. */

export const SCENE_ACCENT = {
  machupicchu: '#56b27e',
  rainbow: '#e2843f',
  titicaca: '#3f8fd0',
  colca: '#d39a4a',
  arequipa: '#c7a6e0',
  mancora: '#f0a25a',
};

export default function DestinationScene({ scene = 'machupicchu', className = '' }) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9_-]/g, '');
  const id = (s) => `${uid}-${s}`;

  return (
    <svg
      className={`scene ${className}`}
      viewBox="0 0 400 280"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      {scene === 'machupicchu' && (
        <>
          <defs>
            <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0e2236" />
              <stop offset="0.55" stopColor="#244a52" />
              <stop offset="1" stopColor="#3c6b56" />
            </linearGradient>
            <radialGradient id={id('sun')} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#f6e3a8" />
              <stop offset="1" stopColor="#f6e3a8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="280" fill={`url(#${id('sky')})`} />
          <circle cx="290" cy="78" r="70" fill={`url(#${id('sun')})`} opacity="0.7" />
          <circle cx="290" cy="82" r="22" fill="#f7ecc6" opacity="0.85" />
          <path d="M0 168 L70 96 L120 150 L175 90 L220 150 L300 70 L360 140 L400 110 L400 280 L0 280 Z" fill="#1d3f3f" opacity="0.85" />
          <path d="M120 280 L150 150 L185 130 L235 165 L255 280 Z" fill="#2f5a45" />
          <path d="M150 150 L185 130 L235 165 L210 168 L172 150 Z" fill="#3d6e54" />
          <g stroke="#234c3c" strokeWidth="2" opacity="0.55">
            <path d="M150 188 H242" />
            <path d="M156 206 H238" />
            <path d="M162 224 H236" />
            <path d="M168 242 H234" />
          </g>
          <path d="M0 230 L400 230 L400 280 L0 280 Z" fill="#163029" opacity="0.7" />
          <g className="scene__mist" fill="#dfeee6" opacity="0.16">
            <ellipse cx="120" cy="205" rx="120" ry="16" />
            <ellipse cx="300" cy="222" rx="140" ry="18" />
          </g>
        </>
      )}

      {scene === 'rainbow' && (
        <>
          <defs>
            <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#15233f" />
              <stop offset="1" stopColor="#3a4a6a" />
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill={`url(#${id('sky')})`} />
          <circle cx="320" cy="62" r="26" fill="#f4e6b8" opacity="0.85" />
          <path d="M0 150 L120 70 L210 130 L300 60 L400 130 L400 160 L0 160 Z" fill="#2a3656" />
          <path d="M250 92 L300 60 L352 100 L300 96 Z" fill="#e9eef6" opacity="0.9" />
          <g>
            <path d="M0 150 C120 120 280 130 400 110 L400 138 C280 158 120 148 0 178 Z" fill="#b5472f" />
            <path d="M0 178 C120 148 280 158 400 138 L400 166 C280 186 120 176 0 206 Z" fill="#d98030" />
            <path d="M0 206 C120 176 280 186 400 166 L400 194 C280 214 120 204 0 234 Z" fill="#e3c057" />
            <path d="M0 234 C120 204 280 214 400 194 L400 222 C280 242 120 232 0 262 Z" fill="#5f8f5a" />
            <path d="M0 262 C120 232 280 242 400 222 L400 280 L0 280 Z" fill="#3d6f74" />
          </g>
        </>
      )}

      {scene === 'titicaca' && (
        <>
          <defs>
            <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#13294a" />
              <stop offset="1" stopColor="#3f6f96" />
            </linearGradient>
            <linearGradient id={id('lake')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2e6aa0" />
              <stop offset="1" stopColor="#17406b" />
            </linearGradient>
            <radialGradient id={id('sun')} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ffe9b0" />
              <stop offset="1" stopColor="#ffe9b0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="280" fill={`url(#${id('sky')})`} />
          <circle cx="200" cy="86" r="80" fill={`url(#${id('sun')})`} opacity="0.7" />
          <circle cx="200" cy="92" r="26" fill="#ffe6a0" />
          <path d="M0 150 L90 118 L170 142 L260 112 L340 144 L400 122 L400 158 L0 158 Z" fill="#2b4a6e" opacity="0.85" />
          <rect y="156" width="400" height="124" fill={`url(#${id('lake')})`} />
          <g fill="#c9a45a" opacity="0.9">
            <ellipse cx="150" cy="210" rx="64" ry="13" fill="#caa45a" />
            <rect x="120" y="196" width="22" height="14" rx="2" fill="#b4863c" />
            <path d="M118 196 L131 182 L144 196 Z" fill="#caa45a" />
          </g>
          <g stroke="#bcd6ea" strokeWidth="2" opacity="0.3">
            <line x1="60" y1="240" x2="120" y2="240" />
            <line x1="240" y1="226" x2="320" y2="226" />
            <line x1="180" y1="258" x2="280" y2="258" />
          </g>
        </>
      )}

      {scene === 'colca' && (
        <>
          <defs>
            <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a2a4a" />
              <stop offset="0.5" stopColor="#9a5a48" />
              <stop offset="1" stopColor="#e0a35a" />
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill={`url(#${id('sky')})`} />
          <circle cx="200" cy="120" r="34" fill="#ffd58a" opacity="0.9" />
          <path d="M0 130 L120 130 L200 240 L280 130 L400 130 L400 280 L0 280 Z" fill="#7a4a34" />
          <path d="M0 150 L130 150 L200 246 L270 150 L400 150 L400 280 L0 280 Z" fill="#8f5a3c" opacity="0.7" />
          <path d="M40 175 L150 175 L200 252 L250 175 L360 175 L360 280 L40 280 Z" fill="#6a3c2a" />
          <g stroke="#52301f" strokeWidth="2" opacity="0.5">
            <path d="M20 200 H150" />
            <path d="M250 200 H380" />
            <path d="M30 230 H160" />
            <path d="M240 230 H370" />
          </g>
          <g className="scene__condor" fill="#23161a">
            <path d="M150 92 q18 -12 34 0 q16 -12 34 0 q-16 8 -34 6 q-18 2 -34 -6 z" />
          </g>
        </>
      )}

      {scene === 'arequipa' && (
        <>
          <defs>
            <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a2f55" />
              <stop offset="1" stopColor="#8f7ba8" />
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill={`url(#${id('sky')})`} />
          <circle cx="320" cy="70" r="24" fill="#ffe3b0" opacity="0.85" />
          <path d="M70 170 L150 60 L230 170 Z" fill="#5a567a" />
          <path d="M120 100 L150 60 L182 102 L165 108 L150 96 L136 108 Z" fill="#eef1f8" opacity="0.9" />
          <rect y="170" width="400" height="110" fill="#243056" />
          <g fill="#e9e6dc">
            <rect x="40" y="150" width="40" height="50" rx="2" />
            <rect x="92" y="132" width="46" height="68" rx="2" />
            <path d="M92 132 L115 116 L138 132 Z" fill="#d6cabd" />
            <rect x="150" y="150" width="42" height="50" rx="2" />
            <rect x="204" y="140" width="50" height="60" rx="2" />
            <rect x="266" y="152" width="40" height="48" rx="2" />
            <rect x="318" y="146" width="44" height="54" rx="2" />
          </g>
          <g fill="#243056" opacity="0.85">
            <rect x="104" y="150" width="9" height="14" rx="2" />
            <rect x="118" y="150" width="9" height="14" rx="2" />
            <rect x="220" y="158" width="9" height="14" rx="2" />
            <rect x="234" y="158" width="9" height="14" rx="2" />
          </g>
        </>
      )}

      {scene === 'mancora' && (
        <>
          <defs>
            <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f2a25a" />
              <stop offset="0.55" stopColor="#f7c777" />
              <stop offset="1" stopColor="#ffe6a8" />
            </linearGradient>
            <linearGradient id={id('sea')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2f7fa3" />
              <stop offset="1" stopColor="#1d5a7e" />
            </linearGradient>
            <radialGradient id={id('sun')} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fff2cf" />
              <stop offset="1" stopColor="#fff2cf" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="280" fill={`url(#${id('sky')})`} />
          <circle cx="200" cy="118" r="90" fill={`url(#${id('sun')})`} opacity="0.8" />
          <circle cx="200" cy="124" r="40" fill="#fff0c4" />
          <rect y="158" width="400" height="122" fill={`url(#${id('sea')})`} />
          <g stroke="#bfe2ea" strokeWidth="3" opacity="0.4">
            <line x1="60" y1="190" x2="150" y2="190" />
            <line x1="240" y1="180" x2="330" y2="180" />
            <line x1="120" y1="214" x2="250" y2="214" />
            <line x1="40" y1="238" x2="160" y2="238" />
          </g>
          <path d="M320 158 C322 130 330 110 348 96 C330 116 332 140 332 158 Z" fill="#1f3a39" />
          <g stroke="#1f3a39" strokeWidth="4" fill="none">
            <path d="M348 96 q-22 -10 -40 -4" />
            <path d="M348 96 q-6 -22 4 -38" />
            <path d="M348 96 q20 -12 40 -8" />
            <path d="M348 96 q14 -20 30 -22" />
          </g>
        </>
      )}
    </svg>
  );
}
