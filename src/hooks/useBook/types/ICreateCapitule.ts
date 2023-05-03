export interface ICreateCapitule {
  objective: string
  name: string
  structure?: {
    act1?: string
    act2?: string
    act3?: string
  }
}
