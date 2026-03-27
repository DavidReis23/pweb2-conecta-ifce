import { setAccessToken } from '@/features/auth/storages/token.storage'
import { http } from '@/infra/http/http-client'
import type { UserResponseDTO } from '@/features/auth/types/dto/auth-dto'

export async function login(
  email: string,
  password: string,
): Promise<UserResponseDTO> {
  const responseDTO = await http.post<UserResponseDTO>('auth/login', {
    email,
    password,
  })
  setAccessToken(responseDTO.token)
  return responseDTO
}
