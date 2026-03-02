import type { ResumeData } from '@/types/resume';
import { TEMPLATE_STYLES, type ResumeTemplate } from '@/lib/resumeTemplate';
import { ExternalLink, Github } from 'lucide-react';

interface ResumeLivePreviewProps {
  data: ResumeData;
  template?: ResumeTemplate;
  accentColor?: string;
}

const accentDefault = 'hsl(168, 60%, 40%)';

/**
 * Live preview panel in builder — renders actual content from form.
 * Classic: single-column, serif heading, horizontal rules.
 * Modern: two-column with colored left sidebar (contact, skills).
 * Minimal: single-column, no borders, generous whitespace, sans-serif throughout.
 */
export function ResumeLivePreview({ data, template = 'classic', accentColor = accentDefault }: ResumeLivePreviewProps) {
  const styles = TEMPLATE_STYLES[template];
  const accent = accentColor || accentDefault;

  const isMinimal = template === 'minimal';
  const isModern = template === 'modern';

  const sectionHeaderFont = isMinimal ? 'var(--font-sans)' : 'var(--font-serif)';
  const sectionHeaderStyle = {
    fontFamily: sectionHeaderFont,
    fontWeight: 600,
    fontSize: styles.sectionHeaderSize,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: isMinimal ? 'var(--color-text)' : accent,
    marginBottom: 'var(--space-1)',
  };

  const headerPadding = isMinimal ? { paddingBottom: 'var(--space-2)' } : { borderBottom: `1px solid ${accent}`, paddingBottom: 'var(--space-2)' };

  const contactBlock = (
    <>
      <h2 style={{ fontFamily: sectionHeaderFont, fontWeight: 600, fontSize: styles.headerFontSize, letterSpacing: styles.headerLetterSpacing, margin: 0, color: isModern ? '#fff' : 'inherit' }}>
        {data.personal?.name || 'Your name'}
      </h2>
      <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-caption)', color: isModern ? 'rgba(255,255,255,0.9)' : 'var(--color-text-muted)' }}>
        {[data.personal?.email, data.personal?.phone, data.personal?.location].filter(Boolean).join(' · ') || 'Email · Phone · Location'}
      </p>
    </>
  );

  const skillsBlock = (data.skills?.technical?.length ?? 0) > 0 || (data.skills?.soft?.length ?? 0) > 0 || (data.skills?.tools?.length ?? 0) > 0 ? (
    <section style={{ marginBottom: isModern ? 0 : styles.sectionSpacing }}>
      <div style={{ ...sectionHeaderStyle, color: isModern ? '#fff' : accent }}>Skills</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {data.skills.technical.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: isModern ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>Technical</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {data.skills.technical.map((s, i) => (
                <span key={`${s}-${i}`} style={{ padding: '2px 8px', background: isModern ? 'rgba(255,255,255,0.2)' : 'var(--color-bg-elevated)', border: isModern ? 'none' : '1px solid var(--color-border-subtle)', borderRadius: 9999, fontSize: 'var(--text-caption)', color: isModern ? '#fff' : 'inherit' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {data.skills.soft.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: isModern ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>Soft</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {data.skills.soft.map((s, i) => (
                <span key={`${s}-${i}`} style={{ padding: '2px 8px', background: isModern ? 'rgba(255,255,255,0.2)' : 'var(--color-bg-elevated)', border: isModern ? 'none' : '1px solid var(--color-border-subtle)', borderRadius: 9999, fontSize: 'var(--text-caption)', color: isModern ? '#fff' : 'inherit' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {data.skills.tools.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: isModern ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>Tools</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {data.skills.tools.map((s, i) => (
                <span key={`${s}-${i}`} style={{ padding: '2px 8px', background: isModern ? 'rgba(255,255,255,0.2)' : 'var(--color-bg-elevated)', border: isModern ? 'none' : '1px solid var(--color-border-subtle)', borderRadius: 9999, fontSize: 'var(--text-caption)', color: isModern ? '#fff' : 'inherit' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  ) : null;

  const mainContent = (
    <>
      {data.summary && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeaderStyle}>Summary</div>
          <p style={{ margin: 0 }}>{data.summary}</p>
        </section>
      )}
      {(data.education?.length ?? 0) > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeaderStyle}>Education</div>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{e.institution || 'Institution'}</strong> — {e.degree} {e.field && `in ${e.field}`} · {e.startDate}–{e.endDate}
            </div>
          ))}
        </section>
      )}
      {(data.experience?.length ?? 0) > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeaderStyle}>Experience</div>
          {data.experience.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{e.role || 'Role'}</strong> at {e.company || 'Company'} · {e.startDate}–{e.endDate}
              {e.description && <div style={{ marginTop: 2 }}>{e.description}</div>}
            </div>
          ))}
        </section>
      )}
      {(data.projects?.length ?? 0) > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeaderStyle}>Projects</div>
          {data.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 'var(--space-2)', padding: isMinimal ? 0 : 'var(--space-2)', border: isMinimal ? 'none' : '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius)', background: isMinimal ? 'transparent' : 'var(--color-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                <strong style={{ fontFamily: sectionHeaderFont }}>{p.name || 'Project'}</strong>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site" style={{ color: 'var(--color-text-muted)', display: 'flex' }}><ExternalLink size={14} /></a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--color-text-muted)', display: 'flex' }}><Github size={14} /></a>}
                </span>
              </div>
              {p.description && <div style={{ marginTop: 4, fontSize: 'var(--text-caption)' }}>{p.description}</div>}
              {(p.techStack?.length ?? 0) > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                  {p.techStack.map((t, i) => (
                    <span key={`${t}-${i}`} style={{ padding: '2px 6px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-subtle)', borderRadius: 9999, fontSize: 10, color: 'var(--color-text-muted)' }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      {(data.links?.github || data.links?.linkedin) && !isModern && (
        <section>
          <div style={sectionHeaderStyle}>Links</div>
          <p style={{ margin: 0, fontSize: 'var(--text-caption)' }}>{[data.links?.github, data.links?.linkedin].filter(Boolean).join(' · ')}</p>
        </section>
      )}
    </>
  );

  if (isModern) {
    return (
      <div
        className={`resume-preview-shell resume-preview-shell--modern`}
        style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)', color: 'var(--color-text)', lineHeight: styles.bodyLineHeight, maxWidth: 320, margin: '0 auto' }}
      >
        <div style={{ display: 'flex', minHeight: 200 }}>
          <div
            style={{
              width: 88,
              minHeight: 120,
              background: accent,
              color: '#fff',
              padding: 'var(--space-2)',
              borderRadius: '6px 0 0 6px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            {contactBlock}
            {skillsBlock}
            {(data.links?.github || data.links?.linkedin) && (
              <div style={{ marginTop: 'auto', fontSize: 10 }}>
                {[data.links?.github, data.links?.linkedin].filter(Boolean).join(' · ')}
              </div>
            )}
          </div>
          <div style={{ flex: 1, padding: 'var(--space-2)', border: `1px solid ${accent}`, borderLeft: 'none', borderRadius: '0 6px 6px 0' }}>
            {mainContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`resume-preview-shell resume-preview-shell--${template}`}
      style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)', color: 'var(--color-text)', lineHeight: styles.bodyLineHeight, maxWidth: 320, margin: '0 auto' }}
    >
      <header style={{ ...headerPadding, marginBottom: styles.sectionSpacing }}>
        {contactBlock}
      </header>
      {mainContent}
      {!isModern && skillsBlock}
    </div>
  );
}
