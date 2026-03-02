import { THEME_COLORS, type ResumeThemeId } from '@/lib/resumeTheme';

interface ColorThemePickerProps {
  value: ResumeThemeId;
  onChange: (id: ResumeThemeId) => void;
}

export function ColorThemePicker({ value, onChange }: ColorThemePickerProps) {
  return (
    <div style={{ marginBottom: 'var(--space-2)' }}>
      <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', marginBottom: 6 }}>
        Color theme
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {THEME_COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            title={c.name}
            aria-label={`Select ${c.name} theme`}
            aria-pressed={value === c.id}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: c.hsl,
              border: value === c.id ? '3px solid #2563eb' : '2px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
              padding: 0,
              boxSizing: 'border-box',
            }}
          />
        ))}
      </div>
    </div>
  );
}
