import { Heading, keyframes, styled } from '@og-ui/react'
import React from 'react'

export function Loading() {
  return (
    <LoadingContainer>
      <Ring />
      <Heading weight="bold" spacing="minus" as="span">
        Carregando...
      </Heading>
    </LoadingContainer>
  )
}

const loadingAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
    boxShadow: '1px 3px 2px #6f1656',
  },
  '50%': {
    transform: 'rotate(180deg)',
    boxShadow: '1px 3px 2px #21156a',
  },
  '100%': {
    transform: 'rotate(360deg)',
    boxShadow: '1px 3px 2px #86296b',
  },
})

const textAnimation = keyframes({
  '50%': {
    color: '$gray900',
  },
})

const LoadingContainer = styled('div', {
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$gray900',
  position: 'relative',

  width: '100%',
  height: '100vh',

  span: {
    color: '$base800',
    textTransform: 'uppercase',
    fontSize: 12,

    animation: `${textAnimation} 3s ease-in-out infinite`,
  },
})

const Ring = styled('div', {
  position: 'absolute',

  width: 200,
  height: 200,

  borderRadius: '$full',
  animation: `${loadingAnimation} 2s linear infinite`,

  '$:before': {
    position: 'absolute',
    content: '',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    borderRadius: '$full',
    boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  },
})
