import { getCapituleRequest } from '@api/booksRequests'
import { ICapitule } from '@api/responsesTypes/IBooksResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { ProjectsContext } from '@contexts/projects'
import { useUser } from '@hooks/useUser'
import { useContext } from 'react'
import { useQuery } from 'react-query'

export function useCapitule(id: string) {
  const { loading, setLoading } = useContext(ProjectsContext)
  const { isRefreshingSession, loadingUser } = useUser()

  const { data, isLoading } = useQuery(
    `capitule-${id}`,
    async () => {
      if (!id || isRefreshingSession) return

      let response = await getCapituleRequest(id)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getCapituleRequest(id)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const capitule = response.capitule as ICapitule

      return { capitule, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
      onError: () => setLoading(false),
      onSuccess: () => setLoading(false),
    },
  )

  const capitule = data?.capitule ?? null
  const loadingCapitule = loading || loadingUser || isLoading
  const capituleName = capitule?.name ?? 'Carregando...'
  const capituleObjective = capitule?.objective ?? 'Carregando...'
  const capituleAct1 = capitule?.structure_act_1 ?? 'Carregando...'
  const capituleAct2 = capitule?.structure_act_2 ?? 'Carregando...'
  const capituleAct3 = capitule?.structure_act_3 ?? 'Carregando...'
  const capituleWords = capitule?.words ?? 0

  function findScene(id: string) {
    const scene = capitule?.scenes.find((scene) => scene.id === id)

    return {
      scene,
    }
  }

  return {
    capitule,
    loadingCapitule,
    capituleName,
    capituleObjective,
    capituleAct1,
    capituleAct2,
    capituleAct3,
    capituleWords,

    findScene,
  }
}
