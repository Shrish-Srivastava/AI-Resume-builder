/**
 * ATS Score v1 — Deterministic scoring (0–100)
 * Cap at 100.
 */

import type { ResumeData } from '@/types/resume';

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/** Check if text contains a number (%, X, k, digits, etc.) */
function hasMeasurableNumber(text: string): boolean {
  if (!text || !text.trim()) return false;
  return /[0-9%]|\b(k|K|M|m|x|X)\b|percent|%\s*\d|\d+\s*%/.test(text);
}

function hasNumbersInBullets(data: ResumeData): boolean {
  const checkDesc = (desc?: string) => desc && hasMeasurableNumber(desc);
  const expHas = data.experience.some((e) => checkDesc(e.description));
  const projHas = data.projects.some((p) => checkDesc(p.description) || checkDesc(p.tech));
  return expHas || projHas;
}

function educationHasCompleteFields(data: ResumeData): boolean {
  if (data.education.length === 0) return false;
  return data.education.some(
    (e) =>
      !!e.institution?.trim() &&
      !!e.degree?.trim() &&
      !!e.startDate?.trim() &&
      !!e.endDate?.trim()
  );
}

export function computeAtsScore(data: ResumeData): number {
  let score = 0;

  const summaryWords = wordCount(data.summary ?? '');
  if (summaryWords >= 40 && summaryWords <= 120) score += 15;

  const projects = data.projects ?? [];
  const experience = data.experience ?? [];
  const skills = data.skills ?? [];
  const links = data.links ?? {};

  if (projects.length >= 2) score += 10;
  if (experience.length >= 1) score += 10;
  if (skills.length >= 8) score += 10;
  if (links.github?.trim() || links.linkedin?.trim()) score += 10;
  if (hasNumbersInBullets(data)) score += 15;
  if (educationHasCompleteFields(data)) score += 10;

  return Math.min(100, score);
}

export function getAtsSuggestions(data: ResumeData): string[] {
  const suggestions: string[] = [];

  const summaryWords = wordCount(data.summary ?? '');
  if (summaryWords < 40 || summaryWords > 120)
    suggestions.push('Write a stronger summary (40–120 words).');

  const projects = data.projects ?? [];
  const experience = data.experience ?? [];
  const skills = data.skills ?? [];
  const links = data.links ?? {};

  if (projects.length < 2) suggestions.push('Add at least 2 projects.');
  if (experience.length < 1) suggestions.push('Add at least 1 experience entry.');
  if (skills.length < 8) suggestions.push('Add more skills (target 8+).');
  if (!links.github?.trim() && !links.linkedin?.trim())
    suggestions.push('Add GitHub or LinkedIn link.');
  if (!hasNumbersInBullets(data))
    suggestions.push('Add measurable impact (numbers) in bullets.');
  if (!educationHasCompleteFields(data))
    suggestions.push('Complete education fields (institution, degree, dates).');

  return suggestions.slice(0, 3);
}

/** Top 3 Improvements — guidance wording for improvement panel */
export function getTopImprovements(data: ResumeData): string[] {
  const improvements: string[] = [];
  const summaryWords = wordCount(data.summary ?? '');
  const projects = data.projects ?? [];
  const experience = data.experience ?? [];
  const skills = data.skills ?? [];

  if (projects.length < 2) improvements.push('Add at least 2 projects.');
  if (!hasNumbersInBullets(data)) improvements.push('Add measurable impact (numbers) in bullets.');
  if (summaryWords < 40) improvements.push('Expand summary to 40+ words.');
  if (skills.length < 8) improvements.push('Add more skills (target 8+).');
  if (experience.length < 1) improvements.push('Add internship or project work as experience.');

  return improvements.slice(0, 3);
}
