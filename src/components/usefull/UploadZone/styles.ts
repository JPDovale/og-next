import { styled } from '@styles/index'

export const DropContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  padding: '$4',
  minHeight: '180px',

  borderRadius: '$sm',
  border: '1px dashed $purple400',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  variants: {
    isDragActive: {
      true: {
        borderColor: '$successDefault',
      },
      false: {},
    },
    isDragReject: {
      true: {
        borderColor: '$errorDefault',
      },
      false: {},
    },
  },
})
