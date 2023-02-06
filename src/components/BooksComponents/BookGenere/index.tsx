import { Box, styled, Text } from '@og-ui/react'
import { X } from 'phosphor-react'

interface IBookGenereProps {
  genere: string
  isNotRemovable?: boolean
  onRemove: (genere: string) => void
}

export function BookGenere({
  genere,
  onRemove,
  isNotRemovable = false,
}: IBookGenereProps) {
  return (
    <BookGenereContainer>
      <Genere>{genere}</Genere>
      {!isNotRemovable && (
        <button type="button" onClick={() => onRemove(genere)}>
          <X />
        </button>
      )}
    </BookGenereContainer>
  )
}

const BookGenereContainer = styled(Box, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  height: 120,

  background: '$gray600',
  borderRadius: '$md',

  button: {
    all: 'unset',

    position: 'absolute',
    top: '$2',
    right: '$2',

    lineHeight: 0,

    cursor: 'pointer',
  },
})

const Genere = styled(Text, {})
