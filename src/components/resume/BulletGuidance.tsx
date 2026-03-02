import { getBulletHints, formatBulletSuggestion } from '@/lib/bulletGuidance';

interface BulletGuidanceProps {
  text: string;
}

/**
 * Shows subtle inline suggestions for bullet structure.
 * Does NOT block input. Only guides.
 */
export function BulletGuidance({ text }: BulletGuidanceProps) {
  const hints = getBulletHints(text).filter((h) => h.needsVerb || h.needsNumber);
  if (hints.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 'var(--space-1)',
        fontSize: 'var(--text-caption)',
        color: 'var(--color-text-muted)',
        lineHeight: 1.4,
      }}
    >
      {hints.map((h) => {
        const msg = formatBulletSuggestion(h);
        return msg ? (
          <div key={h.lineIndex} style={{ marginBottom: 2 }}>
            {msg}
          </div>
        ) : null;
      })}
    </div>
  );
}
