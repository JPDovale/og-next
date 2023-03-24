import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import { Projects } from '@components/ProjectsComponents/Projects'
import { ProjectsContext } from '../../contexts/projects'
import { usePreventBack } from '../../hooks/usePreventDefaultBack'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Heading } from '@components/usefull/Heading'
import { Container } from './styles'
import { CardModelNewProject } from '@components/ProjectsComponents/CardModelNewProject'
import { CardModelNewBox } from '@components/BoxesComponents/CardModelNewBox'
import { useWindowSize } from '@hooks/useWindow'
import { CardModelNewPerson } from '@components/PersonsComponents/CardModelNewPerson'
import { ToastError } from '@components/usefull/ToastError'

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
              <Heading size="sm">Modelos:</Heading>
              <ContainerGrid padding={0} columns={3} css={{ gap: '$8' }}>
                <CardModelNewProject />
                <CardModelNewPerson />
                <CardModelNewBox />
              </ContainerGrid>
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
