import { ReactNode } from 'react'
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { ICreateUserDTO } from '../../../api/dtos/ICreateUserDTO'
import { INewInitializeDTO } from '../../../api/dtos/INewInitializeDTO'
import { INewSessionDTO } from '../../../api/dtos/INewSessionDTO'
import { ICreateSessionResponse } from '../../../api/responsesTypes/ICreateResponse'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'

export interface IUserContext {
  loading: boolean
  user: IUserResponse | undefined
  userLogged: boolean
  error: IError | undefined
  success: ISuccess | undefined

  setError: (newState: IError | undefined) => void
  setSuccess: (success: ISuccess | undefined) => void

  createUser: (user: ICreateUserDTO) => Promise<boolean>
  createSession: (user: INewSessionDTO) => Promise<boolean>
  logout: () => void
  initializeUser: (newInitialize: INewInitializeDTO) => Promise<boolean>
  updateUser: (
    name?: string,
    username?: string,
    email?: string,
  ) => Promise<void>
  updateAvatar: (file: File) => Promise<void>
  updatePassword: (oldPassword: string, password: string) => Promise<void>
  loginWithGoogle: (user: any) => Promise<void>
  setUser: (loggedUser: ICreateSessionResponse) => void
  deleteAvatar: () => Promise<void>
  sendMailForgotPassword: (email: string) => Promise<void>
  recoveryPassword: (password: string, token: string) => Promise<void>
  visualizeNotifications: () => Promise<void>
}

export interface IUserContextProps {
  children: ReactNode
}
