import { styled } from '@styles/index'

export const PlotPartsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '$4',

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
        gridTemplateColumns: '1fr ',

        borderRadius: '0',
        background: '$gray400',
        boxShadow: 'none',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr ',
          overflowX: 'hidden',
        },
      },
    },
    columns: {
      undefined: {},
      2: {
        gridTemplateColumns: '1fr 1fr',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr ',
        },
      },
      3: {
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '$4',
        padding: '$4',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr ',
        },
      },
      4: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr ',
        },
      },
    },
  },
})
