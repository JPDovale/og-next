import { ButtonRoot } from '@components/usefull/Button'
import { styled } from '@styles/index'

export const CardUserWithAccessContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  padding: '$4',

  width: '100%',

  background: '$gray800',
  borderRadius: '$md',

  p: {
    marginTop: '-$4',
  },

  span: {
    marginBottom: '$3',
  },

  '.unshare': {
    boxShadow: 'none',
    padding: '$2',
  },
})

export const UnshareButton = styled(ButtonRoot, {
  position: 'absolute',

  left: '$1',
  top: '$1',

  // svg: {
  //   width: 20,
  //   height: 20,
  // },
})

export const UnshareConfirm = styled('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  width: '100%',
  padding: '$3',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})
