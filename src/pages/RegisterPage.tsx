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
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { registerSchema } from '@/schemas/register.schema'
import { ZodError } from 'zod'

function RegisterPage() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [iscarregado, setIscarregado] = useState<boolean>(false)

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target) // ✅ corrigido

    const data = {
      firstName: formData.get('firstName'),
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
                <Label htmlFor="firstName" className="text-foreground">
                  Nome
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Seu nome"
                  required
                  className="h-11 bg-background"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Sobrenome
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Seu sobrenome"
                  className="h-11 bg-background"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-foreground">
                E-mail institucional
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.nome@ifce.edu.br"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value)
                }}
                className="h-11 bg-background"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="text-foreground">
                Vinculo
              </Label>
              <Select>
                <SelectTrigger className="bg-background w-full h-11" id="role">
                  <SelectValue placeholder="Selecione seu vinculo com o IFCE" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="student">Estudante</SelectItem>
                  <SelectItem value="professor">Docente</SelectItem>
                  <SelectItem value="technician">Técnico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="text-foreground">
                Campus
              </Label>
              <Select>
                <SelectTrigger
                  className="bg-background w-full h-11"
                  id="campus"
                >
                  <SelectValue placeholder="Selecione seu vinculo com o IFCE" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="taua">Tauá</SelectItem>
                  <SelectItem value="boa_viagem">Boa Viagem</SelectItem>
                  <SelectItem value="fortaleza">Fortaleza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-foreground">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value)
                  }}
                  required
                  className="h-11 bg-background"
                />

                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimo de 8 caracteres com letra e numeros
              </p>
            </div>

            <Button type="submit" className="mt-2 h-11" disabled={iscarregado}>
              {iscarregado ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  <span>Criando...</span>{' '}
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="border-t border-border">
          <p className="text-sm text-muted-foreground text-center w-full">
            Já tem conta?{' '}
            <a href="/login" className="text-primary">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default RegisterPage
