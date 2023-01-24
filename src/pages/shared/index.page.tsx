import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import { Loading } from '../../components/Loading'
import { Projects } from '../../components/Projects'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'
import { usePreventBack } from '../../hooks/usePreventDefaultBack'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'

export default function SharedPage() {
  usePreventBack()

  const [query, setQuery] = useState('')

  const { projects, loading } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  if (loading) return <Loading />

  const projectsSharedWhitUser = projects.filter(
    (project) => project.createdPerUser !== user?.id,
  )

  return (
    <>
      <NextSeo title="Projetos compartilhados comigo | Ognare" noindex />

      <DashboardPageLayout
        window="Compartilhados"
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
