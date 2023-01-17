import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3030',
})

export async function GetInfoUser() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
