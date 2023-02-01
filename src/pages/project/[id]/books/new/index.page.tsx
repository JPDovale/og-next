import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { DefaultError } from '../../../../../components/DefaultError'
import { ProjectsContext } from '../../../../../contexts/projects'
import { usePreventBack } from '../../../../../hooks/usePreventDefaultBack'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function NewBookPage() {
  const { projects, loading, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/books`)

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Novo livro | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Livros', 'Novo']}
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
      </ProjectPageLayout>
    </>
  )
}
