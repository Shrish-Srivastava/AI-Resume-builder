import type { ResumeData } from '@/types/resume';

interface ResumeLivePreviewProps {
  data: ResumeData;
}

/**
 * Live preview panel in builder — structured resume layout placeholder.
 * Same structure as /preview but inline in builder (skeleton shell).
 */
export function ResumeLivePreview({ data }: ResumeLivePreviewProps) {
  return (
    <div
      className="resume-preview-shell"
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text)',
        maxWidth: 320,
        margin: '0 auto',
      }}
    >
      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem' }}>
          {data.personal.name || 'Your name'}
        </div>
        <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(' · ') || 'Email · Phone · Location'}
        </div>
      </div>
      {data.summary && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-caption)', marginBottom: 'var(--space-1)' }}>Summary</div>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{data.summary}</p>
        </section>
      )}
      {data.education.length > 0 && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-caption)', marginBottom: 'var(--space-1)' }}>Education</div>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{e.institution || 'Institution'}</strong> — {e.degree} {e.field && `in ${e.field}`} · {e.startDate}–{e.endDate}
            </div>
          ))}
        </section>
      )}
      {data.experience.length > 0 && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-caption)', marginBottom: 'var(--space-1)' }}>Experience</div>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{e.role || 'Role'}</strong> at {e.company || 'Company'} · {e.startDate}–{e.endDate}
              {e.description && <div style={{ marginTop: 2 }}>{e.description}</div>}
            </div>
          ))}
        </section>
      )}
      {data.projects.length > 0 && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-caption)', marginBottom: 'var(--space-1)' }}>Projects</div>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{p.name || 'Project'}</strong>
              {p.description && <div style={{ marginTop: 2 }}>{p.description}</div>}
            </div>
          ))}
        </section>
      )}
      {data.skills.length > 0 && (
        <section>
          <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-caption)', marginBottom: 'var(--space-1)' }}>Skills</div>
          <p style={{ margin: 0 }}>{data.skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
}
