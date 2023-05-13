import { IResolveEvent } from './IResolveEvent'

export interface ICreateCheckoutSessionResponse {
  checkoutSessionId: string
}

export interface ICallEvent {
  createCheckoutSession: (
    priceId: string,
  ) => Promise<IResolveEvent<ICreateCheckoutSessionResponse>>
}
