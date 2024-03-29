import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { Projects } from '@components/ProjectsComponents/Projects'
import { usePreventBack } from '../../hooks/usePreventDefaultBack'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'
import { Heading } from '@components/usefull/Heading'
import { Container } from './styles'
import { useWindowSize } from '@hooks/useWindow'
import { ModelsHeader } from '@components/ModelsHeader'
import { useProjects } from '@hooks/useProjects'

export default function ProjectsPage() {
  usePreventBack()
  const [query, setQuery] = useState<string | undefined>(undefined)

  const { projects, loadingProjects } = useProjects({
    config: {
      query,
    },
  })

  const { smallWindow } = useWindowSize()

  return (
    <>
      <NextSeo title="Projetos | Magiscrita" noindex />

      <DashboardPageLayout
        window={`Projetos: ${projects.length}`}
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
            projects={projects}
            query={query}
            isLoading={loadingProjects}
          />
        </Container>
      </DashboardPageLayout>
    </>
  )
}
