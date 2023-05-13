import { createCheckoutSessionRequest } from '@api/productsRequest'
import { responseDealings } from '@utils/data/responseDealings'
import { ICreateCheckoutSessionResponse } from '../types/ICallEvent'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createCheckoutSession(
  priceId: string,
): Promise<IResolveEvent<ICreateCheckoutSessionResponse>> {
  const response = await createCheckoutSessionRequest(priceId)

  const { handledAnswer, error } = await responseDealings<
    IResolveEvent<ICreateCheckoutSessionResponse>
  >({
    response,
    callback: () => createCheckoutSession(priceId),
  })

  return {
    resolved: handledAnswer,
    error,
    result: {
      checkoutSessionId: response.checkoutSessionId,
    },
  }
}
