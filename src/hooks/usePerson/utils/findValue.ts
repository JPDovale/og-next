import { IValue, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindValue {
  person: IPersonsResponse | null
  id: string
}

interface IResponseValue {
  value: IValue | undefined
  keysValue: {
    label: IEditorTo
    subObjects: 'exceções'
    keyPath: string
  }
}

export function findValueUtil({ id, person }: IFindValue): IResponseValue {
  const value = person?.values?.find((value) => value.id === id)

  const response: IResponseValue = {
    value,
    keysValue: {
      label: 'valor',
      subObjects: 'exceções',
      keyPath: `value/${id}`,
    },
  }

  return response
}
