import { Button } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Books } from 'phosphor-react'
import { useContext } from 'react'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { CardBook } from '../../../../components/BooksComponents/CardBook'
import { DefaultError } from '../../../../components/DefaultError'
import { ListEmpty } from '../../../../components/ListEmpty'
import { InterfaceContext } from '../../../../contexts/interface'
import { ProjectsContext } from '../../../../contexts/projects'
import { usePreventBack } from '../../../../hooks/usePreventDefaultBack'
import { ProjectPageLayout } from '../../../../layouts/ProjectPageLayout'
import { orderElements } from '../../../../services/orderElements'
import { BooksContainer, NewBookButtonContainer } from './styles'

export default function BooksPage() {
  const { projects, loading, books, error, setError } =
    useContext(ProjectsContext)
  const { orderBy } = useContext(InterfaceContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse
  const booksThisProject = books?.filter(
    (book) => book.defaultProject === project?.id,
  )

  const booksOrd = orderElements(booksThisProject, orderBy) as IBooksResponse[]

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Livros | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Livros']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        {error && (
          <DefaultError
            close={() => setError(undefined)}
            title={error.title}
            message={error.message}
          />
        )}

        <NewBookButtonContainer>
          <Button
            label="Criar novo livro"
            icon={<Books />}
            align="center"
            css={{ padding: '$3' }}
            onClick={() => router.push(`/project/${id}/books/new`)}
          />
        </NewBookButtonContainer>

        <BooksContainer>
          {booksThisProject[0] ? (
            booksOrd.map((book) => <CardBook key={book.id} book={book} />)
          ) : (
            <ListEmpty
              message="Você ainda não criou nenhum livro para esse projeto."
              icon={<Books size={48} />}
            />
          )}
        </BooksContainer>
      </ProjectPageLayout>
    </>
  )
}
