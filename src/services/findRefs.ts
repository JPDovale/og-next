import { IEditorTo } from '../@types/editores/IEditorTo'
import { IPersonsResponse } from '../api/responsesTypes/IPersonsResponse'
import { IRef } from '../api/responsesTypes/IProjcetResponse'

export function findRefs(
  to: IEditorTo,
  refs: IRef[],
  person: IPersonsResponse,
): IRef[] {
  switch (to) {
    case 'sonho': {
      if (!refs) return []
      const refsDreams = refs.filter((ref) => {
        const isAddedRef = !person.dreams?.find(
          (dream) => dream.id === ref.object.id,
        )

        return isAddedRef
      })

      return refsDreams
    }

    case 'medo': {
      if (!refs) return []
      const refsFears = refs.filter((ref) => {
        const isAddedRef = !person.fears?.find(
          (fear) => ref.object.id === fear.id,
        )

        return isAddedRef
      })

      return refsFears
    }

    case 'desejo': {
      if (!refs) return []
      const refsWishes = refs.filter((ref) => {
        const isAddedRef = !person.personality?.find(
          (wishe) => ref.object.id === wishe.id,
        )

        return isAddedRef
      })

      return refsWishes
    }

    case 'personalidade': {
      if (!refs) return []
      const refsPersonality = refs.filter((ref) => {
        const isAddedRef = !person.personality?.find(
          (personality) => ref.object.id === personality.id,
        )

        return isAddedRef
      })

      return refsPersonality
    }

    case 'valor': {
      if (!refs) return []
      const refsValues = refs.filter((ref) => {
        const isAddedRef = !person.values?.find(
          (value) => value.id === ref.object.id,
        )

        return isAddedRef
      })

      return refsValues
    }

    case 'aparência': {
      if (!refs) return []
      const refsValues = refs.filter((ref) => {
        const isAddedRef = !person.appearance?.find(
          (appearance) => appearance.id === ref.object.id,
        )

        return isAddedRef
      })

      return refsValues
    }

    case 'trauma': {
      if (!refs) return []
      const refsValues = refs.filter((ref) => {
        const isAddedRef = !person.traumas?.find(
          (trauma) => trauma.id === ref.object.id,
        )

        return isAddedRef
      })

      return refsValues
    }

    default:
      return []
  }
}
