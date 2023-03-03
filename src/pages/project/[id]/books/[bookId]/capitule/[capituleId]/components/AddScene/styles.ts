import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'
export const AddSceneContainer = styled('form', {
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
})

export const AvataresContainerHeader = styled(Text, {
  display: 'flex',
  justifyContent: 'space-between',

  width: '100%',
  padding: '$3',

  color: '$base800',

  span: {
    color: '$errorDefault',
  },
})

export const CloseButton = styled('button', {
  all: 'unset',
  lineHeight: 0,

  position: 'absolute',
  right: '$4',
  cursor: 'pointer',
})
