import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { api, gerarCodigo, hoje } from '../services/api';
import { Certificado, Curso, Trilha, Usuario } from '../models';

export default function Certificados() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [form, setForm] = useState({ idUsuario: '', idCurso: '', idTrilha: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchAll = async () => {
    try {
      const [u, c, t, cert] = await Promise.all([
        api.get('/usuarios'), api.get('/cursos'), api.get('/trilhas'), api.get('/certificados'),
      ]);
      setUsuarios(u.data); setCursos(c.data); setTrilhas(t.data); setCertificados(cert.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.idUsuario) newErrors.idUsuario = 'Selecione um aluno';
    if (!form.idCurso) newErrors.idCurso = 'Selecione um curso';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoadingForm(true);
    try {
      const payload: Omit<Certificado, 'id'> = {
        idUsuario: Number(form.idUsuario),
        idCurso: Number(form.idCurso),
        codigoVerificacao: gerarCodigo(),
        dataEmissao: hoje(),
      };
      if (form.idTrilha) payload.idTrilha = Number(form.idTrilha);
      await api.post('/certificados', payload);
      setForm({ idUsuario: '', idCurso: '', idTrilha: '' });
      fetchAll();
    } catch (error) {
      console.error(error);
      alert('Erro ao emitir certificado.');
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja excluir este certificado?')) return;
    await api.delete(`/certificados/${id}`);
    fetchAll();
  };

  return (
    <div className="min-vh-100 bg-dark">
      <Navbar />
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-award text-primary me-3" style={{ fontSize: '2rem' }}></i>
          <div>
            <h1 className="text-light mb-0">Certificados</h1>
            <p className="text-secondary mb-0">Emissão com código único de verificação</p>
          </div>
        </div>

        {/* Formulário */}
        <div className="card bg-dark border-secondary mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Emitir Certificado</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label text-light">Aluno *</label>
                  <select name="idUsuario"
                    className={`form-select bg-secondary text-light border-0 ${errors.idUsuario ? 'is-invalid' : ''}`}
                    value={form.idUsuario} onChange={handleChange}>
                    <option value="">Selecione um aluno</option>
                    {usuarios.map(u => <option key={u.id} value={u.id}>{u.nomeCompleto}</option>)}
                  </select>
                  {errors.idUsuario && <div className="invalid-feedback">{errors.idUsuario}</div>}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label text-light">Curso *</label>
                  <select name="idCurso"
                    className={`form-select bg-secondary text-light border-0 ${errors.idCurso ? 'is-invalid' : ''}`}
                    value={form.idCurso} onChange={handleChange}>
                    <option value="">Selecione um curso</option>
                    {cursos.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
                  </select>
                  {errors.idCurso && <div className="invalid-feedback">{errors.idCurso}</div>}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label text-light">Trilha (opcional)</label>
                  <select name="idTrilha"
                    className="form-select bg-secondary text-light border-0"
                    value={form.idTrilha} onChange={handleChange}>
                    <option value="">— Nenhuma —</option>
                    {trilhas.map(t => <option key={t.id} value={t.id}>{t.titulo}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loadingForm}>
                {loadingForm
                  ? <><span className="spinner-border spinner-border-sm me-2"></span>Emitindo...</>
                  : <><i className="bi bi-check-lg me-2"></i>Emitir certificado</>}
              </button>
            </form>
          </div>
        </div>

        {/* Lista */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-light mb-0"><i className="bi bi-list-ul me-2"></i>Certificados emitidos</h4>
          <span className="badge bg-primary">{certificados.length}</span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>
          </div>
        ) : certificados.length === 0 ? (
          <div className="alert alert-secondary text-center">
            <i className="bi bi-award me-2"></i>Nenhum certificado emitido ainda.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead className="table-primary">
                <tr>
                  <th className="text-white"><i className="bi bi-person me-1"></i>Aluno</th>
                  <th className="text-white"><i className="bi bi-book me-1"></i>Curso</th>
                  <th className="text-white"><i className="bi bi-map me-1"></i>Trilha</th>
                  <th className="text-white"><i className="bi bi-upc me-1"></i>Código</th>
                  <th className="text-white"><i className="bi bi-calendar me-1"></i>Emissão</th>
                  <th className="text-white text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {certificados.map(c => (
                  <tr key={c.id}>
                    <td>{usuarios.find(u => u.id === c.idUsuario)?.nomeCompleto ?? '—'}</td>
                    <td className="text-secondary">{cursos.find(x => x.id === c.idCurso)?.titulo ?? '—'}</td>
                    <td className="text-secondary">{trilhas.find(t => t.id === c.idTrilha)?.titulo ?? '—'}</td>
                    <td><code className="text-light">{c.codigoVerificacao}</code></td>
                    <td className="text-secondary">{c.dataEmissao}</td>
                    <td className="text-end">
                      <button className="btn btn-outline-danger btn-sm" onClick={() => c.id && handleDelete(c.id)} title="Excluir">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
