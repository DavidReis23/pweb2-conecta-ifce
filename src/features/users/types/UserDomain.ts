export type Role = 'STUDENT' | 'PROFESSOR' | 'TECHNICIAN'

export type UserDomain = {
  id: string
  firstName: string
  lastName: string
  name: string
  bio: string
  avatarUrl?: string
  handle: string
  role: Role
  campus: {
    id: string
    name: string
  }
  email: string
  course?: string | undefined
  stats: {
    followersCount: number
    followingCount: number
    postsCount: number
  }
  isFollwing: boolean
}
