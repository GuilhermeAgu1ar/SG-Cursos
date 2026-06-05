import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import Usuarios from './pages/Usuarios';
import Conteudo from './pages/Conteudo';
import Matriculas from './pages/Matriculas';
import Avaliacoes from './pages/Avaliacoes';
import Financeiro from './pages/Financeiro';
import Certificados from './pages/Certificados';

export default function App() {
  return (
    <Routes>
      <Route path="/"             element={<Home />} />
      <Route path="/cursos"       element={<Cursos />} />
      <Route path="/conteudo"     element={<Conteudo />} />
      <Route path="/usuarios"     element={<Usuarios />} />
      <Route path="/matriculas"   element={<Matriculas />} />
      <Route path="/avaliacoes"   element={<Avaliacoes />} />
      <Route path="/financeiro"   element={<Financeiro />} />
      <Route path="/certificados" element={<Certificados />} />
    </Routes>
  );
}
