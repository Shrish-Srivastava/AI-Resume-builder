import { Link } from 'react-router-dom';
import { useResumeData } from '@/context/ResumeDataContext';
import { useTemplate } from '@/hooks/useTemplate';
import { ResumePreviewDocument } from '@/components/resume/ResumePreviewDocument';
import { TemplateTabs } from '@/components/resume/TemplateTabs';

export function PreviewPage() {
  const { data } = useResumeData();
  const [template, setTemplate] = useTemplate();

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - var(--topbar-height))', padding: 'var(--space-4)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <TemplateTabs value={template} onChange={setTemplate} />
        <ResumePreviewDocument data={data} template={template} />
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-small)', color: '#555' }}>
          <Link to="/builder" style={{ color: '#111', textDecoration: 'underline' }}>Edit in Builder</Link>
        </p>
      </div>
    </div>
  );
}
