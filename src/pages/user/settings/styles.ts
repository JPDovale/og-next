import { styled } from '@styles/index'

export const UserSettingsPageContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '8fr 4fr',

  width: '100%',
  height: '100%',
  marginTop: '$20',
  overflow: 'hidden',

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: 'unset',

    marginTop: '60px',
    overflow: 'unset',
  },
})

export const UserInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '100%',
  padding: '$4',

  background: '$gray900',
})

export const UserSettings = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  width: '100%',
  maxHeight: '100%',
  padding: '$4',

  overflowY: 'scroll',
})

export const Info = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',

  '.buttons': {
    display: 'flex',
    justifyContent: 'center',
    gap: '$8',

    button: {
      padding: '$2',
      minWidth: '45%',

      fontSize: 12,

      boxShadow: 'none',
    },
  },

  variants: {
    isCard: {
      true: {
        alignItems: 'flex-start',
        gap: '$2',

        padding: '$5',

        background: '$gray900',
        borderRadius: '$md',

        label: {
          display: 'flex',
          gap: '$2',
          flexDirection: 'column',

          width: '100%',

          color: '$base900',
        },

        header: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '$1',
        },
      },
      false: {},
    },

    columns: {
      1: {},
      2: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '$4',
      },

      3: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    },
  },
})

export const Avatar = styled('div', {
  width: '200px',
  height: '200px',
})

export const Input = styled('label', {
  display: 'flex',
  justifyContent: 'center',
  padding: '$2',
  borderRadius: '$sm',
  minWidth: '45%',
  fontSize: '$sm',
  fontFamily: 'sans-serif',
  gap: '$2',

  background: '$purple600',
  transition: 'all 250ms',
  cursor: 'pointer',

  '&:hover': {
    background: '$purple500',
  },

  input: {
    position: 'absolute',
    visibility: 'hidden',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
})
