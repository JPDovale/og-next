import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { IEditorTo } from '../../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../../@types/editores/IGenericObject'
import { createObjectGenericRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '../../../../services/recognizeObject'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function createObjectGenericFunction(
  generic: IGenericObject,
  to: IEditorTo,
  personId: string,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const objectToSend = recognizeObject(to, personId, projectId, generic)
  if (!objectToSend) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await createObjectGenericRequest(objectToSend)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createObjectGenericFunction(
        generic,
        to,
        personId,
        projectId,
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

  if (response.personOfCouple) {
    const person = response.person
    const personOfCouple = response.personOfCouple

    dispatch(updatePersonAction(person))
    dispatch(updatePersonAction(personOfCouple))
    dispatch(setLoadingAction(false))

    return true
  }

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse
  dispatch(updatePersonAction(person, box))
  dispatch(setLoadingAction(false))

  return true
}
