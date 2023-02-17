import { useRouter } from 'next/router'
import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from 'react'
import { IError } from '../../@types/errors/IError'
import { api } from '../../api'
import { ICreateUserDTO } from '../../api/dtos/ICreateUserDTO'
import { INewInitializeDTO } from '../../api/dtos/INewInitializeDTO'
import { ICreateSessionResponse } from '../../api/responsesTypes/ICreateResponse'

import { INewSessionDTO } from '../../api/dtos/INewSessionDTO'
import { createSessionFunction } from './functions/createSessionFunction'
import { createUserFunction } from './functions/createUserFunction'
import { getUserFunction } from './functions/getUserFunction'
import { initializeUserFunction } from './functions/initializeUserFunction'
import { loginWithGoogleFunction } from './functions/loginWithGoogleFunction'
import { logoutFunction } from './functions/logoutFunction'
import { updateAvatarFunction } from './functions/updateAvatarFunction'
import { updatePasswordFunction } from './functions/updatePasswordFunction'
import { updateUserFunction } from './functions/updateUserFunction'
import { userDefaultValues } from './initialValues'
import { setErrorAction, setSuccessAction } from './reducer/actionsUserReducer'
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

export const UserContext = createContext<IUserContext>(userDefaultValues)

export function UserProvider({ children }: IUserContextProps) {
  const [loading, setLoading] = useState(userDefaultValues.loading)

  const [userInfos, dispatch] = useReducer(userReducer, {
    error: undefined,
    user: undefined,
    success: undefined,
  })

  const { resetInterface } = useContext(InterfaceContext)

  const { error, user, success } = userInfos
  const router = useRouter()

  useEffect(() => {
    const tokenString = localStorage.getItem('@og-user-token')?.toString()

    if (tokenString && tokenString !== 'undefined') {
      const token = JSON.parse(tokenString || '')

      api.defaults.headers.Authorization = `Bearer ${token}`
    }
  }, [])

  function setError(error: IError | undefined) {
    dispatch(setErrorAction(error))
  }

  function setSuccess(success: ISuccess | undefined) {
    dispatch(setSuccessAction(success))
  }

  async function getUser(): Promise<any> {
    await getUserFunction(dispatch)
    setLoading(false)
  }

  function setUser(loggedUser: ICreateSessionResponse) {
    setLoading(true)
    setUserFunction(loggedUser, dispatch)
    setLoading(false)
  }

  async function createUser(newUserData: ICreateUserDTO) {
    const isCreated = await createUserFunction(newUserData, dispatch)
    return isCreated
  }

  async function createSession(newSession: INewSessionDTO) {
    const logged = await createSessionFunction(newSession, dispatch)
    return logged
  }

  async function logout() {
    setLoading(true)

    await logoutFunction(dispatch)
    resetInterface()

    // signOut({
    //   redirect: true,
    //   callbackUrl: 'http://localhost:3000/login',
    // })
    setLoading(false)
    router.push('/login')
  }

  async function initializeUser(newInitialize: INewInitializeDTO) {
    const initialized = await initializeUserFunction(newInitialize, dispatch)
    return initialized
  }

  async function updateUser(name?: string, username?: string, email?: string) {
    setLoading(true)
    await updateUserFunction(dispatch, name, username, email)
    setLoading(false)
  }

  async function updateAvatar(file: File) {
    setLoading(true)
    await updateAvatarFunction(file, dispatch)
    setLoading(false)
  }

  async function updatePassword(oldPassword: string, password: string) {
    setLoading(true)
    await updatePasswordFunction(oldPassword, password, dispatch)
    setLoading(false)
  }

  async function loginWithGoogle(user: any) {
    return loginWithGoogleFunction(user, dispatch)
  }

  async function deleteAvatar() {
    setLoading(true)
    await deleteAvatarFunction(dispatch)
    setLoading(false)
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

  useEffect(() => {
    getUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        userLogged: !!user,
        error,
        success,

        setError,
        setSuccess,

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
      {children}
    </UserContext.Provider>
  )
}
