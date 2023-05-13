import { api } from '..'

export async function getPricesRequest() {
  try {
    const response = await api.get('/products/prices')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createCheckoutSessionRequest(priceId: string) {
  try {
    const response = await api.post(
      `/products/prices/${priceId}/checkout/sessions`,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
