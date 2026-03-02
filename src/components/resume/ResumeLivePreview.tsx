import type { ResumeData } from '@/types/resume';

interface ResumeLivePreviewProps {
  data: ResumeData;
}

/**
 * Live preview panel in builder — renders actual content from form.
 * Clean typography, section headers. Empty sections are hidden.
 */
export function ResumeLivePreview({ data }: ResumeLivePreviewProps) {
  const sectionHeader = {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 'var(--text-caption)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-1)',
  };

  return (
    <div
      className="resume-preview-shell"
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text)',
        lineHeight: 1.5,
        maxWidth: 320,
        margin: '0 auto',
      }}
    >
      <header style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', margin: 0 }}>
          {data.personal?.name || 'Your name'}
        </h2>
        <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
          {[data.personal?.email, data.personal?.phone, data.personal?.location].filter(Boolean).join(' · ') || 'Email · Phone · Location'}
        </p>
      </header>

      {data.summary && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={sectionHeader}>Summary</div>
          <p style={{ margin: 0 }}>{data.summary}</p>
        </section>
      )}

      {(data.education?.length ?? 0) > 0 && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={sectionHeader}>Education</div>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{e.institution || 'Institution'}</strong> — {e.degree} {e.field && `in ${e.field}`} · {e.startDate}–{e.endDate}
            </div>
          ))}
        </section>
      )}

      {(data.experience?.length ?? 0) > 0 && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={sectionHeader}>Experience</div>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{e.role || 'Role'}</strong> at {e.company || 'Company'} · {e.startDate}–{e.endDate}
              {e.description && <div style={{ marginTop: 2 }}>{e.description}</div>}
            </div>
          ))}
        </section>
      )}

      {(data.projects?.length ?? 0) > 0 && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={sectionHeader}>Projects</div>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{p.name || 'Project'}</strong>
              {p.description && <div style={{ marginTop: 2 }}>{p.description}</div>}
            </div>
          ))}
        </section>
      )}

      {(data.skills?.length ?? 0) > 0 && (
        <section style={{ marginBottom: 'var(--space-2)' }}>
          <div style={sectionHeader}>Skills</div>
          <p style={{ margin: 0 }}>{(data.skills ?? []).join(', ')}</p>
        </section>
      )}

      {(data.links?.github || data.links?.linkedin) && (
        <section>
          <div style={sectionHeader}>Links</div>
          <p style={{ margin: 0, fontSize: 'var(--text-caption)' }}>
            {[data.links?.github, data.links?.linkedin].filter(Boolean).join(' · ')}
          </p>
        </section>
      )}
    </div>
  );
}
