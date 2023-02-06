import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Bookmarks, BookOpen, Brain } from 'phosphor-react'
import { useContext } from 'react'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { BookGenere } from '../../../../../components/BooksComponents/BookGenere'
import { CapituleCard } from '../../../../../components/BooksComponents/CapituleCard'
import { DefaultError } from '../../../../../components/DefaultError'
import { ListEmpty } from '../../../../../components/ListEmpty'
import { PlotParts } from '../../../../../components/PlotParts'
import { HeaderImageAndInfos } from '../../../../../components/usefull/HeaderImageAndInfos'
import { HeadingPart } from '../../../../../components/usefull/HeadingPart'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { usePreventBack } from '../../../../../hooks/usePreventDefaultBack'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'
import { BookContainer, Container, SubContainer } from './styles'

interface IInfos {
  infos: Array<{
    label: string
    value: string
  }>
  columns: 1 | 2 | 3 | 4
}

export default function BookPage() {
  const {
    projects,
    loading,
    books,
    error,
    setError,
    users,
    updateFrontCover,
    removeFrontCover,
  } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, bookId } = router.query
  usePreventBack(`/project/${id}`)

  const project = projects?.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const book = books?.find((book) => book.id === bookId)
  const bookName = loading
    ? 'Carregando...'
    : `${book?.title} ${book?.subtitle ? ' - ' + book.subtitle : ''}`

  const permission = project?.users.find((u) => u.id === user?.id)?.permission
  const bookInfos: IInfos[] = [
    {
      infos: [
        { label: 'Titulo', value: book?.title || 'Carregando...' },
        book?.subtitle
          ? {
              label: 'Subtitulo',
              value: book?.subtitle || 'Carregando...',
            }
          : {
              label: '',
              value: '',
            },
      ],
      columns: 2,
    },
    {
      infos: [
        {
          label: 'Gênero literário',
          value: book?.literaryGenere || 'Carregando...',
        },
        {
          label: 'Gêneros',
          value: `${book?.generes.length}` || 'Carregando...',
        },
        {
          label: 'Autores',
          value: `${book?.authors.length}` || 'Carregando...',
        },
        {
          label: 'ISBN',
          value: book?.isbn || 'Você ainda não definiu o seu ISBN',
        },
        // {
        //   label: 'Estimativa de palavras',
        //   value: book?.words || 'Carregando...',
        // },
        // {
        //   label: 'Palavras escritas',
        //   value: book?.writtenWords || 'Carregando...',
        // },
        {
          label: 'Personagens',
          value: `${book?.plot.persons.length}` || 'Carregando...',
        },
        {
          label: 'Capítulos',
          value: `${book?.capitules.length}` || 'Carregando...',
        },
        {
          label: 'Criado em',
          value: book?.createAt || 'Carregando...',
        },
        {
          label: 'Atualizado em',
          value: book?.updateAt || 'Carregando...',
        },
      ],
      columns: 4,
    },
  ]

  const authorsIncludeCreator = users.filter((user) => {
    const userAccess = !!book?.authors?.find((u) => u.id === user.id)
    return userAccess
  })
  const authors = authorsIncludeCreator.filter((u) => u.id !== user?.id)

  async function handleUpdateFrontCover(files: FileList | null) {
    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await updateFrontCover({ bookId: bookId as string, file })
  }

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Livros | Ognare`}
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
            creator={user!}
            avatares={authors}
            withAvatares
            withProgressBar
          />

          <Container>
            <HeadingPart icon={<BookOpen size={40} />} label="Plot do livro" />
            <PlotParts book={book} isPreview />
          </Container>

          <Container>
            <HeadingPart
              icon={<Brain size={40} />}
              label="Gêneros"
              customFunctionToAd={() => {}}
              isToAdd
            />

            <SubContainer>
              {book?.generes && (
                <>
                  {book.generes.map((genere, i) => (
                    <BookGenere
                      key={genere.name}
                      genere={genere.name}
                      isNotRemovable={book.generes.length === 1}
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
              customFunctionToAd={() => {}}
              isToAdd
            />

            <SubContainer
              columns={book?.capitules && book.capitules[0] ? 3 : 1}
            >
              {book?.capitules && book.capitules[0] ? (
                <>
                  {book.capitules.map((capitule) => (
                    <CapituleCard key={capitule.id} capitule={capitule} />
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
