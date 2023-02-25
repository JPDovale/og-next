import { BookGenere } from '@components/BooksComponents/BookGenere'
import { CapituleCard } from '@components/BooksComponents/CapituleCard'
import { DefaultError } from '@components/usefull/DefaultError'
import { HeaderImageAndInfos } from '@components/usefull/HeaderImageAndInfos'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Bookmarks, Brain } from 'phosphor-react'
import { useContext } from 'react'

import { BookContainer, Container, SubContainer } from './styles'

export default function BookPage() {
  const { loading, error, setError, updateFrontCover, removeFrontCover } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id, bookId } = router.query
  usePreventBack(`/project/${id}`)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { project, useBook, permission } = useProject(id as string)
  const { book, bookName, bookInfos, bookAuthors } = useBook(bookId as string)

  async function handleUpdateFrontCover(files: FileList | null) {
    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await updateFrontCover({ bookId: bookId as string, file })
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
              customFunctionOnClickSideButton={() => {}}
              permission={permission}
              // isToAdd
            />

            <SubContainer columns={smallWindow ? 2 : 6}>
              {book?.generes && (
                <>
                  {book.generes.map((genere, i) => (
                    <BookGenere
                      key={genere.name}
                      genere={genere.name}
                      isNotRemovable={
                        true
                        // book.generes.length === 1
                      }
                      onRemove={() => {}}
                    />
                  ))}
                </>
              )}
            </SubContainer>
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
        </BookContainer>
      </ProjectPageLayout>
    </>
  )
}
