import {
  computeAtsScore,
  getAtsSuggestions,
  getAtsZone,
  ATS_ZONE_LABELS,
  ATS_ZONE_COLORS,
  type AtsSuggestion,
} from '@/lib/atsScore';
import type { ResumeData } from '@/types/resume';

interface AtsScoreMeterProps {
  data: ResumeData;
  /** Compact mode for builder sidebar (fewer suggestions) */
  compact?: boolean;
}

const SIZE = 80;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircularProgress({ score, color }: { score: number; color: string }) {
  const pct = Math.min(100, Math.max(0, score));
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, flexShrink: 0 }}>
      <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-bg-muted)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 200ms ease-out' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          fontWeight: 700,
          fontFamily: 'var(--font-serif)',
          color: 'var(--color-text)',
        }}
      >
        {score}
      </div>
    </div>
  );
}

/**
 * ATS Readiness Score — circular progress, color zones, improvement suggestions.
 * 0-40: Red "Needs Work" | 41-70: Amber "Getting There" | 71-100: Green "Strong Resume"
 * Updates live as user edits.
 */
export function AtsScoreMeter({ data, compact }: AtsScoreMeterProps) {
  const score = computeAtsScore(data);
  const zone = getAtsZone(score);
  const color = ATS_ZONE_COLORS[zone];
  const label = ATS_ZONE_LABELS[zone];
  const suggestions = getAtsSuggestions(data);
  const displaySuggestions = compact ? suggestions.slice(0, 3) : suggestions;

  return (
    <div
      className="ats-score-meter"
      style={{
        marginBottom: 'var(--space-3)',
        paddingBottom: 'var(--space-3)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--text-caption)',
          fontWeight: 500,
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-1)',
        }}
      >
        ATS Readiness Score
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: displaySuggestions.length > 0 ? 'var(--space-2)' : 0,
        }}
      >
        <CircularProgress score={score} color={color} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 'var(--text-body)', color }}>{label}</div>
          <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
            {score}/100
          </div>
        </div>
      </div>
      {displaySuggestions.length > 0 && (
        <>
          <div
            style={{
              fontSize: 'var(--text-caption)',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Improvement suggestions
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 'var(--space-2)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            {displaySuggestions.map((s: AtsSuggestion, i: number) => (
              <li key={i} style={{ marginBottom: 'var(--space-1)' }}>
                {s.text} <strong style={{ color: 'var(--color-text)' }}>(+{s.points} points)</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
