import { Outlet, Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { path: '/builder', label: 'Builder' },
  { path: '/preview', label: 'Preview' },
  { path: '/proof', label: 'Proof' },
];

export function ResumeAppLayout() {
  const location = useLocation();

  return (
    <div className="resume-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg, #F7F6F3)' }}>
      <header
        className="resume-app__nav"
        style={{
          height: 'var(--topbar-height, 64px)',
          padding: '0 var(--space-4, 40px)',
          background: 'var(--color-bg-elevated, #fff)',
          borderBottom: '1px solid var(--color-border-subtle, #E8E6E3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-serif, Lora, Georgia, serif)',
            fontWeight: 600,
            fontSize: 'var(--text-body, 1rem)',
            color: 'var(--color-text, #111)',
            textDecoration: 'none',
          }}
        >
          AI Resume Builder
        </Link>
        <nav style={{ display: 'flex', gap: 'var(--space-3, 24px)', alignItems: 'center' }}>
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                fontFamily: 'var(--font-sans, Inter, sans-serif)',
                fontSize: 'var(--text-small, 0.875rem)',
                fontWeight: 500,
                color: location.pathname === path ? 'var(--color-accent, #8B0000)' : 'var(--color-text-muted, #555)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="resume-app__main" style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
