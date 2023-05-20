import { ITimeEvent } from '@api/responsesTypes/ITimeLineResponse'
import { Calendar } from '@components/usefull/Calendar'
import { getMonthName } from '@utils/dates/parserMonthName'
import dayjs from 'dayjs'
import { useMemo } from 'react'

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
    <Calendar
      calendarWeeks={calendarWeeks}
      currentDate={{
        calendarTitle: `${getMonthName(
          currentEvent?.happened_month ?? '1',
        )} ${currentEvent?.happened_year.replace('-', '')} ${
          currentEvent?.happened_year_time_christ
        }`,
        index: currentEventIndex,
      }}
      handleNextDate={handleNextEvent}
      handlePreviousDate={handlePreviousEvent}
      maxLengthCalendar={monthsWeenExistsEvent.length - 1}
      onSelectDay={onSelectDay}
      timeEvents={timeEvents}
    />
  )
}
