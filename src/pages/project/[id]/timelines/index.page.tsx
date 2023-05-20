import { IError } from '@@types/errors/IError'
import { TimelineCard } from '@components/TimelinesComponents/TimelineCard'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Checkbox } from '@components/usefull/Checkbox'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { Toast } from '@components/usefull/Toast'
import { ToastError } from '@components/usefull/ToastError'
import { useProject } from '@hooks/useProject'
import { useToDoTimeLines } from '@hooks/useToDoTimeLines'
import { useUser } from '@hooks/useUser'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  Copy,
  HourglassSimpleMedium,
  ListChecks,
  Timer,
  X,
} from 'phosphor-react'
import { useState } from 'react'

export default function TimelinesPage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [error, setError] = useState<IError | null>(null)
  const [isCopySelected, setIsCopySelected] = useState(false)
  const [timeLineToDoSelected, setTimeLineToDoSelected] = useState('')
  const router = useRouter()
  const { id } = router.query

  const {
    projectName,
    loadingProject,
    project,
    mainTimeLine,
    permission,
    callEvent,
    todoFirst,
  } = useProject(id as string)

  const { userIsPro } = useUser()
  const { toDoTimeLines } = useToDoTimeLines()

  async function handleCopyTimeLineToProject() {
    const { resolved, error } = await callEvent.copyTimeLineToProject(
      timeLineToDoSelected,
    )

    if (error) {
      setError(error)
      return
    }

    if (resolved) {
      setIsCopySelected(false)
      setTimeLineToDoSelected('')
      setSuccessToastOpen(true)
      setError(null)
    }
  }

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
        <ToastError error={error} setError={setError} />
        <Toast
          title="Copiado"
          message="Linha de tempo copiada"
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
        />

        <ContainerGrid padding={6}>
          <ContainerGrid
            padding={0}
            css={{ gridTemplateColumns: '5fr 2fr', alignItems: 'center' }}
          >
            <HeadingPart
              label="Linha de tempo principal:"
              icon={<HourglassSimpleMedium size={38} />}
              inTop
            />

            {userIsPro && permission === 'edit' && (
              <ButtonRoot
                size="xs"
                variant="noShadow"
                align="center"
                onClick={() => setIsCopySelected(!isCopySelected)}
              >
                <ButtonIcon>{isCopySelected ? <X /> : <Copy />}</ButtonIcon>

                <ButtonLabel>
                  {isCopySelected
                    ? 'Cancelar'
                    : 'Copiar linha de tempo "To do" para o projeto'}
                </ButtonLabel>
              </ButtonRoot>
            )}
          </ContainerGrid>

          {isCopySelected && (
            <>
              {toDoTimeLines.map((toDoTimeLine) => (
                <ContainerGrid
                  key={toDoTimeLine.id}
                  padding={4}
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    boxShadow: '$default',
                  }}
                  darkBackground
                >
                  <ContainerGrid padding={0} columns={3}>
                    <InfoDefault title="Titulo">
                      <Text family="body" size="lg" weight="bold">
                        {toDoTimeLine.title}
                      </Text>
                    </InfoDefault>

                    <InfoDefault title="Descrição">
                      <Text family="body" size="lg" weight="bold">
                        {toDoTimeLine.description}
                      </Text>
                    </InfoDefault>

                    <InfoDefault title="Numero de eventos">
                      <Text family="body" size="lg" weight="bold">
                        {toDoTimeLine.timeEvents.length}
                      </Text>
                    </InfoDefault>
                  </ContainerGrid>

                  <InfoDefault
                    css={{ width: 'unset', alignItems: 'center' }}
                    title="Selecionar"
                  >
                    <Checkbox
                      checked={timeLineToDoSelected === toDoTimeLine.id}
                      onCheckedChange={() =>
                        setTimeLineToDoSelected(toDoTimeLine.id)
                      }
                    />
                  </InfoDefault>
                </ContainerGrid>
              ))}

              <ButtonRoot
                size="xs"
                variant="noShadow"
                align="center"
                onClick={handleCopyTimeLineToProject}
                disabled={!timeLineToDoSelected}
              >
                <ButtonIcon>
                  <Copy />
                </ButtonIcon>

                <ButtonLabel>Copiar</ButtonLabel>
              </ButtonRoot>
            </>
          )}

          <TimelineCard isMain timeline={mainTimeLine!} />

          {todoFirst && (
            <ContainerGrid padding={0}>
              <HeadingPart icon={<ListChecks size={40} />} label="To-do" />
              <ContainerGrid padding={0} columns={2}>
                <InfoDefault title="Titulo">
                  <Text family="body" size="xl">
                    {todoFirst.title}
                  </Text>
                </InfoDefault>

                <InfoDefault title="Descrição">
                  <Text family="body" size="xl">
                    {todoFirst.title}
                  </Text>
                </InfoDefault>
              </ContainerGrid>
              <TimelineCard isMain timeline={todoFirst} />
            </ContainerGrid>
          )}

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
