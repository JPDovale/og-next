import { styled } from '@styles/index'
export const ProjectsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',

  gap: '$8',

  transition: 'ease-in-out 250ms',

  variants: {
    isFirst: {
      true: {},
      false: {
        marginTop: '0',
      },
    },

    isEmpty: {
      true: {
        display: 'flex',
        minHeight: '80%',

        '@media screen and (max-width: 768px)': {
          minHeight: '80%',
        },
      },
      false: {},
    },
  },

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
})
