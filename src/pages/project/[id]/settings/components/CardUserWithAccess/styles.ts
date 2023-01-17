import { Button, styled } from '@og-ui/react'

export const CardUserWithAccessContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',

  width: '100%',

  background: '$gray800',
  borderRadius: '$md',

  p: {
    marginTop: '-$4',
  },

  label: {
    marginBottom: '$3',
  },

  '.unshare': {
    boxShadow: 'none',
    padding: '$2',
  },
})

export const UnshareButton = styled(Button, {
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
