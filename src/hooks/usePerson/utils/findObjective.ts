import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'

interface IFindObjective {
  person: IPersonsResponse | null
  id: string
}

export function findObjectiveUtil({ person, id }: IFindObjective) {
  const objective = person?.objectives?.find((objective) => objective.id === id)

  return {
    objective,
  }
}
