import { IPerson } from '@api/responsesTypes/person/IPerson'

interface IFindObjective {
  person: IPerson | null
  id: string
}

export function findObjectiveUtil({ person, id }: IFindObjective) {
  const objective = person?.collections.objective.itens?.find(
    (objective) => objective.id === id,
  )

  return {
    objective,
  }
}
