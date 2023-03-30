import {
  IAppearance,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindAppearance {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponseAppearance {
  appearance: IAppearance | undefined
  commentsInThisAppearance: IComment[] | undefined
  keysAppearance: {
    label: IEditorTo
    keyPath: string
  }
}

export function findAppearanceUtil({
  id,
  person,
}: IFindAppearance): IResponseAppearance {
  const appearance = person?.appearance?.find(
    (appearance) => appearance.id === id,
  )

  const commentsInThisAppearance = person?.comments?.filter(
    (comment) => comment.to === `appearance/${id}`,
  )

  const response: IResponseAppearance = {
    appearance,
    commentsInThisAppearance,
    keysAppearance: {
      label: 'aparência',
      keyPath: `appearance/${id}`,
    },
  }

  return response
}
