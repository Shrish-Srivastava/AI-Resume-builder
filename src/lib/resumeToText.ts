/**
 * Generate clean plain-text version of resume for copy-to-clipboard.
 * Always outputs structured headings (empty state safe, no crash).
 */

import type { ResumeData } from '@/types/resume';

export function resumeToPlainText(data: ResumeData): string {
  const lines: string[] = [];

  lines.push('Name');
  lines.push(data.personal?.name?.trim() || '');
  lines.push('');
  lines.push('Contact');
  const contact = [data.personal?.email, data.personal?.phone, data.personal?.location]
    .filter(Boolean)
    .join(' · ');
  lines.push(contact || '');
  lines.push('');
  lines.push('Summary');
  lines.push(data.summary?.trim() || '');
  lines.push('');
  lines.push('Education');
  if ((data.education?.length ?? 0) > 0) {
    for (const e of data.education) {
      const deg = [e.degree, e.field].filter(Boolean).join(' in ');
      lines.push(`${e.institution || 'Institution'} — ${deg} · ${e.startDate}–${e.endDate}`);
      if (e.description?.trim()) lines.push(e.description.trim());
    }
  }
  lines.push('');
  lines.push('Experience');
  if ((data.experience?.length ?? 0) > 0) {
    for (const e of data.experience) {
      lines.push(`${e.role || 'Role'} at ${e.company || 'Company'} · ${e.startDate}–${e.endDate}`);
      if (e.location) lines.push(e.location);
      if (e.description?.trim()) lines.push(e.description.trim());
    }
  }
  lines.push('');
  lines.push('Projects');
  if ((data.projects?.length ?? 0) > 0) {
    for (const p of data.projects) {
      lines.push(p.name || 'Project');
      if (p.url) lines.push(p.url);
      if (p.description?.trim()) lines.push(p.description.trim());
      if (p.tech?.trim()) lines.push(p.tech.trim());
    }
  }
  lines.push('');
  lines.push('Skills');
  lines.push((data.skills?.length ?? 0) > 0 ? (data.skills ?? []).join(', ') : '');
  lines.push('');
  lines.push('Links');
  const linkStr = [data.links?.github, data.links?.linkedin].filter(Boolean).join(' · ');
  lines.push(linkStr || '');

  return lines.join('\n').trimEnd();
}
