import { InfoDefault } from '@components/usefull/InfoDefault'
import { ProgressBar } from '@components/usefull/ProgressBar'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import { useProject } from '@hooks/useProject'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Image as ImageIco } from 'phosphor-react'
import { useContext } from 'react'

import {
  CardBookContainer,
  ImageContainer,
  Info,
  InfoContainer,
  InfosContainer,
  PreviewContainer,
} from './styles'

interface ICardBookProps {
  projectId: string
  bookId: string
  isPreview?: boolean
}

export function CardBook({
  projectId,
  bookId,
  isPreview = false,
}: ICardBookProps) {
  const { theme } = useContext(InterfaceContext)

  const router = useRouter()
  const { id } = router.query

  const { findBook } = useProject(projectId)
  const {
    book,
    bookTitle,
    createdAt,
    literaryGenre,
    updatedAt,
    isbn,
    bookFrontCover,
  } = findBook(bookId)

  return (
    <CardBookContainer
      as="button"
      data-testid="card-book"
      onClick={() => router.push(`/project/${id}/books/${book?.id}`)}
    >
      <PreviewContainer isPreview={isPreview}>
        <ImageContainer>
          {bookFrontCover ? (
            <Image
              src={bookFrontCover}
              alt={bookTitle}
              width={400}
              height={400}
              data-testid="image-cover"
            />
          ) : (
            <ImageIco
              weight="thin"
              size={64}
              alt=""
              color={theme === 'dark' ? '#e3e3e3' : '#000000'}
              data-testid="icon-image"
            />
          )}
        </ImageContainer>

        <InfosContainer>
          <InfoDefault size={isPreview ? 'sm' : 'md'} title="Nome:">
            {bookTitle}
          </InfoDefault>

          <InfoDefault size={isPreview ? 'sm' : 'md'} title="Gênero literário:">
            {literaryGenre}
          </InfoDefault>

          <InfoContainer>
            <InfoDefault
              size={isPreview ? 'sm' : 'md'}
              title={`Progresso: ${book?.written_words} de ${book?.words} palavras escritas`}
            >
              <ProgressBar
                final={book?.words ?? 0}
                actual={book?.written_words ?? 0}
              />
            </InfoDefault>
          </InfoContainer>

          <InfoContainer columns={3}>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Gêneros:
              </Text>
              <Text size="xs" weight="bold">
                {book?._count.genres}
              </Text>
            </Info>

            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Autores:
              </Text>
              <Text size="xs" weight="bold">
                {book?._count.authors}
              </Text>
            </Info>

            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Capítulos:
              </Text>
              <Text size="xs" weight="bold">
                {book?._count.capitules}
              </Text>
            </Info>
          </InfoContainer>

          <InfoContainer>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                ISBN:
              </Text>
              <Text size="xs" weight="bold">
                {isbn}
              </Text>
            </Info>
          </InfoContainer>

          <InfoContainer columns={2}>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Criado em:
              </Text>
              <Text size="xs" weight="bold">
                {createdAt}
              </Text>
            </Info>

            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Atualizado em:
              </Text>
              <Text size="xs" weight="bold">
                {updatedAt}
              </Text>
            </Info>
          </InfoContainer>
        </InfosContainer>
      </PreviewContainer>
    </CardBookContainer>
  )
}
