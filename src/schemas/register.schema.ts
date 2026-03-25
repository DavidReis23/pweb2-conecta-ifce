import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  lastName: z.string().trim().min(2, 'Sobrenome muito curto.').optional(),
  email: z
    .email('E-mail inválido')
    .endsWith('ifce.edu.br', 'Use seu e-mail institucional')
    .optional(),
  role: z.enum(['student', 'professor', 'technician']).optional(),
  campus: z.enum(['taua', 'boa_viagem', 'fortaleza']).optional(),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Za-z]/, 'Precisa ter letras')
    .regex(/[0-9]/, 'Precisa ter números'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
