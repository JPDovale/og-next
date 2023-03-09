import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IArchive } from '@api/responsesTypes/IBoxResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '@api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { InterfaceContext } from '@contexts/interface'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { orderElements } from '@services/orderElements'
import { useContext, useMemo } from 'react'
import {
  IFindCapituleResponse,
  IInfos,
  useBook as useBookInternal,
} from './useBook'
import { usePerson as usePeronInternal } from './usePerson/index'

interface IFindBookResponse {
  book: IBooksResponse | undefined
  bookName: string
  bookInfos: IInfos[]
  bookAuthors: IUserResponse[]
  bookWords: number
  bookWrittenWords: number

  findCapitule: (id: string) => IFindCapituleResponse
}

interface IFindManyPersonsOptions {
  reverse: boolean
}

interface IObjects {
  objectives: IArchive[]
  dreams: IArchive[]
  fears: IArchive[]
  appearance: IArchive[]
  personality: IArchive[]
  powers: IArchive[]
  traumas: IArchive[]
  values: IArchive[]
  wishes: IArchive[]
}

export function useProject(id: string) {
  const { projects, books, persons, users, boxes } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)
  const { orderBy } = useContext(InterfaceContext)

  const project = projects?.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const objectsCreatedInProject = useMemo(() => {
    const findObjects: IObjects = {
      objectives: [],
      dreams: [],
      fears: [],
      appearance: [],
      personality: [],
      powers: [],
      traumas: [],
      values: [],
      wishes: [],
    }

    boxes
      .find((box) => box.name === 'persons/objectives')
      ?.archives.map((file) => {
        return findObjects.objectives.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/dreams')
      ?.archives.map((file) => {
        return findObjects.dreams.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/fears')
      ?.archives.map((file) => {
        return findObjects.fears.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/appearance')
      ?.archives.map((file) => {
        return findObjects.appearance.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/personality')
      ?.archives.map((file) => {
        return findObjects.personality.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/powers')
      ?.archives.map((file) => {
        return findObjects.powers.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/traumas')
      ?.archives.map((file) => {
        return findObjects.traumas.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/values')
      ?.archives.map((file) => {
        return findObjects.values.push(file)
      })

    boxes
      .find((box) => box.name === 'persons/wishes')
      ?.archives.map((file) => {
        return findObjects.wishes.push(file)
      })

    return findObjects
  }, [boxes])

  const projectName = project?.name || 'Carregando...'

  const booksThisProject = books?.filter(
    (book) => book.defaultProject === project?.id,
  )

  const personsThisProject = persons?.filter(
    (person) => person.defaultProject === project?.id,
  )

  const boxesThisProject = boxes?.filter((box) => box.projectId === project?.id)

  const userCreatorFinde = users?.find(
    (user) => user.id === project?.createdPerUser,
  )
  const creator = userCreatorFinde || (user as IUserResponse)

  const personsOrd = orderElements(
    personsThisProject,
    orderBy,
  ) as IPersonsResponse[]

  const userWhitAccessFind = users.filter((u) => {
    return project?.users.find((user) => user.id === u.id)
  })
  const usersWithAccess = [...userWhitAccessFind, user] as IUserResponse[]

  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  function useBook(id: string): IFindBookResponse {
    const {
      book,
      bookName,
      bookInfos,
      bookAuthors,
      findCapitule,
      bookWords,
      bookWrittenWords,
    } = useBookInternal(books, id)

    return {
      book,
      bookName,
      bookInfos,
      bookAuthors,
      findCapitule,
      bookWords,
      bookWrittenWords,
    }
  }

  function usePerson(id: string) {
    const {
      person,
      historyPersons,
      objectives,
      personInfos,
      personBoxes,
      findObjective,
      findPersonality,
      findValue,
      findTrauma,
      findAppearance,
      findDream,
      findFear,
      findWishe,
      findCouple,
      findPower,
      personName,
    } = usePeronInternal(persons, id, boxesThisProject)

    return {
      person,
      historyPersons,
      objectives,
      personInfos,
      personBoxes,
      findObjective,
      findPersonality,
      findValue,
      findTrauma,
      findAppearance,
      findDream,
      findFear,
      findWishe,
      findCouple,
      findPower,
      personName,
    }
  }

  function queryPerson(query: string) {
    const final = query
      ? personsOrd?.filter(
          (person) =>
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.lastName.toLowerCase().includes(query.toLowerCase()),
        )
      : personsOrd
    return final
  }

  function findManyPersons(ids: string[], options?: IFindManyPersonsOptions) {
    const isReverse = options?.reverse || false

    const personsSelected = personsThisProject.filter((person) => {
      const personIn = ids?.find((p) => p === person.id)

      if (personIn) return !isReverse
      return !!isReverse
    })

    return personsSelected
  }

  function findBoxOfProject(id: string) {
    const box = boxesThisProject.find((b) => b.id === id)

    return box
  }

  function findPersonOfProject(id: string) {
    const person = personsThisProject.find((p) => p.id === id)

    return person
  }

  return {
    project,
    projectName,
    creator,
    usersWithAccess,
    objectsCreatedInProject,

    booksThisProject,

    boxesThisProject,
    findBoxOfProject,

    personsThisProject: personsOrd,
    queryPerson,
    findManyPersons,
    findPersonOfProject,

    permission,
    useBook,

    usePerson,
  }
}
