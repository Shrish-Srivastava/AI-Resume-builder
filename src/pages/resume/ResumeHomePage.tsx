import { Link } from 'react-router-dom';

export function ResumeHomePage() {
  return (
    <div className="resume-home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <header
        style={{
          height: 'var(--topbar-height)',
          padding: '0 var(--space-4)',
          background: 'var(--color-bg-elevated)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-body)', color: 'var(--color-text)' }}>
          AI Resume Builder
        </span>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-3)' }}>
          <Link to="/builder" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Builder
          </Link>
          <Link to="/preview" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Preview
          </Link>
          <Link to="/proof" style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Proof
          </Link>
        </nav>
      </header>
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-5)',
          maxWidth: 'var(--max-text-width)',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-headline)',
            fontWeight: 600,
            letterSpacing: 'var(--letter-spacing-headline)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-2)',
            lineHeight: 'var(--line-height-tight)',
          }}
        >
          Build a Resume That Gets Read.
        </h1>
        <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-loose)' }}>
          Create a clean, ATS-friendly resume with the KodNest Premium Design System.
        </p>
        <Link
          to="/builder"
          className="kodnest-btn kodnest-btn--primary kodnest-btn--md"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          Start Building
        </Link>
      </main>
    </div>
  );
}
