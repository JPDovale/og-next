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
      const elementsOrd = elements?.slice().sort((a, b) =>
        a.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') >
        b.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          ? 1
          : b.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') >
            a.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ? -1
          : 0,
      )

      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'z-a': {
      const elementsOrd = elements?.slice().sort((a, b) =>
        a.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') <
        b.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          ? 1
          : b.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') <
            a.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ? -1
          : 0,
      )

      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'time-asc': {
      const elementsOrd = elements?.slice().sort((a, b) =>
        a.createAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') <
        b.createAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          ? 1
          : b.createAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') <
            a.createAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ? -1
          : 0,
      )

      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'time-desc': {
      const elementsOrd = elements?.slice().sort((a, b) =>
        a.createAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') >
        b.createAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          ? 1
          : b.createAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') >
            a.createAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ? -1
          : 0,
      )

      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'update-asc': {
      const elementsOrd = elements?.slice().sort((a, b) =>
        a.updateAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') <
        b.updateAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          ? 1
          : b.updateAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') <
            a.updateAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ? -1
          : 0,
      )

      return elementsOrd === undefined ? [] : elementsOrd
    }

    case 'update-desc': {
      const elementsOrd = elements?.slice().sort((a, b) =>
        a.updateAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') >
        b.updateAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          ? 1
          : b.updateAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') >
            a.updateAt
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ? -1
          : 0,
      )

      return elementsOrd === undefined ? [] : elementsOrd
    }
    default:
      return []
  }
}
