import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { IEditorTo } from '@@types/editores/IEditorTo'
import { saveRefObjectGenericRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '@services/recognizeObject'

import { responseDealings } from '@services/responseDealings'
import { updatePersonAndBoxAction } from '@contexts/projects/reducer/actions/persons/updatePersonAndBoxAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { setErrorAction } from '@contexts/projects/reducer/actions/projects/setErrorAction'

interface ISaveRefObjectGenericFunction {
  personId: string
  projectId: string
  refId: string
  to: IEditorTo
  dispatch: Dispatch<any>
  subObjects?: Array<{
    title: string
    description: string
  }>
}

export async function saveRefObjectGenericFunction({
  personId,
  projectId,
  refId,
  to,
  dispatch,
  subObjects,
}: ISaveRefObjectGenericFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const objectToSend = recognizeObject(
    to,
    personId,
    projectId,
    undefined,
    refId,
    '',
    subObjects,
  )
  if (!objectToSend) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    dispatch(setLoadingAction(false))
    return false
  }

  const response = await saveRefObjectGenericRequest(objectToSend)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      saveRefObjectGenericFunction({
        personId,
        projectId,
        refId,
        to,
        dispatch,
        subObjects,
      }),
  })

  if (handledAnswer === false) return false

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAndBoxAction({ person, box }))

  return true
}
