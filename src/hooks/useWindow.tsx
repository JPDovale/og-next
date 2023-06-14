import { useEffect, useState } from 'react'

interface IWindowSize {
  width: undefined | number
  height: undefined | number
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const smallWindow = windowSize.width! < 786
  const largeWindow = windowSize.width! > 1700

  return { windowSize, smallWindow, largeWindow }
}
