import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { updateAvatarRequest } from '../../../api/userRequest'
import { setErrorAction, setUserAction } from '../reducer/actionsUserReducer'

export async function updateAvatarFunction(
  file: File,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!file) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await updateAvatarRequest(file)

  if (response.errorTitle) {
    const error: IError = {
      title: response.errorTitle,
      message: response.errorMessage as string,
    }

    dispatch(setErrorAction(error))
    return
  }

  const updatedUser = response as IUserResponse
  dispatch(setUserAction(updatedUser))
}
