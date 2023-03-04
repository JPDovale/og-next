import { styled } from '@styles/index'

export const ShareForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$8',
  gap: '$5',

  background: '$gray900',
  borderRadius: '0 0 $md $md',
  overflowY: 'auto',
  height: '100%',

  button: {
    alignSelf: 'center',
  },
})
