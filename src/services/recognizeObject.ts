import { IEditorTo } from '../@types/editores/IEditorTo'

interface ISubObject {
  title: string
  description: string
}

interface IObject {
  title: string
  description: string
  subObjects?: ISubObject[]
  isToDelete: boolean
  final?: boolean
  personId?: string
}

export function recognizeObject(
  to: IEditorTo,
  personId: string,
  projectId: string,
  obj?: IObject,
  refId?: string,
  genericId?: string,
  subObjects?: ISubObject[],
  coupleId?: string,
) {
  switch (to) {
    case 'sonho': {
      const newDreams = {
        request: {
          dream: obj || null,
          personId,
          projectId,
          refId,
        },
        key: 'dreams',
      }

      const update = {
        request: {
          dream: {
            ...obj,
          },
          personId,
          dreamId: genericId,
        },
        key: 'dreams',
      }

      const toDelete = {
        request: {
          personId,
          dreamId: genericId,
        },
        key: 'dreams',
      }

      return obj?.isToDelete ? toDelete : genericId ? update : newDreams
    }

    case 'medo': {
      const newFears = {
        request: {
          fear: obj || null,
          personId,
          projectId,
          refId,
        },
        key: 'fears',
      }

      const update = {
        request: {
          fear: {
            ...obj,
          },
          personId,
          fearId: genericId,
        },
        key: 'fears',
      }

      const toDelete = {
        request: {
          personId,
          fearId: genericId,
        },
        key: 'fears',
      }

      return obj?.isToDelete ? toDelete : genericId ? update : newFears
    }

    case 'desejo': {
      const newWishes = {
        request: {
          wishe: obj || null,
          personId,
          projectId,
          refId,
        },
        key: 'wishes',
      }

      const update = {
        request: {
          wishe: {
            ...obj,
          },
          personId,
          wisheId: genericId,
        },
        key: 'wishes',
      }

      const toDelete = {
        request: {
          personId,
          wisheId: genericId,
        },
        key: 'wishes',
      }

      return obj?.isToDelete ? toDelete : genericId ? update : newWishes
    }

    case 'personalidade': {
      const newPersonalityObj = {
        title: obj?.title,
        description: obj?.description,
        consequences: obj?.subObjects || [],
      }

      const newPersonality = {
        request: {
          personality: subObjects
            ? {
                consequences: subObjects,
              }
            : newPersonalityObj || null,
          personId,
          projectId,
          refId,
        },
        key: 'personality',
      }

      const update = {
        request: {
          personality: {
            ...newPersonalityObj,
          },
          personId,
          personalityId: genericId,
        },
        key: 'personality',
      }

      const toDelete = {
        request: {
          personId,
          personalityId: genericId,
        },
        key: 'personality',
      }

      return genericId ? (obj?.isToDelete ? toDelete : update) : newPersonality
    }

    case 'valor': {
      const newValuesObj = {
        title: obj?.title,
        description: obj?.description,
        exceptions: obj?.subObjects || [],
      }

      const newValues = {
        request: {
          value: subObjects
            ? { exceptions: obj?.subObjects || subObjects || [] }
            : newValuesObj || null,
          personId,
          projectId,
          refId,
        },
        key: 'values',
      }

      const update = {
        request: {
          value: {
            ...newValuesObj,
          },
          personId,
          valueId: genericId,
        },
        key: 'values',
      }

      const toDelete = {
        request: {
          personId,
          valueId: genericId,
        },
        key: 'values',
      }

      return obj?.isToDelete ? toDelete : genericId ? update : newValues
    }

    case 'aparência': {
      const newAppearanceObj = {
        title: obj?.title,
        description: obj?.description,
      }

      const newAppearance = {
        request: {
          appearance: newAppearanceObj || null,
          personId,
          projectId,
          refId,
        },
        key: 'appearance',
      }

      const update = {
        request: {
          appearance: {
            ...newAppearanceObj,
          },
          personId,
          appearanceId: genericId,
        },
        key: 'appearance',
      }

      const toDelete = {
        request: {
          personId,
          appearanceId: genericId,
        },
        key: 'appearance',
      }

      return genericId ? (obj?.isToDelete ? toDelete : update) : newAppearance
    }

    case 'trauma': {
      const newTraumaObj = {
        title: obj?.title,
        description: obj?.description,
        consequences: obj?.subObjects || [],
      }

      const newTrauma = {
        request: {
          trauma: subObjects
            ? {
                consequences: obj?.subObjects || subObjects || [],
              }
            : newTraumaObj || null,
          personId,
          projectId,
          refId,
        },
        key: 'traumas',
      }

      const update = {
        request: {
          trauma: {
            ...newTraumaObj,
          },
          personId,
          traumaId: genericId,
        },
        key: 'traumas',
      }

      const toDelete = {
        request: {
          personId,
          traumaId: genericId,
        },
        key: 'traumas',
      }

      return obj?.isToDelete ? toDelete : genericId ? update : newTrauma
    }

    case 'poder': {
      const newPowerObj = {
        title: obj?.title,
        description: obj?.description,
      }

      const newPower = {
        request: {
          power: newPowerObj || null,
          personId,
          projectId,
          refId,
        },
        key: 'powers',
      }

      const update = {
        request: {
          power: {
            ...newPowerObj,
          },
          personId,
          powerId: genericId,
        },
        key: 'powers',
      }

      const toDelete = {
        request: {
          personId,
          powerId: genericId,
        },
        key: 'powers',
      }

      return obj?.isToDelete ? toDelete : genericId ? update : newPower
    }

    case 'casal': {
      const newCoupleObj = {
        title: obj?.title,
        description: obj?.description,
        final: obj?.final,
        personId: obj?.personId,
      }

      const newCouple = {
        request: {
          couple: newCoupleObj || null,
          personId,
          projectId,
          refId,
        },
        key: 'couples',
      }

      const update = {
        request: {
          couple: {
            ...newCoupleObj,
          },
          personId,
          coupleId: genericId,
        },
        key: 'couples',
      }

      const toDelete = {
        request: {
          personId,
          coupleId,
        },
        key: 'couples',
      }

      return obj?.isToDelete ? toDelete : genericId ? update : newCouple
    }

    default:
      break
  }
}
