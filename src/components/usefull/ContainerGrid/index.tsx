import { styled } from '@og-ui/react'
import { ReactNode } from 'react'

interface IContainerGrid {
  columns?: 1 | 2 | 3 | 4
  children?: ReactNode
  darkBackground?: boolean
}

export function ContainerGrid({
  columns = 1,
  children,
  darkBackground = false,
}: IContainerGrid) {
  return (
    <ContainerGridContainer columns={columns} darkBackground={darkBackground}>
      {children}
    </ContainerGridContainer>
  )
}

const ContainerGridContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '100%',

  gap: '$4',

  variants: {
    columns: {
      1: {
        gridTemplateColumns: '1fr',
      },
      2: {
        gridTemplateColumns: '1fr 1fr',
      },
      3: {
        gridTemplateColumns: '1fr 1fr 1fr',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr',
        },
      },
      4: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr',
        },
      },
    },
    darkBackground: {
      true: {
        background: '$gray900',
        padding: '$6 $4',
        borderRadius: '$md',
      },
      false: {},
    },
  },
})
