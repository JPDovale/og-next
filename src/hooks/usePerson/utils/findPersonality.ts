import { IPerson, IPersonality } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindPersonality {
  person: IPerson | null
  id: string
}

interface IResponsePersonality {
  personality: IPersonality | undefined
  keysPersonality: {
    label: IEditorTo
    subObjects: 'consequências'
    keyPath: string
  }
}

export function findPersonalityUtil({
  id,
  person,
}: IFindPersonality): IResponsePersonality {
  const personality = person?.collections.personality.itens?.find(
    (personality) => personality.id === id,
  )

  const response: IResponsePersonality = {
    personality,
    keysPersonality: {
      label: 'personalidade',
      subObjects: 'consequências',
      keyPath: `personality/${id}`,
    },
  }

  return response
}
