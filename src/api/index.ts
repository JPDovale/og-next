import axios from 'axios'
import { CookieJar } from 'tough-cookie'
import { wrapper } from 'axios-cookiejar-support'

const cookieJar = new CookieJar()

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OG_API_CONNECTION,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  jar: cookieJar,
})

wrapper(api)

export async function GetInfoUser() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
