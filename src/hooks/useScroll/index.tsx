import { useEffect, useRef, useState } from 'react'

type IScrollRef = {
  scrollTop: number
}

export function useScroll<T extends IScrollRef>() {
  const [scroll, setScroll] = useState(0)
  const scrollRef = useRef<T>(null)

  function setScrollHeight(scrollHeight: number) {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollHeight
  }

  function handleScroll() {
    if (scrollRef.current) {
      const currentScrollHeight = scrollRef.current.scrollTop

      setScroll(currentScrollHeight)
      setScrollHeight(currentScrollHeight)
    }
  }

  function returnToLastIndex() {
    if (scrollRef.current) {
      const lastHeight = Number(localStorage.getItem('@og:scroll'))
      scrollRef.current.scrollTop = lastHeight
    }
  }

  useEffect(() => {
    if (scroll > 0) {
      localStorage.setItem('@og:scroll', `${scroll}`)
    }
  }, [scroll])

  useEffect(() => {
    returnToLastIndex()
  }, [])

  return { scrollRef, handleScroll }
}
