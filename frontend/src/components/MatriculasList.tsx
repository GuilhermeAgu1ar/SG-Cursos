import { Curso, Matricula, Usuario } from '../models';
import { api } from '../services/api';

interface Props {
  matriculas: Matricula[];
  usuarios: Usuario[];
  cursos: Curso[];
  onDelete: () => void;
}

export default function MatriculasList({ matriculas, usuarios, cursos, onDelete }: Props) {
  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja cancelar esta matrícula?')) return;
    try {
      await api.delete(`/matriculas/${id}`);
      onDelete();
    } catch (error) {
      console.error(error);
      alert('Erro ao cancelar matrícula.');
    }
  };

  if (matriculas.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        <i className="bi bi-clipboard-x me-2"></i>
        Nenhuma matrícula registrada. Registre uma matrícula usando o formulário ao lado.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead className="table-primary">
          <tr>
            <th className="text-white"><i className="bi bi-hash me-1"></i>#</th>
            <th className="text-white"><i className="bi bi-person me-1"></i>Aluno</th>
            <th className="text-white"><i className="bi bi-book me-1"></i>Curso</th>
            <th className="text-white"><i className="bi bi-calendar me-1"></i>Data da matrícula</th>
            <th className="text-white text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map(m => (
            <tr key={m.id}>
              <td className="text-secondary">{m.id}</td>
              <td>{usuarios.find(u => u.id === m.idUsuario)?.nomeCompleto ?? '—'}</td>
              <td className="text-secondary">{cursos.find(c => c.id === m.idCurso)?.titulo ?? '—'}</td>
              <td className="text-secondary">{m.dataMatricula}</td>
              <td className="text-end">
                <button className="btn btn-outline-danger btn-sm" onClick={() => m.id && handleDelete(m.id)} title="Cancelar matrícula">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
