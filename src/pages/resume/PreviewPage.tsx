import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useResumeData } from '@/context/ResumeDataContext';
import { useTemplate } from '@/hooks/useTemplate';
import { ResumePreviewDocument } from '@/components/resume/ResumePreviewDocument';
import { TemplateTabs } from '@/components/resume/TemplateTabs';
import { resumeToPlainText } from '@/lib/resumeToText';
import { getExportWarnings } from '@/lib/resumeValidation';

export function PreviewPage() {
  const { data } = useResumeData();
  const [template, setTemplate] = useTemplate();
  const exportWarning = getExportWarnings(data);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyText = useCallback(async () => {
    const text = resumeToPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
      // Optional: show brief "Copied" feedback — keeping it minimal
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }, [data]);

  return (
    <div className="resume-print-area" style={{ background: '#fff', minHeight: 'calc(100vh - var(--topbar-height))', padding: 'var(--space-4)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="no-print" style={{ marginBottom: 'var(--space-3)' }}>
          <TemplateTabs value={template} onChange={setTemplate} />
          {exportWarning && (
            <p
              style={{
                marginBottom: 'var(--space-2)',
                fontSize: 'var(--text-small)',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
              }}
            >
              {exportWarning}
            </p>
          )}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="kodnest-btn kodnest-btn--primary kodnest-btn--sm"
              onClick={handlePrint}
            >
              Print / Save as PDF
            </button>
            <button
              type="button"
              className="kodnest-btn kodnest-btn--secondary kodnest-btn--sm"
              onClick={handleCopyText}
            >
              Copy Resume as Text
            </button>
          </div>
        </div>
        <ResumePreviewDocument data={data} template={template} />
        <p className="no-print" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-small)', color: '#555' }}>
          <Link to="/builder" style={{ color: '#111', textDecoration: 'underline' }}>Edit in Builder</Link>
        </p>
      </div>
    </div>
  );
}
