import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ResumeData } from '@/types/resume';
import { emptyResume } from '@/types/resume';

const STORAGE_KEY = 'resumeBuilderData';

function isObject(v: unknown): v is Record<string, unknown> {
  return v != null && typeof v === 'object' && !Array.isArray(v);
}

function isArray(v: unknown): v is unknown[] {
  return Array.isArray(v);
}

function sanitizeResumeData(parsed: unknown): ResumeData {
  if (!isObject(parsed)) return emptyResume;
  return {
    personal: isObject(parsed.personal)
      ? {
          name: typeof parsed.personal.name === 'string' ? parsed.personal.name : '',
          email: typeof parsed.personal.email === 'string' ? parsed.personal.email : '',
          phone: typeof parsed.personal.phone === 'string' ? parsed.personal.phone : '',
          location: typeof parsed.personal.location === 'string' ? parsed.personal.location : '',
        }
      : emptyResume.personal,
    summary: typeof parsed.summary === 'string' ? parsed.summary : '',
    education: isArray(parsed.education)
      ? parsed.education
          .filter(isObject)
          .map((e) => ({
            id: typeof e.id === 'string' ? e.id : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            institution: typeof e.institution === 'string' ? e.institution : '',
            degree: typeof e.degree === 'string' ? e.degree : '',
            field: typeof e.field === 'string' ? e.field : undefined,
            startDate: typeof e.startDate === 'string' ? e.startDate : '',
            endDate: typeof e.endDate === 'string' ? e.endDate : '',
            description: typeof e.description === 'string' ? e.description : undefined,
          }))
      : [],
    experience: isArray(parsed.experience)
      ? parsed.experience
          .filter(isObject)
          .map((e) => ({
            id: typeof e.id === 'string' ? e.id : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            company: typeof e.company === 'string' ? e.company : '',
            role: typeof e.role === 'string' ? e.role : '',
            location: typeof e.location === 'string' ? e.location : undefined,
            startDate: typeof e.startDate === 'string' ? e.startDate : '',
            endDate: typeof e.endDate === 'string' ? e.endDate : '',
            description: typeof e.description === 'string' ? e.description : undefined,
          }))
      : [],
    projects: isArray(parsed.projects)
      ? parsed.projects
          .filter(isObject)
          .map((p) => ({
            id: typeof p.id === 'string' ? p.id : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            name: typeof p.name === 'string' ? p.name : '',
            url: typeof p.url === 'string' ? p.url : undefined,
            description: typeof p.description === 'string' ? p.description : undefined,
            tech: typeof p.tech === 'string' ? p.tech : undefined,
          }))
      : [],
    skills: isArray(parsed.skills)
      ? parsed.skills.filter((s): s is string => typeof s === 'string')
      : [],
    links: isObject(parsed.links)
      ? {
          github: typeof parsed.links.github === 'string' ? parsed.links.github : undefined,
          linkedin: typeof parsed.links.linkedin === 'string' ? parsed.links.linkedin : undefined,
        }
      : {},
  };
}

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyResume;
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object') return sanitizeResumeData(parsed);
  } catch {
    // ignore parse errors — fallback safely
  }
  return emptyResume;
}

function saveToStorage(data: ResumeData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

const ResumeDataContext = createContext<{
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
} | null>(null);

export function ResumeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(loadFromStorage);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  return <ResumeDataContext.Provider value={{ data, setData }}>{children}</ResumeDataContext.Provider>;
}

export function useResumeData() {
  const ctx = useContext(ResumeDataContext);
  if (!ctx) throw new Error('useResumeData must be used within ResumeDataProvider');
  return ctx;
}
