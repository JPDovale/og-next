import { ReactNode } from 'react'
import { IError } from '../../../@types/errors/IError'
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

  setError: (newState: IError | undefined) => void

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
}

export interface IUserContextProps {
  children: ReactNode
}
