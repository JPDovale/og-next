import { styled } from '@styles/index'
export const NotifyContainer = styled('main', {
  width: '100%',
  height: '100vh',
  background: '$gray700',
})

export const NotifyForm = styled('form', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '$8',
  width: '75%',
  height: '75%',

  background: '$gray900',
  borderRadius: '$md',
  boxShadow: '$default',
  overflowY: 'auto',

  button: {
    padding: '$3',
    boxShadow: 'none',
  },
})
