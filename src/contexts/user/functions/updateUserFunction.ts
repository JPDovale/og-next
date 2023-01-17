import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { IUpdateUserDTO } from '../../../api/dtos/IUpdateUserDTO'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { updateUserRequest } from '../../../api/userRequest'
import { setErrorAction, setUserAction } from '../reducer/actionsUserReducer'

export async function updateUserFunction(
  dispatch: Dispatch<any>,
  name?: string,
  username?: string,
  email?: string,
): Promise<void> {
  if (!name && !username && !email) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const newInfos: IUpdateUserDTO = {
    name,
    username,
    email,
  }

  const response = await updateUserRequest(newInfos)

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
