import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  lastName: z.string().trim().min(2, 'Sobrenome muito curto.'),
  handle: z
    .string()
    .trim()
    .min(3, 'O nome de usuário eve ter pelo menos 3 caracteres.')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'O nome de usuário só pode conter letras, números e underscores.',
    ),
  email: z
    .email('E-mail inválido')
    .endsWith('ifce.edu.br', 'Use seu e-mail institucional'),
  role: z.enum(['STUDENT', 'PROFESSOR', 'TECHNICIAN']),
  campus: z.string().nonempty(),
  course: z
    .string()
    .trim()
    .min(3, 'O nome do curso eve ter pelo menos 3 caracteres.')
    .optional(),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Za-z]/, 'Precisa ter letras')
    .regex(/[0-9]/, 'Precisa ter números'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
