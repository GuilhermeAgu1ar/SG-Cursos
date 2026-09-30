import { Link, useLocation } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { to: '/', label: 'Início', icon: 'bi-house' },
];

const gestao = [
  { to: '/cursos',       label: 'Cursos',       icon: 'bi-book' },
  { to: '/conteudo',     label: 'Módulos e Aulas', icon: 'bi-collection-play' },
  { to: '/usuarios',     label: 'Usuários',     icon: 'bi-people' },
  { to: '/matriculas',   label: 'Matrículas',   icon: 'bi-clipboard-check' },
  { to: '/avaliacoes',   label: 'Avaliações',   icon: 'bi-star' },
  { to: '/financeiro',   label: 'Financeiro',   icon: 'bi-credit-card' },
  { to: '/certificados', label: 'Certificados', icon: 'bi-award' },
];

export default function Sidebar({ isOpen, onClose }: Props) {
  const location = useLocation();
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040,
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '280px', height: '100vh',
        backgroundColor: '#1e1e1e',
        borderRight: '1px solid #333',
        zIndex: 1050,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1rem',
          borderBottom: '1px solid #333',
        }}>
          <Link to="/" onClick={onClose} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="bi bi-mortarboard text-primary" style={{ fontSize: '1.3rem' }}></i>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>SG Cursos</span>
          </Link>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#adb5bd', fontSize: '1.3rem', cursor: 'pointer', lineHeight: 1 }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Links principais */}
        <div style={{ padding: '0.5rem 0' }}>
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                textDecoration: 'none',
                color: isActive(to) ? '#0d6efd' : '#dee2e6',
                fontWeight: isActive(to) ? 700 : 400,
                borderLeft: isActive(to) ? '3px solid #0d6efd' : '3px solid transparent',
                backgroundColor: isActive(to) ? 'rgba(13,110,253,0.1)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <i className={`bi ${icon}`} style={{ fontSize: '1rem', width: '20px', textAlign: 'center' }}></i>
              {label}
            </Link>
          ))}
        </div>

        {/* Seção Menu de Gestão */}
        <div style={{
          padding: '0.5rem 1.25rem',
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: '#6c757d',
          backgroundColor: '#161616',
          borderTop: '1px solid #333',
          borderBottom: '1px solid #333',
          marginTop: '0.25rem',
        }}>
          Menu de Gestão
        </div>

        <div style={{ padding: '0.5rem 0', flex: 1 }}>
          {gestao.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                textDecoration: 'none',
                color: isActive(to) ? '#0d6efd' : '#dee2e6',
                fontWeight: isActive(to) ? 700 : 400,
                borderLeft: isActive(to) ? '3px solid #0d6efd' : '3px solid transparent',
                backgroundColor: isActive(to) ? 'rgba(13,110,253,0.1)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <i className={`bi ${icon}`} style={{ fontSize: '1rem', width: '20px', textAlign: 'center' }}></i>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
