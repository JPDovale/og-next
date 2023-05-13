import { styled } from '@styles/index'

export const ProSuccessPageContainer = styled('main', {
  position: 'relative',

  width: '100vw',
  height: '100vh',

  background: '$gray900',
})

export const CongratsContainer = styled('div', {
  position: 'absolute',

  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  display: 'flex',
  flexDirection: 'column',
  padding: '$8',
  alignItems: 'center',
  marginTop: '$6',
  height: '75%',
  width: '75%',

  background: '$gray800',
  borderRadius: '$lg',
  boxShadow: '$default',
  overflowY: 'auto',
})
