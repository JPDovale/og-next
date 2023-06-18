import { api } from '..'

export async function getPricesRequest() {
  try {
    const response = await api.get('/products/prices', {
      headers: {
        'Ms-Private-Api-Key': process.env.PRIVATE_MS_KEY,
      },
    })
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
