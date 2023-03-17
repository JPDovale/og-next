import { styled } from '@styles/index'

export const NewArchiveContainer = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$2',

  width: '100%',
  height: '100%',
  maxHeight: '340px',
  minHeight: '340px',

  background: '$gray900',
  borderRadius: '$sm',
  cursor: 'pointer',

  svg: {
    lineHeight: 0,
  },
})
