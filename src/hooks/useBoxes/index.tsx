import { getBoxesRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useUser } from '@hooks/useUser'
import lodash from 'lodash'
import { useQuery } from 'react-query'

export function useBoxes() {
  const { isRefreshingSession, loadingUser } = useUser()

  const { data, isLoading } = useQuery(
    `boxes`,
    async () => {
      if (isRefreshingSession) return

      let response = await getBoxesRequest()
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getBoxesRequest()
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const boxes = response.boxes as IBoxResponse[]

      return { boxes, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
    },
  )

  const loadingBoxes = !loadingUser && !isLoading
  const boxes = data?.boxes ?? []

  function findBox(id: string) {
    let box = boxes?.find((box) => box.id === id)
    const boxName = box ? box.name : 'Carregando...'

    if (box) {
      const archivesOrd = lodash.sortBy(
        box.archives,
        (archive) => archive.created_at,
      )

      const boxWithArchiveInOrdPerLastUpdate = {
        ...box,
        archives: archivesOrd.reverse() === undefined ? [] : archivesOrd,
      }

      box = boxWithArchiveInOrdPerLastUpdate
    }

    return { box, boxName }
  }

  return {
    loadingBoxes,
    boxes,
    findBox,
  }
}
