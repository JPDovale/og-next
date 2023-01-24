import { Dispatch } from 'react'
import { IEditorTo } from '../../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../../@types/editores/IGenericObject'
import { createObjectGenericRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { recognizeObject } from '../../../../services/recognizeObject'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function createObjectGenericFunction(
  generic: IGenericObject,
  to: IEditorTo,
  personId: string,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!generic || !to || !personId || !projectId) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

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
      return false
    }
  }

  if (response.errorMessage) {
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
    return true
  }

  const person = response.person as IPersonsResponse
  const project = response.project as IProjectResponse
  dispatch(updatePersonAction(person, project))

  return true
}
