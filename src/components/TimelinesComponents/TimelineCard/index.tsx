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
  TimeLineEmptyMessage,
} from './styles'

interface ITimelineCardProps {
  timeline: ITimeLineResponse
  isMain?: boolean
  isEmpty?: boolean
}

export function TimelineCard({
  timeline,
  isMain = false,
  isEmpty = false,
}: ITimelineCardProps) {
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
      isEmpty={isEmpty}
    >
      {isEmpty && (
        <TimeLineEmptyMessage>Nenhum evento criado ainda</TimeLineEmptyMessage>
      )}
      <CenterLine className="center-line" isEmpty={isEmpty} />

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
              {event.title.slice(0, 27)}
              {event.title.length > 27 && '...'}
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
