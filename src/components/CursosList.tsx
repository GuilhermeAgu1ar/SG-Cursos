import { Categoria, Curso, Usuario } from '../models';
import { api } from '../services/api';

interface Props {
  cursos: Curso[];
  categorias: Categoria[];
  instrutores: Usuario[];
  onDelete: () => void;
  onEdit: (c: Curso) => void;
}

const nivelBadge: Record<string, string> = {
  'Iniciante': 'bg-success',
  'Intermediário': 'bg-warning text-dark',
  'Avançado': 'bg-danger',
};

export default function CursosList({ cursos, categorias, instrutores, onDelete, onEdit }: Props) {
  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja excluir este curso?')) return;
    try {
      await api.delete(`/cursos/${id}`);
      onDelete();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir curso.');
    }
  };

  if (cursos.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        <i className="bi bi-book me-2"></i>
        Nenhum curso cadastrado. Adicione um curso usando o formulário acima.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead className="table-primary">
          <tr>
            <th className="text-white">Título</th>
            <th className="text-white">Categoria</th>
            <th className="text-white">Instrutor</th>
            <th className="text-white">Nível</th>
            <th className="text-white">Aulas</th>
            <th className="text-white">Horas</th>
            <th className="text-white text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(c => (
            <tr key={c.id}>
              <td className="fw-bold">{c.titulo}</td>
              <td className="text-secondary">{categorias.find(x => x.id === c.idCategoria)?.nome ?? '—'}</td>
              <td className="text-secondary">{instrutores.find(u => u.id === c.idInstrutor)?.nomeCompleto ?? '—'}</td>
              <td><span className={`badge ${nivelBadge[c.nivel] ?? 'bg-secondary'}`}>{c.nivel}</span></td>
              <td className="text-secondary">{c.totalAulas}</td>
              <td className="text-secondary">{c.totalHoras}h</td>
              <td className="text-end">
                <div className="btn-group">
                  <button className="btn btn-outline-warning btn-sm" onClick={() => onEdit(c)} title="Editar">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => c.id && handleDelete(c.id)} title="Excluir">
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
