export interface IUpdateScene {
  id: string
  objective?: string
  writtenWords?: string
  structure?: {
    act1?: string
    act2?: string
    act3?: string
  }
  complete: boolean
  persons: string[]
}
