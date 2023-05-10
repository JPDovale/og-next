import { getPersonalitiesRequest } from '@api/projectsRequests'
import { IPersonality } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function usePersonalities(projectId: string) {
  const { data, isLoading } = useQuery(
    `personalities-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getPersonalitiesRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getPersonalitiesRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const personalities = response.personalities as IPersonality[]

      return { personalities, errorMessage, errorTitle }
    },
  )

  const personalities = data?.personalities || []

  function findPersonalityWherePersonNotExisteIn(personId: string) {
    const personalitiesWherePersonNorFund = personalities.filter(
      (personality) => {
        const personExisteInPersonality = personality.persons?.find(
          (person) => person.id === personId,
        )

        if (personExisteInPersonality) {
          return false
        } else {
          return true
        }
      },
    )

    return personalitiesWherePersonNorFund
  }

  function findPersonality(id: string) {
    const personality = personalities.find(
      (personality) => personality.id === id,
    )
    return { personality }
  }

  return {
    personalities,
    loadingPersonalities: isLoading,
    findPersonalityWherePersonNotExisteIn,
    findPersonality,
  }
}
