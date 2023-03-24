import { CardBox } from '@components/BoxesComponents/CardBox'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Package } from 'phosphor-react'
import { useContext } from 'react'

export default function BoxesProjectPage() {
  const { loading } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const { project, projectName, boxesThisProject } = useProject(id as string)

  const existesOneBox = boxesThisProject && boxesThisProject[0]

  return (
    <>
      <NextSeo title={`${projectName}-Livros | Ognare`} noindex />

      <ProjectPageLayout
        inError={!loading && !project}
        projectId={project?.id}
        projectName={projectName}
        paths={['Boxes', 'Internas']}
        loading={loading}
        isScrolling
      >
        <ContainerGrid
          columns={existesOneBox ? 2 : 1}
          padding={8}
          css={{ gap: '$8' }}
        >
          {existesOneBox ? (
            boxesThisProject.map((box) => (
              <CardBox key={box.id} box={box} isInternal />
            ))
          ) : (
            <ListEmpty
              icon={<Package size={40} />}
              message="Não se preocupe... As boxes dos projetos são criadas automaticamente para organizar os arquivos..."
            />
          )}
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
