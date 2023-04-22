import { IPower, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindPower {
  person: IPersonsResponse | null
  id: string
}

interface IResponsePower {
  power: IPower | undefined
  keysPower: {
    label: IEditorTo
    keyPath: string
  }
}

export function findPowerUtil({ id, person }: IFindPower): IResponsePower {
  const power = person?.powers?.find((power) => power.id === id)

  const response: IResponsePower = {
    power,
    keysPower: {
      label: 'poder',
      keyPath: `power/${id}`,
    },
  }

  return response
}
