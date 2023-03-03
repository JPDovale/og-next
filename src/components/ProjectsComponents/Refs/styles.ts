import { Text } from '@components/usefull/Text'
import { keyframes, styled } from '@styles/index'

const animation = keyframes({
  '0%': {
    scale: '90%',
  },
  '50%': {
    scale: '130%',
  },
  '100%': {
    scale: '90%',
  },
})

export const RefsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr ',
  gap: '$2',
  width: '100%',
})

export const Header = styled(Text, {
  display: 'flex',
  flexDirection: 'column',

  p: {
    color: '$base800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$2',
  },

  button: {
    background: 'none',
    border: 'none',
    outline: 'none',
    lineHeight: 0,
    color: '$base800',
    cursor: 'pointer',
    animation: `${animation} ease-in-out 1.5s infinite`,
    transition: 'all ease-in-out 250ms',

    '&:focus': {
      color: '$purple200',
    },
  },

  variants: {
    refsVisible: {
      true: {
        button: {
          animation: 'none',
          rotate: '180deg',
        },
      },
      false: {},
    },
  },
})

export const RefCard = styled('button', {
  display: 'flex',
  flexDirection: 'column',

  padding: '$4',
  width: '100%',

  border: 'none',
  outline: 'none',
  background: '$gray900',
  color: '$white',
  cursor: 'pointer',
  borderRadius: '$sm',

  span: {
    width: '100%',
    textAlign: 'start',
    marginBottom: '$3',
  },
})
