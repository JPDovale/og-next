import lodash from 'lodash'
import dayjs from 'dayjs'

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
      const elementsOrd = lodash.sortBy(elements, (object) => {
        const dateSepare = object.createAt.split(' ')[0].split('/')
        const dateInFormat = `${dateSepare[1]}/${dateSepare[0]}/${dateSepare[2]}`
        const date = dayjs(dateInFormat).valueOf()

        return date
      })

      return elementsOrd.reverse() === undefined ? [] : elementsOrd
    }

    case 'time-desc': {
      const elementsOrd = lodash.sortBy(elements, (object) => {
        const dateSepare = object.createAt.split(' ')[0].split('/')
        const dateInFormat = `${dateSepare[1]}/${dateSepare[0]}/${dateSepare[2]}`
        const date = dayjs(dateInFormat).valueOf()

        return date
      })
      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'update-asc': {
      const elementsOrd = lodash.sortBy(elements, (object) => {
        const dateSepare = object.updateAt.split(' ')[0].split('/')
        const dateInFormat = `${dateSepare[1]}/${dateSepare[0]}/${dateSepare[2]}`
        const date = dayjs(dateInFormat).valueOf()

        return date
      })
      return elementsOrd.reverse() === undefined ? [] : elementsOrd
    }

    case 'update-desc': {
      const elementsOrd = lodash.sortBy(elements, (object) => {
        const dateSepare = object.updateAt.split(' ')[0].split('/')
        const dateInFormat = `${dateSepare[1]}/${dateSepare[0]}/${dateSepare[2]}`
        const date = dayjs(dateInFormat).valueOf()

        return date
      })
      return elementsOrd === undefined ? [] : elementsOrd
    }

    default:
      return []
  }
}
