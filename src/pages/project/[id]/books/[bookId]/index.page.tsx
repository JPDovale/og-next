import { BookGenere } from '@components/BooksComponents/BookGenere'
import { CapituleCard } from '@components/BooksComponents/CapituleCard'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { DefaultError } from '@components/usefull/DefaultError'
import { HeaderImageAndInfos } from '@components/usefull/HeaderImageAndInfos'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Bookmarks, Brain, Gear } from 'phosphor-react'
import { useContext, useState } from 'react'
import { UpdateBookForm } from './components/UpdateBookForm'

import { AddGenreForm, BookContainer, Container, SubContainer } from './styles'

export default function BookPage() {
  const [genre, setGenre] = useState('')
  const [errorIn, setErrorIn] = useState('')
  const [addingGenre, setAddingGenre] = useState(false)

  const {
    loading,
    error,
    setError,
    updateFrontCover,
    removeFrontCover,
    addGenre,
    removeGenre,
  } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, bookId } = router.query
  usePreventBack(`/project/${id}`)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { project, useBook, permission, usersWithAccess } = useProject(
    id as string,
  )
  const { book, bookName, bookInfos, bookAuthors } = useBook(bookId as string)

  async function handleUpdateFrontCover(files: FileList | null) {
    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await updateFrontCover({ bookId: bookId as string, file })
  }

  async function handleAddGenre() {
    setErrorIn('')

    if (!genre) return setErrorIn('genre')

    await addGenre({ bookId: book?.id!, genre })
    setGenre('')
    setAddingGenre(false)
  }

  async function handleRemoveGenre(genre: string) {
    await removeGenre({ bookId: book?.id!, genre })
  }

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-${
          bookName || 'Carregando...'
        } | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Livros', bookName]}
        loading={loading}
        inError={!loading && !book}
        isScrolling
      >
        {error && (
          <DefaultError
            close={() => setError(undefined)}
            title={error.title}
            message={error.message}
          />
        )}

        <BookContainer>
          <HeaderImageAndInfos
            idObject={book?.id!}
            onRemoveCalled={removeFrontCover}
            onUpdateCalled={handleUpdateFrontCover}
            url={book?.frontCover?.url}
            permission={permission}
            pathGoBack={`/project/${id}/books`}
            typeImage="vertical"
            allInfos={bookInfos}
            initialValeu={Number(book?.writtenWords)}
            finalValue={Number(book?.words)}
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
              label="Gêneros"
              customFunctionOnClickSideButton={() => {
                setAddingGenre(!addingGenre)
              }}
              permission={permission}
              isToAdd
            />

            {addingGenre && (
              <AddGenreForm>
                <Text>Adicionar gênero</Text>
                <TextInputRoot
                  variant={errorIn === 'genre' ? 'denied' : 'default'}
                >
                  <TextInputInput
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                  />
                </TextInputRoot>
                <ButtonRoot align="center" onClick={handleAddGenre}>
                  <ButtonLabel>Adicionar</ButtonLabel>{' '}
                </ButtonRoot>
              </AddGenreForm>
            )}

            {!addingGenre && (
              <SubContainer columns={smallWindow ? 2 : 6}>
                {book?.generes && (
                  <>
                    {book.generes.map((genere, i) => (
                      <BookGenere
                        key={genere.name}
                        genere={genere.name}
                        isNotRemovable={book.generes.length === 1}
                        onRemove={handleRemoveGenre}
                      />
                    ))}
                  </>
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
                      maxLengthToReorder={book.capitules.length}
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

            <UpdateBookForm book={book} usersInProject={usersWithAccess} />
          </Container>
        </BookContainer>
      </ProjectPageLayout>
    </>
  )
}
