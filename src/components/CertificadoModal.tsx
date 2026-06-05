import { useState, useEffect } from 'react';
import { api, gerarCodigo, hoje } from '../services/api';
import { Certificado, Curso, Trilha, Usuario } from '../models';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  usuarios: Usuario[];
  cursos: Curso[];
  trilhas: Trilha[];
}

export default function CertificadoModal({ isOpen, onClose, onSuccess, usuarios, cursos, trilhas }: Props) {
  const [form, setForm] = useState({ idUsuario: '', idCurso: '', idTrilha: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [certificadoEmitido, setCertificadoEmitido] = useState<Certificado | null>(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ idUsuario: '', idCurso: '', idTrilha: '' });
      setSuccess(false);
      setCertificadoEmitido(null);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.idUsuario || !form.idCurso) { alert('Selecione o usuário e o curso.'); return; }
    setLoading(true);
    try {
      const payload: Omit<Certificado, 'id'> = {
        idUsuario: Number(form.idUsuario),
        idCurso: Number(form.idCurso),
        codigoVerificacao: gerarCodigo(),
        dataEmissao: hoje(),
      };
      if (form.idTrilha) payload.idTrilha = Number(form.idTrilha);
      const res = await api.post('/certificados', payload);
      setCertificadoEmitido(res.data);
      setSuccess(true);
      onSuccess();
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      console.error(error);
      alert('Erro ao emitir certificado.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const usuario = usuarios.find(u => u.id === Number(form.idUsuario));
  const curso = cursos.find(c => c.id === Number(form.idCurso));

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark border border-primary">
          <div className="modal-header bg-primary text-white border-0">
            <h5 className="modal-title">
              <i className="bi bi-award me-2"></i>Emitir Certificado
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} disabled={loading}></button>
          </div>
          <div className="modal-body text-light">
            {success && certificadoEmitido ? (
              <div className="text-center py-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                <h5 className="mt-3 text-success">Certificado emitido com sucesso!</h5>
                <div className="mt-3 p-3 bg-secondary rounded text-center">
                  <small className="text-light text-uppercase" style={{ letterSpacing: '1px' }}>Código de verificação</small>
                  <div className="fw-bold mt-1" style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#ffc107' }}>
                    {certificadoEmitido.codigoVerificacao}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label text-light">Aluno *</label>
                  <select name="idUsuario"
                    className="form-select bg-secondary text-light border-0"
                    value={form.idUsuario} onChange={handleChange}>
                    <option value="">Selecione um aluno</option>
                    {usuarios.map(u => <option key={u.id} value={u.id}>{u.nomeCompleto}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-light">Curso *</label>
                  <select name="idCurso"
                    className="form-select bg-secondary text-light border-0"
                    value={form.idCurso} onChange={handleChange}>
                    <option value="">Selecione um curso</option>
                    {cursos.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-light">Trilha (opcional)</label>
                  <select name="idTrilha"
                    className="form-select bg-secondary text-light border-0"
                    value={form.idTrilha} onChange={handleChange}>
                    <option value="">— Nenhuma —</option>
                    {trilhas.map(t => <option key={t.id} value={t.id}>{t.titulo}</option>)}
                  </select>
                </div>
                {form.idUsuario && form.idCurso && (
                  <div className="p-3 bg-secondary rounded mb-3">
                    <small className="text-light d-block"><strong>Aluno:</strong> {usuario?.nomeCompleto}</small>
                    <small className="text-light d-block"><strong>Curso:</strong> {curso?.titulo}</small>
                  </div>
                )}
              </>
            )}
          </div>
          {!success && (
            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading || !form.idUsuario || !form.idCurso}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Emitindo...</> : <><i className="bi bi-award me-2"></i>Emitir certificado</>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
