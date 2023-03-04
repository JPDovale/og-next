import { styled } from '@styles/index'
import { ReactNode } from 'react'

interface IContainerGrid {
  columns?: 1 | 2 | 3 | 4
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  children?: ReactNode
  darkBackground?: boolean
  alignCenter?: boolean
  isRelativePosition?: boolean
}

export function ContainerGrid({
  columns = 1,
  padding = 2,
  children,
  darkBackground = false,
  alignCenter = false,
  isRelativePosition = false,
}: IContainerGrid) {
  return (
    <ContainerGridContainer
      columns={columns}
      darkBackground={darkBackground}
      padding={padding}
      alignCenter={alignCenter}
      isRelativePosition={isRelativePosition}
    >
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
    alignCenter: {
      true: {
        gridTemplateColumns: '1fr',
        justifyContent: 'center',
      },
      false: {},
    },
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

    padding: {
      0: {
        padding: 0,
      },
      1: {
        padding: '$1',
      },
      2: {
        padding: '$2',
      },
      3: {
        padding: '$3',
      },
      4: {
        padding: '$4',
      },
      5: {
        padding: '$5',
      },
      6: {
        padding: '$6',
      },
      7: {
        padding: '$7',
      },
      8: {
        padding: '$8',
      },
      9: {
        padding: '$9',
      },
      10: {
        padding: '$10',
      },
    },

    isRelativePosition: {
      true: {
        position: 'relative',
      },
      false: {},
    },
  },
})
