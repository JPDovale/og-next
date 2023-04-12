import { ICouple, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindCouple {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponseCouple {
  couple: ICouple | undefined
  commentsInThisCouple: IComment[] | undefined
  keysCouple: {
    label: IEditorTo
    keyPath: string
  }
}

export function findCoupleUtil({ id, person }: IFindCouple): IResponseCouple {
  const couple = person?.couples?.find((couple) => couple.id === id)

  const commentsInThisCouple = person?.comments?.filter(
    (comment) => comment.to === `couples/${id}`,
  )

  const response: IResponseCouple = {
    couple,
    commentsInThisCouple,
    keysCouple: {
      label: 'casal',
      keyPath: `couple/${id}`,
    },
  }

  return response
}
