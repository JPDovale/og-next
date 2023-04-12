import { Dispatch } from 'react'
import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { saveImagesRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { responseDealings } from '@services/responseDealings'
import { updateBoxAction } from '@contexts/projects/reducer/actions/boxes/updateBoxAction'

interface ISaveArchiveImagesFunction {
  imagesToSave: ISaveImagesRequest
  dispatch: Dispatch<any>
}

export async function saveArchiveImagesFunction({
  imagesToSave,
  dispatch,
}: ISaveArchiveImagesFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await saveImagesRequest(imagesToSave)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => saveArchiveImagesFunction({ imagesToSave, dispatch }),
  })

  if (handledAnswer === false) return false

  const box = response.box as IBoxResponse

  dispatch(updateBoxAction({ box }))

  return true
}
