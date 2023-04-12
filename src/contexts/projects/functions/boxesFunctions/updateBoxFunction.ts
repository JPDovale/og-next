import { updateBoxRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { updateBoxAction } from '@contexts/projects/reducer/actions/boxes/updateBoxAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'

interface IUpdateBoxFunction {
  boxId: string
  name?: string
  description?: string
  tags?: Array<{
    name: string
  }>
  dispatch: Dispatch<any>
}

export async function updateBoxFunction({
  boxId,
  name,
  description,
  tags,
  dispatch,
}: IUpdateBoxFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateBoxRequest({
    boxId,
    name,
    description,
    tags,
  })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateBoxFunction({ boxId, description, name, tags, dispatch }),
  })

  if (handledAnswer === false) return false

  const box = response.box as IBoxResponse

  dispatch(updateBoxAction({ box }))

  return true
}
