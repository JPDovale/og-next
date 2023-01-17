import { styled, Text } from '@og-ui/react'
import Image from 'next/image'

export const RegisterPageContainer = styled('main', {
  display: 'flex',
  justifyContent: 'flex-end',

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

export const BackgroundRegister = styled(Image, {
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

export const RegisterFormContainer = styled('form', {
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

  label: {
    alignItems: 'center',
    gap: '$3',

    padding: 0,

    background: '$transparent',
    boxShadow: 'none',
  },
})

export const Links = styled('div', {
  display: 'flex',
  gap: '$4',
  justifyContent: 'space-between',

  a: {
    textDecoration: 'none',
    color: '$base500',
    '&:hover': {
      color: 'white',
    },
  },
})

export const InputHeader = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [`> ${Text}`]: {
    color: '$base700',
    lineHeight: 0,
  },
})
