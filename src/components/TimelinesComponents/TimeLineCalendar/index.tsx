import { ITimeEvent } from '@api/responsesTypes/ITimeLineResponse'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Text } from '@components/usefull/Text'
import { getMonthName } from '@utils/dates/parserMonthName'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo } from 'react'
import { CalendarBody, CalendarDay, EventsInDayIndicator } from './styles'

interface ICalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type ICalendarWeeks = ICalendarWeek[]

interface ITimeLineCalendar {
  timeEvents: ITimeEvent[]
  currentEventIndex: number
  setCurrentEventIndex: (newState: number) => void
  onSelectDay: (firstEventId: string) => void
}

export function TimeLineCalendar({
  timeEvents,
  currentEventIndex = 0,
  setCurrentEventIndex,
  onSelectDay,
}: ITimeLineCalendar) {
  const monthsWeenExistsEvent = timeEvents.filter(
    (event, i, self) =>
      i ===
      self.findIndex(
        (obj) =>
          obj.happened_month === event.happened_month &&
          obj.happened_year === event.happened_year,
      ),
  )
  const currentEvent = monthsWeenExistsEvent[currentEventIndex]

  function handleNextEvent() {
    const nextEventIndex = currentEventIndex + 1
    setCurrentEventIndex(nextEventIndex)
  }

  function handlePreviousEvent() {
    const previousEventIndex = currentEventIndex - 1
    setCurrentEventIndex(previousEventIndex)
  }

  const { calendarWeeks } = useMemo(() => {
    const currentDate = dayjs(Number(currentEvent?.happened_date_timestamp))
      .add(1, 'day')
      .set('date', 1)

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
  }, [currentEvent])

  return (
    <ContainerGrid
      padding={4}
      css={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '$default',
        gap: '$2',
      }}
      darkBackground
    >
      <ContainerGrid padding={0} css={{ gridTemplateColumns: '4fr 1fr' }}>
        <Text family="body" size="lg" weight="bold" height="shorter">
          CALENDÁRIO: {getMonthName(currentEvent.happened_month)}{' '}
          {currentEvent?.happened_year.replace('-', '')}{' '}
          {currentEvent?.happened_year_time_christ}
        </Text>

        <ContainerGrid padding={0} columns={2} css={{ gap: '$2' }}>
          <ButtonRoot
            css={{ background: '$importance10' }}
            size="xxs"
            variant="noShadow"
            align="center"
            title="Evento anterior"
            disabled={currentEventIndex === 0}
            onClick={handlePreviousEvent}
          >
            <ButtonIcon>
              <CaretLeft />
            </ButtonIcon>
          </ButtonRoot>
          <ButtonRoot
            css={{ background: '$importance10' }}
            size="xxs"
            variant="noShadow"
            align="center"
            title="Proximo evento"
            disabled={currentEventIndex === monthsWeenExistsEvent.length - 1}
            onClick={handleNextEvent}
          >
            <ButtonIcon>
              <CaretRight />
            </ButtonIcon>
          </ButtonRoot>
        </ContainerGrid>
      </ContainerGrid>

      <ContainerGrid padding={0} columns={3}>
        <ButtonRoot size="xxs" variant="noShadow" align="center" disabled>
          <ButtonLabel>Ano</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot size="xxs" variant="active" align="center">
          <ButtonLabel>Mês</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot size="xxs" variant="noShadow" align="center" disabled>
          <ButtonLabel>Semana</ButtonLabel>
        </ButtonRoot>
      </ContainerGrid>

      <CalendarBody>
        <thead>
          <tr>
            <th>DOM.</th>
            <th>SEG.</th>
            <th>TER.</th>
            <th>QUA.</th>
            <th>QUI.</th>
            <th>SEX.</th>
            <th>SAB.</th>
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  const dayIsInMonth = date.get('month') + 1

                  const eventFondInThisDate = timeEvents.find(
                    (event) =>
                      event.happened_day === date.get('date') &&
                      event.happened_month ===
                        dayIsInMonth.toString().padStart(2, '0') &&
                      event.happened_year === date.get('year').toString(),
                  )

                  const eventsInThisDay = timeEvents.filter((event) => {
                    return (
                      event.happened_day === date.get('date') &&
                      event.happened_month ===
                        dayIsInMonth.toString().padStart(2, '0') &&
                      event.happened_year === date.get('year').toString()
                    )
                  }).length

                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        importance={eventFondInThisDate?.importance}
                        disabled={disabled || !eventFondInThisDate}
                        onClick={() => onSelectDay(eventFondInThisDate!.id)}
                      >
                        {date.get('date')}

                        {eventsInThisDay !== 0 && (
                          <EventsInDayIndicator>
                            {eventsInThisDay}
                          </EventsInDayIndicator>
                        )}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </ContainerGrid>
  )
}
