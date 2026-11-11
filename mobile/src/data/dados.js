export const categorias = [
  { id: 1, nome: 'Programação', descricao: 'Linguagens e desenvolvimento', cor: '#6c5ce7' },
  { id: 2, nome: 'Banco de Dados', descricao: 'SQL, modelagem e ORMs', cor: '#00b894' },
  { id: 3, nome: 'Design', descricao: 'UI, UX e prototipação', cor: '#e17055' },
  { id: 4, nome: 'Segurança', descricao: 'Fundamentos de cibersegurança', cor: '#0984e3' },
];

export const cursos = [
  {
    id: 1,
    titulo: 'React Native do Zero',
    descricao: 'Crie apps para Android e iOS com Expo, componentes nativos e estilização com StyleSheet.',
    idCategoria: 1,
    nivel: 'Iniciante',
    totalAulas: 24,
    totalHoras: 12,
    progresso: 40, // % (simulado; depois virá de Progresso_Aulas)
  },
  {
    id: 2,
    titulo: 'APIs REST com NestJS',
    descricao: 'Controllers, services, DTOs, validação e documentação com Swagger.',
    idCategoria: 1,
    nivel: 'Intermediário',
    totalAulas: 30,
    totalHoras: 18,
    progresso: 75,
  },
  {
    id: 3,
    titulo: 'Prisma ORM na Prática',
    descricao: 'Modelagem do schema, migrations e consultas com relacionamentos.',
    idCategoria: 2,
    nivel: 'Intermediário',
    totalAulas: 16,
    totalHoras: 8,
    progresso: 10,
  },
  {
    id: 4,
    titulo: 'Fundamentos de UI Design',
    descricao: 'Cores, tipografia, espaçamento e hierarquia visual para interfaces.',
    idCategoria: 3,
    nivel: 'Iniciante',
    totalAulas: 12,
    totalHoras: 6,
    progresso: 0,
  },
  {
    id: 5,
    titulo: 'Autenticação com JWT',
    descricao: 'Hash de senha com bcrypt, geração de tokens e rotas protegidas.',
    idCategoria: 4,
    nivel: 'Avançado',
    totalAulas: 10,
    totalHoras: 5,
    progresso: 100,
  },
];