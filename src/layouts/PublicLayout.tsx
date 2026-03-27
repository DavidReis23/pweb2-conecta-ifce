import { useAuth } from '@/features/auth/context/AuthContext'
import Footer from '@/shared/components/footer'
import Navbar from '@/shared/components/navbar'
import { Button } from '@/shared/components/ui/button'
import useScroll from '@/shared/hooks/useScroll'
import { Link, Navigate } from 'react-router'
import { Outlet } from 'react-router-dom'

function PublicLayout() {
  const { isAthenticated } = useAuth()

  if (isAthenticated) {
    return <Navigate to="/feed" replace />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useScroll()

  return (
    <>
      <div className="flex flex-col min-h-svh">
        <Navbar>
          <Navbar.Brand to="/" />

          <Navbar.Links>
            <Navbar.Link to="" text="Início" />
            <Navbar.Link to="/#feature-section" text="Recursos" />
            <Navbar.Link to="/#faq-section" text="Perguntas Frequentes" />
          </Navbar.Links>

          <Navbar.Actions>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button size="lg" asChild>
              <Link to="/register">Criar Conta</Link>
            </Button>
          </Navbar.Actions>
        </Navbar>
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default PublicLayout
