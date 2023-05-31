export interface IPersonPreview {
  id: string
  name: {
    first: string
    last: string
    full: string
  }
  age: {
    number: number
    bornDateTimestamp: number
    bornDate: string
  }
  history: string
  infos: {
    createdAt: Date
    updatedAt: Date
  }
  image: {
    url: string
    alt: string | undefined
  }
  collections: {
    objective: {
      itensLength: number
    }
    dream: {
      itensLength: number
    }
    fear: {
      itensLength: number
    }
    couple: {
      itensLength: number
    }
    appearance: {
      itensLength: number
    }
    personality: {
      itensLength: number
    }
    power: {
      itensLength: number
    }
    trauma: {
      itensLength: number
    }
    value: {
      itensLength: number
    }
    wishe: {
      itensLength: number
    }
  }
}
