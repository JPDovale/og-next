import { IFear, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindFear {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponseFear {
  fear: IFear | undefined
  commentsInThisFear: IComment[] | undefined
  keysFear: {
    label: IEditorTo
    keyPath: string
  }
}

export function findFearUtil({ id, person }: IFindFear): IResponseFear {
  const fear = person?.fears?.find((fear) => fear.id === id)

  const commentsInThisFear = person?.comments?.filter(
    (comment) => comment.to === `fears/${id}`,
  )

  const response: IResponseFear = {
    fear,
    commentsInThisFear,
    keysFear: {
      label: 'medo',
      keyPath: `fear/${id}`,
    },
  }

  return response
}
