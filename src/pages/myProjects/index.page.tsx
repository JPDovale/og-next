import { ModelsHeader } from '@components/ModelsHeader'
import { Projects } from '@components/ProjectsComponents/Projects'
import { Heading } from '@components/usefull/Heading'
import { ToastError } from '@components/usefull/ToastError'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import { Container } from './styles'

export default function ProjectsPage() {
  const [query, setQuery] = useState('')

  const { projects, loading, error, setError } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786
  usePreventBack()

  const projectsThisUser = projects?.filter(
    (project) => project.createdPerUser === user?.id,
  )

  return (
    <>
      <NextSeo title="Meus projetos | Ognare" noindex />

      <DashboardPageLayout
        window={`Meus projetos: ${
          projectsThisUser ? projectsThisUser.length : 0
        }`}
        query={query}
        setQuery={setQuery}
        loading={loading}
        queryless={projectsThisUser && !!projectsThisUser[0]}
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
            projects={projectsThisUser}
            query={query}
            isLoading={loading}
          />
        </Container>

        <ToastError error={error} setError={setError} />
      </DashboardPageLayout>
    </>
  )
}
