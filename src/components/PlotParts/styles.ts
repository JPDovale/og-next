import { styled } from '@og-ui/react'

export const PlotPartsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  // padding: '$6',
  // background: '$gray900',
  gap: '$4',
  // overflowX: 'scroll',
  // boxShadow: '$onActive',
  borderRadius: '$sm',

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr ',
  },

  variants: {
    isPreview: {
      false: {
        display: 'grid',
        gap: '$8',
        padding: '$6',
        gridTemplateColumns: '1fr 1fr',

        borderRadius: '0',
        background: '$gray400',
        boxShadow: 'none',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr ',
          overflowX: 'hidden',
        },
      },
    },
  },
})
