import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MatriculaForm from '../components/MatriculaForm';
import MatriculasList from '../components/MatriculasList';
import { api, hoje } from '../services/api';
import { Aula, Curso, Matricula, ProgressoAula, Usuario } from '../models';

export default function Matriculas() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [progresso, setProgresso] = useState<ProgressoAula[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<'matriculas' | 'progresso'>('matriculas');

  const fetchAll = async () => {
    try {
      const [u, c, m, a, p] = await Promise.all([
        api.get('/usuarios'), api.get('/cursos'), api.get('/matriculas'),
        api.get('/aulas'), api.get('/progressoAulas'),
      ]);
      setUsuarios(u.data); setCursos(c.data); setMatriculas(m.data); setAulas(a.data); setProgresso(p.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleConcluirAula = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await api.post('/progressoAulas', {
      idUsuario: Number(f.get('idUsuario')),
      idAula: Number(f.get('idAula')),
      dataConclusao: hoje(),
      status: 'Concluído',
    });
    (e.target as HTMLFormElement).reset();
    fetchAll();
  };

  return (
    <div className="min-vh-100 bg-dark">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-clipboard-check text-primary me-3" style={{ fontSize: '2rem' }}></i>
          <div>
            <h1 className="text-light mb-0">Matrículas e Progresso</h1>
            <p className="text-secondary mb-0">Registre matrículas e acompanhe o progresso nas aulas</p>
          </div>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${tab === 'matriculas' ? 'active bg-dark text-primary border-primary' : 'text-secondary'}`} onClick={() => setTab('matriculas')}>
              <i className="bi bi-clipboard me-2"></i>Matrículas
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${tab === 'progresso' ? 'active bg-dark text-primary border-primary' : 'text-secondary'}`} onClick={() => setTab('progresso')}>
              <i className="bi bi-check2-circle me-2"></i>Progresso
            </button>
          </li>
        </ul>

        {tab === 'matriculas' && (
          <>
            <div className="row g-4 mb-4">
              <div className="col-lg-5">
                <MatriculaForm onSuccess={fetchAll} usuarios={usuarios} cursos={cursos} matriculas={matriculas} />
              </div>
              <div className="col-lg-7">
                <div className="card bg-secondary border-0 h-100">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-4">
                    <i className="bi bi-clipboard-data text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
                    <h3 className="text-white">{matriculas.length}</h3>
                    <p className="text-light mb-0">matrículas registradas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Matrículas</h4>
              <span className="badge bg-primary">{matriculas.length}</span>
            </div>
            {loading ? <div className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></div>
              : <MatriculasList matriculas={matriculas} usuarios={usuarios} cursos={cursos} onDelete={fetchAll} />}
          </>
        )}

        {tab === 'progresso' && (
          <>
            <div className="card bg-dark border-secondary mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"><i className="bi bi-check2-circle me-2"></i>Marcar Aula como Concluída</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleConcluirAula}>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label className="form-label text-light">Usuário *</label>
                      <select name="idUsuario" className="form-select bg-secondary text-light border-0" required>
                        <option value="">Selecione um usuário</option>
                        {usuarios.map(u => <option key={u.id} value={u.id}>{u.nomeCompleto}</option>)}
                      </select>
                    </div>
                    <div className="col-md-5 mb-3">
                      <label className="form-label text-light">Aula *</label>
                      <select name="idAula" className="form-select bg-secondary text-light border-0" required>
                        <option value="">Selecione uma aula</option>
                        {aulas.map(a => <option key={a.id} value={a.id}>{a.titulo}</option>)}
                      </select>
                    </div>
                    <div className="col-md-2 mb-3 d-flex align-items-end">
                      <button type="submit" className="btn btn-success w-100">
                        <i className="bi bi-check-lg me-2"></i>Marcar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-light mb-0"><i className="bi bi-list-check me-2"></i>Progresso de aulas</h4>
              <span className="badge bg-success">{progresso.length} concluída(s)</span>
            </div>
            {progresso.length === 0 ? (
              <div className="alert alert-secondary text-center"><i className="bi bi-clipboard-x me-2"></i>Nenhum progresso registrado ainda.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-white"><i className="bi bi-person me-1"></i>Aluno</th>
                      <th className="text-white"><i className="bi bi-play-circle me-1"></i>Aula</th>
                      <th className="text-white">Status</th>
                      <th className="text-white"><i className="bi bi-calendar me-1"></i>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progresso.map(p => (
                      <tr key={p.id}>
                        <td>{usuarios.find(u => u.id === p.idUsuario)?.nomeCompleto ?? '—'}</td>
                        <td className="text-secondary">{aulas.find(a => a.id === p.idAula)?.titulo ?? '—'}</td>
                        <td><span className="badge bg-success">{p.status}</span></td>
                        <td className="text-secondary">{p.dataConclusao}</td>
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
