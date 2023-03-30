import { IWishe, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindWishe {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponseWishe {
  wishe: IWishe | undefined
  commentsInThisWishe: IComment[] | undefined
  keysWishe: {
    label: IEditorTo
    keyPath: string
  }
}

export function findWisheUtil({ id, person }: IFindWishe): IResponseWishe {
  const wishe = person?.wishes?.find((wishe) => wishe.id === id)

  const commentsInThisWishe = person?.comments?.filter(
    (comment) => comment.to === `wishes/${id}`,
  )

  const response: IResponseWishe = {
    wishe,
    commentsInThisWishe,
    keysWishe: {
      label: 'desejo',
      keyPath: `wishe/${id}`,
    },
  }

  return response
}
