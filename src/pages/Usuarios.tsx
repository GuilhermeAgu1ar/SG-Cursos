import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UsuarioForm from '../components/UsuarioForm';
import UsuariosList from '../components/UsuariosList';
import { api } from '../services/api';
import { Usuario } from '../models';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get('/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const handleSuccess = () => {
    fetchUsuarios();
    setUsuarioEditando(null);
  };

  return (
    <div className="min-vh-100 bg-dark">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-people text-primary me-3" style={{ fontSize: '2rem' }}></i>
          <div>
            <h1 className="text-light mb-0">Usuários</h1>
            <p className="text-secondary mb-0">Gerencie alunos e instrutores da plataforma</p>
          </div>
        </div>

        <div className="mb-4">
          <UsuarioForm
            onSuccess={handleSuccess}
            usuarioEditando={usuarioEditando}
            onCancel={() => setUsuarioEditando(null)}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-light mb-0">
            <i className="bi bi-list-ul me-2"></i>Usuários cadastrados
          </h4>
          <span className="badge bg-primary">{usuarios.length} usuário(s)</span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : (
          <UsuariosList
            usuarios={usuarios}
            onDelete={fetchUsuarios}
            onEdit={u => { setUsuarioEditando(u); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}
      </div>
    </div>
  );
}
