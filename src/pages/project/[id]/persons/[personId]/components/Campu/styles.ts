import { Heading } from '@components/usefull/Heading'
import { styled } from '@styles/index'

export const CampuContainer = styled('div', {
  padding: '$4',
})

export const HeadingCampu = styled(Heading, {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  marginBottom: '$5',
  cursor: 'pointer',

  svg: {
    background: '$blue600',
    padding: '$2',
    boxShadow: '$default',
    borderRadius: '$xs',
  },
})

export const CampuContent = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '$6',

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr ',
  },

  variants: {
    isEmpty: {
      true: {
        display: 'flex',
      },
      false: {},
    },
    columns: {
      1: {
        gridTemplateColumns: '1fr',
      },
      2: {
        gridTemplateColumns: '1fr 1fr',
        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr ',
        },
      },
      3: {},
      4: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr ',
        },
      },
    },
  },
})
