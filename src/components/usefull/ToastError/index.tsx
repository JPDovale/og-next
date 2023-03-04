import { IError } from 'src/@types/errors/IError'
import { Toast } from '../Toast'

interface IToastErrorProps {
  error: IError | undefined
  setError: (newState: IError | undefined) => void
}

export function ToastError({ error, setError }: IToastErrorProps) {
  return (
    <Toast
      title={error?.title!}
      message={error?.message!}
      open={!!error}
      setOpen={() => setError(undefined)}
      type="error"
    />
  )
}
