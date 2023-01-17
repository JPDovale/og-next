import { styled } from '@og-ui/react'

export const PlotPageContainer = styled('main', {
  zIndex: 1,
  float: 'right',
  width: '92%',
  height: '100vh',

  backgroundColor: '$gray800',
  overflowY: 'scroll',

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },
})
