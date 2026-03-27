type Role = 'STUDENT' | 'PROFESSOR' | 'TECHNICIAN'

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
  handle: string
  role: Role
  campus: {
    id: string
    name: string
  }
  email: string
  course?: string | undefined
}

export type UserResponseDTO = {
  token: string
  user: AuthUser
}
