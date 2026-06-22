import './ScoreMeter.css';

function tone(v) {
  if (v >= 80) return 'good';
  if (v >= 65) return 'mid';
  return 'low';
}

/* Horizontal animated factor bar. `active` triggers the fill. */
export default function ScoreMeter({ label, value, active = true, delay = 0, showValue = true }) {
  return (
    <div className="meter">
      <div className="meter__top">
        <span className="meter__label">{label}</span>
        {showValue && <span className={`meter__val meter__val--${tone(value)}`}>{value}</span>}
      </div>
      <div className="meter__track">
        <span
          className={`meter__fill meter__fill--${tone(value)}`}
          style={{
            width: active ? `${value}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
