import axios from 'axios'
import { CookieJar } from 'tough-cookie'
import { wrapper } from 'axios-cookiejar-support'

const cookieJar = new CookieJar()

export const api = axios.create({
  // devEnvironment
  // baseURL: 'https://ogapi-teste.onrender.com',

  // baseURL: 'https://ogapi.onrender.com/api',

  // deployEnvironment
  baseURL: 'https://ognare.com/api',

  // fullDevEnvironment
  // baseURL: 'http://localhost:3030/api',
})

wrapper(api)

api.defaults.jar = cookieJar
api.defaults.withCredentials = true

export async function GetInfoUser() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
