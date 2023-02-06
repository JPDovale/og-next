import { styled } from '@og-ui/react'

export const BookContainer = styled('div', {})

export const Container = styled('div', {
  padding: '$4',
})

export const SubContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '$4',

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
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
  },
})
