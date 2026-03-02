/**
 * AI Resume Builder — Resume data shape (skeleton)
 */

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** @deprecated use liveUrl/githubUrl */
  url?: string;
  /** @deprecated use techStack */
  tech?: string;
}

/** Skills grouped by category for accordion UI */
export interface SkillsByCategory {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillsByCategory;
  links: {
    github?: string;
    linkedin?: string;
  };
}

export const emptyPersonal: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  location: '',
};

export const emptyResume: ResumeData = {
  personal: emptyPersonal,
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  links: {},
};
