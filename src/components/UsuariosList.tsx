import { Usuario } from '../models';
import { api } from '../services/api';

interface Props {
  usuarios: Usuario[];
  onDelete: () => void;
  onEdit: (u: Usuario) => void;
}

export default function UsuariosList({ usuarios, onDelete, onEdit }: Props) {
  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja excluir este usuário?')) return;
    try {
      await api.delete(`/usuarios/${id}`);
      onDelete();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir usuário.');
    }
  };

  if (usuarios.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        <i className="bi bi-person-x me-2"></i>
        Nenhum usuário cadastrado. Adicione um usuário usando o formulário acima.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead className="table-primary">
          <tr>
            <th className="text-white"><i className="bi bi-hash me-1"></i>#</th>
            <th className="text-white"><i className="bi bi-person me-1"></i>Nome</th>
            <th className="text-white"><i className="bi bi-envelope me-1"></i>E-mail</th>
            <th className="text-white"><i className="bi bi-calendar me-1"></i>Cadastro</th>
            <th className="text-white text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td className="text-secondary">{u.id}</td>
              <td>{u.nomeCompleto}</td>
              <td className="text-secondary">{u.email}</td>
              <td className="text-secondary">{u.dataCadastro}</td>
              <td className="text-end">
                <div className="btn-group">
                  <button className="btn btn-outline-warning btn-sm" onClick={() => onEdit(u)} title="Editar">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => u.id && handleDelete(u.id)} title="Excluir">
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
