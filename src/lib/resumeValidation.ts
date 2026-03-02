/**
 * Resume validation — calm warnings only. Does NOT block export.
 */

import type { ResumeData } from '@/types/resume';

export function getExportWarnings(data: ResumeData): string | null {
  const missing: string[] = [];
  if (!data.personal?.name?.trim()) missing.push('Name');
  const hasProject = (data.projects?.length ?? 0) >= 1;
  const hasExperience = (data.experience?.length ?? 0) >= 1;
  if (!hasProject && !hasExperience) missing.push('at least one project or experience');

  if (missing.length === 0) return null;
  return 'Your resume may look incomplete.';
}
