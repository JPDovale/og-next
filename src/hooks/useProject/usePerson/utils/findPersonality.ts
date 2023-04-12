import {
  IPersonality,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindPersonality {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponsePersonality {
  personality: IPersonality | undefined
  commentsInThisPersonality: IComment[] | undefined
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
  const personality = person?.personality?.find(
    (personality) => personality.id === id,
  )

  const commentsInThisPersonality = person?.comments?.filter(
    (comment) => comment.to === `personality/${id}`,
  )

  const response: IResponsePersonality = {
    personality,
    commentsInThisPersonality,
    keysPersonality: {
      label: 'personalidade',
      subObjects: 'consequências',
      keyPath: `personality/${id}`,
    },
  }

  return response
}
