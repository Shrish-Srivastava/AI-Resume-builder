import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResumeData } from '@/context/ResumeDataContext';
import { useTemplate } from '@/hooks/useTemplate';
import { useTheme } from '@/hooks/useTheme';
import { ResumePreviewDocument } from '@/components/resume/ResumePreviewDocument';
import { TemplatePicker } from '@/components/resume/TemplatePicker';
import { ColorThemePicker } from '@/components/resume/ColorThemePicker';
import { resumeToPlainText } from '@/lib/resumeToText';
import { getExportWarnings } from '@/lib/resumeValidation';

export function PreviewPage() {
  const { data } = useResumeData();
  const [template, setTemplate] = useTemplate();
  const [themeId, setTheme, accentColor] = useTheme();
  const exportWarning = getExportWarnings(data);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handlePrint = useCallback(() => {
    window.print();
    setToast('PDF export ready! Check your downloads.');
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
          <TemplatePicker value={template} onChange={setTemplate} accentColor={accentColor} />
          <ColorThemePicker value={themeId} onChange={setTheme} />
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
          {toast && (
            <div
              style={{
                position: 'fixed',
                bottom: 'var(--space-4)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#111',
                color: '#fff',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius)',
                fontSize: 'var(--text-small)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 9999,
              }}
            >
              {toast}
            </div>
          )}
        </div>
        <ResumePreviewDocument data={data} template={template} accentColor={accentColor} />
        <p className="no-print" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-small)', color: '#555' }}>
          <Link to="/builder" style={{ color: '#111', textDecoration: 'underline' }}>Edit in Builder</Link>
        </p>
      </div>
    </div>
  );
}
