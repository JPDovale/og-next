import { getValuesRequest } from '@api/projectsRequests'
import { IValue } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useQuery } from 'react-query'

export function useValues(projectId: string) {
  const { data, isLoading } = useQuery(
    `values-project-${projectId}`,
    async () => {
      if (!projectId) return

      let response = await getValuesRequest(projectId)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getValuesRequest(projectId)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const values = response.values as IValue[]

      return { values, errorMessage, errorTitle }
    },
  )

  const values = data?.values || []

  function findValueWherePersonNotExisteIn(personId: string) {
    const valuesWherePersonNorFund = values.filter((value) => {
      const personExisteInValue = value.persons?.find(
        (person) => person.id === personId,
      )

      if (personExisteInValue) {
        return false
      } else {
        return true
      }
    })

    return valuesWherePersonNorFund
  }

  function findValue(id: string) {
    const value = values.find((value) => value.id === id)
    return { value }
  }

  return {
    values,
    loadingValues: isLoading,
    findValueWherePersonNotExisteIn,
    findValue,
  }
}
