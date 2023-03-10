import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { IEditorTo } from '../../../../@types/editores/IEditorTo'
import { saveRefObjectGenericRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '../../../../services/recognizeObject'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function saveRefObjectGenericFunction(
  personId: string,
  projectId: string,
  refId: string,
  to: IEditorTo,
  dispatch: Dispatch<any>,
  subObjects?: Array<{
    title: string
    description: string
  }>,
): Promise<boolean> {
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

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return saveRefObjectGenericFunction(
        personId,
        projectId,
        refId,
        to,
        dispatch,
      )
    } else {
      dispatch(setLoadingAction(false))

      return false
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return false
  }

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAction(person, box))
  dispatch(setLoadingAction(false))

  return true
}
