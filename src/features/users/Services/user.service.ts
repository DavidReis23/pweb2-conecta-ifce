import { http } from '@/infra/http/http-client'
import type { UserProfileDTO } from '../types/dto/UserProfileDTO'

export async function getProfile(): Promise<UserProfileDTO> {
  const reponseData = await http.get<UserProfileDTO>('me')
  return reponseData
}
