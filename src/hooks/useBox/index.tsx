import { ProjectsContext } from '@contexts/projects'
import { useContext } from 'react'

export function useBox() {
  const { boxes } = useContext(ProjectsContext)

  const boxesNotInternal = boxes?.filter((box) => !box.internal)

  function findBox(id: string) {
    const box = boxes?.find((box) => box.id === id)
    const boxName = box ? box.name : 'Carregando...'

    return { box, boxName }
  }

  return {
    boxes: boxesNotInternal,
    findBox,
  }
}
