import { getWishesRequest } from '@api/projectsRequests'
import { IWishe } from '@api/responsesTypes/person/IPerson'
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

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getWishesRequest(projectId)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const wishes = response.data?.wishes as IWishe[]

      return { wishes, errorMessage, errorTitle }
    },
  )

  const wishes = data?.wishes || []

  function findWisheWherePersonNotExisteIn(personId: string) {
    const wishesWherePersonNorFund = wishes.filter((wishe) => {
      const personExisteInWishe = wishe.collections.referencesIt.itens?.find(
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
