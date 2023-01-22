import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { recoveryPasswordRequest } from '../../../api/userRequest'
import { setErrorAction, setSuccessAction } from '../reducer/actionsUserReducer'

interface IRecoveryPasswordFunction {
  password: string
  token: string
  dispatch: Dispatch<any>
}

export async function recoveryPasswordFunction({
  password,
  token,
  dispatch,
}: IRecoveryPasswordFunction) {
  const response = await recoveryPasswordRequest(password, token)

  if (response.errorTitle) {
    const error: IError = {
      title: response.errorTitle,
      message: response.errorMessage as string,
    }

    return dispatch(setErrorAction(error))
  }

  const success: ISuccess = {
    successTitle: response.successTitle,
    successMessage: response.successMessage,
  }

  dispatch(setSuccessAction(success))
}
