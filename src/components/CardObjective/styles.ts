import { styled } from '@og-ui/react'

export const CardObjectiveContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  position: 'relative',

  background: '$gray900',
  borderRadius: '$md',
  boxShadow: '$onActive',

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',
  },
})

export const ObjectiveInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
})

export const ItemInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  label: {
    color: '$base800',
  },

  variants: {
    isViewPerson: {
      true: {
        alignItems: 'center',
        gap: '$2',

        cursor: 'pointer',
        transition: 'all ease-in-out 250ms',

        '&:hover': {
          scale: '110%',
        },
      },
      false: {},
    },
  },
})

export const AvoiderContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
  width: '100%',

  '@media screen and (max-width: 768px)': {
    borderTop: '$base900 1px solid',
  },
})

export const Avoiders = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '$4',

  variants: {
    isEmpty: {
      true: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      false: {},
    },
  },
})

export const SupportingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
  width: '100%',

  '@media screen and (max-width: 768px)': {
    borderTop: '$base900 1px solid',
  },
})

export const Supporters = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '$4',

  variants: {
    isEmpty: {
      true: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      false: {},
    },
  },
})

export const EditButton = styled('button', {
  position: 'absolute',

  right: '0',
  padding: '$2',

  background: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: 'all ease-in-out 250ms',

  '&:hover': {
    rotate: '360deg',
  },
})
