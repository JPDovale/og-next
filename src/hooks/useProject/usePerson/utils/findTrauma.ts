import { ITrauma, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindTrauma {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponseTrauma {
  trauma: ITrauma | undefined
  commentsInThisTrauma: IComment[] | undefined
  keysTrauma: {
    label: IEditorTo
    subObjects: 'consequências'
    keyPath: string
  }
}

export function findTraumaUtil({ id, person }: IFindTrauma): IResponseTrauma {
  const trauma = person?.traumas?.find((trauma) => trauma.id === id)

  const commentsInThisTrauma = person?.comments?.filter(
    (comment) => comment.to === `traumas/${id}`,
  )

  const response: IResponseTrauma = {
    trauma,
    commentsInThisTrauma,
    keysTrauma: {
      label: 'trauma',
      subObjects: 'consequências',
      keyPath: `trauma/${id}`,
    },
  }

  return response
}
