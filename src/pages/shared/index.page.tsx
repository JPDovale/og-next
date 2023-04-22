import { ModelsHeader } from '@components/ModelsHeader'
import { Projects } from '@components/ProjectsComponents/Projects'
import { Heading } from '@components/usefull/Heading'
import { ToastError } from '@components/usefull/ToastError'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProjects } from '@hooks/useProjects'
import { useWindowSize } from '@hooks/useWindow'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import { Container } from './styles'

export default function SharedPage() {
  usePreventBack()
  const [query, setQuery] = useState('')

  const { loading, error, setError } = useContext(ProjectsContext)
  const { projectsSharedWithUser } = useProjects()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <>
      <NextSeo title="Projetos compartilhados comigo | Ognare" noindex />

      <DashboardPageLayout
        window={`Compartilhados: ${
          projectsSharedWithUser ? projectsSharedWithUser.length : 0
        }`}
        query={query}
        setQuery={setQuery}
        queryless={!!projectsSharedWithUser[0]}
      >
        <Container>
          {!smallWindow && (
            <>
              <ModelsHeader />
              <Heading size="sm">Projetos:</Heading>
            </>
          )}

          <Projects
            projects={projectsSharedWithUser}
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
