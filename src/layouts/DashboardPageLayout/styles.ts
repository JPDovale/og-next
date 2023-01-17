import { styled } from '@og-ui/react'

export const DashboardPageLayoutContainer = styled('main', {
  float: 'right',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',

  height: '100vh',

  background: '$gray800',
  borderTopLeftRadius: '48px',
  boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.5)',
  transition: 'all 500ms',
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
