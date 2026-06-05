import { z } from 'zod';

export const usuarioSchema = z.object({
  nomeCompleto: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  senhaHash: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
});

export const categoriaSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  descricao: z.string().optional(),
});

export const cursoSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  descricao: z.string().optional(),
  idInstrutor: z.number().positive('Selecione um instrutor'),
  idCategoria: z.number().positive('Selecione uma categoria'),
  nivel: z.string().min(1, 'Selecione um nível'),
  totalAulas: z.number().min(0),
  totalHoras: z.number().min(0),
});

export const moduloSchema = z.object({
  idCurso: z.number().positive('Selecione um curso'),
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  ordem: z.number().positive('Ordem deve ser maior que 0'),
});

export const aulaSchema = z.object({
  idModulo: z.number().positive('Selecione um módulo'),
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  tipoConteudo: z.string().min(1, 'Selecione o tipo'),
  urlConteudo: z.string().optional(),
  duracaoMinutos: z.number().min(1, 'Duração deve ser maior que 0'),
  ordem: z.number().positive('Ordem deve ser maior que 0'),
});

export const trilhaSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  descricao: z.string().optional(),
  idCategoria: z.number().positive('Selecione uma categoria'),
});

export const avaliacaoSchema = z.object({
  idUsuario: z.number().positive('Selecione um usuário'),
  idCurso: z.number().positive('Selecione um curso'),
  nota: z.number().min(1).max(5),
  comentario: z.string().optional(),
});

export type UsuarioFormData = z.infer<typeof usuarioSchema>;
export type CategoriaFormData = z.infer<typeof categoriaSchema>;
export type CursoFormData = z.infer<typeof cursoSchema>;
export type ModuloFormData = z.infer<typeof moduloSchema>;
export type AulaFormData = z.infer<typeof aulaSchema>;
export type TrilhaFormData = z.infer<typeof trilhaSchema>;
export type AvaliacaoFormData = z.infer<typeof avaliacaoSchema>;
