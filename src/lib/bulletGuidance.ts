/**
 * Bullet structure guidance — action verbs + measurable impact
 */

const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'launched', 'established',
  'achieved', 'delivered', 'reduced', 'increased', 'streamlined', 'collaborated',
];

function hasMeasurableNumber(text: string): boolean {
  if (!text || !text.trim()) return false;
  return /[0-9%]|\b(k|K|M|m|x|X)\b|percent|%\s*\d|\d+\s*%/.test(text);
}

function startsWithActionVerb(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return true;
  const firstWord = trimmed.split(/\s+/)[0]?.toLowerCase() ?? '';
  return ACTION_VERBS.some((v) => firstWord === v || firstWord.startsWith(v));
}

export interface BulletHint {
  lineIndex: number;
  needsVerb: boolean;
  needsNumber: boolean;
}

/** Parse bullets (lines) and return hints for each */
export function getBulletHints(text: string): BulletHint[] {
  const lines = (text ?? '').split(/\n/).map((s) => s.trim()).filter(Boolean);
  return lines.map((line, i) => ({
    lineIndex: i + 1,
    needsVerb: !startsWithActionVerb(line),
    needsNumber: !hasMeasurableNumber(line),
  }));
}

/** Human-readable suggestion for a bullet hint */
export function formatBulletSuggestion(hint: BulletHint): string | null {
  const parts: string[] = [];
  if (hint.needsVerb) parts.push('Start with a strong action verb.');
  if (hint.needsNumber) parts.push('Add measurable impact (numbers).');
  if (parts.length === 0) return null;
  return `Bullet ${hint.lineIndex}: ${parts.join(' ')}`;
}
