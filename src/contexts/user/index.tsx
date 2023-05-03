import { useRouter } from 'next/router'
import { createContext, useReducer, useContext } from 'react'
import { IError } from '../../@types/errors/IError'
import { ICreateUserDTO } from '../../api/dtos/ICreateUserDTO'
import { INewInitializeDTO } from '../../api/dtos/INewInitializeDTO'

import { INewSessionDTO } from '../../api/dtos/INewSessionDTO'
import { createSessionFunction } from './functions/createSessionFunction'
import { createUserFunction } from './functions/createUserFunction'
// import { getUserFunction } from './functions/getUserFunction'
import { initializeUserFunction } from './functions/initializeUserFunction'
import { loginWithGoogleFunction } from './functions/loginWithGoogleFunction'
import { logoutFunction } from './functions/logoutFunction'
import { updateAvatarFunction } from './functions/updateAvatarFunction'
import { updatePasswordFunction } from './functions/updatePasswordFunction'
import { updateUserFunction } from './functions/updateUserFunction'
import { userDefaultValues } from './initialValues'
import {
  setErrorAction,
  setLoadingAction,
  setSuccessAction,
} from './reducer/actionsUserReducer'
import { userReducer } from './reducer/userReducer'
import { IUserContext, IUserContextProps } from './types/IPersonContext'
import { setUserFunction } from './functions/setUserFunction'
// import { signOut } from 'next-auth/react'
import { deleteAvatarFunction } from './functions/deleteAvatarFunction'
import { ISuccess } from '../../@types/success/ISuccess'
import { sendMailForgotPasswordFunction } from './functions/sendMailForgotPasswordFunction'
import { recoveryPasswordFunction } from './functions/recoveryPasswordFunction'
import { visualizeNotificationsFunction } from './functions/visualizeNotificationsFunction'
import { InterfaceContext } from '@contexts/interface'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { useUser } from '@hooks/useUser'
import { Loading } from '@components/usefull/Loading'

export const UserContext = createContext<IUserContext>(userDefaultValues)

export function UserProvider({ children }: IUserContextProps) {
  const [userInfos, dispatch] = useReducer(userReducer, {
    error: null,
    success: null,
    loading: true,
  })

  const { resetInterface } = useContext(InterfaceContext)
  const { loadingUser, userLogged, refetchUser } = useUser()

  const { error, success, loading } = userInfos
  const router = useRouter()

  function setError(error: IError | null) {
    dispatch(setErrorAction(error))
  }

  function setSuccess(success: ISuccess | null) {
    dispatch(setSuccessAction(success))
  }

  function setLoading(newState: boolean) {
    dispatch(setLoadingAction(newState))
  }

  // async function getUser(): Promise<any> {
  //   await getUserFunction(dispatch)
  // }

  function setUser(loggedUser: IUserResponse | null) {
    return setUserFunction(loggedUser, dispatch)
  }

  async function createUser(newUserData: ICreateUserDTO) {
    return await createUserFunction(newUserData, dispatch)
  }

  async function createSession(newSession: INewSessionDTO) {
    return await createSessionFunction(newSession, dispatch)
  }

  async function logout() {
    await logoutFunction(dispatch)
    resetInterface()
    refetchUser()

    // signOut({
    //   redirect: true,
    //   callbackUrl: 'http://localhost:3000/login',
    // })

    router.push('/login')
  }

  async function initializeUser(newInitialize: INewInitializeDTO) {
    const initialized = await initializeUserFunction(newInitialize, dispatch)
    return initialized
  }

  async function updateUser(name?: string, username?: string, email?: string) {
    await updateUserFunction(dispatch, name, username, email)
  }

  async function updateAvatar(file: File) {
    await updateAvatarFunction(file, dispatch)
  }

  async function updatePassword(oldPassword: string, password: string) {
    await updatePasswordFunction(oldPassword, password, dispatch)
  }

  async function loginWithGoogle(user: any) {
    return loginWithGoogleFunction(user, dispatch)
  }

  async function deleteAvatar() {
    await deleteAvatarFunction(dispatch)
  }

  async function sendMailForgotPassword(email: string) {
    await sendMailForgotPasswordFunction({ email, dispatch })
  }

  async function recoveryPassword(password: string, token: string) {
    await recoveryPasswordFunction({ password, token, dispatch })
  }

  async function visualizeNotifications() {
    return await visualizeNotificationsFunction({ dispatch })
  }

  // useEffect(() => {
  //   getUser()
  // }, [])

  return (
    <UserContext.Provider
      value={{
        loading,
        userLogged,
        error,
        success,

        setError,
        setSuccess,
        setLoading,

        createSession,
        createUser,
        logout,
        initializeUser,
        updateUser,
        updateAvatar,
        updatePassword,
        loginWithGoogle,
        setUser,
        deleteAvatar,
        sendMailForgotPassword,
        recoveryPassword,
        visualizeNotifications,
      }}
    >
      {loadingUser ? <Loading /> : children}
    </UserContext.Provider>
  )
}
