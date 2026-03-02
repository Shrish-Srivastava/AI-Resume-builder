import { useCallback } from 'react';
import type { ResumeData, EducationEntry, ExperienceEntry, ProjectEntry } from '@/types/resume';
import { sampleResume } from '@/lib/sampleResume';
import { useResumeData } from '@/context/ResumeDataContext';
import { ResumeLivePreview } from '@/components/resume/ResumeLivePreview';
import { AtsScoreMeter } from '@/components/resume/AtsScoreMeter';

function newId(): string {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function BuilderPage() {
  const { data, setData } = useResumeData();

  const update = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, [setData]);

  const loadSample = useCallback(() => {
    setData(JSON.parse(JSON.stringify(sampleResume)));
  }, [setData]);

  const addEducation = useCallback(() => {
    const entry: EducationEntry = {
      id: newId(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
    };
    setData((prev) => ({ ...prev, education: [...prev.education, entry] }));
  }, [setData]);

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  }, [setData]);

  const updateEducation = useCallback((id: string, updates: Partial<EducationEntry>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  }, [setData]);

  const addExperience = useCallback(() => {
    const entry: ExperienceEntry = {
      id: newId(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
    };
    setData((prev) => ({ ...prev, experience: [...prev.experience, entry] }));
  }, [setData]);

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  }, [setData]);

  const updateExperience = useCallback((id: string, updates: Partial<ExperienceEntry>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  }, [setData]);

  const addProject = useCallback(() => {
    const entry: ProjectEntry = { id: newId(), name: '', description: '' };
    setData((prev) => ({ ...prev, projects: [...prev.projects, entry] }));
  }, [setData]);

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  }, [setData]);

  const updateProject = useCallback((id: string, updates: Partial<ProjectEntry>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  }, [setData]);

  return (
    <div className="resume-builder-page" style={{ padding: 'var(--space-4)', maxWidth: 1400, margin: '0 auto' }}>
      <div className="resume-builder-layout">
        <div className="resume-builder-form" style={{ flex: '1 1 55%', minWidth: 0 }}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={loadSample}>
              Load Sample Data
            </button>
          </div>

          <section className="resume-form-section" style={{ marginBottom: 'var(--space-4)' }}>
            <h2 className="resume-form-section__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-title)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
              Personal Info
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <input
                type="text"
                className="kodnest-input"
                placeholder="Full name"
                value={data.personal.name}
                onChange={(e) => update('personal', { ...data.personal, name: e.target.value })}
              />
              <input
                type="email"
                className="kodnest-input"
                placeholder="Email"
                value={data.personal.email}
                onChange={(e) => update('personal', { ...data.personal, email: e.target.value })}
              />
              <input
                type="tel"
                className="kodnest-input"
                placeholder="Phone"
                value={data.personal.phone}
                onChange={(e) => update('personal', { ...data.personal, phone: e.target.value })}
              />
              <input
                type="text"
                className="kodnest-input"
                placeholder="Location"
                value={data.personal.location}
                onChange={(e) => update('personal', { ...data.personal, location: e.target.value })}
              />
            </div>
          </section>

          <section className="resume-form-section" style={{ marginBottom: 'var(--space-4)' }}>
            <h2 className="resume-form-section__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-title)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
              Summary
            </h2>
            <textarea
              className="kodnest-input"
              placeholder="Professional summary"
              value={data.summary}
              onChange={(e) => update('summary', e.target.value)}
              rows={4}
              style={{ resize: 'vertical', minHeight: 100 }}
            />
          </section>

          <section className="resume-form-section" style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <h2 className="resume-form-section__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-title)', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
                Education
              </h2>
              <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={addEducation}>
                Add entry
              </button>
            </div>
            {data.education.map((entry) => (
              <div key={entry.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <input className="kodnest-input" placeholder="Institution" value={entry.institution} onChange={(e) => updateEducation(entry.id, { institution: e.target.value })} style={{ marginBottom: 'var(--space-1)' }} />
                <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
                  <input className="kodnest-input" placeholder="Degree" value={entry.degree} onChange={(e) => updateEducation(entry.id, { degree: e.target.value })} />
                  <input className="kodnest-input" placeholder="Field" value={entry.field ?? ''} onChange={(e) => updateEducation(entry.id, { field: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
                  <input className="kodnest-input" placeholder="Start" value={entry.startDate} onChange={(e) => updateEducation(entry.id, { startDate: e.target.value })} />
                  <input className="kodnest-input" placeholder="End" value={entry.endDate} onChange={(e) => updateEducation(entry.id, { endDate: e.target.value })} />
                </div>
                <textarea className="kodnest-input" placeholder="Description (optional)" value={entry.description ?? ''} onChange={(e) => updateEducation(entry.id, { description: e.target.value })} rows={2} style={{ resize: 'vertical', marginBottom: 'var(--space-1)' }} />
                <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={() => removeEducation(entry.id)}>Remove</button>
              </div>
            ))}
          </section>

          <section className="resume-form-section" style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <h2 className="resume-form-section__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-title)', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
                Experience
              </h2>
              <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={addExperience}>
                Add entry
              </button>
            </div>
            {data.experience.map((entry) => (
              <div key={entry.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <input className="kodnest-input" placeholder="Company" value={entry.company} onChange={(e) => updateExperience(entry.id, { company: e.target.value })} style={{ marginBottom: 'var(--space-1)' }} />
                <input className="kodnest-input" placeholder="Role" value={entry.role} onChange={(e) => updateExperience(entry.id, { role: e.target.value })} style={{ marginBottom: 'var(--space-1)' }} />
                <input className="kodnest-input" placeholder="Location (optional)" value={entry.location ?? ''} onChange={(e) => updateExperience(entry.id, { location: e.target.value })} style={{ marginBottom: 'var(--space-1)' }} />
                <div style={{ display: 'flex', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
                  <input className="kodnest-input" placeholder="Start" value={entry.startDate} onChange={(e) => updateExperience(entry.id, { startDate: e.target.value })} />
                  <input className="kodnest-input" placeholder="End" value={entry.endDate} onChange={(e) => updateExperience(entry.id, { endDate: e.target.value })} />
                </div>
                <textarea className="kodnest-input" placeholder="Description (optional)" value={entry.description ?? ''} onChange={(e) => updateExperience(entry.id, { description: e.target.value })} rows={3} style={{ resize: 'vertical', marginBottom: 'var(--space-1)' }} />
                <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={() => removeExperience(entry.id)}>Remove</button>
              </div>
            ))}
          </section>

          <section className="resume-form-section" style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <h2 className="resume-form-section__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-title)', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
                Projects
              </h2>
              <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={addProject}>
                Add entry
              </button>
            </div>
            {data.projects.map((entry) => (
              <div key={entry.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <input className="kodnest-input" placeholder="Project name" value={entry.name} onChange={(e) => updateProject(entry.id, { name: e.target.value })} style={{ marginBottom: 'var(--space-1)' }} />
                <input className="kodnest-input" placeholder="URL (optional)" value={entry.url ?? ''} onChange={(e) => updateProject(entry.id, { url: e.target.value })} style={{ marginBottom: 'var(--space-1)' }} />
                <textarea className="kodnest-input" placeholder="Description (optional)" value={entry.description ?? ''} onChange={(e) => updateProject(entry.id, { description: e.target.value })} rows={2} style={{ resize: 'vertical', marginBottom: 'var(--space-1)' }} />
                <input className="kodnest-input" placeholder="Tech (optional)" value={entry.tech ?? ''} onChange={(e) => updateProject(entry.id, { tech: e.target.value })} style={{ marginBottom: 'var(--space-1)' }} />
                <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={() => removeProject(entry.id)}>Remove</button>
              </div>
            ))}
          </section>

          <section className="resume-form-section" style={{ marginBottom: 'var(--space-4)' }}>
            <h2 className="resume-form-section__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-title)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
              Skills
            </h2>
            <input
              type="text"
              className="kodnest-input"
              placeholder="Comma-separated (e.g. React, TypeScript, Node.js)"
              value={data.skills.join(', ')}
              onChange={(e) => update('skills', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            />
          </section>

          <section className="resume-form-section" style={{ marginBottom: 'var(--space-4)' }}>
            <h2 className="resume-form-section__title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-title)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
              Links
            </h2>
            <input
              type="url"
              className="kodnest-input"
              placeholder="GitHub URL"
              value={data.links.github ?? ''}
              onChange={(e) => update('links', { ...data.links, github: e.target.value || undefined })}
              style={{ marginBottom: 'var(--space-1)' }}
            />
            <input
              type="url"
              className="kodnest-input"
              placeholder="LinkedIn URL"
              value={data.links.linkedin ?? ''}
              onChange={(e) => update('links', { ...data.links, linkedin: e.target.value || undefined })}
            />
          </section>
        </div>

        <aside
          className="resume-builder-preview"
          style={{
            flex: '0 0 380px',
            position: 'sticky',
            top: 'var(--space-3)',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius)',
            padding: 'var(--space-3)',
            minHeight: 520,
          }}
        >
          <AtsScoreMeter data={data} />
          <ResumeLivePreview data={data} />
        </aside>
      </div>
    </div>
  );
}
