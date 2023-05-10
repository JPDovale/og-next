import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
import { createPersonAction } from '@contexts/projects/reducer/actions/persons/createPersonAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { ICreatePersonDTO } from '@api/dtos/ICreatePersonDTO'
import { createPersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface ICreateNewPersonFunction {
  newPerson: ICreatePersonDTO
  dispatch: Dispatch<any>
}

export async function createNewPersonFunction({
  dispatch,
  newPerson,
}: ICreateNewPersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createPersonRequest(newPerson)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => createNewPersonFunction({ newPerson, dispatch }),
  })

  if (handledAnswer === false) return false

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse
  const timeline = response.timeline as ITimelineResponse

  dispatch(createPersonAction({ box, person, timeline }))

  return true
}
