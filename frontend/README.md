# SG Cursos — Plataforma de Cursos Online

Projeto LAB03 desenvolvido com **React + TypeScript + Vite + Bootstrap 5 + JSON Server**.

## Pré-requisitos

- Node.js 18+
- npm

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

Isso inicia simultaneamente:
- **JSON Server** na porta `3001` → API REST em `http://localhost:3001`
- **Vite Dev Server** na porta `5173` → App em `http://localhost:5173`

## Estrutura do projeto

```
src/
├── components/
│   ├── Navbar.tsx       # Navegação principal
│   ├── PageTitle.tsx    # Cabeçalho de página
│   ├── StatCard.tsx     # Card de estatística
│   └── EmptyState.tsx   # Estado vazio de listas
├── models/
│   └── index.ts         # Interfaces TypeScript (todas as entidades)
├── pages/
│   ├── Home.tsx         # Dashboard com estatísticas
│   ├── Cursos.tsx       # Cursos, Categorias e Trilhas
│   ├── Conteudo.tsx     # Módulos e Aulas (tree view)
│   ├── Usuarios.tsx     # Cadastro de usuários
│   ├── Matriculas.tsx   # Matrículas e Progresso
│   ├── Avaliacoes.tsx   # Avaliações com estrelas
│   ├── Financeiro.tsx   # Planos, Assinaturas e Pagamentos
│   └── Certificados.tsx # Emissão de certificados
├── services/
│   └── api.ts           # Axios + helpers (hoje, gerarCodigo, addMeses)
├── App.tsx              # Roteamento principal
├── main.tsx             # Entry point
└── style.css            # Design system customizado
db.json                  # Banco de dados do JSON Server
```

## Módulos implementados

| Módulo | Funcionalidades |
|---|---|
| **Cursos** | CRUD de Categorias, Cursos e Trilhas; filtro por categoria |
| **Conteúdo** | Módulos e Aulas com tree view hierárquico |
| **Usuários** | Cadastro e listagem de alunos/instrutores |
| **Matrículas** | Matrícula em cursos e marcação de aulas concluídas |
| **Avaliações** | Notas de 1–5 estrelas com comentários e média geral |
| **Financeiro** | Seleção de planos, checkout simulado e histórico de pagamentos |
| **Certificados** | Emissão com código único e layout visual de certificado |
# SG-Cursos
