import { styled } from '@og-ui/react'

export const HomePageContainer = styled('main', {
  position: 'relative',
})

export const HomeContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '100%',

  marginTop: 120,
  paddingBottom: 120,
})

export const SideInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
  gap: '$12',

  width: '500px',
  minHeight: '1000px',
  paddingBottom: 180,

  background: '$purple800',
  borderRadius: '$full',
  boxShadow: '$inFocus',

  h2: {
    marginTop: 180,
    textAlign: 'center',
    width: '75%',
  },

  p: {
    marginTop: 180,
    textAlign: 'center',
    width: '75%',
  },

  img: {
    zIndex: 0,
    width: '80px',
    scale: '250%',
  },

  '@media screen and (max-width: 768px)': {
    width: '90%',
  },
})
