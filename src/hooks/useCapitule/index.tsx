import { getCapituleRequest } from '@api/booksRequests'
import { ICapitule } from '@api/responsesTypes/IBooksResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useBook } from '@hooks/useBook'
import { useUser } from '@hooks/useUser'
import { useQuery } from 'react-query'
import { createScene } from './events/createScene'
import { deleteCapitule } from './events/deleteCapitule'
import { deleteScene } from './events/deleteScene'
import { reorderScenes } from './events/reorderScenes'
import { setSceneToComplete } from './events/setSceneToComplete'
import { updateCapitule } from './events/updateCapitule'
import { updateScene } from './events/updateScene'
import { ICallEvent } from './types/ICallEvent'

export function useCapitule(id: string) {
  const { isRefreshingSession, loadingUser } = useUser()

  const { data, isLoading, refetch } = useQuery(
    `capitule-${id}`,
    async () => {
      if (!id || isRefreshingSession) return

      let response = await getCapituleRequest(id)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getCapituleRequest(id)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const capitule = response.capitule as ICapitule

      return { capitule, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
    },
  )

  const capitule = data?.capitule ?? null

  const refetchCapitule = refetch
  const loadingCapitule = !(!loadingUser && !isLoading)
  const capituleName = capitule?.name ?? 'Carregando...'
  const capituleObjective = capitule?.objective ?? 'Carregando...'
  const capituleAct1 = capitule?.structure_act_1 ?? 'Carregando...'
  const capituleAct2 = capitule?.structure_act_2 ?? 'Carregando...'
  const capituleAct3 = capitule?.structure_act_3 ?? 'Carregando...'
  const capituleWords = capitule?.words ?? 0

  const { refetchBook } = useBook(capitule?.book_id ?? '')

  function findScene(id: string) {
    const scene = capitule?.scenes.find((scene) => scene.id === id)

    return {
      scene,
    }
  }

  const callEvent: ICallEvent = {
    update: (capituleUpdated) =>
      updateCapitule(
        capitule!.id,
        capitule!.book_id,
        capituleUpdated,
        refetchCapitule,
        refetchBook,
      ),
    delete: () => deleteCapitule(capitule!.id, capitule!.book_id, refetchBook),
    createScene: (newScene) =>
      createScene(
        capitule!.id,
        capitule!.book_id,
        newScene,
        refetchCapitule,
        refetchBook,
      ),
    updateScene: (scene) =>
      updateScene(
        capitule!.id,
        capitule!.book_id,
        scene,
        refetchCapitule,
        refetchBook,
      ),
    setSceneToComplete: (completeInfos) =>
      setSceneToComplete(
        capitule!.id,
        capitule!.book_id,
        completeInfos,
        refetchCapitule,
        refetchBook,
      ),

    reorderScenes: (sequences) =>
      reorderScenes(
        capitule!.id,
        capitule!.book_id,
        sequences,
        refetchCapitule,
      ),

    deleteScene: (sceneId) =>
      deleteScene(
        capitule!.id,
        capitule!.book_id,
        sceneId,
        refetchCapitule,
        refetchBook,
      ),
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

    callEvent,
  }
}
