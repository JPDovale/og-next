import { IGenre } from '@api/responsesTypes/IBooksResponse'
import { Box } from '@components/usefull/Box'
import { Text } from '@components/usefull/Text'
import { styled } from '@styles/index'
import { X } from 'phosphor-react'

interface IBookGenereProps {
  genere: IGenre
  isNotRemovable?: boolean
  onRemove: (genereId: string) => void
}

export function BookGenere({
  genere,
  onRemove,
  isNotRemovable = false,
}: IBookGenereProps) {
  return (
    <BookGenereContainer>
      <Genere>{genere.name}</Genere>
      {!isNotRemovable && (
        <button
          type="button"
          title="Remover gênero do livro"
          onClick={() => onRemove(genere.id)}
        >
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
