import { styled } from '@styles/index'
export const DashboardPageLayoutContainer = styled('main', {
  float: 'right',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  paddingBottom: '$40',

  height: '100vh',

  background: '$gray800',
  boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.5)',
  transition: 'ease-in-out 250ms',
  overflowY: 'auto',

  variants: {
    disableAccessibilityBottom: {
      true: {
        paddingBottom: 0,
      },
      false: {
        paddingBottom: '$40',
      },
    },
    disableScroll: {
      true: {
        overflowY: 'hidden',
      },
      false: {},
    },
    NavIsOpen: {
      true: {
        width: '82%',
        '@media screen and (max-width: 768px)': {
          width: '100%',
        },
      },
      false: {
        width: '95%',
        '@media screen and (max-width: 768px)': {
          width: '100%',
        },
      },
    },
  },

  defaultVariants: {
    NavIsOpen: true,
  },
})
