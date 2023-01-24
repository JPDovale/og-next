import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function usePreventBack(path?: string) {
  const router = useRouter()

  useEffect(() => {
    const handleClick = (event: PopStateEvent) => {
      event.preventDefault()

      if (path) router.push(path)
    }
    window.addEventListener('popstate', handleClick)
    return () => {
      window.removeEventListener('popstate', handleClick)
    }
  }, [])
}
