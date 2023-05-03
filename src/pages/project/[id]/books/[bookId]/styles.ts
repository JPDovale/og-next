import { styled } from '@styles/index'

export const BookContainer = styled('div', {})

export const Container = styled('div', {
  padding: '$4',
})

export const SubContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '$4',
  width: '100%',

  variants: {
    columns: {
      1: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)',

        '@media screen and (max-width: 768px)': {
          gridTemplateColumns: 'repeat(1, 1fr)',
        },
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      5: {
        gridTemplateColumns: 'repeat(5, 1fr)',
      },
      6: {
        gridTemplateColumns: 'repeat(6, 1fr)',
      },
    },
  },
})

export const AddGenreForm = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  gap: '$4',
  padding: '$4',

  borderRadius: '$md',
  background: '$gray900',
})
