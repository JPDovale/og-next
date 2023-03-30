import { Dispatch } from 'react'
import { ICreatePersonDTO } from '@api/dtos/ICreatePersonDTO'
import { updatePersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updatePersonAction } from '@contexts/projects/reducer/actions/persons/updatePersonAction'

interface IUpdatedPersonFunction {
  person: ICreatePersonDTO
  personId: string
  dispatch: Dispatch<any>
}

export async function updatedPersonFunction({
  person,
  personId,
  dispatch,
}: IUpdatedPersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updatePersonRequest(person, personId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => updatedPersonFunction({ person, personId, dispatch }),
  })

  if (handledAnswer === false) return false

  const personUpdated = response as IPersonsResponse

  dispatch(updatePersonAction({ person: personUpdated }))

  return true
}
