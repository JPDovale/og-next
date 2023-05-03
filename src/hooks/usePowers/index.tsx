import { getPowersRequest } from '@api/projectsRequests'
import { IPower } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function usePowers(projectId: string) {
  const { data, isLoading } = useQuery(
    `powers-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getPowersRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getPowersRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const powers = response.powers as IPower[]

      return { powers, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
    },
  )

  const powers = data?.powers || []

  function findPowerWherePersonNotExisteIn(personId: string) {
    const powersWherePersonNorFund = powers.filter((power) => {
      const personExisteInPower = power.persons?.find(
        (person) => person.id === personId,
      )

      if (personExisteInPower) {
        return false
      } else {
        return true
      }
    })

    return powersWherePersonNorFund
  }

  function findPower(id: string) {
    const power = powers.find((power) => power.id === id)
    return { power }
  }

  return {
    powers,
    loadingPowers: isLoading,
    findPowerWherePersonNotExisteIn,
    findPower,
  }
}
