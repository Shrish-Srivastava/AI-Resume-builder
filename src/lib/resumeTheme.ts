/**
 * Resume color theme — accent color for headings, borders, sidebar.
 * Stored in localStorage.
 */

export const THEME_COLORS = [
  { id: 'teal', name: 'Teal', hsl: 'hsl(168, 60%, 40%)' },
  { id: 'navy', name: 'Navy', hsl: 'hsl(220, 60%, 35%)' },
  { id: 'burgundy', name: 'Burgundy', hsl: 'hsl(345, 60%, 35%)' },
  { id: 'forest', name: 'Forest', hsl: 'hsl(150, 50%, 30%)' },
  { id: 'charcoal', name: 'Charcoal', hsl: 'hsl(0, 0%, 25%)' },
] as const;

export type ResumeThemeId = (typeof THEME_COLORS)[number]['id'];

const STORAGE_KEY = 'resumeTheme';
const DEFAULT: ResumeThemeId = 'teal';

export function loadTheme(): ResumeThemeId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const found = THEME_COLORS.find((c) => c.id === raw);
    if (found) return found.id;
  } catch {
    // ignore
  }
  return DEFAULT;
}

export function saveTheme(themeId: ResumeThemeId): void {
  try {
    localStorage.setItem(STORAGE_KEY, themeId);
  } catch {
    // ignore
  }
}

export function getThemeColor(themeId: ResumeThemeId): string {
  const found = THEME_COLORS.find((c) => c.id === themeId);
  return found?.hsl ?? THEME_COLORS[0].hsl;
}
