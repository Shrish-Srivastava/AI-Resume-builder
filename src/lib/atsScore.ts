/**
 * ATS Score v2 — Deterministic scoring (0–100)
 * No AI. Rules-based.
 */

import type { ResumeData } from '@/types/resume';

const ACTION_VERBS = /\b(built|led|designed|improved|developed|created|managed|implemented|achieved|delivered|optimized|reduced|increased|established|launched|coordinated|automated|resolved|transformed|enhanced)\b/i;

function getAllSkills(data: ResumeData): string[] {
  const s = data.skills;
  if (!s) return [];
  return [...(s.technical ?? []), ...(s.soft ?? []), ...(s.tools ?? [])];
}

/** Check if summary contains action verbs */
function hasActionVerbs(text: string): boolean {
  if (!text || !text.trim()) return false;
  return ACTION_VERBS.test(text);
}

/** Check if experience has at least 1 entry with bullets (description) */
function hasExperienceWithBullets(data: ResumeData): boolean {
  return (data.experience ?? []).some((e) => !!(e.description ?? '').trim());
}

export function computeAtsScore(data: ResumeData): number {
  let score = 0;
  const personal = data.personal ?? { name: '', email: '', phone: '', location: '' };
  const summary = (data.summary ?? '').trim();
  const education = data.education ?? [];
  const projects = data.projects ?? [];
  const skills = getAllSkills(data);
  const links = data.links ?? {};

  if (personal.name?.trim()) score += 10;
  if (personal.email?.trim()) score += 10;
  if (summary.length > 50) score += 10;
  if (hasExperienceWithBullets(data)) score += 15;
  if (education.length >= 1) score += 10;
  if (skills.length >= 5) score += 10;
  if (projects.length >= 1) score += 10;
  if (personal.phone?.trim()) score += 5;
  if (links.linkedin?.trim()) score += 5;
  if (links.github?.trim()) score += 5;
  if (hasActionVerbs(summary)) score += 10;

  return Math.min(100, score);
}

export interface AtsSuggestion {
  text: string;
  points: number;
}

/** List missing items that would increase score. Returns suggestions with point values. */
export function getAtsSuggestions(data: ResumeData): AtsSuggestion[] {
  const suggestions: AtsSuggestion[] = [];
  const personal = data.personal ?? { name: '', email: '', phone: '', location: '' };
  const summary = (data.summary ?? '').trim();
  const education = data.education ?? [];
  const projects = data.projects ?? [];
  const skills = getAllSkills(data);
  const links = data.links ?? {};

  if (!personal.name?.trim()) suggestions.push({ text: 'Add your name', points: 10 });
  if (!personal.email?.trim()) suggestions.push({ text: 'Add your email', points: 10 });
  if (summary.length <= 50) suggestions.push({ text: 'Add a professional summary (50+ characters)', points: 10 });
  if (!hasExperienceWithBullets(data)) suggestions.push({ text: 'Add at least 1 experience entry with bullets', points: 15 });
  if (education.length < 1) suggestions.push({ text: 'Add at least 1 education entry', points: 10 });
  if (skills.length < 5) suggestions.push({ text: 'Add at least 5 skills', points: 10 });
  if (projects.length < 1) suggestions.push({ text: 'Add at least 1 project', points: 10 });
  if (!personal.phone?.trim()) suggestions.push({ text: 'Add your phone number', points: 5 });
  if (!links.linkedin?.trim()) suggestions.push({ text: 'Add LinkedIn URL', points: 5 });
  if (!links.github?.trim()) suggestions.push({ text: 'Add GitHub URL', points: 5 });
  if (!hasActionVerbs(summary) && summary.length > 0) suggestions.push({ text: 'Add action verbs to summary (e.g. built, led, designed)', points: 10 });

  return suggestions;
}

/** Top 3 improvements — used for builder compact display */
export function getTopImprovements(data: ResumeData): AtsSuggestion[] {
  return getAtsSuggestions(data).slice(0, 3);
}

/** Score zone for color/label */
export type AtsZone = 'needs-work' | 'getting-there' | 'strong';

export function getAtsZone(score: number): AtsZone {
  if (score <= 40) return 'needs-work';
  if (score <= 70) return 'getting-there';
  return 'strong';
}

export const ATS_ZONE_LABELS: Record<AtsZone, string> = {
  'needs-work': 'Needs Work',
  'getting-there': 'Getting There',
  'strong': 'Strong Resume',
};

export const ATS_ZONE_COLORS: Record<AtsZone, string> = {
  'needs-work': '#dc2626', // red
  'getting-there': '#d97706', // amber
  'strong': '#16a34a', // green
};
