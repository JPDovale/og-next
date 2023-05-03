import { getObjectivesRequest } from '@api/projectsRequests'
import { IObjective } from '@api/responsesTypes/IPersonsResponse'
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

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getObjectivesRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const objectives = response.objectives as IObjective[]

      return { objectives, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
    },
  )

  const objectives = data?.objectives || []

  function findObjectiveWherePersonNotExisteIn(personId: string) {
    const objectivesWherePersonNorFund = objectives.filter((objective) => {
      const personExisteInObjective = objective.persons?.find(
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
