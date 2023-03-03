import { Box } from '@components/usefull/Box'
import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'

export const CardProjectContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: 0,

  overflow: 'hidden',
  transition: 'ease-in-out 250ms',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  color: '$base100',

  '.project-image': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    minHeight: '200px',
    maxHeight: '200px',

    borderTopLeftRadius: '$sm',
    borderTopRightRadius: '$sm',
    background: '$gray500',
    overflow: 'hidden',

    img: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
    },
  },

  '&:hover': {
    scale: '102%',
  },

  '&:focus': {
    boxShadow: '$inFocus',
  },

  '&:active': {
    scale: '99%',
  },

  variants: {
    isList: {
      true: {
        textAlign: 'center',

        background: '$gray600',

        '&:hover': {
          scale: '102%',
        },

        '&:focus': {
          boxShadow: '$inFocus',
        },
      },

      example: {
        textAlign: 'center',

        background: '$blue900',
        cursor: 'default',

        '&:hover': {
          scale: '100%',
        },

        '&:active': {
          boxShadow: '$default',
        },
      },

      false: {},
    },
  },

  defaultVariants: {
    isList: false,
  },
})

export const Preview = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  boxShadow: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
})

export const ProjectInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
  width: '100%',

  textAlign: 'start',

  background: '$gray600',

  span: {
    color: '$base800',
  },

  p: {
    display: 'flex',
    flexDirection: 'column',
  },

  variants: {
    isList: {
      true: {
        display: 'grid',
        gridTemplateColumns: '10fr 8fr 1fr',
        gap: '$4',

        p: {
          flexDirection: 'row',
          alignItems: 'center',
          textAlign: 'start',

          gap: '$4',
        },

        '@media screen and (max-width: 768px)': {
          p: {
            fontSize: '$xxs',
            textAlign: 'start',
          },
        },
      },

      example: {
        padding: '$3 $8',

        display: 'grid',
        gridTemplateColumns: '10fr 8fr 1fr',

        textAlign: 'start',

        '@media screen and (max-width: 768px)': {
          p: {
            fontSize: '$xxs',
            textAlign: 'start',
          },
        },
      },

      false: {},
    },
  },

  defaultVariants: {
    isList: false,
  },
})

export const SharePopUpContainer = styled('div', {
  zIndex: 4,
  position: 'fixed',

  top: 0,
  left: 0,
  width: '100%',
  height: '100%',

  background: '#000000be',
})

export const SharePopUp = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  background: '$gray800',
  gap: '$5',

  top: '50%',
  left: '50%',
  width: '75%',
  height: '75%',

  transform: 'translate(-50%, -50%)',
  borderRadius: '$md',
  boxShadow: '$default',

  '@media screen and (max-width: 768px)': {
    width: '90%',
    height: '90%',
  },

  '.close': {
    position: 'absolute',

    right: '$8',
    top: '$4',

    lineHeight: 0,

    border: 0,
    outline: 0,
    borderRadius: '$full',
    background: 'transparent',
    cursor: 'pointer',
    color: '$base100',

    scale: '80%',

    '&:focus': {
      boxShadow: '$inFocus',
    },
    '&:active': {
      scale: '75%',
    },
  },
})

export const HeaderShareForm = styled(Text, {
  display: 'flex',
  gap: '$5',
  padding: '$6',
  paddingBottom: '$1',
})

export const ShareForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$8',
  gap: '$5',

  background: '$gray900',
  overflowY: 'scroll',
  height: '100%',

  button: {
    alignSelf: 'center',
  },
})

export const InfosContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '3fr 2fr',
  gap: '$2',

  variants: {
    columns: {
      3: {
        gridTemplateColumns: '3fr 3fr 4fr',
      },
    },
    isList: {
      true: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '$6',
        p: {
          width: '100%',
        },
      },
      false: {},
      example: {},
    },
  },
})

export const UsersWhitAccess = styled('div', {
  display: 'flex',
})

export const UserImage = styled('div', {
  marginLeft: '-$4',

  variants: {
    first: {
      true: {
        marginLeft: '0',
      },
      false: {},
    },
  },
})

export const SuccessContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$8',
  gap: '$5',

  background: '$gray900',
  overflowY: 'scroll',
  height: '100%',
})
