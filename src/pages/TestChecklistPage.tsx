import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/shadcn-card';
import { getTestChecklist, toggleTest, resetTestChecklist, TEST_IDS, type TestId } from '@/lib/testChecklist';
import { Check, RotateCcw, AlertTriangle } from 'lucide-react';

const TEST_ITEMS: { id: TestId; label: string; hint?: string }[] = [
  { id: 'jd-required', label: 'JD required validation works', hint: 'Leave JD empty and try Analyze. Button should be disabled.' },
  { id: 'short-jd-warning', label: 'Short JD warning shows for <200 chars', hint: 'Paste "Hiring frontend developer." — see amber warning.' },
  { id: 'skills-extraction', label: 'Skills extraction groups correctly', hint: 'Analyze JD with React, DSA — skills grouped by category.' },
  { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Amazon + DSA vs StartupX + React — different round flows.' },
  { id: 'score-deterministic', label: 'Score calculation is deterministic', hint: 'Same JD twice — same baseScore.' },
  { id: 'skill-toggles-live', label: 'Skill toggles update score live', hint: 'Toggle "I know" on Results page — score updates immediately.' },
  { id: 'persist-refresh', label: 'Changes persist after refresh', hint: 'Toggle skills, refresh — toggles and score preserved.' },
  { id: 'history-saves-loads', label: 'History saves and loads correctly', hint: 'Analyze then open from /history — data intact.' },
  { id: 'export-copy', label: 'Export buttons copy the correct content', hint: 'Copy 7-day plan, paste elsewhere — verify formatting.' },
  { id: 'no-console-errors', label: 'No console errors on core pages', hint: 'Open /, /dashboard, /dashboard/analyzer — check DevTools.' },
];

export function TestChecklistPage() {
  const [state, setState] = useState(getTestChecklist);

  useEffect(() => {
    setState(getTestChecklist());
  }, []);

  const handleToggle = useCallback((id: TestId) => {
    const next = toggleTest(id);
    setState(next);
  }, []);

  const handleReset = useCallback(() => {
    setState(resetTestChecklist());
  }, []);

  const passed = TEST_IDS.filter((id) => state[id]).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Test Checklist</h1>
          <Link to="/" className="text-sm text-primary hover:underline">Back to app</Link>
        </div>
      </header>
      <main className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tests Passed: {passed} / 10</CardTitle>
              {passed < 10 && (
                <div className="flex items-center gap-2 text-amber-600 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Fix issues before shipping.</span>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verification Items</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Manually verify each item and check when passed.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {TEST_ITEMS.map(({ id, label, hint }) => (
              <label key={id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50/50 cursor-pointer group">
                <input type="checkbox" checked={state[id]} onChange={() => handleToggle(id)} className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <div className="flex-1 min-w-0">
                  <span className={`font-medium ${state[id] ? 'text-gray-900' : 'text-gray-700'}`}>{label}</span>
                  {hint && <p className="text-xs text-gray-500 mt-1">How to test: {hint}</p>}
                </div>
                {state[id] && <Check className="w-5 h-5 text-primary flex-shrink-0" />}
              </label>
            ))}
          </CardContent>
          <CardContent className="pt-0">
            <button type="button" onClick={handleReset} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
              <RotateCcw className="w-4 h-4" />
              Reset checklist
            </button>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Link to="/prp/08-ship" className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors">Go to Ship</Link>
        </div>
      </main>
    </div>
  );
}
