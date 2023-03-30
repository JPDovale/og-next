import { styled } from '@styles/index'

export const TimelineViewContainer = styled('div', {
  zIndex: 2,
  position: 'fixed',
  display: 'flex',
  gap: '$1',

  bottom: 0,
  width: '92%',
  maxWidth: '92%',
  height: '12rem',

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

export const DatesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$4',
  overflowX: 'auto',

  width: '100%',
  maxWidth: '100%',
  height: '100%',
})

export const Date = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',

  minWidth: '240px',
  height: '90%',
  padding: '$2',

  background: '$gray900',
  borderRadius: '$lg',
})

export const Conector = styled('div', {
  padding: '2px $6',
  background: '$purple400',
})
