import lodash from 'lodash'
import { IDateResponse } from '@api/responsesTypes/ITimelinesResponse'

export function orderElements(
  elements: any[],
  option:
    | 'a-z'
    | 'z-a'
    | 'time-asc'
    | 'time-desc'
    | 'update-desc'
    | 'update-asc',
) {
  switch (option) {
    case 'a-z': {
      const elementsOrd = lodash.sortBy(elements, (object) =>
        lodash.deburr(object.name),
      )
      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'z-a': {
      const elementsOrd = lodash.sortBy(elements, (object) =>
        lodash.deburr(object.name),
      )
      return elementsOrd.reverse() === undefined ? [] : elementsOrd
    }

    case 'time-asc': {
      const elementsOrd = lodash.sortBy(elements, (object) => object.created_at)

      return elementsOrd.reverse() === undefined ? [] : elementsOrd
    }

    case 'time-desc': {
      const elementsOrd = lodash.sortBy(elements, (object) => object.created_at)
      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'update-asc': {
      const elementsOrd = lodash.sortBy(elements, (object) => object.updated_at)
      return elementsOrd === undefined ? [] : elementsOrd.reverse()
    }

    case 'update-desc': {
      const elementsOrd = lodash.sortBy(elements, (object) => object.updated_at)

      return elementsOrd === undefined ? [] : elementsOrd
    }

    default:
      return []
  }
}

export function orderDatesOfTimelines(
  elements: IDateResponse[],
): IDateResponse[] {
  const elementsOrd = lodash.sortBy(elements, (object) => {
    return object.dateDif
  })

  return elementsOrd === undefined ? [] : elementsOrd
}
