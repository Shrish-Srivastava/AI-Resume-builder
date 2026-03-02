import type { ResumeData } from '@/types/resume';

/**
 * Clean resume layout for /preview — premium typography, minimal black + white, no colors.
 */
export function ResumePreviewDocument({ data }: { data: ResumeData }) {
  return (
    <article
      className="resume-preview-document"
      style={{
        fontFamily: 'var(--font-sans)',
        color: '#111',
        background: '#fff',
        maxWidth: 720,
        margin: '0 auto',
        padding: 'var(--space-5)',
        lineHeight: 1.5,
      }}
    >
      <header style={{ borderBottom: '1px solid #111', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, margin: 0, letterSpacing: '-0.02em' }}>
          {data.personal.name || 'Your name'}
        </h1>
        <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)', color: '#333' }}>
          {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(' · ') || 'Email · Phone · Location'}
        </p>
        {(data.links.github || data.links.linkedin) && (
          <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-caption)', color: '#555' }}>
            {[data.links.github, data.links.linkedin].filter(Boolean).join(' · ')}
          </p>
        )}
      </header>

      {data.summary && (
        <section style={{ marginBottom: 'var(--space-3)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Summary
          </h2>
          <p style={{ margin: 0, fontSize: 'var(--text-body)', color: '#111' }}>{data.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section style={{ marginBottom: 'var(--space-3)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Education
          </h2>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                <strong style={{ fontFamily: 'var(--font-serif)' }}>{e.institution || 'Institution'}</strong>
                <span style={{ fontSize: 'var(--text-small)', color: '#555' }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ fontSize: 'var(--text-small)', color: '#333' }}>{e.degree}{e.field ? ` in ${e.field}` : ''}</div>
              {e.description && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)' }}>{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.experience.length > 0 && (
        <section style={{ marginBottom: 'var(--space-3)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Experience
          </h2>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                <strong style={{ fontFamily: 'var(--font-serif)' }}>{e.role || 'Role'}</strong>
                <span style={{ fontSize: 'var(--text-small)', color: '#555' }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ fontSize: 'var(--text-small)', color: '#333' }}>{e.company}{e.location ? ` · ${e.location}` : ''}</div>
              {e.description && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)' }}>{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section style={{ marginBottom: 'var(--space-3)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Projects
          </h2>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 'var(--space-2)' }}>
              <strong style={{ fontFamily: 'var(--font-serif)' }}>{p.name || 'Project'}</strong>
              {p.url && <span style={{ fontSize: 'var(--text-small)', color: '#555' }}> · {p.url}</span>}
              {p.description && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)' }}>{p.description}</p>}
              {p.tech && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-caption)', color: '#555' }}>{p.tech}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-body)', fontWeight: 600, marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Skills
          </h2>
          <p style={{ margin: 0, fontSize: 'var(--text-small)' }}>{data.skills.join(', ')}</p>
        </section>
      )}
    </article>
  );
}
