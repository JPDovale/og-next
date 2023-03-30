import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'

export interface ICreatePersonAction {
  person: IPersonsResponse
  box: IBoxResponse
  timeline: ITimelineResponse
}
