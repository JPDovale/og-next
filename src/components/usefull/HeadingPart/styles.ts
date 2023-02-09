import { Heading, styled } from '@og-ui/react'

export const HeadingPartContainer = styled(Heading, {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  marginTop: '$8',
  marginBottom: '$5',
  cursor: 'pointer',

  svg: {
    background: '$blue600',
    padding: '$2',
    boxShadow: '$default',
    borderRadius: '$xs',
  },
})
