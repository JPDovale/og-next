import { updateArchiveRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { updateBoxAction } from '@contexts/projects/reducer/actions/boxes/updateBoxAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'

interface IUpdateArchiveFunction {
  boxId: string
  archiveId: string
  title?: string
  description?: string
  dispatch: Dispatch<any>
}

export async function updateArchiveFunction({
  archiveId,
  boxId,
  title,
  description,
  dispatch,
}: IUpdateArchiveFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateArchiveRequest({
    archiveId,
    boxId,
    title,
    description,
  })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateArchiveFunction({ archiveId, boxId, title, description, dispatch }),
  })

  if (handledAnswer === false) return false

  const box = response.box as IBoxResponse

  dispatch(updateBoxAction({ box }))

  return true
}
