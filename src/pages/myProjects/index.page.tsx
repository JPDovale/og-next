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

export default function ProjectsPage() {
  usePreventBack()

  const [query, setQuery] = useState('')

  const { projectsThisUser, loadingProjects } = useProjects({
    config: {
      query,
    },
  })

  const { smallWindow } = useWindowSize()

  return (
    <>
      <NextSeo title="Meus projetos | Magiscrita" noindex />

      <DashboardPageLayout
        window={`Meus projetos: ${
          projectsThisUser ? projectsThisUser.length : 0
        }`}
        query={query}
        setQuery={setQuery}
        loading={loadingProjects}
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
            listEmptyMessage="Você ainda não criou nenhum projeto"
            projects={projectsThisUser}
            query={query}
            isLoading={loadingProjects}
          />
        </Container>
      </DashboardPageLayout>
    </>
  )
}
