import { ModelsHeader } from '@components/ModelsHeader'
import { Projects } from '@components/ProjectsComponents/Projects'
import { Heading } from '@components/usefull/Heading'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProjects } from '@hooks/useProjects'
import { useWindowSize } from '@hooks/useWindow'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { Container } from './styles'

export default function SharedPage() {
  usePreventBack()
  const [query, setQuery] = useState('')

  const { projectsSharedWithUser, loadingProjects } = useProjects()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <>
      <NextSeo title="Projetos compartilhados comigo | Magiscrita" noindex />

      <DashboardPageLayout
        window={`Compartilhados: ${
          projectsSharedWithUser ? projectsSharedWithUser.length : 0
        }`}
        query={query}
        setQuery={setQuery}
        queryless
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
            isLoading={loadingProjects}
          />
        </Container>
      </DashboardPageLayout>
    </>
  )
}
