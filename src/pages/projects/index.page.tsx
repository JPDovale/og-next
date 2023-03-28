import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import { Projects } from '@components/ProjectsComponents/Projects'
import { ProjectsContext } from '../../contexts/projects'
import { usePreventBack } from '../../hooks/usePreventDefaultBack'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'
import { Heading } from '@components/usefull/Heading'
import { Container } from './styles'
import { useWindowSize } from '@hooks/useWindow'
import { ToastError } from '@components/usefull/ToastError'
import { ModelsHeader } from '@components/ModelsHeader'

export default function ProjectsPage() {
  usePreventBack()

  const [query, setQuery] = useState('')

  const { projects, loading, error, setError } = useContext(ProjectsContext)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <>
      <NextSeo title="Projetos | Ognare" noindex />

      <DashboardPageLayout
        window={`Projetos: ${projects ? projects.length : 0}`}
        query={query}
        setQuery={setQuery}
        loading={loading}
        queryless={projects && !!projects[0]}
      >
        <Container>
          {!smallWindow && (
            <>
              <ModelsHeader />
              <Heading size="sm">Projetos:</Heading>
            </>
          )}
          <Projects
            listEmptyMessage="Você ainda não criou nenhum projeto"
            projects={projects}
            query={query}
            isLoading={loading}
          />
        </Container>

        <ToastError error={error} setError={setError} />
      </DashboardPageLayout>
    </>
  )
}
