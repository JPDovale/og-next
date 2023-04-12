import { deleteArchiveBoxRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { updateBoxAction } from '@contexts/projects/reducer/actions/boxes/updateBoxAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'

interface IDeleteArchiveBoxFunction {
  dispatch: Dispatch<any>
  boxId: string
  archiveId: string
}

export async function deleteArchiveBoxFunction({
  archiveId,
  boxId,
  dispatch,
}: IDeleteArchiveBoxFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteArchiveBoxRequest({
    archiveId,
    boxId,
  })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => deleteArchiveBoxFunction({ archiveId, boxId, dispatch }),
  })

  if (handledAnswer === false) return false

  const box = response.box as IBoxResponse

  dispatch(updateBoxAction({ box }))

  return true
}
