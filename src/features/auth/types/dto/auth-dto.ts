export type UserRequesTDO = {
  firstName: string
  lastName: string
  handle: string
  role: 'student' | 'professor' | 'technician'
  campus: string
  password: string
  email: string
  course?: string | undefined
}

export type UserResponseDTO = {
  token: string
  user: UserRequesTDO & {
    id: string
    name: string
    avatarUrl?: string
    campus: {
      id: string
      name: string
    }
  }
}
