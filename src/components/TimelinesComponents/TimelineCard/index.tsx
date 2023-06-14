import { ITimeLine } from '@api/responsesTypes/timeline/ITimeLine'
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
  timeline: ITimeLine
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
    timeline?.collections.timeEvent.itens ?? [],
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
            importance={event.infos.importance}
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
              {`${event.happened.day.toString().padStart(2, '0')}/${
                event.happened.month
              }/${event.happened.year.replace('-', '')} ${
                event.happened.year.includes('-') ? 'A.C.' : ''
              } ${event.happened.hour
                .toString()
                .padStart(2, '0')}:${event.happened.minute
                .toString()
                .padStart(2, '0')}:${event.happened.second
                .toString()
                .padStart(2, '0')}`}
            </Text>
            <Conector
              isMain={isMain}
              toDown={i % 2 !== 0}
              importance={event.infos.importance}
            />
          </EventCard>
        ))}
      </EventsTable>
    </TimeLineCardContainer>
  )
}
