import { styled } from '@styles/index'
export const HeaderImageAndInfosContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',

  borderBottom: '1px solid $gray400',
  minHeight: '420px',
  height: '420px',
  maxHeight: '420px',

  '.image': {
    display: 'flex',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    minHeight: '320px',
    maxHeight: '420px',

    background: '$gray800',
    overflow: 'hidden',
    objectFit: 'cover',
    cursor: 'pointer',
  },

  '@media screen and (max-width: 768px)': {
    display: 'grid',
    gridTemplateColumns: '1fr',
    maxHeight: 'unset',
    height: 'unset',
    minHeight: 'unset',

    '.image': {
      width: '100%',
      maxWidth: '100%',
      minHeight: '480px',
      height: '100%',
    },
  },

  variants: {
    typeImage: {
      square: {},
      vertical: {
        minHeight: '480px',
        height: '480px',
        maxHeight: '480px',

        '.image': {
          width: '25%',
          minHeight: '100%',
        },

        '@media screen and (max-width: 768px)': {
          width: '100%',
          marginTop: '$4',
          height: 'unset',
          maxHeight: 'unset',

          '.image': {
            width: '100%',
            minHeight: '480px',
          },
        },
      },
      horizontal: {},
    },
  },
})

export const EditImgForm = styled('form', {
  display: 'flex',
  gap: '$10',
  zIndex: 3,
  visibility: 'hidden',
  justifyContent: 'space-between',
  width: '30%',
  marginLeft: '-40%',
  marginTop: '-20%',
  transition: 'ease-in-out 250ms',

  '@media screen and (max-width: 768px)': {
    marginTop: '-60px',
    width: '95%',
    marginLeft: '0',
  },

  variants: {
    visible: {
      true: {
        visibility: 'visible',

        '@media screen and (max-width: 768px)': {
          marginTop: '$5',
        },
      },
    },
    typeImage: {
      square: {},
      vertical: {
        width: '20%',
        marginLeft: '-27%',

        '@media screen and (max-width: 768px)': {
          width: '95%',
          marginLeft: '0',
          marginBottom: '$4',
        },
      },
      horizontal: {},
    },
  },
})

export const Input = styled('label', {
  display: 'flex',
  justifyContent: 'center',
  padding: '$4',
  borderRadius: '$sm',
  width: '50%',
  fontSize: '$sm',
  fontFamily: 'sans-serif',
  boxShadow: '$default',
  gap: '$2',

  background: '$purple600',

  input: {
    position: 'absolute',
    visibility: 'hidden',
  },
})

export const InfosContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  gap: '$4',
  padding: '$4',
  maxHeight: '420px',

  zIndex: 1,
  height: '100%',

  background: '$gray900',

  '@media screen and (max-width: 768px)': {
    width: '100%',
    maxHeight: 'unset',
    minHeight: '100%',
  },

  '.goBack': {
    zIndex: 2,
    padding: '$2',
    position: 'absolute',

    top: '$2',
    right: '$2',

    svg: {
      width: 20,
      height: 20,
    },
  },

  variants: {
    typeImage: {
      square: {},
      vertical: {
        width: '75%',
        minHeight: '100%',

        '@media screen and (max-width: 768px)': {
          width: '100%',
          minHeight: 'unset',
        },
      },
      horizontal: {},
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
