import { CardBook } from '@components/BooksComponents/CardBook'
import { DefaultError } from '@components/usefull/DefaultError'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { Button } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Books } from 'phosphor-react'
import { useContext } from 'react'

import { BooksContainer, NewBookButtonContainer } from './styles'

export default function BooksPage() {
  const { loading, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const { project, projectName, booksThisProject } = useProject(id as string)

  return (
    <>
      <NextSeo title={`${projectName}-Livros | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
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
            booksThisProject.map((book) => (
              <CardBook key={book.id} book={book} />
            ))
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
