import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'

export const RegisterPageContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  alignItems: 'center',

  minHeight: '100vh',

  backgroundColor: 'rgb(128, 82, 193)',
  background:
    'linear-gradient(133deg, rgba(128,82,193,1) 0%, rgba(223,223,223,1) 100%)',

  a: {
    textDecoration: 'none',
    color: '$text800',
  },

  '@media screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
})

export const CardRegister = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '85%',
  justifySelf: 'center',
  alignSelf: 'center',
  borderRadius: '$lg',
  padding: '$4',

  '.logo': {
    width: '90px',
    height: '90px',

    transition: 'ease-in-out 250ms',
  },
})

export const RegisterFormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  justifySelf: 'center',
  gap: '$5',

  padding: '$14',
  width: '85%',

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
    color: '$text800',
    '&:hover': {
      color: '$base800',
    },
  },
})

export const InputHeader = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [`> ${Text}`]: {
    color: '$text800',
    fontWeight: 'bold',
    lineHeight: 0,
  },
})
