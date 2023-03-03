import { ButtonRoot } from '@components/usefull/Button'
import { styled } from '@styles/index'
export const NewCapituleContainer = styled('div', {
  padding: '$4',
  height: '90%',
})

export const NewCapituleForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',
  position: 'relative',

  padding: '$4',
  height: '100%',

  background: '$gray900',
  borderRadius: '$sm',
  overflowY: 'auto',
})

export const InputGroup = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$4',

  width: '100%',

  variants: {
    columns: {
      1: {},
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
})

export const InputContainer = styled('label', {
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

export const AddButton = styled(ButtonRoot, {
  padding: '$2 $20',
  margin: 'auto',
  marginTop: '$4',
})
