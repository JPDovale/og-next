import * as Dialog from '@radix-ui/react-dialog'
import { ITimeEvent } from '@api/responsesTypes/ITimeLineResponse'
import { TimeLineCalendar } from '@components/TimelinesComponents/TimeLineCalendar'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { usePerson } from '@hooks/usePerson'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { getMonthName } from '@utils/dates/parserMonthName'
import dayjs from 'dayjs'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { MagnifyingGlass, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { EventCard, EventImportance, EventInfos, EventTime } from './styles'
import { NewTimeEventModal } from '@components/TimelinesComponents/NewTimeEventModal'

interface IEventInThisMonth {
  day: string
  events: ITimeEvent[]
}

export default function TimeLinePage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [eventSelected, setEventSelected] = useState('')
  const router = useRouter()
  const { id, timelineId } = router.query

  const { projectName, loadingProject, project, findTimeLine } = useProject(
    id as string,
  )

  const { timeLine, eventsInChronologicOrd } = findTimeLine(
    timelineId as string,
  )

  const monthsWeenExistsEvent = eventsInChronologicOrd.filter(
    (event, i, self) =>
      i ===
      self.findIndex(
        (obj) =>
          obj.happened_month === event.happened_month &&
          obj.happened_year === event.happened_year,
      ),
  )
  const eventInitial = monthsWeenExistsEvent[currentEventIndex]
  const monthEvent = getMonthName(eventInitial?.happened_month)

  const { eventsInThisMonth, eventsAllocatedInThisMonth } = useMemo(() => {
    const currentDate = dayjs(Number(eventInitial?.happened_date_timestamp))
      .add(1, 'day')
      .set('date', 1)

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const dayIsInMonth = currentDate.get('month') + 1
    const eventsAllocatedInThisMonth = eventsInChronologicOrd.filter(
      (event) => {
        return (
          event.happened_month === dayIsInMonth.toString().padStart(2, '0') &&
          event.happened_year === currentDate.get('year').toString()
        )
      },
    )

    const eventsInThisMonth: IEventInThisMonth[] = []

    daysInMonthArray.map((_, i) => {
      const eventsInThisDay: IEventInThisMonth = {
        day: `${i + 1}`,
        events: [],
      }

      eventsAllocatedInThisMonth.map((eventAllocated) => {
        const eventAllocatedInThisDay = eventAllocated.happened_day === i + 1

        if (eventAllocatedInThisDay) {
          eventsInThisDay.events.push(eventAllocated)
        }

        return true
      })

      if (eventsInThisDay.events.length !== 0) {
        eventsInThisMonth.push(eventsInThisDay)
      }

      return true
    })

    return { eventsInThisMonth, eventsAllocatedInThisMonth }
  }, [eventInitial, eventsInChronologicOrd])

  const eventSelectedToShow =
    eventsInChronologicOrd.find((event) => event.id === eventSelected) ??
    eventInitial

  const { person: personInEventIfExiste } = usePerson(
    eventSelectedToShow?.timeEventBorn?.person.id ?? '',
  )

  function handleSelectEvent(id: string) {
    if (id === eventSelected) {
      setEventSelected('')
      return
    }

    setEventSelected(id)
  }

  return (
    <>
      <NextSeo title={`${projectName}-Time-lines | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Time-lines', `${timeLine?.title ?? 'Linha principal'}`]}
        loading={loadingProject}
        inError={!loadingProject && !project}
        inErrorNotAuthorized={!project?.features.timeLines}
        isFullScreen
      >
        <ContainerGrid columns={3} padding={4} css={{ height: '100%' }}>
          <ContainerGrid
            padding={0}
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              maxHeight: 'calc(100vh - 90px)',
              gap: '$4',
            }}
          >
            <TimeLineCalendar
              timeEvents={eventsInChronologicOrd}
              currentEventIndex={currentEventIndex}
              setCurrentEventIndex={setCurrentEventIndex}
              onSelectDay={handleSelectEvent}
            />

            <ContainerGrid
              css={{
                height: '100%',
                overflowY: 'scroll',
                boxShadow: '$default',
              }}
              darkBackground
            >
              <InfoDefault title="Eventos nesse mês:">
                <ContainerGrid padding={0}>
                  {eventsAllocatedInThisMonth.map((event) => (
                    <InfoDefault
                      css={{
                        padding: '$2',
                        background: '$gray700',
                        borderRadius: '$sm',
                      }}
                      size="xs"
                      title="Titulo"
                      key={event.id}
                    >
                      <Text family="body" height="shorter">
                        {event.title}
                      </Text>
                    </InfoDefault>
                  ))}
                </ContainerGrid>
              </InfoDefault>
            </ContainerGrid>
          </ContainerGrid>

          <ContainerGrid
            padding={4}
            css={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxHeight: 'calc(100vh - 90px)',
              boxShadow: '$default',
              gap: '$4',
              overflow: 'auto',
            }}
            darkBackground
          >
            <ContainerGrid
              padding={0}
              css={{ display: 'flex', flexDirection: 'column', gap: '$1' }}
            >
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <ButtonRoot size="xxs" align="center" variant="noShadow">
                    <ButtonLabel>Criar evento</ButtonLabel>
                  </ButtonRoot>
                </Dialog.Trigger>

                <NewTimeEventModal projectId={project!.id} />
              </Dialog.Root>

              <TextInputRoot size="xxs" variant="noShadow">
                <TextInputIcon>
                  <MagnifyingGlass />
                </TextInputIcon>

                <TextInputInput placeholder="Encontre um evento" disabled />
              </TextInputRoot>
            </ContainerGrid>

            <InfoDefault title="Eventos:" size="lg">
              <ContainerGrid padding={0}>
                {eventsInThisMonth.map(({ day, events }) => (
                  <ContainerGrid padding={0} key={day} css={{ gap: '$1' }}>
                    <Text
                      size="2xl"
                      family="body"
                      weight="bold"
                      height="shorter"
                    >
                      {day} de {monthEvent}:
                    </Text>

                    <ContainerGrid padding={0}>
                      {events.map((event) => (
                        <EventCard
                          importance={event.importance}
                          key={event.id}
                          onClick={() => handleSelectEvent(event.id)}
                          selected={
                            eventSelected ? eventSelected === event.id : 'none'
                          }
                        >
                          <EventTime>
                            <Text weight="bold" family="body" size="lg">
                              {event.happened_hour.toString().padStart(2, '0')}:
                              {event.happened_minute
                                .toString()
                                .padStart(2, '0')}
                              :
                              {event.happened_second
                                .toString()
                                .padStart(2, '0')}
                            </Text>
                          </EventTime>

                          <EventInfos>
                            <Text
                              weight="bold"
                              family="body"
                              height="shorter"
                              size="lg"
                            >
                              {event.title}
                            </Text>
                            <Text family="body" height="shorter">
                              {event.description}
                            </Text>
                          </EventInfos>
                        </EventCard>
                      ))}
                    </ContainerGrid>
                  </ContainerGrid>
                ))}
              </ContainerGrid>
            </InfoDefault>
          </ContainerGrid>

          <ContainerGrid
            padding={4}
            css={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxHeight: 'calc(100vh - 90px)',
              boxShadow: '$default',
              gap: '$4',
              overflow: 'auto',
            }}
            darkBackground
          >
            <ContainerGrid padding={0} css={{ gap: '$4' }}>
              <ContainerGrid
                padding={0}
                css={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text weight="bold" family="body" size="3xl" height="shorter">
                  {eventSelectedToShow?.title}
                </Text>

                <ButtonRoot
                  size="xs"
                  title="Apagar evento"
                  variant="noShadow"
                  wid="hug"
                  css={{ background: '$fullError' }}
                  disabled
                >
                  <ButtonIcon>
                    <Trash />
                  </ButtonIcon>
                </ButtonRoot>
              </ContainerGrid>

              <Text family="body" height="shorter">
                {eventSelectedToShow?.description}
              </Text>

              <EventImportance importance={eventSelectedToShow?.importance}>
                Nível de importância do evento:{' '}
                {eventSelectedToShow?.importance}
              </EventImportance>

              {eventSelectedToShow?.timeEventBorn && personInEventIfExiste && (
                <ContainerGrid padding={0} columns={1}>
                  <InfoDefault title="Personagem:">
                    <ContainerGrid columns={2} padding={0}>
                      <AvatarWeb
                        size="2xl"
                        src={personInEventIfExiste.image_url ?? undefined}
                      />
                      <ContainerGrid padding={0} css={{ gap: '0' }}>
                        <InfoDefault title="Nome" size="xs">
                          {personInEventIfExiste?.name}{' '}
                          {personInEventIfExiste?.last_name}
                        </InfoDefault>

                        <InfoDefault title="Idade" size="xs">
                          {personInEventIfExiste?.age}
                        </InfoDefault>
                      </ContainerGrid>
                    </ContainerGrid>
                  </InfoDefault>

                  <InfoDefault title="História:">
                    <Text
                      family="body"
                      height="shorter"
                      size="lg"
                      dangerouslySetInnerHTML={{
                        __html: personInEventIfExiste?.history,
                      }}
                    />
                  </InfoDefault>
                </ContainerGrid>
              )}
            </ContainerGrid>
          </ContainerGrid>
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
