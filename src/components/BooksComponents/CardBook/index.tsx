import { Text } from '@og-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Image as ImageIco } from 'phosphor-react'
import { IBooksResponse } from '../../../api/responsesTypes/IBooksResponse'
import { PlotParts } from '../../PlotParts'
import { ProgressBar } from '../../usefull/ProgressBar'
import {
  CardBookContainer,
  ImageContainer,
  Info,
  InfoContainer,
  InfosContainer,
  PlotBook,
  PreviewContainer,
} from './styles'

interface ICardBookProps {
  book: IBooksResponse
  isPreview?: boolean
}

export function CardBook({ book, isPreview = false }: ICardBookProps) {
  const router = useRouter()
  const { id } = router.query

  return (
    <CardBookContainer
      as="button"
      onClick={() => router.push(`/project/${id}/books/${book.id}`)}
    >
      <PreviewContainer isPreview={isPreview}>
        <ImageContainer>
          {book.frontCover?.url ? (
            <Image
              src={book?.frontCover?.url}
              alt={book.title}
              width={400}
              height={400}
            />
          ) : (
            <ImageIco weight="thin" size={64} alt="" color="#e3e3e3" />
          )}
        </ImageContainer>

        <InfosContainer>
          <InfoContainer>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Nome:
              </Text>
              <Text size="xs">
                {book.title} {book?.subtitle}
              </Text>
            </Info>
          </InfoContainer>

          <InfoContainer>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Gênero literário:
              </Text>
              <Text size="xs">{book.literaryGenere}</Text>
            </Info>
          </InfoContainer>

          <InfoContainer>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Progresso: {book?.writtenWords} de {book?.words} palavras
                escritas
              </Text>
              <ProgressBar
                final={Number(book?.words)}
                actual={Number(book?.writtenWords)}
              />
            </Info>
          </InfoContainer>

          <InfoContainer columns={4}>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Gêneros:
              </Text>
              <Text size="xs">{book.generes.length}</Text>
            </Info>

            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Autores:
              </Text>
              <Text size="xs">{book.authors.length}</Text>
            </Info>

            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Capítulos:
              </Text>
              <Text size="xs">{book.capitules.length}</Text>
            </Info>

            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Personagens:
              </Text>
              <Text size="xs">{book.plot.persons.length}</Text>
            </Info>
          </InfoContainer>

          <InfoContainer>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                ISBN:
              </Text>
              <Text size="xs">
                {book.isbn || 'Você ainda não definiu seu ISBN'}
              </Text>
            </Info>
          </InfoContainer>

          <InfoContainer columns={2}>
            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Criado em:
              </Text>
              <Text size="xs">{book.createAt}</Text>
            </Info>

            <Info>
              <Text as="span" family="body" size="sm" height="shorter">
                Atualizado em:
              </Text>
              <Text size="xs">{book.updateAt}</Text>
            </Info>
          </InfoContainer>
        </InfosContainer>
      </PreviewContainer>

      {!isPreview && (
        <PlotBook>
          <PlotParts book={book} isPreview />
        </PlotBook>
      )}
    </CardBookContainer>
  )
}
