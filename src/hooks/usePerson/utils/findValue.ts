import { IPerson, IValue } from '@api/responsesTypes/person/IPerson'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindValue {
  person: IPerson | null
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
  const value = person?.collections.value.itens?.find(
    (value) => value.id === id,
  )

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
