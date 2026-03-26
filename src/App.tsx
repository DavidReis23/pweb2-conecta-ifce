import Navbar from './shared/components/navbar'
import Footer from './shared/components/footer'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useScroll from './shared/hooks/useScroll'

function App() {
  useScroll()

  return (
    <>
      <div className="flex flex-col min-h-svh">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
