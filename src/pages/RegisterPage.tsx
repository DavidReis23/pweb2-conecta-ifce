import Brand from '@/components/shared/brand'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import React, { useState, type ReactEventHandler } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { registerSchema } from '@/schemas/register.schema'
import { ZodError } from 'zod'
import { Link } from 'react-router-dom'

function RegisterPage() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [isCarregando, setIsCarregando] = useState(false)

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
    try {
      const validateData = registerSchema.parse(data)
      console.log(validateData)
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error)
      }
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center py-20">
      <Card className="max-w-md border-border w-md">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <Brand />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground">
            Criar a sua conta
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Preencha com os dados para entrar na comunidade
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Seu sobrenome"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-mail institucional</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.nome@ifce.edu.br"
                className="h-11 bg-background"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Vínculo</Label>
              <Select>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Selecione seu vínculo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Estudante</SelectItem>
                  <SelectItem value="professor">Docente</SelectItem>
                  <SelectItem value="technician">Técnico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Campus</Label>
              <Select>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Selecione seu campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taua">Tauá</SelectItem>
                  <SelectItem value="boa_viagem">Boa Viagem</SelectItem>
                  <SelectItem value="fortaleza">Fortaleza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  required
                  className="h-11 bg-background"
                />

                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPass ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="h-11 mt-2">
              Criar conta
            </Button>
          </form>
        </CardContent>

        <CardFooter className="border-t border-border">
          <p className="text-sm text-center w-full">
            Já tem conta?{' '}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default RegisterPage
