import { getAppearancesRequest } from '@api/projectsRequests'
import { IAppearance } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function useAppearances(projectId: string) {
  const { data, isLoading } = useQuery(
    `appearances-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getAppearancesRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getAppearancesRequest(projectId)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const appearances = response.appearances as IAppearance[]

      return { appearances, errorMessage, errorTitle }
    },
  )

  const appearances = data?.appearances || []

  function findAppearanceWherePersonNotExisteIn(personId: string) {
    const appearancesWherePersonNorFund = appearances.filter((appearance) => {
      const personExisteInAppearance = appearance.persons?.find(
        (person) => person.id === personId,
      )

      if (personExisteInAppearance) {
        return false
      } else {
        return true
      }
    })

    return appearancesWherePersonNorFund
  }

  function findAppearance(id: string) {
    const appearance = appearances.find((appearance) => appearance.id === id)
    return { appearance }
  }

  return {
    appearances,
    loadingAppearances: isLoading,
    findAppearanceWherePersonNotExisteIn,
    findAppearance,
  }
}
