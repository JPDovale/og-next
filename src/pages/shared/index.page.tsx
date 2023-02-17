import { Projects } from '@components/ProjectsComponents/Projects'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'

export default function SharedPage() {
  const [query, setQuery] = useState('')

  const { projects, loading } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  usePreventBack()

  const projectsSharedWhitUser =
    projects?.filter((project) => project.createdPerUser !== user?.id) || []

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
        <Projects
          projects={projectsSharedWhitUser}
          listEmptyMessage="Nenhum projeto foi compartilhado com você ainda"
          query={query}
          isLoading={loading}
        />
      </DashboardPageLayout>
    </>
  )
}
