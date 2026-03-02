import type { ResumeTemplate } from '@/lib/resumeTemplate';

interface TemplateTabsProps {
  value: ResumeTemplate;
  onChange: (t: ResumeTemplate) => void;
}

const LABELS: Record<ResumeTemplate, string> = {
  classic: 'Classic',
  modern: 'Modern',
  minimal: 'Minimal',
};

export function TemplateTabs({ value, onChange }: TemplateTabsProps) {
  return (
    <div
      className="template-tabs"
      style={{
        display: 'flex',
        gap: 'var(--space-1)',
        marginBottom: 'var(--space-2)',
      }}
    >
      {(['classic', 'modern', 'minimal'] as ResumeTemplate[]).map((t) => (
        <button
          key={t}
          type="button"
          className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm"
          onClick={() => onChange(t)}
          style={{
            fontWeight: value === t ? 600 : 500,
            borderColor: value === t ? 'var(--color-accent)' : undefined,
            color: value === t ? 'var(--color-accent)' : undefined,
          }}
        >
          {LABELS[t]}
        </button>
      ))}
    </div>
  );
}
