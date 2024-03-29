import { styled } from '@styles/index'
import { ReactNode } from 'react'
import { Loading } from '../Loading'
import { Text } from '../Text'

const ListEmptyContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  height: '100%',
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

  variants: {
    isInLine: {
      true: {
        textAlign: 'start',
        padding: ' $4 0',
      },
    },
    contrast: {
      1: {},
      2: {
        background: '$gray800',
      },
      3: {
        background: '$gray700',
      },
    },
  },
})

interface IListEmptyProps {
  icon?: ReactNode
  message: string
  isInLine?: boolean
  isLoading?: boolean
  contrast?: 1 | 2 | 3
}

export function ListEmpty({
  message,
  icon,
  isInLine = false,
  isLoading = false,
  contrast = 1,
}: IListEmptyProps) {
  return (
    <ListEmptyContainer contrast={contrast} isInLine={isInLine}>
      {isLoading ? (
        <Loading autoAdapt />
      ) : (
        <Text
          css={{
            maxWidth: '75%',
            textAlign: 'center',
          }}
          size="xl"
          family="body"
        >
          {message}
        </Text>
      )}
      {icon}
    </ListEmptyContainer>
  )
}
