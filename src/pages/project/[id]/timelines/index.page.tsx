import { TimelineCard } from '@components/TimelinesComponents/TimelineCard'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { HourglassSimpleMedium, Timer } from 'phosphor-react'

export default function TimelinesPage() {
  const router = useRouter()
  const { id } = router.query

  const { projectName, loadingProject, project, mainTimeLine } = useProject(
    id as string,
  )

  return (
    <>
      <NextSeo title={`${projectName}-Time-lines | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Time-lines']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        inErrorNotAuthorized={!project?.features.timeLines}
        isScrolling
      >
        <ContainerGrid padding={6}>
          <HeadingPart
            label="Linha de tempo principal:"
            icon={<HourglassSimpleMedium size={38} />}
            inTop
          />

          <TimelineCard isMain timeline={mainTimeLine!} />

          <HeadingPart
            label="Linhas de tempo alternativas"
            icon={<Timer size={38} />}
          />

          <ContainerGrid columns={2} padding={0}></ContainerGrid>
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
