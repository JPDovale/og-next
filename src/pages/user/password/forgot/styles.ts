import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'
import Image from 'next/image'

export const ForgotPasswordPageContainer = styled('main', {
  display: 'flex',
  justifyContent: 'flex-end',

  a: {
    textDecoration: 'none',
  },

  '.logo2': {
    display: 'none',

    marginTop: '$10',

    '@media screen and (max-width: 768px)': {
      display: 'block',
      marginBottom: '$8',
    },
  },

  '.logo': {
    position: 'fixed',
    top: '50%',
    left: '$14',

    scale: '70%',
    transform: 'translateY(-75%)',
    transition: 'all 500ms',

    '@media screen and (min-width: 2000px)': {
      left: '$40',

      scale: '120%',
    },

    '@media screen and (max-width: 768px)': {
      display: 'none',
    },
  },

  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export const BackgroundForgotPassword = styled(Image, {
  zIndex: -1,
  position: 'fixed',

  right: -10,
  top: -10,

  transition: 'all 500ms',

  '@media screen and (max-width: 768px)': {
    scale: '185%',
  },

  '@media screen and (max-width: 1024px)': {
    top: -200,
    right: -200,
  },

  '@media screen and (min-width: 1500px)': {
    scale: '200%',
  },

  '@media screen and (min-width: 2000px)': {
    scale: '350%',
  },
})

export const ForgotPasswordFormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  padding: '$14',
  width: '50%',

  span: {
    textAlign: 'center',
    marginBottom: '$3',
  },

  "button[type='submit']": {
    marginTop: '$8',
  },

  '@media screen and (max-width: 768px)': {
    width: '90%',
    gap: '$4',
    padding: '$4',
  },
})

export const InputContainer = styled('label', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  cursor: 'pointer',
})

export const InputHeader = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [`> ${Text}`]: {
    lineHeight: 0,
    color: '$base700',
  },
})

export const Links = styled('div', {
  display: 'flex',
  gap: '$4',
  justifyContent: 'space-between',

  span: {
    textDecoration: 'none',
    color: '$base500',
    '&:hover': {
      color: 'white',
    },
  },
})
