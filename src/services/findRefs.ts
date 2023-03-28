import { IArchive } from '@api/responsesTypes/IBoxResponse'
import { IEditorTo } from '../@types/editores/IEditorTo'
import { IPersonsResponse } from '../api/responsesTypes/IPersonsResponse'

export function findRefs(
  to: IEditorTo,
  referenceArchives: IArchive[],
  person: IPersonsResponse,
): IArchive[] {
  switch (to) {
    case 'sonho': {
      if (!referenceArchives) return []
      const refsDreams = referenceArchives.filter((file) => {
        const isAddedRef = !person.dreams?.find(
          (dream) => dream.id === file.archive.id,
        )

        return isAddedRef
      })

      return refsDreams
    }

    case 'medo': {
      if (!referenceArchives) return []
      const refsFears = referenceArchives.filter((file) => {
        const isAddedRef = !person.fears?.find(
          (fear) => file.archive.id === fear.id,
        )

        return isAddedRef
      })

      return refsFears
    }

    case 'desejo': {
      if (!referenceArchives) return []
      const refsWishes = referenceArchives.filter((file) => {
        const isAddedRef = !person.personality?.find(
          (wishe) => file.archive.id === wishe.id,
        )

        return isAddedRef
      })

      return refsWishes
    }

    case 'personalidade': {
      if (!referenceArchives) return []
      const refsPersonality = referenceArchives.filter((file) => {
        const isAddedRef = !person.personality?.find(
          (personality) => file.archive.id === personality.id,
        )

        return isAddedRef
      })

      return refsPersonality
    }

    case 'valor': {
      if (!referenceArchives) return []
      const refsValues = referenceArchives.filter((file) => {
        const isAddedRef = !person.values?.find(
          (value) => value.id === file.archive.id,
        )

        return isAddedRef
      })

      return refsValues
    }

    case 'aparência': {
      if (!referenceArchives) return []
      const refsValues = referenceArchives.filter((file) => {
        const isAddedRef = !person.appearance?.find(
          (appearance) => appearance.id === file.archive.id,
        )

        return isAddedRef
      })

      return refsValues
    }

    case 'trauma': {
      if (!referenceArchives) return []
      const refsValues = referenceArchives.filter((file) => {
        const isAddedRef = !person.traumas?.find(
          (trauma) => trauma.id === file.archive.id,
        )

        return isAddedRef
      })

      return refsValues
    }

    default:
      return []
  }
}
