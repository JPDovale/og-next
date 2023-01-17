import { IError } from '../../../@types/errors/IError'
import { ICreateUserDTO } from '../../../api/dtos/ICreateUserDTO'
import { INewInitializeDTO } from '../../../api/dtos/INewInitializeDTO'
import { INewSessionDTO } from '../../../api/dtos/INewSessionDTO'
import { ICreateSessionResponse } from '../../../api/responsesTypes/ICreateResponse'
import { IUserContext } from '../types/IPersonContext'

export const userDefaultValues: IUserContext = {
  loading: true,
  user: undefined,
  userLogged: false,
  error: undefined,

  setError: (newError: IError | undefined) => {},

  createUser: async (user: ICreateUserDTO) => false,
  createSession: async (user: INewSessionDTO) => false,
  logout: () => {},
  initializeUser: async (newInitialize: INewInitializeDTO) => false,
  updateUser: async (name?: string, username?: string, email?: string) => {},
  updateAvatar: async (file: File) => {},
  updatePassword: async (oldPassword: string, password: string) => {},
  loginWithGoogle: async (user: any) => {},
  setUser: (loggedUser: ICreateSessionResponse) => {},
}
