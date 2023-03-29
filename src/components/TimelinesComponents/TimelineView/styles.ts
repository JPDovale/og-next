import { styled } from '@styles/index'

export const TimelineViewContainer = styled('div', {
  zIndex: 2,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  bottom: 0,
  width: '100%',
  height: '10rem',

  background: '$gray600',
  boxShadow: '-3px -1px 5px black',
  transition: 'ease-in-out 250ms',

  variants: {
    isOpen: {
      false: {
        transform: 'translateY(100%)',
      },
    },
  },
})

export const ButtonColapse = styled('button', {
  all: 'unset',
  zIndex: -1,
  position: 'absolute',

  padding: '$2',
  left: '$4',
  top: '-$8',

  lineHeight: 0,

  background: '$gray600',
  boxShadow: '-3px -1px 3px black',
  cursor: 'pointer',
  borderRadius: '$xs $xs 0 0',
})
