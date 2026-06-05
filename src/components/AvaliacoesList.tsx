import { Avaliacao, Curso, Usuario } from '../models';
import { api } from '../services/api';

interface Props {
  avaliacoes: Avaliacao[];
  usuarios: Usuario[];
  cursos: Curso[];
  onDelete: () => void;
  onEdit: (a: Avaliacao) => void;
}

function Stars({ nota }: { nota: number }) {
  return <span style={{ color: '#ffc107' }}>{'★'.repeat(nota)}{'☆'.repeat(5 - nota)}</span>;
}

export default function AvaliacoesList({ avaliacoes, usuarios, cursos, onDelete, onEdit }: Props) {
  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja excluir esta avaliação?')) return;
    try {
      await api.delete(`/avaliacoes/${id}`);
      onDelete();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir avaliação.');
    }
  };

  if (avaliacoes.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        <i className="bi bi-star me-2"></i>
        Nenhuma avaliação registrada. Adicione uma avaliação usando o formulário acima.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead className="table-primary">
          <tr>
            <th className="text-white"><i className="bi bi-person me-1"></i>Aluno</th>
            <th className="text-white"><i className="bi bi-book me-1"></i>Curso</th>
            <th className="text-white"><i className="bi bi-star me-1"></i>Nota</th>
            <th className="text-white">Comentário</th>
            <th className="text-white"><i className="bi bi-calendar me-1"></i>Data</th>
            <th className="text-white text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {avaliacoes.map(a => (
            <tr key={a.id}>
              <td>{usuarios.find(u => u.id === a.idUsuario)?.nomeCompleto ?? '—'}</td>
              <td className="text-secondary">{cursos.find(c => c.id === a.idCurso)?.titulo ?? '—'}</td>
              <td><Stars nota={a.nota} /></td>
              <td className="text-secondary">{a.comentario || '—'}</td>
              <td className="text-secondary">{a.dataAvaliacao}</td>
              <td className="text-end">
                <div className="btn-group">
                  <button className="btn btn-outline-warning btn-sm" onClick={() => onEdit(a)} title="Editar">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => a.id && handleDelete(a.id)} title="Excluir">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
