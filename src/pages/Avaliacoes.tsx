import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AvaliacaoForm from '../components/AvaliacaoForm';
import AvaliacoesList from '../components/AvaliacoesList';
import { api } from '../services/api';
import { Avaliacao, Curso, Usuario } from '../models';

export default function Avaliacoes() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [avaliacaoEditando, setAvaliacaoEditando] = useState<Avaliacao | null>(null);
  const [filtroCurso, setFiltroCurso] = useState('');

  const fetchAll = async () => {
    try {
      const [u, c, a] = await Promise.all([api.get('/usuarios'), api.get('/cursos'), api.get('/avaliacoes')]);
      setUsuarios(u.data); setCursos(c.data); setAvaliacoes(a.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const lista = filtroCurso ? avaliacoes.filter(a => a.idCurso === Number(filtroCurso)) : avaliacoes;
  const media = avaliacoes.length > 0
    ? (avaliacoes.reduce((s, a) => s + a.nota, 0) / avaliacoes.length).toFixed(1)
    : '—';

  return (
    <div className="min-vh-100 bg-dark">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-star text-primary me-3" style={{ fontSize: '2rem' }}></i>
          <div>
            <h1 className="text-light mb-0">Avaliações</h1>
            <p className="text-secondary mb-0">Notas e comentários dos alunos por curso</p>
          </div>
        </div>

        <div className="mb-4">
          <AvaliacaoForm
            onSuccess={() => { fetchAll(); setAvaliacaoEditando(null); }}
            avaliacaoEditando={avaliacaoEditando}
            onCancel={() => setAvaliacaoEditando(null)}
            usuarios={usuarios}
            cursos={cursos}
          />
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card bg-secondary border-0 text-center p-3">
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ffc107' }}>{media}</div>
              <div style={{ color: '#ffc107', fontSize: '1.2rem' }}>
                {media !== '—' ? '★'.repeat(Math.round(Number(media))) + '☆'.repeat(5 - Math.round(Number(media))) : '☆☆☆☆☆'}
              </div>
              <small className="text-light mt-1">Média geral · {avaliacoes.length} avaliação(ões)</small>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Avaliações registradas</h4>
          <div className="d-flex gap-2 align-items-center">
            <select className="form-select form-select-sm bg-secondary text-light border-0 w-auto"
              value={filtroCurso} onChange={e => setFiltroCurso(e.target.value)}>
              <option value="">Todos os cursos</option>
              {cursos.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
            </select>
            <span className="badge bg-primary">{lista.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div></div>
        ) : (
          <AvaliacoesList
            avaliacoes={lista} usuarios={usuarios} cursos={cursos}
            onDelete={fetchAll}
            onEdit={a => { setAvaliacaoEditando(a); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}
      </div>
    </div>
  );
}
