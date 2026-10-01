import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import Usuarios from './pages/Usuarios';
import Conteudo from './pages/Conteudo';
import Matriculas from './pages/Matriculas';
import Avaliacoes from './pages/Avaliacoes';
import Financeiro from './pages/Financeiro';
import Certificados from './pages/Certificados';
import Login from './pages/Login';

function Protected({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/"             element={<Protected><Home /></Protected>} />
      <Route path="/cursos"       element={<Protected><Cursos /></Protected>} />
      <Route path="/conteudo"     element={<Protected><Conteudo /></Protected>} />
      <Route path="/usuarios"     element={<Protected><Usuarios /></Protected>} />
      <Route path="/matriculas"   element={<Protected><Matriculas /></Protected>} />
      <Route path="/avaliacoes"   element={<Protected><Avaliacoes /></Protected>} />
      <Route path="/financeiro"   element={<Protected><Financeiro /></Protected>} />
      <Route path="/certificados" element={<Protected><Certificados /></Protected>} />
    </Routes>
  );
}
