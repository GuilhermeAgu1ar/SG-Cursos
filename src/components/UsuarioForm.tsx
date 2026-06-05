import { useState, useEffect } from 'react';
import { usuarioSchema } from '../schema/validacao';
import { api, hoje } from '../services/api';
import { Usuario } from '../models';

interface Props {
  onSuccess: () => void;
  usuarioEditando: Usuario | null;
  onCancel: () => void;
}

export default function UsuarioForm({ onSuccess, usuarioEditando, onCancel }: Props) {
  const [form, setForm] = useState({ nomeCompleto: '', email: '', senhaHash: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuarioEditando) {
      setForm({ nomeCompleto: usuarioEditando.nomeCompleto, email: usuarioEditando.email, senhaHash: usuarioEditando.senhaHash });
    } else {
      setForm({ nomeCompleto: '', email: '', senhaHash: '' });
    }
    setErrors({});
  }, [usuarioEditando]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = usuarioSchema.safeParse(form);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) newErrors[err.path[0] as string] = err.message; });
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    try {
      if (usuarioEditando) {
        await api.put(`/usuarios/${usuarioEditando.id}`, { ...result.data, dataCadastro: usuarioEditando.dataCadastro });
      } else {
        await api.post('/usuarios', { ...result.data, dataCadastro: hoje() });
      }
      setForm({ nomeCompleto: '', email: '', senhaHash: '' });
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-dark border-secondary">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className={`bi ${usuarioEditando ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
          {usuarioEditando ? 'Editar Usuário' : 'Cadastrar Usuário'}
        </h5>
        {usuarioEditando && (
          <button type="button" className="btn btn-sm btn-outline-light" onClick={onCancel}>
            Cancelar edição
          </button>
        )}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label className="form-label text-light">Nome completo *</label>
              <input
                type="text" name="nomeCompleto"
                className={`form-control bg-secondary text-light border-0 ${errors.nomeCompleto ? 'is-invalid' : ''}`}
                value={form.nomeCompleto} onChange={handleChange} placeholder="Ex: João Silva"
              />
              {errors.nomeCompleto && <div className="invalid-feedback">{errors.nomeCompleto}</div>}
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label text-light">E-mail *</label>
              <input
                type="email" name="email"
                className={`form-control bg-secondary text-light border-0 ${errors.email ? 'is-invalid' : ''}`}
                value={form.email} onChange={handleChange} placeholder="email@exemplo.com"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label text-light">Senha *</label>
              <input
                type="password" name="senhaHash"
                className={`form-control bg-secondary text-light border-0 ${errors.senhaHash ? 'is-invalid' : ''}`}
                value={form.senhaHash} onChange={handleChange} placeholder="••••••"
              />
              {errors.senhaHash && <div className="invalid-feedback">{errors.senhaHash}</div>}
            </div>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Salvando...</>
              ) : (
                <><i className="bi bi-check-lg me-2"></i>{usuarioEditando ? 'Salvar alterações' : 'Cadastrar'}</>
              )}
            </button>
            {usuarioEditando && (
              <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>Cancelar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
