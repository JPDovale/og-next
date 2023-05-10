import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { updatePersonAndBoxAction } from '@contexts/projects/reducer/actions/persons/updatePersonAndBoxAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { ICreateObjectiveDTO } from '@api/dtos/ICreateObjectiveDTO'
import { createObjetiveOfPersonRequest } from '@api/personsRequests'
import {
  IObjective,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface ICreateObjetiveOfPersonFunction {
  objective: IObjective
  personId: string
  projectId: string
  dispatch: Dispatch<any>
}

export async function createObjetiveOfPersonFunction({
  dispatch,
  objective,
  personId,
  projectId,
}: ICreateObjetiveOfPersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const newObjetive: ICreateObjectiveDTO = {
    objective,
    projectId,
    personId,
  }

  const response = await createObjetiveOfPersonRequest(newObjetive)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      createObjetiveOfPersonFunction({
        objective,
        projectId,
        personId,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAndBoxAction({ person, box }))

  return true
}
