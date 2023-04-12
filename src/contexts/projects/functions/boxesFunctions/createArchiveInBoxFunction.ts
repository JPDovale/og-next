import { createArchiveInBoxRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { updateBoxAction } from '@contexts/projects/reducer/actions/boxes/updateBoxAction'

interface ICreateArchiveInBoxFunction {
  newArchive: ICreateArchiveInBoxRequest
  dispatch: Dispatch<any>
}

export async function createArchiveInBoxFunction({
  dispatch,
  newArchive,
}: ICreateArchiveInBoxFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createArchiveInBoxRequest(newArchive)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => createArchiveInBoxFunction({ newArchive, dispatch }),
  })

  if (handledAnswer === false) return false

  const box = response.box as IBoxResponse

  dispatch(updateBoxAction({ box }))

  return true
}
