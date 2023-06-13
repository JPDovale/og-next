import { IFear, IPerson } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindFear {
  person: IPerson | null
  id: string
}

interface IResponseFear {
  fear: IFear | undefined
  keysFear: {
    label: IEditorTo
    keyPath: string
  }
}

export function findFearUtil({ id, person }: IFindFear): IResponseFear {
  const fear = person?.collections.fear.itens?.find((fear) => fear.id === id)

  const response: IResponseFear = {
    fear,
    keysFear: {
      label: 'medo',
      keyPath: `fear/${id}`,
    },
  }

  return response
}
