import * as Dialog from '@radix-ui/react-dialog'
import { ITimeEvent } from '@api/responsesTypes/ITimeLineResponse'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { useToDoTimeLines } from '@hooks/useToDoTimeLines'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { orderDatesOfTimelines } from '@services/orderElements'
import { getMonthName } from '@utils/dates/parserMonthName'
import dayjs from 'dayjs'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { MagnifyingGlass, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { EventCard, EventImportance, EventInfos, EventTime } from './styles'
import { Calendar } from '@components/usefull/Calendar'
import { NewTimeEventToDoToDoModal } from '@components/TimelinesComponents/NewTimeEventToDoModal'

interface IEventInThisMonth {
  day: string
  events: ITimeEvent[]
}

interface ICalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type ICalendarWeeks = ICalendarWeek[]

export default function ToDoTimeLinePage() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const [eventSelected, setEventSelected] = useState('')

  const router = useRouter()
  const { timelineId } = router.query

  const { findTimeLine, loadingToDoTimeLines, callEvent } = useToDoTimeLines()

  const { timeline } = findTimeLine(timelineId as string)
  const eventsInChronologicOrd = orderDatesOfTimelines(
    timeline?.timeEvents ?? [],
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

  const startDate = dayjs(timeline?.start_date)
  const endDate = dayjs(timeline?.end_date)
  const diferenceMonthsBetweenDate = endDate.diff(startDate, 'month')

  const { calendarWeeks } = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')
    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({ date, disabled: true })),
      ...daysInMonthArray.map((date) => ({ date, disabled: false })),
      ...nextMonthFillArray.map((date) => ({ date, disabled: true })),
    ]

    const calendarWeeks = calendarDays.reduce<ICalendarWeeks>(
      (weeks, _, i, self) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: self.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return { calendarWeeks }
  }, [currentDate])

  function handleNextMonth() {
    setCurrentEventIndex((state) => state + 1)
    setCurrentDate((state) => state.add(1, 'month'))
  }

  function handlePreviousMonth() {
    setCurrentEventIndex((state) => state - 1)
    setCurrentDate((state) => state.subtract(1, 'month'))
  }

  const eventSelectedToShow =
    eventsInChronologicOrd.find((event) => event.id === eventSelected) ??
    eventInitial

  function handleSelectEvent(id: string) {
    if (id === eventSelected) {
      setEventSelected('')
      return
    }

    setEventSelected(id)
  }

  async function handleDeleteToDoEvent() {
    const { resolved, error } = await callEvent.deleteToDoTimeEvent(
      timelineId as string,
      eventSelectedToShow.id,
    )

    if (resolved) {
      setEventSelected(eventsInChronologicOrd[0].id ?? '')
    }

    if (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <NextSeo
        title={`ToDo Time Line ${timeline?.title} | Magiscrita`}
        noindex
      />

      <DashboardPageLayout
        window={`Todo time lines ${timeline?.title}`}
        loading={loadingToDoTimeLines}
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
            <Calendar
              timeEvents={eventsInChronologicOrd}
              onSelectDay={handleSelectEvent}
              calendarWeeks={calendarWeeks}
              currentDate={{
                calendarTitle: `${getMonthName(
                  (currentDate.get('month') + 1).toString().padStart(2, '0'),
                )} ${currentDate.get('year').toString().replace('-', '')} ${
                  currentDate.get('year').toString().includes('-')
                    ? 'A.C.'
                    : 'D.C.'
                }`,
                index: currentEventIndex,
              }}
              handleNextDate={handleNextMonth}
              handlePreviousDate={handlePreviousMonth}
              maxLengthCalendar={diferenceMonthsBetweenDate}
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

                <NewTimeEventToDoToDoModal timeLineId={timelineId as string} />
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
                  onClick={handleDeleteToDoEvent}
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
            </ContainerGrid>
          </ContainerGrid>
        </ContainerGrid>
      </DashboardPageLayout>
    </>
  )
}
