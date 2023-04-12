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

export default function SharedPage() {
  const [query, setQuery] = useState('')

  const { projects, loading, error, setError } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  usePreventBack()

  const projectsSharedWhitUser =
    projects?.filter((project) => project.createdPerUser !== user?.id) || []

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <>
      <NextSeo title="Projetos compartilhados comigo | Ognare" noindex />

      <DashboardPageLayout
        window={`Compartilhados: ${
          projectsSharedWhitUser ? projectsSharedWhitUser.length : 0
        }`}
        query={query}
        setQuery={setQuery}
        queryless={!!projectsSharedWhitUser[0]}
      >
        <Container>
          {!smallWindow && (
            <>
              <ModelsHeader />
              <Heading size="sm">Projetos:</Heading>
            </>
          )}

          <Projects
            projects={projectsSharedWhitUser}
            listEmptyMessage="Nenhum projeto foi compartilhado com você ainda"
            query={query}
            isLoading={loading}
          />
        </Container>

        <ToastError error={error} setError={setError} />
      </DashboardPageLayout>
    </>
  )
}
