import {
  IAppearance,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindAppearance {
  person: IPersonsResponse | null
  id: string
}

interface IResponseAppearance {
  appearance: IAppearance | undefined
  keysAppearance: {
    label: IEditorTo
    keyPath: string
  }
}

export function findAppearanceUtil({
  id,
  person,
}: IFindAppearance): IResponseAppearance {
  const appearance = person?.appearances?.find(
    (appearance) => appearance.id === id,
  )

  const response: IResponseAppearance = {
    appearance,
    keysAppearance: {
      label: 'aparência',
      keyPath: `appearance/${id}`,
    },
  }

  return response
}
