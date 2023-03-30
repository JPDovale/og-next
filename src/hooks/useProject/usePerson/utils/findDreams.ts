import { IDream, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindDream {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponseDream {
  dream: IDream | undefined
  commentsInThisDream: IComment[] | undefined
  keysDream: {
    label: IEditorTo
    keyPath: string
  }
}

export function findDreamUtil({ id, person }: IFindDream): IResponseDream {
  const dream = person?.dreams?.find((dream) => dream.id === id)

  const commentsInThisDream = person?.comments?.filter(
    (comment) => comment.to === `dreams/${id}`,
  )

  const response: IResponseDream = {
    dream,
    commentsInThisDream,
    keysDream: {
      label: 'sonho',
      keyPath: `dream/${id}`,
    },
  }

  return response
}
