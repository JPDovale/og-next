import { Box } from '@components/usefull/Box'
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
  height: '100%',
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
  height: '100%',

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
