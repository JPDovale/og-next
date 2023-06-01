import { IPerson, IWishe } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindWishe {
  person: IPerson | null
  id: string
}

interface IResponseWishe {
  wishe: IWishe | undefined
  keysWishe: {
    label: IEditorTo
    keyPath: string
  }
}

export function findWisheUtil({ id, person }: IFindWishe): IResponseWishe {
  const wishe = person?.collections.wishe.itens?.find(
    (wishe) => wishe.id === id,
  )

  const response: IResponseWishe = {
    wishe,
    keysWishe: {
      label: 'desejo',
      keyPath: `wishe/${id}`,
    },
  }

  return response
}
