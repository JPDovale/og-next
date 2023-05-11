import { getBoxesRequest } from '@api/boxesRequests'
import { IBoxResponse, ITag } from '@api/responsesTypes/IBoxResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useUser } from '@hooks/useUser'
import lodash from 'lodash'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { createArchive } from './events/createArchive'
import { createBox } from './events/createBox'
import { deleteArchive } from './events/deleteArchive'
import { deleteBox } from './events/deleteBox'
import { removeImageInArchive } from './events/removeImageInArchive'
import { saveImageInArchive } from './events/saveImageInArchive'
import { updateArchive } from './events/updateArchive'
import { updateBox } from './events/updateBox'
import { ICallEvent } from './types/ICallEvent'

export function useBoxes() {
  const { loadingUser } = useUser()

  const { data, isLoading, refetch } = useQuery(
    `boxes`,
    async () => {
      let response = await getBoxesRequest()
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token') {
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

  const loadingBoxes = loadingUser || isLoading
  const refetchBoxes = refetch

  const { tags, boxes } = useMemo(() => {
    const boxes = data?.boxes ?? []
    let tags: ITag[] = []

    boxes.map((box) => box.tags?.map((tag) => tags.push(tag)))

    tags = tags.filter(
      (tag, i, self) => i === self.findIndex((t) => t.name === tag.name),
    )

    return {
      tags,
      boxes,
    }
  }, [data?.boxes])

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

  const callEvent: ICallEvent = {
    create: (newBox) => createBox(newBox, refetchBoxes),
    createArchive: (newArchive) => createArchive(newArchive, refetchBoxes),
    saveImageInArchive: (newImage) =>
      saveImageInArchive(newImage, refetchBoxes),
    removeImage: (image) => removeImageInArchive(image, refetchBoxes),
    deleteArchive: (archive) => deleteArchive(archive, refetchBoxes),
    updateArchive: (archive) => updateArchive(archive, refetchBoxes),
    updateBox: (box) => updateBox(box, refetchBoxes),
    deleteBox: (boxId) => deleteBox(boxId, refetchBoxes),
  }

  return {
    loadingBoxes,
    boxes,
    tags,
    findBox,
    callEvent,
  }
}
