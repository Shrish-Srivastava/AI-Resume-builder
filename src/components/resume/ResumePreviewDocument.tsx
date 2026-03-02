import type { ResumeData } from '@/types/resume';
import { TEMPLATE_STYLES, type ResumeTemplate } from '@/lib/resumeTemplate';

interface ResumePreviewDocumentProps {
  data: ResumeData;
  template?: ResumeTemplate;
  accentColor?: string;
}

const accentDefault = 'hsl(168, 60%, 40%)';

/**
 * Clean resume layout for /preview.
 * Template: Classic (single-column, rules), Modern (two-column, sidebar), Minimal (clean, no borders).
 * accentColor applies to headings, borders, sidebar. Print CSS overrides to black/white.
 */
export function ResumePreviewDocument({ data, template = 'classic', accentColor = accentDefault }: ResumePreviewDocumentProps) {
  const styles = TEMPLATE_STYLES[template];
  const accent = accentColor || accentDefault;
  const isModern = template === 'modern';
  const isMinimal = template === 'minimal';
  const h2Font = isMinimal ? 'var(--font-sans)' : 'var(--font-serif)';

  const sectionH2 = {
    fontFamily: h2Font,
    fontSize: styles.sectionHeaderSize,
    fontWeight: 600,
    marginBottom: 'var(--space-1)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: accent,
  };

  const headerBorder = isMinimal ? {} : { borderBottom: `1px solid ${accent}` };

  const contactBlock = (
    <>
      <h1 style={{ fontFamily: h2Font, fontSize: styles.headerFontSize, fontWeight: 600, margin: 0, letterSpacing: styles.headerLetterSpacing, color: isModern ? '#fff' : '#111' }}>
        {data.personal.name || 'Your name'}
      </h1>
      <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)', color: isModern ? 'rgba(255,255,255,0.9)' : '#333' }}>
        {[data.personal.email, data.personal.phone, data.personal.location].filter(Boolean).join(' · ') || 'Email · Phone · Location'}
      </p>
      {(data.links.github || data.links.linkedin) && !isModern && (
        <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-caption)', color: '#555' }}>
          {[data.links.github, data.links.linkedin].filter(Boolean).join(' · ')}
        </p>
      )}
    </>
  );

  const skillsSection = (data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
    <section>
      <h2 style={sectionH2}>Skills</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {data.skills.technical.length > 0 && (
          <div>
            <div style={{ fontSize: 'var(--text-caption)', color: isModern ? 'rgba(255,255,255,0.8)' : '#555', marginBottom: 4 }}>Technical</div>
            <p style={{ margin: 0, fontSize: 'var(--text-small)', color: isModern ? '#fff' : '#111' }}>{data.skills.technical.join(', ')}</p>
          </div>
        )}
        {data.skills.soft.length > 0 && (
          <div>
            <div style={{ fontSize: 'var(--text-caption)', color: isModern ? 'rgba(255,255,255,0.8)' : '#555', marginBottom: 4 }}>Soft</div>
            <p style={{ margin: 0, fontSize: 'var(--text-small)', color: isModern ? '#fff' : '#111' }}>{data.skills.soft.join(', ')}</p>
          </div>
        )}
        {data.skills.tools.length > 0 && (
          <div>
            <div style={{ fontSize: 'var(--text-caption)', color: isModern ? 'rgba(255,255,255,0.8)' : '#555', marginBottom: 4 }}>Tools & Technologies</div>
            <p style={{ margin: 0, fontSize: 'var(--text-small)', color: isModern ? '#fff' : '#111' }}>{data.skills.tools.join(', ')}</p>
          </div>
        )}
      </div>
    </section>
  );

  const mainContent = (
    <>
      {data.summary && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <h2 style={sectionH2}>Summary</h2>
          <p style={{ margin: 0, fontSize: 'var(--text-body)', color: '#111' }}>{data.summary}</p>
        </section>
      )}
      {data.education.length > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <h2 style={{ ...sectionH2, marginBottom: 'var(--space-2)' }}>Education</h2>
          {data.education.map((e) => (
            <div key={e.id} className="resume-entry" style={{ marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                <strong style={{ fontFamily: h2Font }}>{e.institution || 'Institution'}</strong>
                <span style={{ fontSize: 'var(--text-small)', color: '#555' }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ fontSize: 'var(--text-small)', color: '#333' }}>{e.degree}{e.field ? ` in ${e.field}` : ''}</div>
              {e.description && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)' }}>{e.description}</p>}
            </div>
          ))}
        </section>
      )}
      {data.experience.length > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <h2 style={{ ...sectionH2, marginBottom: 'var(--space-2)' }}>Experience</h2>
          {data.experience.map((e) => (
            <div key={e.id} className="resume-entry" style={{ marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                <strong style={{ fontFamily: h2Font }}>{e.role || 'Role'}</strong>
                <span style={{ fontSize: 'var(--text-small)', color: '#555' }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ fontSize: 'var(--text-small)', color: '#333' }}>{e.company}{e.location ? ` · ${e.location}` : ''}</div>
              {e.description && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)' }}>{e.description}</p>}
            </div>
          ))}
        </section>
      )}
      {data.projects.length > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <h2 style={{ ...sectionH2, marginBottom: 'var(--space-2)' }}>Projects</h2>
          {data.projects.map((p) => (
            <div key={p.id} className="resume-entry" style={{ marginBottom: 'var(--space-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                <strong style={{ fontFamily: h2Font }}>{p.name || 'Project'}</strong>
                <span style={{ display: 'flex', gap: 8, fontSize: 'var(--text-small)' }}>
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#333' }}>Live</a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#333' }}>GitHub</a>}
                </span>
              </div>
              {p.description && <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-small)' }}>{p.description}</p>}
              {p.techStack?.length > 0 && (
                <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-caption)', color: '#555' }}>{p.techStack.join(' · ')}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );

  if (isModern) {
    return (
      <article
        className={`resume-preview-document resume-preview-document--modern`}
        style={{ fontFamily: 'var(--font-sans)', color: '#111', background: '#fff', maxWidth: 720, margin: '0 auto', padding: 0, lineHeight: styles.bodyLineHeight, wordWrap: 'break-word', overflowWrap: 'break-word', boxSizing: 'border-box', display: 'flex', minHeight: 400 }}
      >
        <div
          style={{
            width: 180,
            minHeight: 200,
            background: accent,
            color: '#fff',
            padding: 'var(--space-4)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {contactBlock}
          {(data.links.github || data.links.linkedin) && (
            <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-caption)' }}>{[data.links.github, data.links.linkedin].filter(Boolean).join(' · ')}</p>
          )}
          {skillsSection}
        </div>
        <div style={{ flex: 1, padding: 'var(--space-5)', borderLeft: `1px solid ${accent}` }} className="resume-entry">
          {mainContent}
        </div>
      </article>
    );
  }

  return (
    <article
      className={`resume-preview-document resume-preview-document--${template}`}
      style={{
        fontFamily: 'var(--font-sans)',
        color: '#111',
        background: '#fff',
        maxWidth: 720,
        margin: '0 auto',
        padding: 'var(--space-5)',
        lineHeight: styles.bodyLineHeight,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        boxSizing: 'border-box',
      }}
    >
      <header style={{ ...headerBorder, paddingBottom: 'var(--space-2)', marginBottom: styles.sectionSpacing }}>
        {contactBlock}
      </header>

      {mainContent}

      {skillsSection}
    </article>
  );
}
