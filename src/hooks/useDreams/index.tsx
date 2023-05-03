import { getDreamsRequest } from '@api/projectsRequests'
import { IDream } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function useDreams(projectId: string) {
  const { data, isLoading } = useQuery(
    `dreams-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getDreamsRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getDreamsRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const dreams = response.dreams as IDream[]

      return { dreams, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
    },
  )

  const dreams = data?.dreams || []

  function findDreamWherePersonNotExisteIn(personId: string) {
    const dreamsWherePersonNorFund = dreams.filter((dream) => {
      const personExisteInDream = dream.persons?.find(
        (person) => person.id === personId,
      )

      if (personExisteInDream) {
        return false
      } else {
        return true
      }
    })

    return dreamsWherePersonNorFund
  }

  function findDream(id: string) {
    const dream = dreams.find((dream) => dream.id === id)
    return { dream }
  }

  return {
    dreams,
    loadingDreams: isLoading,
    findDreamWherePersonNotExisteIn,
    findDream,
  }
}
