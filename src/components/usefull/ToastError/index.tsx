import { IError } from 'src/@types/errors/IError'
import { Toast } from '../Toast'

interface IToastErrorProps {
  error: IError | null
  setError: (newState: IError | null) => void
}

export function ToastError({ error, setError }: IToastErrorProps) {
  return (
    <>
      {error?.title !== 'Invalid token!' && (
        <Toast
          title={error?.title!}
          message={error?.message!}
          open={!!error}
          setOpen={() => setError(null)}
          type="error"
        />
      )}
    </>
  )
}
