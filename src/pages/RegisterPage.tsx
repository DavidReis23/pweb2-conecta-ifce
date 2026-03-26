import FormRegister from '@/features/auth/components/form-register'
import Brand from '@/shared/components/brand'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Link } from 'react-router-dom'

function RegisterPage() {
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
          <FormRegister />
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
