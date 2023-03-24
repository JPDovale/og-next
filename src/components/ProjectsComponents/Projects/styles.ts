import { styled } from '@styles/index'
export const ProjectsContainer = styled('div', {
  display: 'grid',

  gap: '$8',
  padding: '0 0 $10 0',
  marginTop: '120px',

  transition: 'all 500ms',

  variants: {
    isFirst: {
      true: {},
      false: {
        marginTop: '0',
      },
    },

    navIsOpen: {
      true: {
        gridTemplateColumns: '1fr 1fr ',
      },
      false: {
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    },

    isEmpty: {
      true: {
        display: 'flex',
        minHeight: '80%',

        '@media screen and (max-width: 768px)': {
          minHeight: '80%',
          marginTop: '$16',
        },
      },
      false: {},
    },

    isList: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$5',

        padding: '0 $8 $10 $8',
        '@media screen and (max-width: 768px)': {
          padding: '$4',
        },
      },
    },
  },

  defaultVariants: {
    navIsOpen: true,
  },

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    padding: '$4',
    marginTop: '$16',
  },
})
