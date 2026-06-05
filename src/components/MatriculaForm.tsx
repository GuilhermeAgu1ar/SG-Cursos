import { useState } from 'react';
import { api, hoje } from '../services/api';
import { Curso, Matricula, Usuario } from '../models';

interface Props {
  onSuccess: () => void;
  usuarios: Usuario[];
  cursos: Curso[];
  matriculas: Matricula[];
}

export default function MatriculaForm({ onSuccess, usuarios, cursos, matriculas }: Props) {
  const [form, setForm] = useState({ idUsuario: '', idCurso: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};
    if (!form.idUsuario) newErrors.idUsuario = 'Selecione um usuário';
    if (!form.idCurso) newErrors.idCurso = 'Selecione um curso';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    const jaExiste = matriculas.find(m => m.idUsuario === Number(form.idUsuario) && m.idCurso === Number(form.idCurso));
    if (jaExiste) { alert('Usuário já está matriculado neste curso.'); return; }
    setLoading(true);
    try {
      await api.post('/matriculas', { idUsuario: Number(form.idUsuario), idCurso: Number(form.idCurso), dataMatricula: hoje(), dataConclusao: '' });
      setForm({ idUsuario: '', idCurso: '' });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar matrícula.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-dark border-secondary">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0"><i className="bi bi-plus-circle me-2"></i>Nova Matrícula</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Usuário *</label>
            <select name="idUsuario"
              className={`form-select bg-secondary text-light border-0 ${errors.idUsuario ? 'is-invalid' : ''}`}
              value={form.idUsuario} onChange={handleChange}>
              <option value="">Selecione um usuário</option>
              {usuarios.map(u => <option key={u.id} value={u.id}>{u.nomeCompleto}</option>)}
            </select>
            {errors.idUsuario && <div className="invalid-feedback">{errors.idUsuario}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Curso *</label>
            <select name="idCurso"
              className={`form-select bg-secondary text-light border-0 ${errors.idCurso ? 'is-invalid' : ''}`}
              value={form.idCurso} onChange={handleChange}>
              <option value="">Selecione um curso</option>
              {cursos.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
            </select>
            {errors.idCurso && <div className="invalid-feedback">{errors.idCurso}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Matriculando...</> : <><i className="bi bi-check-lg me-2"></i>Matricular</>}
          </button>
        </form>
      </div>
    </div>
  );
}
