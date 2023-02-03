import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { DefaultError } from '../../../../../components/DefaultError'
import { ProjectsContext } from '../../../../../contexts/projects'
import { usePreventBack } from '../../../../../hooks/usePreventDefaultBack'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function BookPage() {
  const { projects, loading, books, error, setError } =
    useContext(ProjectsContext)

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
      </ProjectPageLayout>
    </>
  )
}
