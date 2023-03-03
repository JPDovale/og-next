import { Box } from '@components/usefull/Box'
import { ButtonRoot } from '@components/usefull/Button'
import { styled } from '@styles/index'

export const CardPersonContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  position: 'relative',

  padding: 0,
  width: '100%',
  height: '100%',
  minHeight: '280px',

  backgroundColor: '$gray900',
  borderRadius: '$md',
  overflow: 'hidden',
  boxShadow: '$default',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',

  '.person-image': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '280px',

    img: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      overflow: 'hidden',

      width: '100%',
      height: 'auto',
      maxHeight: '280px',
      objectFit: 'cover',

      '@media screen and (max-width: 768px)': {
        minHeight: '150px',
      },
    },

    '@media screen and (max-width: 768px)': {
      minHeight: '150px',
    },
  },

  variants: {
    isAdd: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      false: {},
    },

    isNotPreview: {
      true: {
        display: 'grid',
        gridTemplateColumns: '4fr 4fr 6fr',

        minHeight: '400px',

        background:
          'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(63,28,87,1) 100%)',

        '.person-image': {
          minHeight: '400px',
          width: '100%',
          height: 'auto',

          img: {
            maxHeight: '400px',
            minHeight: '400px',
            width: '100%',
            height: 'auto',
          },
        },

        '@media screen and (max-width: 768px)': {
          display: 'flex',

          background:
            'linear-gradient(180deg, rgba(0,0,0,1) 30%, rgba(63,28,87,1) 100%)',
        },
      },
      false: {},
    },
  },

  '@media screen and (max-width: 768px)': {
    minHeight: '280px',
  },
})

export const PersonInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '$1',

  padding: '$3',
  width: '100%',

  '@media screen and (max-width: 768px)': {
    borderTop: '0.5px solid $base900',
  },
})

export const ItemInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  label: {
    color: '$base800',
  },

  variants: {
    isObject: {
      true: {
        alignItems: 'center',
      },
      false: {},
    },
  },
})

export const ItemsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  width: '100%',

  p: {
    color: '$base400',
  },
})

export const AddItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '100%',

  textAlign: 'center',

  color: '$base100',
})

export const ObjectsOfPerson = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',

  width: '100%',
  marginTop: '$8',
  gap: '$2',

  '@media screen and (max-width: 768px)': {
    marginTop: '$4',
  },
})

export const PersonHistory = styled('div', {
  padding: '$5',
  height: '100%',
  width: '100%',
  maxHeight: '400px',

  background: '#00000030',
  boxShadow: '0 -3px 4px #000000d0',

  label: {
    color: '$base700',
  },

  p: {
    marginTop: '$4',
    width: '100%',
    textAlign: 'justify',
  },
})

export const EditPersonButton = styled(ButtonRoot, {
  position: 'absolute',

  padding: '$3',
  right: '0',
  top: '0',
})
