import { useEffect, useState } from 'react'
import type { RecommendationsDTO } from '../types/dto/recommendationsDTO'
import { getRecommendations } from '../services/follow.service'

export function useRecommendations() {
  const [recommendations, setRecommendations] =
    useState<RecommendationsDTO | null>(null)
  const [isLoading, setIsLoandig] = useState<boolean>(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoandig(true)

      const responseData = await getRecommendations()
      setRecommendations(responseData)

      setIsLoandig(false)
    }

    fetchRecommendations()
  }, [])

  return {
    recommendations,
    isLoading,
  }
}
