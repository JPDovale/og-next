import { IPerson, IPower } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindPower {
  person: IPerson | null
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
  const power = person?.collections.power.itens?.find(
    (power) => power.id === id,
  )

  const response: IResponsePower = {
    power,
    keysPower: {
      label: 'poder',
      keyPath: `power/${id}`,
    },
  }

  return response
}
