interface SecondaryPanelProps {
  stepExplanation: string;
  promptText?: string;
  promptLabel?: string;
  promptAsTextarea?: boolean;
  promptValue?: string;
  onPromptChange?: (value: string) => void;
  onCopyPrompt?: () => void;
  onBuildInLovable?: () => void;
  onItWorked?: () => void;
  onError?: () => void;
  onAddScreenshot?: () => void;
}

export function SecondaryPanel({
  stepExplanation,
  promptText,
  promptLabel = 'Copyable prompt',
  promptAsTextarea = false,
  promptValue,
  onPromptChange,
  onCopyPrompt,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}: SecondaryPanelProps) {
  const hasPromptContent = promptAsTextarea ? promptValue != null : !!promptText;
  const displayValue = promptAsTextarea ? (promptValue ?? '') : (promptText ?? '');

  return (
    <aside className="kodnest-panel" role="complementary" aria-label="Step guidance">
      <div className="kodnest-panel__explanation">
        <p>{stepExplanation}</p>
      </div>
      {(hasPromptContent || promptAsTextarea) && (
        <div className="kodnest-panel__prompt">
          <label className="kodnest-panel__prompt-label">{promptLabel}</label>
          <div className="kodnest-panel__prompt-box">
            {promptAsTextarea ? (
              <textarea
                value={displayValue}
                onChange={(e) => onPromptChange?.(e.target.value)}
                className="kodnest-panel__textarea"
                placeholder="Paste prompt here..."
                rows={8}
              />
            ) : (
              <code>{displayValue}</code>
            )}
          </div>
          <div className="kodnest-panel__actions">
            {onCopyPrompt && (
              <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={onCopyPrompt}>
                Copy
              </button>
            )}
            {onBuildInLovable && (
              <button type="button" className="kodnest-btn kodnest-btn--primary kodnest-btn--sm" onClick={onBuildInLovable}>
                Build in Lovable
              </button>
            )}
          </div>
        </div>
      )}
      <div className="kodnest-panel__feedback">
        {onItWorked && (
          <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={onItWorked}>
            It Worked
          </button>
        )}
        {onError && (
          <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={onError}>
            Error
          </button>
        )}
        {onAddScreenshot && (
          <button type="button" className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm" onClick={onAddScreenshot}>
            Add Screenshot
          </button>
        )}
      </div>
    </aside>
  );
}
