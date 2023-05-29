import { IError } from '@@types/errors/IError'
import { BookGenere } from '@components/BooksComponents/BookGenere'
import { CapituleCard } from '@components/BooksComponents/CapituleCard'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { HeaderImageAndInfos } from '@components/usefull/HeaderImageAndInfos'
import { HeadingPart } from '@components/usefull/HeadingPart'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Text } from '@components/usefull/Text'
import { ToastError } from '@components/usefull/ToastError'
import { useBook } from '@hooks/useBook'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Bookmarks, Brain, Gear } from 'phosphor-react'
import { useState } from 'react'
import { UpdateBookForm } from './components/UpdateBookForm'

import { AddGenreForm, BookContainer, Container, SubContainer } from './styles'

export default function BookPage() {
  const [genre, setGenre] = useState('')
  const [error, setError] = useState<IError | null>(null)
  const [errorIn, setErrorIn] = useState('')
  const [addingGenre, setAddingGenre] = useState(false)

  const router = useRouter()
  const { id, bookId } = router.query
  usePreventBack(`/project/${id}`)

  const { smallWindow } = useWindowSize()

  const { permission, projectName } = useProject(id as string)
  const {
    book,
    bookName,
    bookInfos,
    bookAuthors,
    bookWords,
    bookWrittenWords,
    loadingBook,
    callEvent,
  } = useBook(bookId as string)

  async function handleUpdateFrontCover(files: FileList | null) {
    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await callEvent.updateFrontCover(file)
  }

  async function handleAddGenre() {
    setErrorIn('')

    if (!genre) return setErrorIn('genre')

    const { resolved, error } = await callEvent.addGenre(genre)
    if (resolved) {
      setGenre('')
      setAddingGenre(false)
    }

    if (error) {
      setError(error)
    }
  }

  async function handleRemoveGenre(genreId: string) {
    const { error } = await callEvent.removeGenre(genreId)

    if (error) {
      setError(error)
    }
  }

  async function handleRemoveFrontCover(id: string) {
    callEvent.removeFrontCover()
    return true
  }

  return (
    <>
      <NextSeo title={`${bookName} | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Livros', bookName]}
        loading={loadingBook}
        inError={!loadingBook && !book}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <BookContainer>
          <HeaderImageAndInfos
            idObject={book?.id!}
            onRemoveCalled={handleRemoveFrontCover}
            onUpdateCalled={handleUpdateFrontCover}
            url={book?.front_cover_url ?? undefined}
            permission={permission}
            pathGoBack={`/project/${id}/books`}
            typeImage="vertical"
            allInfos={bookInfos}
            initialValeu={bookWrittenWords}
            finalValue={bookWords}
            avatares={bookAuthors}
            withAvatares
            withProgressBar
          />

          {/* <Container>
            <HeadingPart icon={<BookOpen size={40} />} label="Plot do livro" />
            <PlotParts book={book} isPreview />
          </Container> */}

          <Container>
            <HeadingPart
              icon={<Brain size={40} />}
              label="Subgêneros"
              customFunctionOnClickSideButton={() => {
                setAddingGenre(!addingGenre)
              }}
              permission={permission}
              isToAdd
            />

            {addingGenre && (
              <AddGenreForm>
                <Text>Adicionar subgênero</Text>
                <TextInputRoot
                  size="sm"
                  variant={errorIn === 'genre' ? 'denied' : 'default'}
                >
                  <TextInputIcon>
                    <Brain />
                  </TextInputIcon>
                  <TextInputInput
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                  />
                </TextInputRoot>
                <ButtonRoot
                  variant="noShadow"
                  size="sm"
                  align="center"
                  onClick={handleAddGenre}
                >
                  <ButtonLabel>Adicionar</ButtonLabel>{' '}
                </ButtonRoot>
              </AddGenreForm>
            )}

            {!addingGenre && (
              <SubContainer
                columns={
                  !book?.genres || !book.genres[0] ? 1 : smallWindow ? 2 : 6
                }
              >
                {book?.genres && book.genres[0] ? (
                  <>
                    {book.genres.map((genere, i) => (
                      <BookGenere
                        key={genere.id}
                        genere={genere}
                        onRemove={handleRemoveGenre}
                      />
                    ))}
                  </>
                ) : (
                  <ListEmpty
                    message="Você ainda não adicionou nenhum subgênero"
                    icon={<Brain size={40} />}
                  />
                )}
              </SubContainer>
            )}
          </Container>

          <Container>
            <HeadingPart
              icon={<Bookmarks size={40} />}
              label="Capítulos"
              redirectPathToAdd={`/project/${id}/books/${bookId}/capitule/new`}
              permission={permission}
              isToAdd
            />

            <SubContainer
              columns={book?.capitules && book.capitules[0] ? 3 : 1}
            >
              {book?.capitules && book.capitules[0] ? (
                <>
                  {book.capitules.map((capitule) => (
                    <CapituleCard
                      maxLengthToReorder={book?.capitules?.length || 0}
                      bookId={book.id!}
                      key={capitule.id}
                      capitule={capitule}
                      redirectFunction={() =>
                        router.push(
                          `/project/${id}/books/${bookId}/capitule/${capitule.id}`,
                        )
                      }
                    />
                  ))}
                </>
              ) : (
                <ListEmpty
                  message="Você não criou nenhum capítulo para o seu livro ainda"
                  icon={<Bookmarks size={40} />}
                />
              )}
            </SubContainer>
          </Container>

          <Container>
            <HeadingPart
              label="Configurações"
              icon={<Gear size={40} />}
              permission={permission}
            />

            <UpdateBookForm bookId={book?.id ?? ''} />
          </Container>
        </BookContainer>
      </ProjectPageLayout>
    </>
  )
}
