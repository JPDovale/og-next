import { IAppearance, IPerson } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindAppearance {
  person: IPerson | null
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
  const appearance = person?.collections.appearance.itens?.find(
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
