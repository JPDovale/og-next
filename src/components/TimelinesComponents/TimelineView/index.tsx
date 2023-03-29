import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
import { InterfaceContext } from '@contexts/interface'
import { ArrowUp, X } from 'phosphor-react'
import { useContext } from 'react'
import { ButtonColapse, TimelineViewContainer } from './styles'

interface ITimelineViewProps {
  timeline: ITimelineResponse
}

export function TimelineView({ timeline }: ITimelineViewProps) {
  const { timelineIsOpen, setTimelineIsOpen } = useContext(InterfaceContext)

  return (
    <TimelineViewContainer isOpen={timelineIsOpen}>
      <ButtonColapse onClick={() => setTimelineIsOpen(!timelineIsOpen)}>
        {timelineIsOpen ? <X /> : <ArrowUp />}
      </ButtonColapse>

      {timeline.dates.map((date) => (
        <div key={date.id}>{date.event.title}</div>
      ))}
    </TimelineViewContainer>
  )
}
