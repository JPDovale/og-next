import { Text, styled } from '@og-ui/react'

export const AvataresContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
  gap: '$4',
  width: '100%',
  marginTop: '$4',

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr ',
  },

  variants: {
    isEmpty: {
      true: {
        display: 'flex',
      },
      false: {},
    },

    columns: {
      5: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr ',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr ',
        },
      },
      7: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr ',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr ',
        },
      },

      12: {
        gridTemplateColumns: 'repeat(12, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr ',
        },
      },

      15: {
        gridTemplateColumns: 'repeat(15, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr ',
        },
      },

      18: {
        gridTemplateColumns: 'repeat(15, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: '1fr 1fr 1fr ',
        },
      },
    },
  },
})

export const PersonAvatar = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$2',
  transition: 'ease-in-out 250ms',

  button: {
    padding: '$1',
    boxShadow: 'none',
    background: '$purple400',
    borderRadius: '$md',
  },

  variants: {
    isClickable: {
      true: {
        cursor: 'pointer',
        borderRadius: '$md',

        '&:hover': {
          scale: 1.1,
          boxShadow: '$default',
        },
      },
    },
  },
})

export const Header = styled(Text, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  p: {
    color: '$base800',
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },
})

export const Buttons = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  width: '100%',
  paddingBottom: '$4',
})

export const ListEmpty = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$base800',
})
