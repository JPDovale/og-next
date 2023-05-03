import { Text } from '@components/usefull/Text'
import { keyframes, styled } from '@styles/index'

const loadingAnimation = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '25%': {
    backgroundPosition: '50% 100%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '50% 0%',
  },
})

export const Loading = styled('span', {
  background:
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(67,9,121,1) 10%, rgba(75,62,179,1) 20%, rgba(47,87,193,1) 30%, rgba(25,118,164,1) 40%, rgba(24,135,172,1) 50%, rgba(38,157,223,1) 60%, rgba(37,103,233,1) 70%, rgba(20,42,182,1) 80%, rgba(60,33,168,1) 90%, rgba(92,60,140,1) 100%)',
  backgroundSize: '900%',
  width: '100%',
  height: '1px',
  position: 'absolute',
  bottom: 0,
  left: 0,
  animation: `${loadingAnimation} 1500ms infinite ease-in-out`,
})

export const HeaderProjectContainer = styled('header', {
  zIndex: 2,
  display: 'flex',
  position: 'fixed',

  width: '95%',
  padding: '$4',

  borderBottom: '0.5px solid $base900',
  background: '$gray800',

  '@media screen and (max-width: 768px)': {
    width: '100%',

    padding: '$4',
    svg: { scale: '75%' },

    display: 'grid',
    gridTemplateColumns: '7fr 1r',
  },
})

export const Title = styled(Text, {
  display: 'flex',
  // justifyContent: 'center',
  alignItems: 'center',
  gap: '$4',
  cursor: 'pointer',

  '@media screen and (max-width: 768px)': {
    span: { fontSize: '$xxs' },

    // display: 'grid',
    // gridTemplateColumns: '1fr 3fr 4fr',

    maxWidth: '80%',
  },
})

export const Buttons = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$2',

  top: '50%',
  right: '$5',

  transform: 'translateY(-50%)',

  '.close': {
    lineHeight: 0,

    border: 0,
    outline: 0,
    borderRadius: '$full',
    background: 'transparent',
    cursor: 'pointer',
    color: '$text800',

    '&:focus': {
      boxShadow: '$inFocus',
    },
    '&:active': {
      svg: {
        scale: '95%',
      },
    },
  },

  '.showNavigator': {
    padding: '$1',

    lineHeight: 0,
    boxShadow: 'none',
  },
})

export const Space = styled('div', {
  zIndex: 4,

  width: '100%',
  height: 58,
})
