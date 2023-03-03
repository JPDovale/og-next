import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'

export const PlotPageContainer = styled('main', {
  zIndex: 1,
  float: 'right',
  width: '92%',
  height: '100vh',

  backgroundColor: '$gray800',
  overflowY: 'scroll',

  '@media screen and (max-width: 768px)': {
    width: '100%',
  },
})

export const BoxInputUrlOfTextContainer = styled('div', {
  padding: '$5',
  background: '$gray400',
})

export const BoxInputUrlOfText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$5',

  background: '$gray900',
  borderRadius: '$sm',
  boxShadow: '$default',
})

export const BoxInputUrlOfTextHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  p: {
    color: '$base800',
  },
})

export const BoxInput = styled('form', {
  display: 'flex',
  gap: '$2',

  div: {
    width: '100%',
  },
})

export const LinkOfText = styled(Text, {
  textDecoration: 'none',
  color: '$purple100',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  marginTop: '$6',
})

export const Container = styled('div', {
  overflowY: 'auto',
  paddingBottom: '$40',
  maxHeight: '100vh',
})
