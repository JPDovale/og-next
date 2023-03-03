import { Box } from '@components/usefull/Box'
import { ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'

export const NewProjectPopupContainer = styled('div', {
  position: 'fixed',
  zIndex: 1,

  width: '100%',
  height: '100%',

  background: '#000000a0',
  borderTopLeftRadius: '48px',
})

export const Popup = styled(Box, {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',

  padding: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '90%',

  '@media screen and (max-width: 768px)': {
    width: '90%',
  },
})

export const HeaderNewProject = styled('div', {
  position: 'relative',
  display: 'flex',

  padding: '$5',

  borderBottom: '0.5px solid $base900',

  '.close': {
    position: 'absolute',

    top: '$5',
    right: '$5',

    lineHeight: 0,

    border: 0,
    outline: 0,
    borderRadius: '$full',
    background: 'transparent',
    cursor: 'pointer',
    color: '$base100',

    '&:focus': {
      boxShadow: '$inFocus',
    },
    '&:active': {
      svg: {
        scale: '95%',
      },
    },
  },
})

export const NewProjectForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
  height: '100%',
  alignItems: 'center',
  padding: '$8',

  background: '$gray900',
  overflowY: 'scroll',
})

export const Input = styled(Text, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  width: '100%',
  marginTop: '$8',
})

export const Submit = styled(ButtonRoot, {
  display: 'flex',
  marginTop: '$16',
})
