import { Box, styled } from '@og-ui/react'

export const ModelCardContainer = styled(Box, {
  background: '$purple300',
  padding: '$8',
  width: '100%',
  justifyContent: 'center',

  border: 0,
  outline: 0,
  color: '$base100',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    scale: '105%',
  },

  '&:focus': {
    boxShadow: '$inFocus',
  },

  '&:active': {
    scale: '95%',
    boxShadow: '$onActive',
  },
})
