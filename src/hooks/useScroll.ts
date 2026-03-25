import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScroll() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')

      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [hash, pathname])
}
