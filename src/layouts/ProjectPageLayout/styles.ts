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
    isTimelineInWindow: {
      true: {
        paddingBottom: '280px',
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
  width: '95%',
  height: '100vh',

  backgroundColor: '$gray800',
  overflow: 'hidden',

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },
})
