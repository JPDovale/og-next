import { IDream, IPerson } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindDream {
  person: IPerson | null
  id: string
}

interface IResponseDream {
  dream: IDream | undefined
  keysDream: {
    label: IEditorTo
    keyPath: string
  }
}

export function findDreamUtil({ id, person }: IFindDream): IResponseDream {
  const dream = person?.collections.dream.itens?.find(
    (dream) => dream.id === id,
  )

  const response: IResponseDream = {
    dream,
    keysDream: {
      label: 'sonho',
      keyPath: `dream/${id}`,
    },
  }

  return response
}
