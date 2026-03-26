import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.schema'

export function useFormRegister() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [campuses, setCampuses] = useState<
    Array<{
      id: string
      name: string
    }>
  >([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCampuses() {
      const response = await fetch(
        'https://conectaifce-api.proflucasmendes.com.br/campuses',
      )

      if (response.ok) {
        const data = await response.json()
        setCampuses(data)
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
    const { course, ...reset } = data
    const payload = data.role === 'student' ? data : reset

    const response = await fetch(
      'https://conectaifce-api.proflucasmendes.com.br/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    if (response.ok) {
      const responseData = await response.json()
      console.log(responseData)
      localStorage.setItem('access_token', responseData.token)
      navigate('/feed')
    }
  }

  return {
    state: {
      showPass,
      setShowPass,
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
