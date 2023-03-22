import { styled } from '@styles/index'

export const NewArchiveContainer = styled('button', {
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$2',
  padding: '$2',

  background: '$gray900',
  borderRadius: '$sm',
  cursor: 'pointer',

  svg: {
    lineHeight: 0,
  },
})
