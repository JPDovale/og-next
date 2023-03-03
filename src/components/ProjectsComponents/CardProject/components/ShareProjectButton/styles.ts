import { styled } from '@styles/index'
import { ButtonRoot } from '@components/usefull/Button'

export const ShareButton = styled(ButtonRoot, {
  position: 'absolute',
  padding: '$2 ',
  alignSelf: 'center',
  right: 12,
  top: 12,

  variants: {
    isList: {
      true: {
        padding: '$3',
        margin: 0,
        position: 'absolute',

        top: '50%',
        transform: 'translateY(-50%)',

        '@media screen and (max-width: 768px)': {
          padding: '$2',
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    isList: false,
  },
})
