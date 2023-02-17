import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'

interface IFindObjective {
  person: IPersonsResponse | undefined
  id: string
}

export function findObjectiveUtil({ person, id }: IFindObjective) {
  const objective = person?.objectives?.find((objective) => objective.id === id)

  const commentsInThisObjective = person?.comments?.filter(
    (comment) => comment.to === `objectives/${id}`,
  )

  return {
    objective,
    commentsInThisObjective,
  }
}
