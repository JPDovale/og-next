import { ICouple, IPerson } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindCouple {
  person: IPerson | null
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
  const couple = person?.collections.couple?.itens.find(
    (couple) => couple.id === id,
  )

  const response: IResponseCouple = {
    couple,
    keysCouple: {
      label: 'casal',
      keyPath: `couple/${id}`,
    },
  }

  return response
}
