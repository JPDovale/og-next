import { ICouple, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindCouple {
  person: IPersonsResponse | null
  id: string
}

interface IResponseCouple {
  couple: ICouple | undefined
  keysCouple: {
    label: IEditorTo
    keyPath: string
  }
}

export function findCoupleUtil({ id, person }: IFindCouple): IResponseCouple {
  const couple = person?.couples?.find((couple) => couple.id === id)

  const response: IResponseCouple = {
    couple,
    keysCouple: {
      label: 'casal',
      keyPath: `couple/${id}`,
    },
  }

  return response
}
