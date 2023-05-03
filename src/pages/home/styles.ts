import { styled } from '@styles/index'

export const HomePageContainer = styled('main', {
  position: 'relative',
  background: '$gray900',
})

export const HomeContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '100%',

  paddingTop: '$40',
  paddingBottom: '$40',
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

  background: '$gray500',
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
    width: '380px',
    height: '380px',
  },

  '@media screen and (max-width: 768px)': {
    width: '90%',
  },
})
