import { ITimeEvent } from '@api/responsesTypes/ITimeLineResponse'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '../Button'
import { ContainerGrid } from '../ContainerGrid'
import { Text } from '../Text'
import { CalendarBody, CalendarDay, EventsInDayIndicator } from './styles'

interface ICalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

type ICalendarWeeks = ICalendarWeek[]

interface ICalendar {
  currentDate: {
    calendarTitle: string
    index: number
  }
  calendarWeeks: ICalendarWeeks
  handlePreviousDate: () => void
  handleNextDate: () => void
  maxLengthCalendar: number
  timeEvents?: ITimeEvent[]
  onSelectDay: (id: string) => void
}

export function Calendar({
  currentDate,
  handlePreviousDate,
  handleNextDate,
  maxLengthCalendar,
  calendarWeeks,
  timeEvents = [],
  onSelectDay,
}: ICalendar) {
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
          CALENDÁRIO: {currentDate.calendarTitle}
        </Text>

        <ContainerGrid padding={0} columns={2} css={{ gap: '$2' }}>
          <ButtonRoot
            css={{ background: '$importance10' }}
            size="xxs"
            variant="noShadow"
            align="center"
            title="Evento anterior"
            disabled={currentDate.index === 0}
            onClick={handlePreviousDate}
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
            disabled={currentDate.index === maxLengthCalendar}
            onClick={handleNextDate}
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
