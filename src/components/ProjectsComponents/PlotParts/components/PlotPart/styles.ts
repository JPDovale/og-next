import { Box } from '@components/usefull/Box'
import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'

export const PlotPartContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  background: '$base500',
  gap: '$4',
  padding: '0',

  width: '100%',
  maxHeight: 400,
  minHeight: 300,

  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'ease-in 250ms',
  boxShadow: 'none',

  header: {
    padding: '$2 $4',
    borderBottom: '1px solid $base900',
    width: '100%',
    textAlign: 'start',
    color: '$black',
    fontWeight: 'bold',
  },

  '@media screen and (max-width: 768px)': {
    minWidth: 'unset',
    maxHeight: 400,
    minHeight: 'unset',

    header: {
      fontSize: '18px',
    },
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        boxShadow: '$onActive',

        '&:hover': {
          boxShadow: '$onActive',
        },
      },
      false: {
        '&:hover': {
          boxShadow: '$none',
        },

        '&:focus  ': {
          boxShadow: '$inFocus',
        },
      },
    },

    isPreview: {
      false: {
        width: '100%',
        maxHeight: 'none',
        minHeight: 280,
        padding: 0,

        background: '$base500',
        borderRadius: '$sm',
        boxShadow: 'none',

        '&:hover': {
          boxShadow: '$default',
        },

        '&:focus  ': {
          boxShadow: '$inFocus',
        },

        header: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '$3 $4',
          fontWeight: '$regular',

          button: {
            padding: '$2',
          },
        },

        '@media screen and (max-width: 768px)': {
          width: '100%',
          minWidth: '0',
        },
      },
    },
  },
})

export const Content = styled(Text, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
})

export const ElementContent = styled('div', {
  color: '$black',
  display: 'inline',
  padding: '0 $4',

  p: {
    display: 'block',
  },
})
