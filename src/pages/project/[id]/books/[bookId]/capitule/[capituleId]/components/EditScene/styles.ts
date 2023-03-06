import { styled } from '@styles/index'
export const EditSceneContainer = styled('form', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',

  background: '$gray900',
  borderRadius: '$sm',
})

export const AvataresContainer = styled('div', {
  width: '100%',

  p: {
    display: 'flex',
    justifyContent: 'space-between',

    width: '100%',

    color: '$base800',

    span: {
      color: '$errorDefault',
    },
  },

  div: {
    padding: '$3',
  },
})

export const CloseButton = styled('button', {
  all: 'unset',
  lineHeight: 0,

  position: 'absolute',
  right: '$4',
  cursor: 'pointer',
})
