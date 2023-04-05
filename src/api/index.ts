import axios from 'axios'

export const api = axios.create({
  // devEnvironment
  // baseURL: 'https://ogapi-teste.onrender.com',

  // deployEnvironment
  baseURL: 'http://37.44.247.116:3030/',

  // fullDevEnvironment
  // baseURL: 'http://localhost:3030/',
})

export async function GetInfoUser() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
