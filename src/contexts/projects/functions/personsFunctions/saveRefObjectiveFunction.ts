import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { updatePersonAndBoxAction } from '@contexts/projects/reducer/actions/persons/updatePersonAndBoxAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { saveRefObjectiveOfPersonRequest } from '@api/personsRequests'
import {
  IObjective,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface ISaveRefObjectiveFunction {
  objective: IObjective
  personId: string
  projectId: string
  refId: string
  dispatch: Dispatch<any>
}

export async function saveRefObjectiveFunction({
  objective,
  personId,
  projectId,
  refId,
  dispatch,
}: ISaveRefObjectiveFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const newObjectReference = {
    objective,
    personId,
    projectId,
    refId,
  }

  const response = await saveRefObjectiveOfPersonRequest(newObjectReference)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      saveRefObjectiveFunction({
        objective,
        personId,
        projectId,
        refId,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAndBoxAction({ person, box }))

  return true
}
