import { deleteBoxRequest } from '@api/boxesRequests'
import { deleteBoxAction } from '@contexts/projects/reducer/actions/boxes/deleteBoxAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'

interface IDeleteBoxFunction {
  boxId: string
  dispatch: Dispatch<any>
}

export async function deleteBoxFunction({
  boxId,
  dispatch,
}: IDeleteBoxFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteBoxRequest(boxId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => deleteBoxFunction({ boxId, dispatch }),
  })

  if (handledAnswer === false) return false

  dispatch(deleteBoxAction({ boxId }))

  return true
}
