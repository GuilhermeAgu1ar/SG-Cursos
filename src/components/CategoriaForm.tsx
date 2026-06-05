import { useState, useEffect } from 'react';
import { categoriaSchema } from '../schema/validacao';
import { api } from '../services/api';
import { Categoria } from '../models';

interface Props {
  onSuccess: () => void;
  categoriaEditando: Categoria | null;
  onCancel: () => void;
}

export default function CategoriaForm({ onSuccess, categoriaEditando, onCancel }: Props) {
  const [form, setForm] = useState({ nome: '', descricao: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoriaEditando) {
      setForm({ nome: categoriaEditando.nome, descricao: categoriaEditando.descricao });
    } else {
      setForm({ nome: '', descricao: '' });
    }
    setErrors({});
  }, [categoriaEditando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = categoriaSchema.safeParse(form);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) newErrors[err.path[0] as string] = err.message; });
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      if (categoriaEditando) {
        await api.put(`/categorias/${categoriaEditando.id}`, result.data);
      } else {
        await api.post('/categorias', result.data);
      }
      setForm({ nome: '', descricao: '' });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar categoria.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-dark border-secondary">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className={`bi ${categoriaEditando ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
          {categoriaEditando ? 'Editar Categoria' : 'Nova Categoria'}
        </h5>
        {categoriaEditando && (
          <button type="button" className="btn btn-sm btn-outline-light" onClick={onCancel}>Cancelar edição</button>
        )}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Nome *</label>
            <input type="text" name="nome"
              className={`form-control bg-secondary text-light border-0 ${errors.nome ? 'is-invalid' : ''}`}
              value={form.nome} onChange={handleChange} placeholder="Ex: Programação" />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Descrição</label>
            <textarea name="descricao" rows={2}
              className="form-control bg-secondary text-light border-0"
              value={form.descricao} onChange={handleChange} placeholder="Sobre a categoria..." />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Salvando...</> : <><i className="bi bi-check-lg me-2"></i>{categoriaEditando ? 'Salvar' : 'Cadastrar'}</>}
            </button>
            {categoriaEditando && <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancelar</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
