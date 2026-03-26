import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),

  password: z
    .string()
    .min(8, 'Minimo de 8 caracteres')
    .regex(/[A-Za-z]/, 'Precisa ter letras')
    .regex(/[0-9]/, 'Precisa ter números'),
})

export type LoginFormData = z.infer<typeof LoginSchema>
