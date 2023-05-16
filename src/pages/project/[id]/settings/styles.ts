import { styled } from '@styles/index'
export const SettingsProject = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  width: '100%',
  padding: '$4',
})

export const Creator = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 4fr',
  alignItems: 'center',
  gap: '$4',

  padding: '0',

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
})
