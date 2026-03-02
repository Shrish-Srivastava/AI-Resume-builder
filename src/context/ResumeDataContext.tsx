import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ResumeData } from '@/types/resume';
import { emptyResume } from '@/types/resume';

const ResumeDataContext = createContext<{
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
} | null>(null);

export function ResumeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(emptyResume);
  return <ResumeDataContext.Provider value={{ data, setData }}>{children}</ResumeDataContext.Provider>;
}

export function useResumeData() {
  const ctx = useContext(ResumeDataContext);
  if (!ctx) throw new Error('useResumeData must be used within ResumeDataProvider');
  return ctx;
}
