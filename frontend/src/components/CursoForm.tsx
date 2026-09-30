import { useState, useEffect } from 'react';
import { cursoSchema } from '../schema/validacao';
import { api, hoje } from '../services/api';
import { Categoria, Curso, Usuario } from '../models';

interface Props {
  onSuccess: () => void;
  cursoEditando: Curso | null;
  onCancel: () => void;
  categorias: Categoria[];
  instrutores: Usuario[];
}

export default function CursoForm({ onSuccess, cursoEditando, onCancel, categorias, instrutores }: Props) {
  const [form, setForm] = useState({ titulo: '', descricao: '', idInstrutor: '', idCategoria: '', nivel: 'Iniciante', totalAulas: '0', totalHoras: '0' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cursoEditando) {
      setForm({
        titulo: cursoEditando.titulo, descricao: cursoEditando.descricao,
        idInstrutor: String(cursoEditando.idInstrutor), idCategoria: String(cursoEditando.idCategoria),
        nivel: cursoEditando.nivel, totalAulas: String(cursoEditando.totalAulas), totalHoras: String(cursoEditando.totalHoras),
      });
    } else {
      setForm({ titulo: '', descricao: '', idInstrutor: '', idCategoria: '', nivel: 'Iniciante', totalAulas: '0', totalHoras: '0' });
    }
    setErrors({});
  }, [cursoEditando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const dataToValidate = {
      titulo: form.titulo, descricao: form.descricao,
      idInstrutor: Number(form.idInstrutor), idCategoria: Number(form.idCategoria),
      nivel: form.nivel, totalAulas: Number(form.totalAulas), totalHoras: Number(form.totalHoras),
    };
    const result = cursoSchema.safeParse(dataToValidate);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) newErrors[err.path[0] as string] = err.message; });
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      if (cursoEditando) {
        await api.put(`/cursos/${cursoEditando.id}`, { ...result.data, dataPublicacao: cursoEditando.dataPublicacao });
      } else {
        await api.post('/cursos', { ...result.data, dataPublicacao: hoje() });
      }
      setForm({ titulo: '', descricao: '', idInstrutor: '', idCategoria: '', nivel: 'Iniciante', totalAulas: '0', totalHoras: '0' });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar curso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-dark border-secondary">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className={`bi ${cursoEditando ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
          {cursoEditando ? 'Editar Curso' : 'Cadastrar Curso'}
        </h5>
        {cursoEditando && (
          <button type="button" className="btn btn-sm btn-outline-light" onClick={onCancel}>Cancelar edição</button>
        )}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Título *</label>
              <input type="text" name="titulo"
                className={`form-control bg-secondary text-light border-0 ${errors.titulo ? 'is-invalid' : ''}`}
                value={form.titulo} onChange={handleChange} placeholder="Ex: React com TypeScript" />
              {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label text-light">Categoria *</label>
              <select name="idCategoria"
                className={`form-select bg-secondary text-light border-0 ${errors.idCategoria ? 'is-invalid' : ''}`}
                value={form.idCategoria} onChange={handleChange}>
                <option value="">Selecione</option>
                {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
              {errors.idCategoria && <div className="invalid-feedback">{errors.idCategoria}</div>}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label text-light">Nível *</label>
              <select name="nivel"
                className={`form-select bg-secondary text-light border-0 ${errors.nivel ? 'is-invalid' : ''}`}
                value={form.nivel} onChange={handleChange}>
                <option>Iniciante</option>
                <option>Intermediário</option>
                <option>Avançado</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label text-light">Instrutor *</label>
              <select name="idInstrutor"
                className={`form-select bg-secondary text-light border-0 ${errors.idInstrutor ? 'is-invalid' : ''}`}
                value={form.idInstrutor} onChange={handleChange}>
                <option value="">Selecione</option>
                {instrutores.map(u => <option key={u.id} value={u.id}>{u.nomeCompleto}</option>)}
              </select>
              {errors.idInstrutor && <div className="invalid-feedback">{errors.idInstrutor}</div>}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label text-light">Total de aulas</label>
              <input type="number" name="totalAulas"
                className="form-control bg-secondary text-light border-0"
                value={form.totalAulas} onChange={handleChange} min={0} />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label text-light">Total de horas</label>
              <input type="number" name="totalHoras"
                className="form-control bg-secondary text-light border-0"
                value={form.totalHoras} onChange={handleChange} min={0} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Descrição</label>
            <textarea name="descricao" rows={2}
              className="form-control bg-secondary text-light border-0"
              value={form.descricao} onChange={handleChange} placeholder="Sobre o curso..." />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Salvando...</> : <><i className="bi bi-check-lg me-2"></i>{cursoEditando ? 'Salvar alterações' : 'Cadastrar curso'}</>}
            </button>
            {cursoEditando && <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancelar</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
