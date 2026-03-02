import type { ResumeTemplate } from '@/lib/resumeTemplate';
import { Check } from 'lucide-react';

interface TemplatePickerProps {
  value: ResumeTemplate;
  onChange: (t: ResumeTemplate) => void;
  accentColor: string;
}

const LABELS: Record<ResumeTemplate, string> = {
  classic: 'Classic',
  modern: 'Modern',
  minimal: 'Minimal',
};

/** Mini layout sketches for each template (120px wide) */
function TemplateThumbnail({
  template,
  accentColor,
  isActive,
}: {
  template: ResumeTemplate;
  accentColor: string;
  isActive: boolean;
}) {
  const w = 120;
  const h = 90;

  return (
    <div
      style={{
        width: w,
        height: h,
        background: '#fff',
        border: `2px solid ${isActive ? '#2563eb' : '#e5e7eb'}`,
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {template === 'classic' && (
        <>
          <div style={{ height: 12, borderBottom: `2px solid ${accentColor}`, marginBottom: 6 }} />
          <div style={{ height: 4, background: '#e5e7eb', marginBottom: 4, marginLeft: 4, width: '80%' }} />
          <div style={{ height: 4, background: '#e5e7eb', marginBottom: 4, marginLeft: 4, width: '60%' }} />
          <div style={{ height: 4, background: '#e5e7eb', marginBottom: 8, marginLeft: 4, width: '70%' }} />
          <div style={{ height: 2, background: accentColor, marginBottom: 4, width: '90%', margin: '0 auto' }} />
          <div style={{ height: 4, background: '#e5e7eb', marginBottom: 4, marginLeft: 4, width: '50%' }} />
        </>
      )}
      {template === 'modern' && (
        <>
          <div style={{ display: 'flex', height: '100%' }}>
            <div
              style={{
                width: 28,
                background: accentColor,
                borderRadius: '2px 0 0 0',
              }}
            />
            <div style={{ flex: 1, padding: 4 }}>
              <div style={{ height: 8, background: '#111', marginBottom: 6, borderRadius: 2 }} />
              <div style={{ height: 3, background: '#e5e7eb', marginBottom: 4, width: '90%' }} />
              <div style={{ height: 3, background: '#e5e7eb', marginBottom: 4, width: '70%' }} />
              <div style={{ height: 3, background: '#e5e7eb', marginBottom: 6, width: '80%' }} />
              <div style={{ height: 3, background: '#e5e7eb', marginBottom: 2, width: '60%' }} />
            </div>
          </div>
        </>
      )}
      {template === 'minimal' && (
        <>
          <div style={{ height: 10, background: '#111', marginBottom: 12, borderRadius: 2 }} />
          <div style={{ height: 3, background: '#e5e7eb', marginBottom: 10, marginLeft: 2, width: '85%' }} />
          <div style={{ height: 3, background: '#e5e7eb', marginBottom: 10, marginLeft: 2, width: '75%' }} />
          <div style={{ height: 3, background: '#e5e7eb', marginBottom: 8, marginLeft: 2, width: '80%' }} />
          <div style={{ height: 3, background: '#e5e7eb', marginLeft: 2, width: '65%' }} />
        </>
      )}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 18,
            height: 18,
            background: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={12} color="#fff" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export function TemplatePicker({ value, onChange, accentColor }: TemplatePickerProps) {
  return (
    <div style={{ marginBottom: 'var(--space-2)' }}>
      <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', marginBottom: 6 }}>
        Template
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {(['classic', 'modern', 'minimal'] as ResumeTemplate[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            style={{
              padding: 4,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: 8,
            }}
            aria-label={`Select ${LABELS[t]} template`}
            aria-pressed={value === t}
          >
            <TemplateThumbnail template={t} accentColor={accentColor} isActive={value === t} />
            <div
              style={{
                fontSize: 11,
                fontWeight: value === t ? 600 : 400,
                marginTop: 4,
                textAlign: 'center',
                color: 'var(--color-text)',
              }}
            >
              {LABELS[t]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
