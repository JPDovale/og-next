import { Box } from '@components/usefull/Box'
import { styled } from '@styles/index'

export const PlotPartContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  background: '$base600',
  gap: '$4',
  padding: '$4',

  width: '100%',
  maxHeight: 400,
  minHeight: 300,

  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'ease-in 250ms',
  boxShadow: '$onActive',

  header: {
    borderBottom: '1px solid $base900',
    width: '100%',
    textAlign: 'start',
    color: '$black',
    fontWeight: 'bold',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },

  p: {
    textAlign: 'justify',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    color: '$black',

    span: {
      textAlign: 'center',
      fontSize: '12px',
      color: '$black',
      marginTop: '8px',
    },
  },

  '@media screen and (max-width: 768px)': {
    minWidth: 'unset',
    maxHeight: 400,
    minHeight: 'unset',

    header: {
      fontSize: '18px',
    },

    p: {
      fontSize: '16px',
      span: {
        fontSize: '10px',
      },
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
          boxShadow: '$inFocus',
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
        minHeight: 580,
        padding: 0,

        background: '$gray900',
        borderRadius: '$sm',
        boxShadow: '$default',

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
          color: '$white',
          fontWeight: '$regular',

          button: {
            padding: '$2',
          },
        },

        p: {
          padding: '$2 $4',
          marginTop: '-1rem',
          color: '$white',
        },

        '@media screen and (max-width: 768px)': {
          width: '100%',
          minWidth: '0',
        },
      },

      true: {
        div: { alignItems: 'center' },
      },
    },
  },
})

export const Comments = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',

  header: {
    borderTop: '1px solid $base900',
  },
})
