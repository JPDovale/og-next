import { IUser } from '@api/responsesTypes/user/IUser'
import NextAuth from 'next-auth/next'
import { ICreateSessionResponse } from '../api/responsesTypes/ICreateResponse'

declare module 'next-auth' {
  interface User extends IUser {

  }

  interface Session {
    loggedUser: ICreateSessionResponse
  }
}
