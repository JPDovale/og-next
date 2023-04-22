import { IDream, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindDream {
  person: IPersonsResponse | null
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
  const dream = person?.dreams?.find((dream) => dream.id === id)

  const response: IResponseDream = {
    dream,
    keysDream: {
      label: 'sonho',
      keyPath: `dream/${id}`,
    },
  }

  return response
}
