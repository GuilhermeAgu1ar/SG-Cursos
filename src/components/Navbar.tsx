import { Link, useLocation } from 'react-router-dom';

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

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-mortarboard text-primary me-2 fs-4"></i>
          <span className="fw-bold">SG Cursos</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <Link to={to} className={`nav-link ${isActive(to) ? 'active text-primary' : ''}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
