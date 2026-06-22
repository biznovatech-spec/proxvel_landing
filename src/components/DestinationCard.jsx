import Icon from './Icon';
import ScoreMeter from './ScoreMeter';
import DestinationScene from './DestinationScene';
import useInView from '../hooks/useInView';
import { FACTORS } from '../data/content';

export default function DestinationCard({ dest }) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  // Average of the six factors as the headline "match" score.
  const avg = Math.round(
    FACTORS.reduce((s, f) => s + dest.scores[f.id], 0) / FACTORS.length
  );

  return (
    <article className="dcard reveal" ref={ref}>
      <div className="dcard__media">
        <DestinationScene scene={dest.scene} className="dcard__scene" />
        <span className="dcard__region">
          <Icon name="mapPin" size={13} /> {dest.region}
        </span>
        <span className="dcard__match">
          <strong>{avg}</strong>
          <span>match</span>
        </span>
      </div>

      <div className="dcard__body">
        <div className="dcard__tags">
          {dest.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h3 className="dcard__name">{dest.name}</h3>
        <p className="dcard__blurb">{dest.blurb}</p>

        <div className="dcard__meters">
          {FACTORS.map((f, i) => (
            <ScoreMeter
              key={f.id}
              label={f.label}
              value={dest.scores[f.id]}
              active={inView}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
