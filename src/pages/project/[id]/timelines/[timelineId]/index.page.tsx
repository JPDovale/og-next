import * as Dialog from '@radix-ui/react-dialog'
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
import { Check, MagnifyingGlass, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { EventCard, EventImportance, EventInfos, EventTime } from './styles'
import { NewTimeEventModal } from '@components/TimelinesComponents/NewTimeEventModal'
import { getDate } from '@utils/dates/getDate'
import { NewTimeEventToDoToDoModal } from '@components/TimelinesComponents/NewTimeEventToDoModal'
import { ITimeEvent } from '@api/responsesTypes/timeline/ITimeLine'
// import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'

interface IEventInThisMonth {
  day: string
  events: ITimeEvent[]
}

export default function TimeLinePage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [eventSelected, setEventSelected] = useState('')
  const router = useRouter()
  const { id, timelineId } = router.query

  const { projectName, loadingProject, project, findTimeLine, callEvent } =
    useProject(id as string)

  const { timeLine, eventsInChronologicOrd } = findTimeLine(
    timelineId as string,
  )

  const monthsWeenExistsEvent = eventsInChronologicOrd.filter(
    (event, i, self) =>
      i ===
      self.findIndex(
        (obj) =>
          obj.happened.month === event.happened.month &&
          obj.happened.year === event.happened.year,
      ),
  )
  const eventInitial = monthsWeenExistsEvent[currentEventIndex]
  const monthEvent = getMonthName(eventInitial?.happened.month)

  const { eventsInThisMonth, eventsAllocatedInThisMonth } = useMemo(() => {
    const currentDate = dayjs(eventInitial?.happened.timestamp)
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
          event.happened.month === dayIsInMonth.toString().padStart(2, '0') &&
          event.happened.year === currentDate.get('year').toString()
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
        const eventAllocatedInThisDay = eventAllocated.happened.day === i + 1

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
    eventSelectedToShow?.collections.timeEventBorn?.person.id ?? '',
  )

  function handleSelectEvent(id: string) {
    if (id === eventSelected) {
      setEventSelected('')
      return
    }

    setEventSelected(id)
  }

  async function handleDoneTimeEvent() {
    await callEvent.changeDoneTimeEvent(eventSelectedToShow.id, timeLine!.id)
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

                {timeLine?.infos.type === 'plan' ? (
                  <NewTimeEventModal projectId={project?.id ?? ''} />
                ) : (
                  <NewTimeEventToDoToDoModal
                    timeLineId={timelineId as string}
                  />
                )}
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
                          importance={event.infos.importance}
                          key={event.id}
                          onClick={() => handleSelectEvent(event.id)}
                          selected={
                            eventSelected ? eventSelected === event.id : 'none'
                          }
                        >
                          <EventTime>
                            <Text weight="bold" family="body" size="lg">
                              {event.happened.hour.toString().padStart(2, '0')}:
                              {event.happened.minute
                                .toString()
                                .padStart(2, '0')}
                              :
                              {event.happened.second
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
                <Text weight="bold" family="body" size="2xl" height="shorter">
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

              {!eventSelectedToShow?.collections.timeEventToDo && (
                <EventImportance
                  importance={eventSelectedToShow?.infos.importance}
                >
                  Nível de importância do evento:{' '}
                  {eventSelectedToShow?.infos.importance}
                </EventImportance>
              )}

              {eventSelectedToShow?.collections.timeEventBorn &&
                personInEventIfExiste && (
                  <ContainerGrid padding={0} columns={1}>
                    <InfoDefault title="Personagem:">
                      <ContainerGrid columns={2} padding={0}>
                        <AvatarWeb
                          size="2xl"
                          src={personInEventIfExiste.image.url}
                        />
                        <ContainerGrid padding={0} css={{ gap: '0' }}>
                          <InfoDefault title="Nome" size="xs">
                            {personInEventIfExiste?.name.full}
                          </InfoDefault>

                          <InfoDefault title="Idade" size="xs">
                            {personInEventIfExiste?.age.number}
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

              {eventSelectedToShow?.collections.timeEventToDo &&
                eventSelectedToShow.infos.importance > 2 && (
                  <ContainerGrid padding={0}>
                    <InfoDefault
                      title={
                        eventSelectedToShow?.collections.timeEventToDo
                          ?.completed_at
                          ? 'Concluído:'
                          : 'Marcar como concluído'
                      }
                    >
                      {eventSelectedToShow?.collections.timeEventToDo
                        .completed_at ? (
                        <Text family="body" size="lg" weight="bold">
                          {getDate(
                            eventSelectedToShow?.collections.timeEventToDo
                              .completed_at,
                          )}
                        </Text>
                      ) : (
                        <ButtonRoot
                          onClick={handleDoneTimeEvent}
                          size="xs"
                          variant="noShadow"
                        >
                          <ButtonIcon>
                            <Check />
                          </ButtonIcon>

                          <ButtonLabel>Marcar como concluído</ButtonLabel>
                        </ButtonRoot>
                      )}
                    </InfoDefault>
                    {/* 
                  <CommentsOnPage
                    onNewComment={() => {}}
                    comments={eventSelectedToShow.comments}
                    size="xxs"
                  /> */}
                  </ContainerGrid>
                )}
            </ContainerGrid>
          </ContainerGrid>
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
