/**
 * RB (AI Resume Builder) artifact storage
 * Stores step artifacts under rb_step_X_artifact keys
 */

const ARTIFACT_PREFIX = 'rb_step_';
const ARTIFACT_SUFFIX = '_artifact';

export const RB_STEPS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

function storageKey(step: number): string {
  return `${ARTIFACT_PREFIX}${step}${ARTIFACT_SUFFIX}`;
}

export function getArtifact(step: number): string | null {
  return localStorage.getItem(storageKey(step));
}

export function setArtifact(step: number, value: string): void {
  localStorage.setItem(storageKey(step), value);
}

export function hasArtifact(step: number): boolean {
  const val = getArtifact(step);
  return val != null && val.trim().length > 0;
}

export function getStepStatuses(): Record<number, boolean> {
  const out: Record<number, boolean> = {};
  for (const s of RB_STEPS) {
    out[s] = hasArtifact(s);
  }
  return out;
}

/** Can user advance to next step? Must have artifact for current step. */
export function canAdvanceFromStep(step: number): boolean {
  return hasArtifact(step);
}

/** First step number that lacks an artifact, or null if all 1..target have artifacts. */
export function firstIncompleteStepBefore(targetStep: number): number | null {
  for (let s = 1; s < targetStep; s++) {
    if (!hasArtifact(s)) return s;
  }
  return null;
}
