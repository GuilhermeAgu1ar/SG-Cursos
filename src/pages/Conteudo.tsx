import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { api } from '../services/api';
import { Aula, Curso, Modulo } from '../models';
import { moduloSchema, aulaSchema } from '../schema/validacao';

export default function Conteudo() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<'modulos' | 'aulas'>('modulos');

  const [moduloEditando, setModuloEditando] = useState<Modulo | null>(null);
  const [moduloForm, setModuloForm] = useState({ idCurso: '', titulo: '', ordem: '' });
  const [aulaForm, setAulaForm] = useState({ idModulo: '', titulo: '', tipoConteudo: 'Vídeo', urlConteudo: '', duracaoMinutos: '', ordem: '' });
  const [moduloErrors, setModuloErrors] = useState<Record<string, string>>({});
  const [aulaErrors, setAulaErrors] = useState<Record<string, string>>({});
  const [loadingModulo, setLoadingModulo] = useState(false);
  const [loadingAula, setLoadingAula] = useState(false);

  const handleEditModulo = (m: Modulo) => {
    setModuloEditando(m);
    setModuloForm({ idCurso: String(m.idCurso), titulo: m.titulo, ordem: String(m.ordem) });
    setModuloErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelModulo = () => {
    setModuloEditando(null);
    setModuloForm({ idCurso: '', titulo: '', ordem: '' });
    setModuloErrors({});
  };

  const fetchAll = async () => {
    try {
      const [c, m, a] = await Promise.all([api.get('/cursos'), api.get('/modulos'), api.get('/aulas')]);
      setCursos(c.data); setModulos(m.data); setAulas(a.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleModuloChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModuloForm(prev => ({ ...prev, [name]: value }));
    setModuloErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAulaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAulaForm(prev => ({ ...prev, [name]: value }));
    setAulaErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleModuloSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModuloErrors({});
    const result = moduloSchema.safeParse({ idCurso: Number(moduloForm.idCurso), titulo: moduloForm.titulo, ordem: Number(moduloForm.ordem) });
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) newErrors[err.path[0] as string] = err.message; });
      setModuloErrors(newErrors); return;
    }
    setLoadingModulo(true);
    try {
      if (moduloEditando) {
        await api.put(`/modulos/${moduloEditando.id}`, result.data);
        setModuloEditando(null);
      } else {
        await api.post('/modulos', result.data);
      }
      setModuloForm({ idCurso: '', titulo: '', ordem: '' });
      fetchAll();
    } catch (error) { alert('Erro ao salvar módulo.'); }
    finally { setLoadingModulo(false); }
  };

  const handleAulaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAulaErrors({});
    const result = aulaSchema.safeParse({
      idModulo: Number(aulaForm.idModulo), titulo: aulaForm.titulo, tipoConteudo: aulaForm.tipoConteudo,
      urlConteudo: aulaForm.urlConteudo, duracaoMinutos: Number(aulaForm.duracaoMinutos), ordem: Number(aulaForm.ordem),
    });
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) newErrors[err.path[0] as string] = err.message; });
      setAulaErrors(newErrors); return;
    }
    setLoadingAula(true);
    try {
      await api.post('/aulas', result.data);
      setAulaForm({ idModulo: '', titulo: '', tipoConteudo: 'Vídeo', urlConteudo: '', duracaoMinutos: '', ordem: '' });
      fetchAll();
    } catch (error) { alert('Erro ao salvar aula.'); }
    finally { setLoadingAula(false); }
  };

  return (
    <div className="min-vh-100 bg-dark">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-collection-play text-primary me-3" style={{ fontSize: '2rem' }}></i>
          <div>
            <h1 className="text-light mb-0">Módulos e Aulas</h1>
            <p className="text-secondary mb-0">Estrutura hierárquica: Curso &rsaquo; Módulo &rsaquo; Aula</p>
          </div>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${tab === 'modulos' ? 'active bg-dark text-primary border-primary' : 'text-secondary'}`} onClick={() => setTab('modulos')}>
              <i className="bi bi-folder me-2"></i>Módulos
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${tab === 'aulas' ? 'active bg-dark text-primary border-primary' : 'text-secondary'}`} onClick={() => setTab('aulas')}>
              <i className="bi bi-play-circle me-2"></i>Aulas
            </button>
          </li>
        </ul>

        {tab === 'modulos' && (
          <>
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className={`bi ${moduloEditando ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
                  {moduloEditando ? 'Editar Módulo' : 'Novo Módulo'}
                </h5>
                {moduloEditando && (
                  <button type="button" className="btn btn-sm btn-outline-light" onClick={handleCancelModulo}>Cancelar edição</button>
                )}
              </div>
              <div className="card-body">
                <form onSubmit={handleModuloSubmit}>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label className="form-label text-light">Curso *</label>
                      <select name="idCurso"
                        className={`form-select bg-secondary text-light border-0 ${moduloErrors.idCurso ? 'is-invalid' : ''}`}
                        value={moduloForm.idCurso} onChange={handleModuloChange}>
                        <option value="">Selecione um curso</option>
                        {cursos.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
                      </select>
                      {moduloErrors.idCurso && <div className="invalid-feedback">{moduloErrors.idCurso}</div>}
                      {cursos.length === 0 && <small className="text-warning"><i className="bi bi-exclamation-triangle me-1"></i>Cadastre cursos primeiro</small>}
                    </div>
                    <div className="col-md-5 mb-3">
                      <label className="form-label text-light">Título *</label>
                      <input type="text" name="titulo"
                        className={`form-control bg-secondary text-light border-0 ${moduloErrors.titulo ? 'is-invalid' : ''}`}
                        value={moduloForm.titulo} onChange={handleModuloChange} placeholder="Ex: Fundamentos" />
                      {moduloErrors.titulo && <div className="invalid-feedback">{moduloErrors.titulo}</div>}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label className="form-label text-light">Ordem *</label>
                      <input type="number" name="ordem"
                        className={`form-control bg-secondary text-light border-0 ${moduloErrors.ordem ? 'is-invalid' : ''}`}
                        value={moduloForm.ordem} onChange={handleModuloChange} min={1} />
                      {moduloErrors.ordem && <div className="invalid-feedback">{moduloErrors.ordem}</div>}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loadingModulo}>
                      {loadingModulo ? <><span className="spinner-border spinner-border-sm me-2"></span>Salvando...</> : <><i className="bi bi-check-lg me-2"></i>{moduloEditando ? 'Salvar alterações' : 'Salvar módulo'}</>}
                    </button>
                    {moduloEditando && (
                      <button type="button" className="btn btn-secondary" onClick={handleCancelModulo} disabled={loadingModulo}>Cancelar</button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Módulos cadastrados</h4>
              <span className="badge bg-primary">{modulos.length} módulo(s)</span>
            </div>
            {loading ? <div className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></div>
              : modulos.length === 0 ? (
                <div className="alert alert-secondary text-center"><i className="bi bi-folder-x me-2"></i>Nenhum módulo cadastrado.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th className="text-white">Ordem</th>
                        <th className="text-white">Título</th>
                        <th className="text-white">Curso</th>
                        <th className="text-white text-end">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...modulos].sort((a, b) => a.ordem - b.ordem).map(m => (
                        <tr key={m.id}>
                          <td><span className="badge bg-secondary">{m.ordem}</span></td>
                          <td className="fw-bold">{m.titulo}</td>
                          <td className="text-secondary">{cursos.find(c => c.id === m.idCurso)?.titulo ?? '—'}</td>
                          <td className="text-end">
                            <div className="btn-group">
                              <button className="btn btn-outline-warning btn-sm" onClick={() => handleEditModulo(m)} title="Editar">
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button className="btn btn-outline-danger btn-sm" onClick={async () => { if (!window.confirm('Excluir módulo?')) return; await api.delete(`/modulos/${m.id}`); fetchAll(); }}>
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

        {tab === 'aulas' && (
          <>
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Nova Aula</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAulaSubmit}>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label className="form-label text-light">Módulo *</label>
                      <select name="idModulo"
                        className={`form-select bg-secondary text-light border-0 ${aulaErrors.idModulo ? 'is-invalid' : ''}`}
                        value={aulaForm.idModulo} onChange={handleAulaChange}>
                        <option value="">Selecione um módulo</option>
                        {modulos.map(m => {
                          const curso = cursos.find(c => c.id === m.idCurso);
                          return <option key={m.id} value={m.id}>{curso?.titulo} › {m.titulo}</option>;
                        })}
                      </select>
                      {aulaErrors.idModulo && <div className="invalid-feedback">{aulaErrors.idModulo}</div>}
                    </div>
                    <div className="col-md-5 mb-3">
                      <label className="form-label text-light">Título *</label>
                      <input type="text" name="titulo"
                        className={`form-control bg-secondary text-light border-0 ${aulaErrors.titulo ? 'is-invalid' : ''}`}
                        value={aulaForm.titulo} onChange={handleAulaChange} placeholder="Ex: Introdução ao React" />
                      {aulaErrors.titulo && <div className="invalid-feedback">{aulaErrors.titulo}</div>}
                    </div>
                    <div className="col-md-2 mb-3">
                      <label className="form-label text-light">Ordem *</label>
                      <input type="number" name="ordem"
                        className={`form-control bg-secondary text-light border-0 ${aulaErrors.ordem ? 'is-invalid' : ''}`}
                        value={aulaForm.ordem} onChange={handleAulaChange} min={1} />
                      {aulaErrors.ordem && <div className="invalid-feedback">{aulaErrors.ordem}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label text-light">Tipo *</label>
                      <select name="tipoConteudo" className="form-select bg-secondary text-light border-0" value={aulaForm.tipoConteudo} onChange={handleAulaChange}>
                        <option>Vídeo</option><option>Texto</option><option>Quiz</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label text-light">Duração (min) *</label>
                      <input type="number" name="duracaoMinutos"
                        className={`form-control bg-secondary text-light border-0 ${aulaErrors.duracaoMinutos ? 'is-invalid' : ''}`}
                        value={aulaForm.duracaoMinutos} onChange={handleAulaChange} min={1} />
                      {aulaErrors.duracaoMinutos && <div className="invalid-feedback">{aulaErrors.duracaoMinutos}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label text-light">URL do conteúdo</label>
                      <input type="text" name="urlConteudo" className="form-control bg-secondary text-light border-0" value={aulaForm.urlConteudo} onChange={handleAulaChange} placeholder="https://..." />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loadingAula}>
                    {loadingAula ? <><span className="spinner-border spinner-border-sm me-2"></span>Salvando...</> : <><i className="bi bi-check-lg me-2"></i>Salvar aula</>}
                  </button>
                </form>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Aulas cadastradas</h4>
              <span className="badge bg-primary">{aulas.length} aula(s)</span>
            </div>
            {aulas.length === 0 ? (
              <div className="alert alert-secondary text-center"><i className="bi bi-camera-video-off me-2"></i>Nenhuma aula cadastrada.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-white">Ordem</th>
                      <th className="text-white">Título</th>
                      <th className="text-white">Módulo</th>
                      <th className="text-white">Tipo</th>
                      <th className="text-white">Duração</th>
                      <th className="text-white text-end">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...aulas].sort((a, b) => a.ordem - b.ordem).map(a => (
                      <tr key={a.id}>
                        <td><span className="badge bg-secondary">{a.ordem}</span></td>
                        <td className="fw-bold">{a.titulo}</td>
                        <td className="text-secondary">{modulos.find(m => m.id === a.idModulo)?.titulo ?? '—'}</td>
                        <td><span className="badge bg-secondary">{a.tipoConteudo}</span></td>
                        <td className="text-secondary">{a.duracaoMinutos} min</td>
                        <td className="text-end">
                          <button className="btn btn-outline-danger btn-sm" onClick={async () => { if (!window.confirm('Excluir aula?')) return; await api.delete(`/aulas/${a.id}`); fetchAll(); }}>
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
