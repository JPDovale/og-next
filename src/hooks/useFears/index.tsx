import { getFearsRequest } from '@api/projectsRequests'
import { IFear } from '@api/responsesTypes/IPersonsResponse'
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

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getFearsRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const fears = response.fears as IFear[]

      return { fears, errorMessage, errorTitle }
    },
  )

  const fears = data?.fears || []

  function findFearWherePersonNotExisteIn(personId: string) {
    const fearsWherePersonNorFund = fears.filter((fear) => {
      const personExisteInFear = fear.persons?.find(
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
