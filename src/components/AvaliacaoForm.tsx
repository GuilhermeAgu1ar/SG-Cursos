import { useState, useEffect } from 'react';
import { avaliacaoSchema } from '../schema/validacao';
import { api, hoje } from '../services/api';
import { Avaliacao, Curso, Usuario } from '../models';

interface Props {
  onSuccess: () => void;
  avaliacaoEditando: Avaliacao | null;
  onCancel: () => void;
  usuarios: Usuario[];
  cursos: Curso[];
}

export default function AvaliacaoForm({ onSuccess, avaliacaoEditando, onCancel, usuarios, cursos }: Props) {
  const [form, setForm] = useState({ idUsuario: '', idCurso: '', nota: '5', comentario: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (avaliacaoEditando) {
      setForm({
        idUsuario: String(avaliacaoEditando.idUsuario), idCurso: String(avaliacaoEditando.idCurso),
        nota: String(avaliacaoEditando.nota), comentario: avaliacaoEditando.comentario ?? '',
      });
    } else {
      setForm({ idUsuario: '', idCurso: '', nota: '5', comentario: '' });
    }
    setErrors({});
  }, [avaliacaoEditando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const dataToValidate = {
      idUsuario: Number(form.idUsuario), idCurso: Number(form.idCurso),
      nota: Number(form.nota), comentario: form.comentario,
    };
    const result = avaliacaoSchema.safeParse(dataToValidate);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) newErrors[err.path[0] as string] = err.message; });
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      if (avaliacaoEditando) {
        await api.put(`/avaliacoes/${avaliacaoEditando.id}`, { ...result.data, dataAvaliacao: avaliacaoEditando.dataAvaliacao });
      } else {
        await api.post('/avaliacoes', { ...result.data, dataAvaliacao: hoje() });
      }
      setForm({ idUsuario: '', idCurso: '', nota: '5', comentario: '' });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar avaliação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-dark border-secondary">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className={`bi ${avaliacaoEditando ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
          {avaliacaoEditando ? 'Editar Avaliação' : 'Nova Avaliação'}
        </h5>
        {avaliacaoEditando && (
          <button type="button" className="btn btn-sm btn-outline-light" onClick={onCancel}>Cancelar edição</button>
        )}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label className="form-label text-light">Usuário *</label>
              <select name="idUsuario"
                className={`form-select bg-secondary text-light border-0 ${errors.idUsuario ? 'is-invalid' : ''}`}
                value={form.idUsuario} onChange={handleChange}>
                <option value="">Selecione</option>
                {usuarios.map(u => <option key={u.id} value={u.id}>{u.nomeCompleto}</option>)}
              </select>
              {errors.idUsuario && <div className="invalid-feedback">{errors.idUsuario}</div>}
            </div>
            <div className="col-md-5 mb-3">
              <label className="form-label text-light">Curso *</label>
              <select name="idCurso"
                className={`form-select bg-secondary text-light border-0 ${errors.idCurso ? 'is-invalid' : ''}`}
                value={form.idCurso} onChange={handleChange}>
                <option value="">Selecione</option>
                {cursos.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
              </select>
              {errors.idCurso && <div className="invalid-feedback">{errors.idCurso}</div>}
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label text-light">Nota *</label>
              <select name="nota"
                className="form-select bg-secondary text-light border-0"
                value={form.nota} onChange={handleChange}>
                <option value="5">5 — Excelente</option>
                <option value="4">4 — Muito bom</option>
                <option value="3">3 — Bom</option>
                <option value="2">2 — Regular</option>
                <option value="1">1 — Ruim</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Comentário (opcional)</label>
            <textarea name="comentario" rows={2}
              className="form-control bg-secondary text-light border-0"
              value={form.comentario} onChange={handleChange} placeholder="Escreva um comentário..." />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Salvando...</> : <><i className="bi bi-check-lg me-2"></i>{avaliacaoEditando ? 'Salvar alterações' : 'Enviar avaliação'}</>}
            </button>
            {avaliacaoEditando && <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancelar</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
