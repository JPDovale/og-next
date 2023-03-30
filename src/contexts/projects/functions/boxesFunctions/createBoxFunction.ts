import { createBoxRequest } from '@api/boxesRequests'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { addBoxAction } from '@contexts/projects/reducer/actions/boxes/addBoxAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface ICreateBookFunction {
  newBox: ICreateBoxRequest
  dispatch: Dispatch<any>
}

export async function createBoxFunction({
  dispatch,
  newBox,
}: ICreateBookFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createBoxRequest(newBox)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => createBoxFunction({ newBox, dispatch }),
  })

  if (handledAnswer === false) return false

  const box = response.box as IBoxResponse

  dispatch(addBoxAction({ box }))

  return true
}
