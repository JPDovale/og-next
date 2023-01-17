import { Text, styled } from '@og-ui/react'

export const GenericEditorObjectContainer = styled('div', {
  position: 'relative',
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

  variants: {
    subObjectsFormIsVisible: {
      true: {
        overflowY: 'hidden',
      },
    },
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
})

export const InputContainer = styled(Text, {
  display: 'flex',
  flexDirection: 'column',

  p: {
    color: '$base800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '$2',

    '.goBack': {
      padding: '$1',
      boxShadow: 'none',
      background: '$purple400',

      svg: {
        width: 20,
        height: 20,
      },
    },
  },

  'div, textarea': {
    background: '$gray500',
  },
})

export const SubObjectFormContainer = styled('div', {
  zIndex: 1,
  position: 'absolute',
  display: 'none',
  flexDirection: 'column',

  width: '100%',
  minHeight: '100%',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  background: '#000000a0',

  variants: {
    isVisible: {
      true: {
        display: 'flex',
      },
      false: {},
    },
  },
})

export const SubObjectForm = styled('div', {
  zIndex: 4,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$8',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  // transform: 'translate(-50%, -50%)',

  background: '$gray800',

  '.goBack': {
    padding: '$2',
    boxShadow: 'none',
    background: '$purple400',

    svg: {
      width: 20,
      height: 20,
    },
  },

  '@media screen and (max-width: 768px)': {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    borderRadius: '0',
  },
})

export const SubObjects = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$4',

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },

  variants: {
    isEmpty: {
      true: {
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const ListEmpty = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$base800',
  textAlign: 'center',
  padding: '$20 $8',
  background: '$gray900',
  borderRadius: '$md',

  label: {
    color: '$base800',
  },
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
