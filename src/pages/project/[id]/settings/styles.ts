import { styled } from '@styles/index'
export const SettingsProject = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  width: '100%',
  padding: '$4',
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

        div: {
          padding: '$3',
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

export const Creator = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 4fr',
  alignItems: 'center',

  padding: '0',

  p: {
    marginTop: '-$4',
  },

  label: {
    marginBottom: '$3',
  },

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
})
