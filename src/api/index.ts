import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.OG_API_CONNECTION,
})

export async function GetInfoUser() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
