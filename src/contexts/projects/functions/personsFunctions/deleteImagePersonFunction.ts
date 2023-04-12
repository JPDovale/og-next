import { updatePersonAction } from '@contexts/projects/reducer/actions/persons/updatePersonAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { deleteImagePersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IDeleteImagePersonFunction {
  personId: string
  dispatch: Dispatch<any>
}

export async function deleteImagePersonFunction({
  personId,
  dispatch,
}: IDeleteImagePersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteImagePersonRequest({ personId })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      deleteImagePersonFunction({
        personId,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  const person = response as IPersonsResponse

  dispatch(updatePersonAction({ person }))

  return true
}
