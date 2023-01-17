import NextAuth from 'next-auth/next'
import { ICreateSessionResponse } from '../api/responsesTypes/ICreateResponse'

declare module 'next-auth' {
  interface Session {
    loggedUser: ICreateSessionResponse
  } 
}
