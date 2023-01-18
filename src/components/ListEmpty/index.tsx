import { Text, styled } from '@og-ui/react'
import { ReactNode } from 'react'
import { Loading } from '../Loading'

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
  },
})

interface IListEmptyProps {
  icon?: ReactNode
  message: string
  isInLine?: boolean
  isLoading?: boolean
}

export function ListEmpty({
  message,
  icon,
  isInLine = false,
  isLoading = false,
}: IListEmptyProps) {
  return (
    <ListEmptyContainer isInLine={isInLine}>
      {isLoading ? (
        <Loading />
      ) : (
        <Text as="label" size="xl" family="body">
          {message}
        </Text>
      )}
      {icon}
    </ListEmptyContainer>
  )
}
