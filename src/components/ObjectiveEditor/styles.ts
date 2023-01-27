import { Text, styled } from '@og-ui/react'

export const ObjectiveEditorContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  width: '100%',
  height: '100vh',
  padding: '$6',
  paddingBottom: '$40',

  background: '$gray800',
  borderRight: '0.5px solid $base900',
  overflowY: 'scroll',

  '@media screen and (max-width: 768px)': {
    borderRight: 'none',
    borderBottom: '0.5px solid $base900',
    padding: '$4',
    height: 'unset',
    overflowY: 'unset',
  },
})

export const EditorHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  span: {
    display: 'flex',
    gap: '$2',
  },

  '.goBack': {
    padding: '$2',

    svg: {
      width: 20,
      height: 20,
    },
  },
})

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '.buttons': {
    display: 'flex',
    gap: '$8',
    marginTop: '$6',

    button: {
      padding: '$3',
      paddingRight: '$5',
    },

    '.cancel': {
      background: 'DarkRed',
    },
  },
})

export const InputContainer = styled(Text, {
  display: 'flex',
  flexDirection: 'column',

  p: {
    color: '$base800',
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },

  'div, textarea': {
    background: '$gray500',
  },
})

export const ShadowPopUp = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 3,
  padding: '$4',

  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',

  background: '#000000de',
})

export const DeletePopUp = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  zIndex: 3,
  padding: '$4',

  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',

  background: '#000000de',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$6',
    button: {
      padding: '$3',
    },
  },
})
