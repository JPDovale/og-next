import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import { orderDatesOfTimelines } from '@services/orderElements'
import { ArrowUp, X } from 'phosphor-react'
import { useContext } from 'react'
import {
  ButtonColapse,
  Conector,
  Date,
  DatesContainer,
  TimelineViewContainer,
} from './styles'

interface ITimelineViewProps {
  timeline: ITimelineResponse
}

export function TimelineView({ timeline }: ITimelineViewProps) {
  const { timelineIsOpen, setTimelineIsOpen } = useContext(InterfaceContext)

  const datesInChronologicOrd = orderDatesOfTimelines(timeline.dates)
  console.log(datesInChronologicOrd)

  return (
    <TimelineViewContainer isOpen={timelineIsOpen}>
      <ButtonColapse onClick={() => setTimelineIsOpen(!timelineIsOpen)}>
        {timelineIsOpen ? <X /> : <ArrowUp />}
      </ButtonColapse>

      <DatesContainer>
        {datesInChronologicOrd.map((date, i) => (
          <>
            <Date key={date.id}>
              <Text size="xs">
                {date.day}/{date.month}/{date.year}{' '}
                {date.hour !== '00:00:00' && <>às {date.hour}</>}
              </Text>

              <InfoDefault title="Titulo" size="sm">
                <Text size="xs">{date.event.title}</Text>
              </InfoDefault>

              <InfoDefault title="Descrição" size="sm">
                <Text size="xs">{date.event.description}</Text>
              </InfoDefault>
            </Date>
            {i !== timeline.dates.length - 1 && <Conector />}
          </>
        ))}
      </DatesContainer>
    </TimelineViewContainer>
  )
}
