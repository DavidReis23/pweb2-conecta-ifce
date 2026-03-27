import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.schema'
import { http } from '@/infra/http/http-client'
import { setAccessToken } from '../storages/token.storage'
import { ApiError } from '@/infra/http/api-error'
import { getCampuses, registerUser } from '../services/register.service'
import { useAuth } from '../context/AuthContext'

export function useFormRegister() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [campuses, setCampuses] = useState<
    Array<{
      id: string
      name: string
    }>
  >([])
  const navigate = useNavigate()
  const { setAuthUser } = useAuth()

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const campuses = await getCampuses()
        setCampuses(campuses)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCampuses()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegisterFormData) => {
    const { course, ...rest } = data
    const payload = data.role === 'STUDENT' ? data : rest

    try {
      const responseData = await registerUser(payload)
      setAuthUser(responseData.user)
      navigate('/feed')
    } catch (error) {
      if (error instanceof ApiError) {
        setRegisterError(error.message)
      }
    }
  }

  return {
    state: {
      showPass,
      setShowPass,
      registerError,
      campuses,
    },
    onSubmit,
    useForm: {
      register,
      handleSubmit,
      control,
      isSubmitting,
      isValid,
      errors,
      watch,
    },
  }
}
