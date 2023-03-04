import { ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'

export const NewProjectForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  height: '100%',
  alignItems: 'center',
  padding: '$8',

  background: '$gray900',
  overflowY: 'auto',
  borderRadius: '0 0 $md $md',
})

export const Input = styled(Text, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  width: '100%',
})

export const Submit = styled(ButtonRoot, {
  display: 'flex',
  marginTop: '$5',
})
