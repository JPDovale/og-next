import { Projects } from '@components/ProjectsComponents/Projects'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'

export default function ProjectsPage() {
  const [query, setQuery] = useState('')

  const { projects, loading } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

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
        <Projects
          listEmptyMessage="Você ainda não criou nenhum projeto"
          projects={projectsThisUser}
          query={query}
          isLoading={loading}
        />
      </DashboardPageLayout>
    </>
  )
}
