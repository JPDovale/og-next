import { CSS } from '@stitches/react'
import { styled } from '@styles/index'
import { ComponentProps, ReactNode } from 'react'

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
      5: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr',
        },
      },
      6: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr',
        },
      },
      7: {
        gridTemplateColumns: 'repeat(7, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr',
        },
      },
      8: {
        gridTemplateColumns: 'repeat(8, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
      },
      9: {
        gridTemplateColumns: 'repeat(9, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
      },
      10: {
        gridTemplateColumns: 'repeat(10, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
      },
      11: {
        gridTemplateColumns: 'repeat(11, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
      },
      12: {
        gridTemplateColumns: 'repeat(12, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
      },
      13: {
        gridTemplateColumns: 'repeat(13, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        },
      },
    },
    darkBackground: {
      true: {
        background: '$gray900',
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

interface IContainerGrid extends ComponentProps<typeof ContainerGridContainer> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  children?: ReactNode
  darkBackground?: boolean
  alignCenter?: boolean
  isRelativePosition?: boolean
  css?: CSS
}

export function ContainerGrid({
  columns = 1,
  padding = 2,
  children,
  darkBackground = false,
  alignCenter = false,
  isRelativePosition = false,
  css,
  ...rest
}: IContainerGrid) {
  return (
    <ContainerGridContainer
      css={css}
      columns={columns}
      darkBackground={darkBackground}
      padding={padding}
      alignCenter={alignCenter}
      isRelativePosition={isRelativePosition}
      {...rest}
    >
      {children}
    </ContainerGridContainer>
  )
}
