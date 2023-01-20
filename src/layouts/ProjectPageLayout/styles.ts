import { styled } from '@og-ui/react'

export const ProjectContainer = styled('div', {
  height: '100%',
  paddingBottom: '$40',

  overflowY: 'scroll',

  variants: {
    isScrolling: {
      false: {
        overflowY: 'hidden',

        '@media screen and (max-width: 768px)': {
          overflowY: 'scroll',
        },
      },
      true: {
        overflowY: 'scroll',

        '@media screen and (max-width: 768px)': {
          overflowY: 'scroll',
        },
      },
    },
    isFullScreen: {
      true: {
        padding: 0,
        overflow: 'hidden',
      },
    },
  },
})

export const ProjectPageLayoutContainer = styled('main', {
  zIndex: 1,
  float: 'right',
  width: '92%',
  height: '100vh',
  paddingBottom: '$8',

  backgroundColor: '$gray800',
  overflow: 'hidden',

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },
})
