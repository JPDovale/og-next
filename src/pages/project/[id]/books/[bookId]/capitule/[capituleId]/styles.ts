import { styled } from '@og-ui/react'

export const CapituleContainer = styled('div', {
  position: 'relative',
  padding: '$4',
  paddingTop: 0,
  marginTop: 0,

  '@media screen and (max-width: 768px)': {
    marginTop: '$10',
  },
})

export const CapituleInfos = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',

  background: '$gray900',
  borderRadius: '$sm',

  variants: {
    onDeleteSelected: {
      true: {
        '@media screen and (max-width: 768px)': {
          position: 'fixed',
          justifyContent: 'center',
          alignItems: 'center',

          top: 0,
          bottom: 0,
          left: 0,
          right: 0,

          zIndex: 1,
        },
      },
      false: {},
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

export const DeleteContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  minHeight: 560,
  padding: '$10',

  p: {
    textAlign: 'center',
  },

  '.buttons': {
    display: 'flex',
    flexDirection: 'row',
    gap: '$4',

    width: '100%',
    padding: '$4',

    '@media screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
})

export const HeaderButton = styled('button', {
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: 24,
  height: 24,

  lineHeight: 0,

  background: '$gray700',
  borderRadius: '$xs',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:focus': {
    boxShadow: '$inFocus',
  },

  variants: {
    toDelete: {
      true: {
        background: '#ff2030',
      },
      false: {},
    },
  },
})
