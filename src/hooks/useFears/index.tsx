import { getFearsRequest } from '@api/projectsRequests'
import { IFear } from '@api/responsesTypes/person/IPerson'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function useFears(projectId: string) {
  const { data, isLoading } = useQuery(
    `fears-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getFearsRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getFearsRequest(projectId)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const fears = response.data?.fears as IFear[]

      return { fears, errorMessage, errorTitle }
    },
  )

  const fears = data?.fears || []

  function findFearWherePersonNotExisteIn(personId: string) {
    const fearsWherePersonNorFund = fears.filter((fear) => {
      const personExisteInFear = fear.collections.referencesIt.itens?.find(
        (person) => person.id === personId,
      )

      if (personExisteInFear) {
        return false
      } else {
        return true
      }
    })

    return fearsWherePersonNorFund
  }

  function findFear(id: string) {
    const fear = fears.find((fear) => fear.id === id)
    return { fear }
  }

  return {
    fears,
    loadingFears: isLoading,
    findFearWherePersonNotExisteIn,
    findFear,
  }
}
