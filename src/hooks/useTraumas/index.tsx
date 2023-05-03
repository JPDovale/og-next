import { getTraumasRequest } from '@api/projectsRequests'
import { ITrauma } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function useTraumas(projectId: string) {
  const { data, isLoading } = useQuery(
    `traumas-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getTraumasRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getTraumasRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const traumas = response.traumas as ITrauma[]

      return { traumas, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
    },
  )

  const traumas = data?.traumas || []

  function findTraumaWherePersonNotExisteIn(personId: string) {
    const traumasWherePersonNorFund = traumas.filter((trauma) => {
      const personExisteInTrauma = trauma.persons?.find(
        (person) => person.id === personId,
      )

      if (personExisteInTrauma) {
        return false
      } else {
        return true
      }
    })

    return traumasWherePersonNorFund
  }

  function findTrauma(id: string) {
    const trauma = traumas.find((trauma) => trauma.id === id)
    return { trauma }
  }

  return {
    traumas,
    loadingTraumas: isLoading,
    findTraumaWherePersonNotExisteIn,
    findTrauma,
  }
}
