import { IPower, IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { IEditorTo } from 'src/@types/editores/IEditorTo'

interface IFindPower {
  person: IPersonsResponse | undefined
  id: string
}

interface IResponsePower {
  power: IPower | undefined
  commentsInThisPower: IComment[] | undefined
  keysPower: {
    label: IEditorTo
    keyPath: string
  }
}

export function findPowerUtil({ id, person }: IFindPower): IResponsePower {
  const power = person?.powers?.find((power) => power.id === id)

  const commentsInThisPower = person?.comments?.filter(
    (comment) => comment.to === `powers/${id}`,
  )

  const response: IResponsePower = {
    power,
    commentsInThisPower,
    keysPower: {
      label: 'poder',
      keyPath: `power/${id}`,
    },
  }

  return response
}
