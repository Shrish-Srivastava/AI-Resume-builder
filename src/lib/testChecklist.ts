/**
 * Built-in Test Checklist — stored in localStorage, persists across sessions
 */

export const TEST_IDS = [
  'jd-required',
  'short-jd-warning',
  'skills-extraction',
  'round-mapping',
  'score-deterministic',
  'skill-toggles-live',
  'persist-refresh',
  'history-saves-loads',
  'export-copy',
  'no-console-errors',
] as const;

export type TestId = (typeof TEST_IDS)[number];

export type TestChecklistState = Record<TestId, boolean>;

const STORAGE_KEY = 'prp-test-checklist';

const DEFAULT_STATE: TestChecklistState = {
  'jd-required': false,
  'short-jd-warning': false,
  'skills-extraction': false,
  'round-mapping': false,
  'score-deterministic': false,
  'skill-toggles-live': false,
  'persist-refresh': false,
  'history-saves-loads': false,
  'export-copy': false,
  'no-console-errors': false,
};

export function getTestChecklist(): TestChecklistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    const state = { ...DEFAULT_STATE };
    for (const id of TEST_IDS) {
      if (id in parsed && typeof parsed[id] === 'boolean') {
        state[id] = parsed[id];
      }
    }
    return state;
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function setTestChecklist(state: TestChecklistState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function toggleTest(id: TestId): TestChecklistState {
  const state = getTestChecklist();
  state[id] = !state[id];
  setTestChecklist(state);
  return state;
}

export function resetTestChecklist(): TestChecklistState {
  const state = { ...DEFAULT_STATE };
  setTestChecklist(state);
  return state;
}

export function allTestsPassed(): boolean {
  const state = getTestChecklist();
  return TEST_IDS.every((id) => state[id]);
}
