import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout';
import type { ProofItem } from '@/components/layout';
import { setArtifact, hasArtifact, canAdvanceFromStep, firstIncompleteStepBefore, RB_STEPS } from '@/lib/rbArtifacts';

const STEP_HEADLINES: Record<number, { headline: string; subtext?: string; stepExplanation: string }> = {
  1: { headline: 'Problem', subtext: 'Define the problem space.', stepExplanation: 'Describe the problem you are solving.' },
  2: { headline: 'Market', subtext: 'Understand the market.', stepExplanation: 'Research the market and competitors.' },
  3: { headline: 'Architecture', subtext: 'High-level system design.', stepExplanation: 'Outline the architecture.' },
  4: { headline: 'HLD', subtext: 'High-Level Design.', stepExplanation: 'Document the high-level design.' },
  5: { headline: 'LLD', subtext: 'Low-Level Design.', stepExplanation: 'Document the low-level design.' },
  6: { headline: 'Build', subtext: 'Implement the solution.', stepExplanation: 'Build the application.' },
  7: { headline: 'Test', subtext: 'Verify the build.', stepExplanation: 'Run tests and verify.' },
  8: { headline: 'Ship', subtext: 'Deploy and release.', stepExplanation: 'Deploy and ship the product.' },
};

const STEP_SLUGS: Record<number, string> = {
  1: '01-problem',
  2: '02-market',
  3: '03-architecture',
  4: '04-hld',
  5: '05-lld',
  6: '06-build',
  7: '07-test',
  8: '08-ship',
};

export function RBStepPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const stepSlug = pathname.replace('/rb/', '');
  const step = RB_STEPS.find((s) => STEP_SLUGS[s] === stepSlug) ?? 1;
  const meta = STEP_HEADLINES[step] ?? STEP_HEADLINES[1];

  // Route gating: redirect to first incomplete step if navigating directly to a later step
  useEffect(() => {
    const incomplete = firstIncompleteStepBefore(step);
    if (incomplete != null) {
      navigate(`/rb/${STEP_SLUGS[incomplete as keyof typeof STEP_SLUGS]}`, { replace: true });
    }
  }, [step, navigate]);

  const [promptValue, setPromptValue] = useState('');
  const [, forceUpdate] = useState(0);
  const hasStepArtifact = hasArtifact(step);
  const canAdvance = canAdvanceFromStep(step);
  const status = hasStepArtifact ? 'In Progress' : 'Not Started';

  const handleCopyPrompt = useCallback(() => {
    navigator.clipboard.writeText(promptValue);
  }, [promptValue]);

  const handleBuildInLovable = useCallback(() => {
    window.open('https://lovable.dev', '_blank', 'noopener');
  }, []);

  const handleItWorked = useCallback(() => {
    setArtifact(step, `verified-${Date.now()}`);
    forceUpdate((n) => n + 1);
  }, [step]);

  const handleAddScreenshot = useCallback(() => {
    setArtifact(step, `screenshot-${Date.now()}`);
    forceUpdate((n) => n + 1);
  }, [step]);

  const proofItems: ProofItem[] = RB_STEPS.map((s) => ({
    id: `step-${s}`,
    label: `Step ${s}`,
    checked: hasArtifact(s),
  }));

  const handleNext = () => {
    if (!canAdvance) return;
    if (step < 8) {
      navigate(`/rb/${STEP_SLUGS[(step + 1) as keyof typeof STEP_SLUGS]}`);
    } else {
      navigate('/rb/proof');
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      navigate(`/rb/${STEP_SLUGS[(step - 1) as keyof typeof STEP_SLUGS]}`);
    }
  };

  return (
    <PageLayout
      projectName="AI Resume Builder"
      step={step}
      totalSteps={8}
      status={status as 'Not Started' | 'In Progress' | 'Shipped'}
      headline={meta.headline}
      subtext={meta.subtext}
      stepExplanation={meta.stepExplanation}
      promptText=""
      proofItems={proofItems}
      panelActions={{
        onCopyPrompt: handleCopyPrompt,
        onBuildInLovable: handleBuildInLovable,
        onItWorked: handleItWorked,
        onError: () => {},
        onAddScreenshot: handleAddScreenshot,
      }}
      centerText={`Project 3 — Step ${step} of 8`}
      panelPromptProps={{
        promptLabel: 'Copy This Into Lovable',
        promptAsTextarea: true,
        promptValue,
        onPromptChange: setPromptValue,
      }}
    >
      <div className="kodnest-workspace__content">
        <p className="kodnest-text-muted">Workspace for Step {step}. No resume features built yet.</p>
        <div className="kodnest-step-nav" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button
            type="button"
            className="kodnest-btn kodnest-btn--secondary kodnest-btn--md"
            onClick={handlePrev}
            disabled={step <= 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="kodnest-btn kodnest-btn--primary kodnest-btn--md"
            onClick={handleNext}
            disabled={!canAdvance}
          >
            {step >= 8 ? 'Go to Proof' : 'Next'}
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
