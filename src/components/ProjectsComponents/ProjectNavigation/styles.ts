import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'

export const ProjectNavigationContainer = styled('nav', {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '5%',
  height: '100vh',
  background: '$gray900',
  transition: 'ease-in-out 250ms',
  zIndex: 3,

  '.close': {
    position: 'absolute',

    right: '$4',
    top: '$4',

    lineHeight: 0,

    border: 0,
    outline: 0,
    borderRadius: '$full',
    background: 'transparent',
    cursor: 'pointer',
    color: '$text800',

    scale: '80%',

    '&:focus': {
      boxShadow: '$inFocus',
    },
    '&:active': {
      scale: '75%',
    },
  },

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },

  variants: {
    isOpen: {
      true: {
        width: '100%',

        '@media screen and (max-width: 768px)': {
          left: '0',
        },
      },
      false: {
        '@media screen and (max-width: 768px)': {
          left: '-100%',
        },
      },
    },
  },
})

export const Logo = styled('div', {
  '.logo': {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    maxHeight: '50px',
    marginTop: '$4',
  },

  variants: {
    darkMode: {
      false: {
        // filter: 'invert(1)',
      },
      true: {},
    },
  },

  defaultVariants: {
    darkMode: false,
  },
})

export const OptionsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',

  scrollbarWidth: 'thin',
  scrollbarColor: '#00000000 #00000000',

  '&::-webkit-scrollbar': {
    width: 2,
    height: 2,
  },

  '&::-webkit-scrollbar-track': {
    background: '#00000000',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$purple800',
    border: '1px solid #ffffff20',
    borderRadius: '$full',
  },
})

export const Options = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  gap: '$3',
  paddingBottom: '$8',
  padding: '$4',

  variants: {
    isOpen: {
      true: {
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        alignItems: 'flex-end',

        '@media screen and (max-width: 768px)': {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '$8',
        },
      },
      false: {},
    },
  },
})

export const Label = styled(Text, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  alignItems: 'center',
  gap: '$2',
})

export const DeletePopUp = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 3,
  padding: '$4',

  width: '100%',
  height: '100%',

  background: '#000000de',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',
    button: {
      padding: '$3',
    },
  },
})
