import { ProjectsContext } from '@contexts/projects'
import dayjs from 'dayjs'
import lodash from 'lodash'
import { useContext } from 'react'

export function useBox() {
  const { boxes } = useContext(ProjectsContext)

  const boxesNotInternal = boxes?.filter((box) => !box.internal)

  function findBox(id: string) {
    let box = boxes?.find((box) => box.id === id)
    const boxName = box ? box.name : 'Carregando...'

    if (box) {
      const archivesOrd = lodash.sortBy(box.archives, (a) => {
        const dateSepare = a.archive.updatedAt.split(' ')[0].split('/')
        const dateInFormat = `${dateSepare[1]}/${dateSepare[0]}/${dateSepare[2]}`
        const date = dayjs(dateInFormat).valueOf()

        return date
      })

      const boxWithArchiveInOrdPerLastUpdate = {
        ...box,
        archives: archivesOrd.reverse() === undefined ? [] : archivesOrd,
      }

      box = boxWithArchiveInOrdPerLastUpdate
    }

    return { box, boxName }
  }

  return {
    boxes: boxesNotInternal,
    findBox,
  }
}
