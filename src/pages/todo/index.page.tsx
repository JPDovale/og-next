import * as Dialog from '@radix-ui/react-dialog'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { useToDoTimeLines } from '@hooks/useToDoTimeLines'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { HourglassMedium, ListChecks } from 'phosphor-react'
import { NewToDoTimeLineModal } from '@components/TimelinesComponents/NewToDoTimeLineModal'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { getDate } from '@utils/dates/getDate'
import { useRouter } from 'next/router'

export default function ToDoPage() {
  const router = useRouter()

  const { toDoTimeLines, loadingToDoTimeLines } = useToDoTimeLines()

  return (
    <>
      <NextSeo title="ToDo | Magiscrita" noindex />

      <DashboardPageLayout
        loading={loadingToDoTimeLines}
        window={`ToDo: ${toDoTimeLines.length}`}
      >
        <ContainerGrid padding={4}>
          <ContainerGrid padding={4} columns={4} darkBackground>
            <InfoDefault title="Criar linha de tempo">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <ButtonRoot variant="noShadow" size="sm">
                    <ButtonIcon>
                      <ListChecks />
                    </ButtonIcon>
                    <ButtonLabel>Criar linha de tempo estilo ToDo</ButtonLabel>
                  </ButtonRoot>
                </Dialog.Trigger>

                <NewToDoTimeLineModal />
              </Dialog.Root>
            </InfoDefault>
          </ContainerGrid>

          <HeadingPart
            icon={<HourglassMedium size={40} />}
            label="ToDo Time lines"
          />

          <ContainerGrid padding={0} columns={2}>
            {toDoTimeLines.map((toDoTimeLine) => (
              <ContainerGrid
                onClick={() => router.push(`todo/timelines/${toDoTimeLine.id}`)}
                css={{ boxShadow: '$default', cursor: 'pointer' }}
                key={toDoTimeLine.id}
                padding={4}
                darkBackground
              >
                <InfoDefault title="Titulo">{toDoTimeLine.title}</InfoDefault>
                <InfoDefault title="Descrição">
                  {toDoTimeLine.description}
                </InfoDefault>

                <ContainerGrid padding={0} columns={2}>
                  <InfoDefault title="Dia de inicio">
                    {getDate(toDoTimeLine.startDate)}
                  </InfoDefault>
                  <InfoDefault title="Dia de fim">
                    {getDate(toDoTimeLine.endDate)}
                  </InfoDefault>
                </ContainerGrid>
              </ContainerGrid>
            ))}
          </ContainerGrid>
        </ContainerGrid>
      </DashboardPageLayout>
    </>
  )
}
