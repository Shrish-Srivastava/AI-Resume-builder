import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TopBar } from '@/components/layout/TopBar';
import { ContextHeader } from '@/components/layout/ContextHeader';
import { hasArtifact, RB_STEPS } from '@/lib/rbArtifacts';
import { Check, Circle } from 'lucide-react';

const LOVABLE_STORAGE_KEY = 'rb_lovable_link';
const GITHUB_STORAGE_KEY = 'rb_github_link';
const DEPLOY_STORAGE_KEY = 'rb_deploy_link';

function getStored(key: string): string {
  return localStorage.getItem(key) ?? '';
}

function setStored(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function RBProofPage() {
  const [lovableLink, setLovableLink] = useState(() => getStored(LOVABLE_STORAGE_KEY));
  const [githubLink, setGithubLink] = useState(() => getStored(GITHUB_STORAGE_KEY));
  const [deployLink, setDeployLink] = useState(() => getStored(DEPLOY_STORAGE_KEY));

  const handleLovableChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setLovableLink(v);
    setStored(LOVABLE_STORAGE_KEY, v);
  }, []);

  const handleGithubChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setGithubLink(v);
    setStored(GITHUB_STORAGE_KEY, v);
  }, []);

  const handleDeployChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setDeployLink(v);
    setStored(DEPLOY_STORAGE_KEY, v);
  }, []);

  const finalSubmission = [
    '--- AI Resume Builder — Build Track — Final Submission ---',
    '',
    ...RB_STEPS.map((s) => `Step ${s}: ${hasArtifact(s) ? 'Done' : 'Pending'}`),
    '',
    `Lovable link: ${lovableLink || '(not set)'}`,
    `GitHub link: ${githubLink || '(not set)'}`,
    `Deploy link: ${deployLink || '(not set)'}`,
  ].join('\n');

  const handleCopyFinalSubmission = useCallback(() => {
    navigator.clipboard.writeText(finalSubmission);
  }, [finalSubmission]);

  return (
    <div className="kodnest-page">
      <TopBar
        projectName="AI Resume Builder"
        step={0}
        totalSteps={8}
        status="In Progress"
        centerText="Project 3 — Proof"
      />
      <div className="kodnest-page__body">
        <div className="kodnest-page__content">
          <ContextHeader
            headline="Proof"
            subtext="Collect links and generate final submission."
          />
          <div className="kodnest-page__main">
            <div className="kodnest-workspace" style={{ flex: 1 }}>
              <div className="kodnest-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 className="kodnest-context-header__headline" style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
                  8 Step Status
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {RB_STEPS.map((s) => (
                    <div
                      key={s}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        background: 'var(--color-bg-muted)',
                        borderRadius: 'var(--radius)',
                        fontSize: 'var(--text-small)',
                      }}
                    >
                      {hasArtifact(s) ? (
                        <Check className="w-4 h-4 text-green-600" style={{ color: 'var(--color-success)' }} />
                      ) : (
                        <Circle className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                      )}
                      <span>Step {s}</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        {hasArtifact(s) ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="kodnest-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 className="kodnest-context-header__headline" style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>
                  Links
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="kodnest-input-wrap">
                    <label className="kodnest-input__label">Lovable link</label>
                    <input
                      type="url"
                      className="kodnest-input"
                      value={lovableLink}
                      onChange={handleLovableChange}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="kodnest-input-wrap">
                    <label className="kodnest-input__label">GitHub link</label>
                    <input
                      type="url"
                      className="kodnest-input"
                      value={githubLink}
                      onChange={handleGithubChange}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="kodnest-input-wrap">
                    <label className="kodnest-input__label">Deploy link</label>
                    <input
                      type="url"
                      className="kodnest-input"
                      value={deployLink}
                      onChange={handleDeployChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="kodnest-btn kodnest-btn--primary kodnest-btn--md"
                onClick={handleCopyFinalSubmission}
              >
                Copy Final Submission
              </button>
            </div>
            <aside className="kodnest-panel" style={{ maxWidth: 360 }}>
              <p style={{ fontSize: 'var(--text-small)', color: 'var(--color-text-muted)', margin: 0 }}>
                Use this page to track all 8 steps and collect Lovable, GitHub, and Deploy links. Click Copy Final Submission to copy a formatted summary to your clipboard.
              </p>
              <Link to="/rb/01-problem" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" style={{ marginTop: '1rem' }}>
                Back to Step 1
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
