import { styled } from '@og-ui/react'

export const ProjectsContainer = styled('div', {
  display: 'grid',

  gap: '$8',
  padding: '0 $8 $10 $8',
  marginTop: '120px',

  transition: 'all 500ms',

  variants: {
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
        position: 'absolute',
        padding: '$2',
        marginTop: '90px',

        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

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
