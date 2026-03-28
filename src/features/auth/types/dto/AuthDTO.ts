import type { Role } from '@/features/users/types/UserDomain'

export type UserRequesTDO = {
  firstName: string
  lastName: string
  handle: string
  role: Role
  campus: string
  password: string
  email: string
  course?: string | undefined
}

export type AuthUser = {
  id: string
  firstName: string
  lastName: string
  name: string
  avatarUrl?: string
  role: Role
  email: string
  course?: string | undefined
}

export type UserResponseDTO = {
  token: string
  user: AuthUser
}
