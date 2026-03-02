import type { ResumeData } from '@/types/resume';
import { TEMPLATE_STYLES, type ResumeTemplate } from '@/lib/resumeTemplate';
import { ExternalLink, Github } from 'lucide-react';

interface ResumeLivePreviewProps {
  data: ResumeData;
  template?: ResumeTemplate;
}

/**
 * Live preview panel in builder — renders actual content from form.
 * Clean typography, section headers. Empty sections are hidden.
 * Template changes layout styling only (Classic, Modern, Minimal).
 */
export function ResumeLivePreview({ data, template = 'classic' }: ResumeLivePreviewProps) {
  const styles = TEMPLATE_STYLES[template];

  const sectionHeader = {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: styles.sectionHeaderSize,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-1)',
  };

  return (
    <div
      className={`resume-preview-shell resume-preview-shell--${template}`}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-small)',
        color: 'var(--color-text)',
        lineHeight: styles.bodyLineHeight,
        maxWidth: 320,
        margin: '0 auto',
      }}
    >
      <header style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: styles.sectionSpacing }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: styles.headerFontSize, letterSpacing: styles.headerLetterSpacing, margin: 0 }}>
          {data.personal?.name || 'Your name'}
        </h2>
        <p style={{ margin: 'var(--space-1) 0 0', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
          {[data.personal?.email, data.personal?.phone, data.personal?.location].filter(Boolean).join(' · ') || 'Email · Phone · Location'}
        </p>
      </header>

      {data.summary && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeader}>Summary</div>
          <p style={{ margin: 0 }}>{data.summary}</p>
        </section>
      )}

      {(data.education?.length ?? 0) > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeader}>Education</div>
          {data.education.map((e) => (
            <div key={e.id} style={{ marginBottom: 'var(--space-1)' }}>
              <strong>{e.institution || 'Institution'}</strong> — {e.degree} {e.field && `in ${e.field}`} · {e.startDate}–{e.endDate}
            </div>
          ))}
        </section>
      )}

      {(data.experience?.length ?? 0) > 0 && (
        <section style={{ marginBottom: styles.sectionSpacing }}>
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
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeader}>Projects</div>
          {data.projects.map((p) => (
            <div
              key={p.id}
              style={{
                marginBottom: 'var(--space-2)',
                padding: 'var(--space-2)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius)',
                background: 'var(--color-bg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                <strong style={{ fontFamily: 'var(--font-serif)' }}>{p.name || 'Project'}</strong>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site" style={{ color: 'var(--color-text-muted)', display: 'flex' }}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--color-text-muted)', display: 'flex' }}>
                      <Github size={14} />
                    </a>
                  )}
                </span>
              </div>
              {p.description && <div style={{ marginTop: 4, fontSize: 'var(--text-caption)' }}>{p.description}</div>}
              {(p.techStack?.length ?? 0) > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                  {p.techStack.map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      style={{
                        padding: '2px 6px',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 9999,
                        fontSize: 10,
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {(data.skills?.technical?.length ?? 0) > 0 || (data.skills?.soft?.length ?? 0) > 0 || (data.skills?.tools?.length ?? 0) > 0 ? (
        <section style={{ marginBottom: styles.sectionSpacing }}>
          <div style={sectionHeader}>Skills</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {data.skills.technical.length > 0 && (
              <div>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>Technical</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {data.skills.technical.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      style={{
                        padding: '2px 8px',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 9999,
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>Soft</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {data.skills.soft.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      style={{
                        padding: '2px 8px',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 9999,
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.tools.length > 0 && (
              <div>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>Tools & Technologies</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {data.skills.tools.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      style={{
                        padding: '2px 8px',
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 9999,
                        fontSize: 'var(--text-caption)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}

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
