import { getObjectivesRequest } from '@api/projectsRequests'
import { IObjective } from '@api/responsesTypes/person/IPerson'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function useObjectives(projectId: string) {
  const { data, isLoading } = useQuery(
    `objectives-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getObjectivesRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getObjectivesRequest(projectId)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const objectives = response.data?.objectives as IObjective[]

      return { objectives, errorMessage, errorTitle }
    },
  )

  const objectives = data?.objectives || []

  function findObjectiveWherePersonNotExisteIn(personId: string) {
    const objectivesWherePersonNorFund = objectives.filter((objective) => {
      const personExisteInObjective =
        objective.collections.referencesIt.itens?.find(
          (person) => person.id === personId,
        )

      if (personExisteInObjective) {
        return false
      } else {
        return true
      }
    })

    return objectivesWherePersonNorFund
  }

  function findObjective(id: string) {
    const objective = objectives.find((objective) => objective.id === id)
    return { objective }
  }

  return {
    objectives,
    loadingObjectives: isLoading,
    findObjectiveWherePersonNotExisteIn,
    findObjective,
  }
}
