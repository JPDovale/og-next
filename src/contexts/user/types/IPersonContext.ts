import { ReactNode } from 'react'
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { ICreateUserDTO } from '../../../api/dtos/ICreateUserDTO'
import { INewSessionDTO } from '../../../api/dtos/INewSessionDTO'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'

export interface IUserContext {
  loading: boolean
  userLogged: boolean
  error: IError | null
  success: ISuccess | null

  setError: (newState: IError | null) => void
  setSuccess: (success: ISuccess | null) => void
  setLoading: (newState: boolean) => void

  createUser: (user: ICreateUserDTO) => Promise<boolean>
  createSession: (user: INewSessionDTO) => Promise<boolean>
  logout: () => void
  updateUser: (
    name?: string,
    username?: string,
    email?: string,
  ) => Promise<void>
  updateAvatar: (file: File) => Promise<void>
  updatePassword: (oldPassword: string, password: string) => Promise<void>
  loginWithGoogle: (user: any) => Promise<void>
  setUser: (loggedUser: IUserResponse | null) => void
  deleteAvatar: () => Promise<void>
  sendMailForgotPassword: (email: string) => Promise<void>
  recoveryPassword: (password: string, token: string) => Promise<void>
  visualizeNotifications: () => Promise<void>
}

export interface IUserContextProps {
  children: ReactNode
}
