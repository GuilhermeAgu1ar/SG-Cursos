import { Link, useLocation } from 'react-router-dom';

interface Props {
  onMenuClick: () => void;
}

const links = [
  { to: '/',             label: 'Início' },
  { to: '/cursos',       label: 'Cursos' },
  { to: '/conteudo',     label: 'Conteúdo' },
  { to: '/usuarios',     label: 'Usuários' },
  { to: '/matriculas',   label: 'Matrículas' },
  { to: '/avaliacoes',   label: 'Avaliações' },
  { to: '/financeiro',   label: 'Financeiro' },
  { to: '/certificados', label: 'Certificados' },
];

export default function Navbar({ onMenuClick }: Props) {
  const location = useLocation();
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname === path;

  return (
    <nav className="navbar navbar-dark bg-dark border-bottom border-secondary">
      <div className="container">
        {/* Botão hamburguer */}
        <button
          className="btn btn-dark me-3 p-1"
          onClick={onMenuClick}
          title="Abrir menu"
          style={{ fontSize: '1.3rem', lineHeight: 1 }}
        >
          <i className="bi bi-list"></i>
        </button>

        <Link to="/" className="navbar-brand d-flex align-items-center me-auto">
          <i className="bi bi-mortarboard text-primary me-2 fs-5"></i>
          <span className="fw-bold">SG Cursos</span>
        </Link>

        {/* Links normais só no desktop */}
        <div className="d-none d-lg-flex gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link px-2 ${isActive(to) ? 'text-primary' : 'text-secondary'}`}
              style={{ fontSize: '0.875rem' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
