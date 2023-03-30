import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { IUpdateObjetiveDTO } from '@api/dtos/IUpdateObjetiveDTO'
import { updateObjetiveOfPersonRequest } from '@api/personsRequests'
import {
  IObjective,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { updatePersonAction } from '@contexts/projects/reducer/actions/persons/updatePersonAction'

interface IUpdateObjetiveOfPersonFunction {
  objective: IObjective
  personId: string
  objectiveId: string
  dispatch: Dispatch<any>
}

export async function updateObjetiveOfPersonFunction({
  objective,
  personId,
  objectiveId,
  dispatch,
}: IUpdateObjetiveOfPersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const updatedObjective: IUpdateObjetiveDTO = {
    objective,
    objectiveId,
    personId,
  }

  const response = await updateObjetiveOfPersonRequest(updatedObjective)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateObjetiveOfPersonFunction({
        objective,
        personId,
        objectiveId,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  const person = response as IPersonsResponse

  dispatch(updatePersonAction({ person }))

  return true
}
