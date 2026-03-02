import { Link } from 'react-router-dom';
import { useResumeData } from '@/context/ResumeDataContext';
import { ResumePreviewDocument } from '@/components/resume/ResumePreviewDocument';

export function PreviewPage() {
  const { data } = useResumeData();

  return (
    <div style={{ background: '#fff', minHeight: 'calc(100vh - var(--topbar-height))', padding: 'var(--space-4)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <ResumePreviewDocument data={data} />
        <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-small)', color: '#555' }}>
          <Link to="/builder" style={{ color: '#111', textDecoration: 'underline' }}>Edit in Builder</Link>
        </p>
      </div>
    </div>
  );
}
