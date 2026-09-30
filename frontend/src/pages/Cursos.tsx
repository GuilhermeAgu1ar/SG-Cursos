import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CursoForm from '../components/CursoForm';
import CursosList from '../components/CursosList';
import CategoriaForm from '../components/CategoriaForm';
import { api } from '../services/api';
import { Categoria, Curso, Trilha, Usuario } from '../models';

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [filtro, setFiltro] = useState('');
  const [tab, setTab] = useState<'cursos' | 'categorias' | 'trilhas'>('cursos');

  const fetchAll = async () => {
    try {
      const [c, cat, t, u] = await Promise.all([
        api.get('/cursos'), api.get('/categorias'), api.get('/trilhas'), api.get('/usuarios'),
      ]);
      setCursos(c.data); setCategorias(cat.data); setTrilhas(t.data); setUsuarios(u.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const lista = filtro ? cursos.filter(c => c.idCategoria === Number(filtro)) : cursos;

  return (
    <div className="min-vh-100 bg-dark">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-book text-primary me-3" style={{ fontSize: '2rem' }}></i>
          <div>
            <h1 className="text-light mb-0">Cursos, Categorias e Trilhas</h1>
            <p className="text-secondary mb-0">Gerencie o catálogo completo de cursos</p>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          {(['cursos', 'categorias', 'trilhas'] as const).map(t => (
            <li className="nav-item" key={t}>
              <button
                className={`nav-link ${tab === t ? 'active bg-dark text-primary border-primary' : 'text-secondary'}`}
                onClick={() => setTab(t)}
              >
                <i className={`bi ${t === 'cursos' ? 'bi-book' : t === 'categorias' ? 'bi-tag' : 'bi-map'} me-2`}></i>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {tab === 'cursos' && (
          <>
            <div className="mb-4">
              <CursoForm
                onSuccess={() => { fetchAll(); setCursoEditando(null); }}
                cursoEditando={cursoEditando}
                onCancel={() => setCursoEditando(null)}
                categorias={categorias}
                instrutores={usuarios}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Cursos cadastrados</h4>
              <div className="d-flex gap-2 align-items-center">
                <select className="form-select form-select-sm bg-secondary text-light border-0 w-auto"
                  value={filtro} onChange={e => setFiltro(e.target.value)}>
                  <option value="">Todas as categorias</option>
                  {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
                <span className="badge bg-primary">{lista.length} curso(s)</span>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div></div>
            ) : (
              <CursosList
                cursos={lista} categorias={categorias} instrutores={usuarios}
                onDelete={fetchAll}
                onEdit={c => { setCursoEditando(c); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              />
            )}
          </>
        )}

        {tab === 'categorias' && (
          <>
            <div className="mb-4">
              <CategoriaForm
                onSuccess={() => { fetchAll(); setCategoriaEditando(null); }}
                categoriaEditando={categoriaEditando}
                onCancel={() => setCategoriaEditando(null)}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Categorias cadastradas</h4>
              <span className="badge bg-primary">{categorias.length} categoria(s)</span>
            </div>
            {categorias.length === 0 ? (
              <div className="alert alert-secondary text-center">
                <i className="bi bi-tag me-2"></i>Nenhuma categoria cadastrada.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-white"><i className="bi bi-hash me-1"></i>#</th>
                      <th className="text-white">Nome</th>
                      <th className="text-white">Descrição</th>
                      <th className="text-white text-end">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorias.map(c => (
                      <tr key={c.id}>
                        <td className="text-secondary">{c.id}</td>
                        <td className="fw-bold">{c.nome}</td>
                        <td className="text-secondary">{c.descricao || '—'}</td>
                        <td className="text-end">
                          <div className="btn-group">
                            <button className="btn btn-outline-warning btn-sm" onClick={() => { setCategoriaEditando(c); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={async () => {
                              if (!window.confirm('Excluir categoria?')) return;
                              await api.delete(`/categorias/${c.id}`); fetchAll();
                            }}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {tab === 'trilhas' && (
          <>
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Nova Trilha</h5>
              </div>
              <div className="card-body">
                <form onSubmit={async e => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  await api.post('/trilhas', { titulo: f.get('titulo'), descricao: f.get('descricao'), idCategoria: Number(f.get('idCategoria')) });
                  (e.target as HTMLFormElement).reset(); fetchAll();
                }}>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label className="form-label text-light">Título *</label>
                      <input name="titulo" className="form-control bg-secondary text-light border-0" required placeholder="Ex: Trilha Front-end" />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label text-light">Categoria *</label>
                      <select name="idCategoria" className="form-select bg-secondary text-light border-0" required>
                        <option value="">Selecione</option>
                        {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label text-light">Descrição</label>
                      <input name="descricao" className="form-control bg-secondary text-light border-0" placeholder="Opcional" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-lg me-2"></i>Salvar trilha
                  </button>
                </form>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Trilhas cadastradas</h4>
              <span className="badge bg-primary">{trilhas.length} trilha(s)</span>
            </div>
            {trilhas.length === 0 ? (
              <div className="alert alert-secondary text-center"><i className="bi bi-map me-2"></i>Nenhuma trilha cadastrada.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-white">Título</th>
                      <th className="text-white">Categoria</th>
                      <th className="text-white">Descrição</th>
                      <th className="text-white text-end">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trilhas.map(t => (
                      <tr key={t.id}>
                        <td className="fw-bold">{t.titulo}</td>
                        <td className="text-secondary">{categorias.find(c => c.id === t.idCategoria)?.nome ?? '—'}</td>
                        <td className="text-secondary">{t.descricao || '—'}</td>
                        <td className="text-end">
                          <button className="btn btn-outline-danger btn-sm" onClick={async () => {
                            if (!window.confirm('Excluir trilha?')) return;
                            await api.delete(`/trilhas/${t.id}`); fetchAll();
                          }}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
