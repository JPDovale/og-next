import { styled } from '@styles/index'
export const DashboardPageLayoutContainer = styled('main', {
  float: 'right',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',

  height: '100vh',

  background: '$gray800',
  boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.5)',
  transition: 'ease-in-out 250ms',
  overflowY: 'auto',

  variants: {
    NavIsOpen: {
      true: {
        width: '74%',
        '@media screen and (max-width: 768px)': {
          width: '100%',
        },
      },
      false: {
        width: '100%',
      },
    },
  },

  defaultVariants: {
    NavIsOpen: true,
  },
})
