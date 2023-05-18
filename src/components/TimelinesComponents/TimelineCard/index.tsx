import { ITimeLineResponse } from '@api/responsesTypes/ITimeLineResponse'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import { orderDatesOfTimelines } from '@services/orderElements'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import {
  CenterLine,
  Conector,
  EventCard,
  EventsTable,
  TimeLineCardContainer,
} from './styles'

interface ITimelineCardProps {
  timeline: ITimeLineResponse
  isMain?: boolean
}

export function TimelineCard({ timeline, isMain = false }: ITimelineCardProps) {
  const { theme } = useContext(InterfaceContext)
  const router = useRouter()
  const { id } = router.query

  const eventsInChronologicOrd = orderDatesOfTimelines(
    timeline?.timeEvents ?? [],
  )

  return (
    <TimeLineCardContainer
      title="Acessar calendário"
      onClick={() => router.push(`/project/${id}/timelines/${timeline.id}`)}
      isMain={isMain}
    >
      <CenterLine className="center-line" />

      <EventsTable>
        {eventsInChronologicOrd.map((event, i) => (
          <EventCard
            key={event.id}
            importance={event.importance}
            toDown={i % 2 !== 0}
            isMain={isMain}
          >
            <Text
              colorInvert={theme === 'light'}
              family="body"
              size={isMain ? 'lg' : 'sm'}
              weight={isMain ? 'bold' : 'medium'}
            >
              {event.title}
            </Text>

            <Text colorInvert={theme === 'light'} size={isMain ? 'sm' : 'xs'}>
              {`${event.happened_day.toString().padStart(2, '0')}/${
                event.happened_month
              }/${event.happened_year.replace('-', '')} ${
                event.happened_year.includes('-') ? 'A.C.' : ''
              } ${event.happened_hour
                .toString()
                .padStart(2, '0')}:${event.happened_minute
                .toString()
                .padStart(2, '0')}:${event.happened_second
                .toString()
                .padStart(2, '0')}`}
            </Text>
            <Conector
              isMain={isMain}
              toDown={i % 2 !== 0}
              importance={event.importance}
            />
          </EventCard>
        ))}
      </EventsTable>
    </TimeLineCardContainer>
  )
}
