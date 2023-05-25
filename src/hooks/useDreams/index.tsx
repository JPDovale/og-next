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

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getDreamsRequest(projectId)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const dreams = response.dreams as IDream[]

      return { dreams, errorMessage, errorTitle }
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
