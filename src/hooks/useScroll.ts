import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScroll() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')

      window.requestAnimationFrame(() => {
        const element = document.getElementById(id)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element?.scrollIntoView
        return
      })
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0 })
    })
  }, [hash, key])
}
