import { getPersonalitiesRequest } from '@api/projectsRequests'
import { IPersonality } from '@api/responsesTypes/person/IPerson'
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

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getPersonalitiesRequest(projectId)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const personalities = response.data?.personalities as IPersonality[]

      return { personalities, errorMessage, errorTitle }
    },
  )

  const personalities = data?.personalities || []

  function findPersonalityWherePersonNotExisteIn(personId: string) {
    const personalitiesWherePersonNorFund = personalities.filter(
      (personality) => {
        const personExisteInPersonality =
          personality.collections.referencesIt.itens?.find(
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
