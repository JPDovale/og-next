import { IValue, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindValue {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponseValue {
  value: IValue | undefined
  commentsInThisValue: IComment[] | undefined
  keysValue: {
    label: IEditorTo
    subObjects: 'exceções'
    keyPath: string
  }
}

export function findValueUtil({ id, person }: IFindValue): IResponseValue {
  const value = person?.values?.find((value) => value.id === id)

  const commentsInThisValue = person?.comments?.filter(
    (comment) => comment.to === `values/${id}`,
  )

  const response: IResponseValue = {
    value,
    commentsInThisValue,
    keysValue: {
      label: 'valor',
      subObjects: 'exceções',
      keyPath: `value/${id}`,
    },
  }

  return response
}
