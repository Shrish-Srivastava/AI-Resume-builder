/**
 * Resume template system — layout styling only (Classic, Modern, Minimal)
 * Stored in localStorage. Does NOT affect content or score.
 */

export const TEMPLATE_OPTIONS = ['classic', 'modern', 'minimal'] as const;
export type ResumeTemplate = (typeof TEMPLATE_OPTIONS)[number];

const STORAGE_KEY = 'resumeTemplate';

const DEFAULT: ResumeTemplate = 'classic';

export function loadTemplate(): ResumeTemplate {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && TEMPLATE_OPTIONS.includes(raw as ResumeTemplate)) return raw as ResumeTemplate;
  } catch {
    // ignore
  }
  return DEFAULT;
}

export function saveTemplate(template: ResumeTemplate): void {
  try {
    localStorage.setItem(STORAGE_KEY, template);
  } catch {
    // ignore
  }
}

/** Layout variants for resume (black/white only, subtle differences) */
export const TEMPLATE_STYLES: Record<
  ResumeTemplate,
  {
    headerFontSize: string;
    headerLetterSpacing: string;
    sectionHeaderSize: string;
    sectionSpacing: string;
    bodyLineHeight: number;
  }
> = {
  classic: {
    headerFontSize: '1.75rem',
    headerLetterSpacing: '-0.02em',
    sectionHeaderSize: 'var(--text-body)',
    sectionSpacing: 'var(--space-3)',
    bodyLineHeight: 1.6,
  },
  modern: {
    headerFontSize: '1.5rem',
    headerLetterSpacing: '-0.01em',
    sectionHeaderSize: 'var(--text-small)',
    sectionSpacing: 'var(--space-2)',
    bodyLineHeight: 1.5,
  },
  minimal: {
    headerFontSize: '1.25rem',
    headerLetterSpacing: '0',
    sectionHeaderSize: 'var(--text-caption)',
    sectionSpacing: 'var(--space-2)',
    bodyLineHeight: 1.4,
  },
};
