import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'

export function constructObjectives(
  person: IPersonsResponse | undefined,
  persons: IPersonsResponse[],
) {
  const objectives = person?.objectives.map((objective) => {
    const avoiders = persons.filter((person) => {
      const isAvoider = !!objective.avoiders.find(
        (avoider) => avoider === person?.id,
      )

      return isAvoider
    })

    const supporting = persons.filter((person) => {
      const isSupporter = !!objective.supporting.find(
        (support) => support === person?.id,
      )

      return isSupporter
    })

    return {
      ...objective,
      avoiders,
      supporting,
      objectiveDefault: {
        ...objective,
      },
    }
  })

  return objectives
}
