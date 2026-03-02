import { useState, useCallback } from 'react';
import { loadTemplate, saveTemplate, type ResumeTemplate } from '@/lib/resumeTemplate';

export function useTemplate() {
  const [template, setTemplateState] = useState<ResumeTemplate>(loadTemplate);

  const setTemplate = useCallback((t: ResumeTemplate) => {
    setTemplateState(t);
    saveTemplate(t);
  }, []);

  return [template, setTemplate] as const;
}
