import { IPerson, ITrauma } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindTrauma {
  person: IPerson | null
  id: string
}

interface IResponseTrauma {
  trauma: ITrauma | undefined
  keysTrauma: {
    label: IEditorTo
    subObjects: 'consequências'
    keyPath: string
  }
}

export function findTraumaUtil({ id, person }: IFindTrauma): IResponseTrauma {
  const trauma = person?.collections.trauma.itens?.find(
    (trauma) => trauma.id === id,
  )

  const response: IResponseTrauma = {
    trauma,
    keysTrauma: {
      label: 'trauma',
      subObjects: 'consequências',
      keyPath: `trauma/${id}`,
    },
  }

  return response
}
