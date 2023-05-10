import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { deleteObjectiveRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updatePersonAndBoxAction } from '@contexts/projects/reducer/actions/persons/updatePersonAndBoxAction'

interface IDeleteObjectiveFunction {
  personId: string
  objectiveId: string
  dispatch: Dispatch<any>
}

export async function deleteObjectiveFunction({
  personId,
  dispatch,
  objectiveId,
}: IDeleteObjectiveFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteObjectiveRequest({ personId, objectiveId })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      deleteObjectiveFunction({
        personId,
        objectiveId,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAndBoxAction({ person, box }))

  return true
}
