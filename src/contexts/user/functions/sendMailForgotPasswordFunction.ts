import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { sendMailForgotPasswordRequest } from '../../../api/userRequest'
import { setErrorAction, setSuccessAction } from '../reducer/actionsUserReducer'

interface ISendMailForgotPasswordFunction {
  email: string
  dispatch: Dispatch<any>
}

export async function sendMailForgotPasswordFunction({
  email,
  dispatch,
}: ISendMailForgotPasswordFunction) {
  const response = await sendMailForgotPasswordRequest(email)

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
