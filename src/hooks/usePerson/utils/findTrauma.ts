import { ITrauma, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindTrauma {
  person: IPersonsResponse | null
  id: string
}

interface IResponseTrauma {
  trauma: ITrauma | undefined
  keysTrauma: {
    label: IEditorTo
    subObjects: 'consequências'
    keyPath: string
  }
}

export function findTraumaUtil({ id, person }: IFindTrauma): IResponseTrauma {
  const trauma = person?.traumas?.find((trauma) => trauma.id === id)

  const response: IResponseTrauma = {
    trauma,
    keysTrauma: {
      label: 'trauma',
      subObjects: 'consequências',
      keyPath: `trauma/${id}`,
    },
  }

  return response
}
