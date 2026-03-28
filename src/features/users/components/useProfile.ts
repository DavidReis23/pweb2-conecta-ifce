import { useEffect, useState } from 'react'
import type { UserProfileDTO } from '../types/dto/UserProfileDTO'
import { http } from '@/infra/http/http-client'
import { getProfile } from '../Services/user.service'

export function useProfile() {
  const [userData, setUserData] = useState<UserProfileDTO | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)

      const responseData = await getProfile()
      setUserData(responseData)

      setIsLoading(false)
    }

    fetchProfile()
  }, [])

  return {
    userData,
    isLoading,
  }
}
