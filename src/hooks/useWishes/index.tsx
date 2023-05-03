import { getWishesRequest } from '@api/projectsRequests'
import { IWishe } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function useWishes(projectId: string) {
  const { data, isLoading } = useQuery(
    `wishes-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getWishesRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getWishesRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const wishes = response.wishes as IWishe[]

      return { wishes, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
    },
  )

  const wishes = data?.wishes || []

  function findWisheWherePersonNotExisteIn(personId: string) {
    const wishesWherePersonNorFund = wishes.filter((wishe) => {
      const personExisteInWishe = wishe.persons?.find(
        (person) => person.id === personId,
      )

      if (personExisteInWishe) {
        return false
      } else {
        return true
      }
    })

    return wishesWherePersonNorFund
  }

  function findWishe(id: string) {
    const wishe = wishes.find((wishe) => wishe.id === id)
    return { wishe }
  }

  return {
    wishes,
    loadingWishes: isLoading,
    findWisheWherePersonNotExisteIn,
    findWishe,
  }
}
