import { IComment } from '../IProjectResponse'

export interface IPersonInObject {
  id: string
  name: {
    first: string
  }
  image: {
    url: string | undefined
    alt: string
  }
}

export interface IObjective {
  id: string
  infos: {
    title: string
    description: string
    itBeRealized: boolean
    createdAt: Date
  }
  collections: {
    avoider: {
      itensLength: number
      itens: IPersonInObject[]
    }
    supporter: {
      itensLength: number
      itens: IPersonInObject[]
    }
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IDream {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IFear {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IInCouplePerson extends IPersonInObject {
  age: number | null
  history: string
}

export interface ICouple {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
    untilEnd: boolean
  }
  collections: {
    couple: IInCouplePerson
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IAppearance {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface ISubObject {
  id: number
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    personality?: string
    trauma?: string
    value?: string
  }
}

export interface IPersonality {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    consequence: {
      itensLength: number
      itens: ISubObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IPower {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface ITrauma {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    consequence: {
      itensLength: number
      itens: ISubObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IValue {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    exception: {
      itensLength: number
      itens: ISubObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IWishe {
  id: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections: {
    referencesIt: {
      itensLength: number
      itens: IPersonInObject[]
    }
    comment: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IPerson {
  id: string
  name: {
    first: string
    last: string
    full: string
  }
  age: {
    number: number | null
    bornDateTimestamp: number
    bornDate: string
    bornDateYear: string
    bornDateMonth: string
    bornDateDay: number
    bornDateHour: number
    bornDateMinute: number
    bornDateSecond: number
    bornTimeChrist: 'A.C.' | 'D.C.'
  }
  image: {
    url: string | undefined
    alt: string
  }
  history: string
  infos: {
    createdAt: Date
    updatedAt: Date
    projectId: string
  }
  collections: {
    objective: {
      itensLength: number
      itens: IObjective[]
    }
    dream: {
      itensLength: number
      itens: IDream[]
    }
    fear: {
      itensLength: number
      itens: IFear[]
    }
    couple: {
      itensLength: number
      itens: ICouple[]
    }
    appearance: {
      itensLength: number
      itens: IAppearance[]
    }
    personality: {
      itensLength: number
      itens: IPersonality[]
    }
    power: {
      itensLength: number
      itens: IPower[]
    }
    trauma: {
      itensLength: number
      itens: ITrauma[]
    }
    value: {
      itensLength: number
      itens: IValue[]
    }
    wishe: {
      itensLength: number
      itens: IWishe[]
    }
  }
}

export interface IPersonResponse {
  person: IPerson
}
