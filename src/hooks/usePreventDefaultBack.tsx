import { Button, styled } from '@og-ui/react'
import { useRouter } from 'next/router'
import { CaretCircleDoubleLeft } from 'phosphor-react'
import { useEffect } from 'react'

interface IGoBackButtonProps {
  topDistance?: 0 | 1 | 2 | 3 | 4
}

export function usePreventBack(path?: string) {
  const router = useRouter()
  const GoBackButton = ({ topDistance = 1 }: IGoBackButtonProps) => (
    <GoBackButtonContainer
      topDistance={topDistance}
      type="button"
      wid="hug"
      icon={<CaretCircleDoubleLeft weight="bold" />}
      onClick={() => router.push(path!)}
    />
  )

  useEffect(() => {
    const handleClick = (event: PopStateEvent) => {
      event.preventDefault()

      if (path) router.push(path)
    }
    window.addEventListener('popstate', handleClick)
    return () => {
      window.removeEventListener('popstate', handleClick)
    }
  }, [path, router])

  return { GoBackButton }
}

const GoBackButtonContainer = styled(Button, {
  position: 'absolute',
  right: '$4',
  top: 0,

  padding: '$2',

  svg: {
    width: 20,
    height: 20,
  },

  variants: {
    topDistance: {
      0: {},
      1: {
        top: '$1',
      },
      2: {
        top: '$2',
      },
      3: {
        top: '$3',
      },
      4: {
        top: '$4',
      },
    },
  },
})
