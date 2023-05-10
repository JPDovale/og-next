import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { updateImagePersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { updatePersonAction } from '@contexts/projects/reducer/actions/persons/updatePersonAction'

interface IUpdateImageFromPersonFunction {
  file: File
  personId: string
  dispatch: Dispatch<any>
}

export async function updateImageFromPersonFunction({
  file,
  personId,
  dispatch,
}: IUpdateImageFromPersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateImagePersonRequest(personId, file)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateImageFromPersonFunction({
        file,
        personId,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  const person = response as IPersonsResponse

  dispatch(updatePersonAction({ person }))

  return true
}
