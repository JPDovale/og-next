import { styled } from '@styles/index'

export const ProjectContainer = styled('div', {
  height: '100%',
  paddingBottom: '$40',

  overflowY: 'auto',

  variants: {
    isScrolling: {
      false: {
        overflowY: 'hidden',

        '@media screen and (max-width: 768px)': {
          overflowY: 'auto',
        },
      },
      true: {
        overflowY: 'auto',

        '@media screen and (max-width: 768px)': {
          overflowY: 'auto',
        },
      },
    },
    isFullScreen: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        flexGrow: 1,

        padding: 0,
        overflow: 'hidden',
      },
    },
  },
})

export const ProjectPageLayoutContainer = styled('main', {
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
  float: 'right',
  width: '95%',
  height: '100vh',
  maxHeight: '100vh',
  flexShrink: 0,

  backgroundColor: '$gray800',

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },
})
