import { computeAtsScore, getAtsSuggestions } from '@/lib/atsScore';
import type { ResumeData } from '@/types/resume';

interface AtsScoreMeterProps {
  data: ResumeData;
}

/**
 * ATS Readiness Score — calm, premium meter.
 * Shows score (0–100) and up to 3 suggestions.
 */
export function AtsScoreMeter({ data }: AtsScoreMeterProps) {
  const score = computeAtsScore(data);
  const suggestions = getAtsSuggestions(data);

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
          gap: 'var(--space-2)',
          marginBottom: suggestions.length > 0 ? 'var(--space-2)' : 0,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '2px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: 600,
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text)',
            flexShrink: 0,
          }}
        >
          {score}
        </div>
        <div
          style={{
            flex: 1,
            height: 8,
            background: 'var(--color-bg-muted)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${score}%`,
              height: '100%',
              background: 'var(--color-accent)',
              borderRadius: 4,
              transition: 'width 150ms ease-in-out',
            }}
          />
        </div>
      </div>
      {suggestions.length > 0 && (
        <ul
          style={{
            margin: 0,
            paddingLeft: 'var(--space-2)',
            fontSize: 'var(--text-caption)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          {suggestions.map((s, i) => (
            <li key={i} style={{ marginBottom: 'var(--space-1)' }}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
