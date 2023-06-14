import { getPowersRequest } from '@api/projectsRequests'
import { IPower } from '@api/responsesTypes/person/IPerson'
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

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getPowersRequest(projectId)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const powers = response.data?.powers as IPower[]

      return { powers, errorMessage, errorTitle }
    },
  )

  const powers = data?.powers || []

  function findPowerWherePersonNotExisteIn(personId: string) {
    const powersWherePersonNorFund = powers.filter((power) => {
      const personExisteInPower = power.collections.referencesIt.itens?.find(
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
