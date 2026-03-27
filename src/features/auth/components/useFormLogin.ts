import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { http } from '@/infra/http/http-client'
import { setAccessToken } from '../storages/token.storage'
import { LoginSchema, type LoginFormData } from '../schemas/login.schema'
import { ApiError } from '@/infra/http/api-error'
import { login } from '../services/login.service'
import { useAuth } from '../context/AuthContext'

export function useFormLogin() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setAuthUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const responseData = await login(data.email, data.password)
      setAuthUser(responseData.user)
      navigate('/feed')
    } catch (error) {
      if (error instanceof ApiError) {
        setAuthError(error.message)
      }
    }
  }

  return {
    state: {
      showPass,
      authError,
      setShowPass,
    },
    onSubmit,
    useForm: {
      register,
      handleSubmit,
      isSubmitting,
      isValid,
      errors,
    },
  }
}
