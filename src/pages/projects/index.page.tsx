import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import { Projects } from '@components/ProjectsComponents/Projects'
import { ProjectsContext } from '../../contexts/projects'
import { usePreventBack } from '../../hooks/usePreventDefaultBack'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'

export default function ProjectsPage() {
  usePreventBack()

  const [query, setQuery] = useState('')

  const { projects, loading } = useContext(ProjectsContext)

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
        <Projects
          listEmptyMessage="Você ainda não criou nenhum projeto"
          projects={projects}
          query={query}
          isLoading={loading}
        />
      </DashboardPageLayout>
    </>
  )
}
