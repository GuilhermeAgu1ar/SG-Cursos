import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';

const modulos = [
  { to: '/cursos',       icon: 'bi-book',           label: 'Cursos e Categorias',  desc: 'Cadastre cursos, categorias e trilhas de conhecimento.' },
  { to: '/conteudo',     icon: 'bi-collection-play', label: 'Módulos e Aulas',       desc: 'Organize o conteúdo: Curso > Módulo > Aula.' },
  { to: '/usuarios',     icon: 'bi-people',          label: 'Usuários',              desc: 'Gerencie alunos e instrutores da plataforma.' },
  { to: '/matriculas',   icon: 'bi-clipboard-check', label: 'Matrículas',            desc: 'Registre matrículas e acompanhe o progresso.' },
  { to: '/avaliacoes',   icon: 'bi-star',            label: 'Avaliações',            desc: 'Notas e comentários dos alunos por curso.' },
  { to: '/financeiro',   icon: 'bi-credit-card',     label: 'Financeiro',            desc: 'Planos, assinaturas e checkout simulado.' },
  { to: '/certificados', icon: 'bi-award',           label: 'Certificados',          desc: 'Emita certificados com código de verificação.' },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ usuarios: 0, cursos: 0, matriculas: 0, certificados: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/usuarios'), api.get('/cursos'), api.get('/matriculas'), api.get('/certificados'),
    ]).then(([u, c, m, cert]) => {
      setStats({ usuarios: u.data.length, cursos: c.data.length, matriculas: m.data.length, certificados: cert.data.length });
    });
  }, []);

  return (
    <div className="min-vh-100 bg-dark text-light">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <section className="py-5">
        <div className="container">
          <div className="mb-5">
            <span className="badge bg-primary px-3 py-2 mb-3">
              <i className="bi bi-mortarboard me-1"></i>
              Sistema de Gerenciamento de Cursos Online
            </span>
            <h1 className="display-5 fw-bold mb-3">SG Cursos</h1>
            <p className="lead text-secondary mb-4">
              Gerencie toda a jornada acadêmica — do cadastro de cursos até a emissão de certificados.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/cursos" className="btn btn-primary btn-lg px-4">
                <i className="bi bi-book me-2"></i>Gerenciar Cursos
              </Link>
              <Link to="/matriculas" className="btn btn-outline-light btn-lg px-4">
                <i className="bi bi-clipboard-check me-2"></i>Ver Matrículas
              </Link>
            </div>
          </div>

          <div className="row g-3 mb-5">
            <div className="col-6 col-md-3">
              <div className="card bg-secondary border-0 text-center p-3">
                <i className="bi bi-people text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                <div className="fw-bold fs-4 text-white">{stats.usuarios}</div>
                <small className="text-light">Usuários</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card bg-secondary border-0 text-center p-3">
                <i className="bi bi-book text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                <div className="fw-bold fs-4 text-white">{stats.cursos}</div>
                <small className="text-light">Cursos</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card bg-secondary border-0 text-center p-3">
                <i className="bi bi-clipboard-check text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                <div className="fw-bold fs-4 text-white">{stats.matriculas}</div>
                <small className="text-light">Matrículas</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card bg-secondary border-0 text-center p-3">
                <i className="bi bi-award text-primary mb-2" style={{ fontSize: '1.5rem' }}></i>
                <div className="fw-bold fs-4 text-white">{stats.certificados}</div>
                <small className="text-light">Certificados</small>
              </div>
            </div>
          </div>

          <h4 className="text-light mb-3">Módulos do sistema</h4>
          <div className="row g-3">
            {modulos.map(m => (
              <div className="col-sm-6 col-lg-3" key={m.to}>
                <div className="card bg-secondary border-0 h-100">
                  <div className="card-body text-center py-4">
                    <i className={`bi ${m.icon} text-primary mb-3`} style={{ fontSize: '2rem' }}></i>
                    <h5 className="text-light">{m.label}</h5>
                    <p className="small text-light mb-0">{m.desc}</p>
                    <Link to={m.to} className="stretched-link"></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-dark text-secondary py-3 border-top border-secondary">
        <div className="container text-center">
          <small>
            <i className="bi bi-code-slash me-1"></i>
            SG Cursos © 2026 — Trabalho Acadêmico — React + TypeScript + Bootstrap
          </small>
        </div>
      </footer>
    </div>
  );
}
