export interface IUpdateScene {
  id: string
  objective?: string
  writtenWords?: number
  structure?: {
    act1?: string
    act2?: string
    act3?: string
  }
  complete: boolean
  persons: string[]
}
