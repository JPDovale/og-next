import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IProjectResponse, IRef } from '@api/responsesTypes/IProjcetResponse'
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
  objectives: IRef[]
  dreams: IRef[]
  fears: IRef[]
  appearance: IRef[]
  personality: IRef[]
  powers: IRef[]
  traumas: IRef[]
  values: IRef[]
  wishes: IRef[]
}

export function useProject(id: string) {
  const { projects, books, persons, users } = useContext(ProjectsContext)
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

    project?.tags
      .find((tag) => tag.type === 'persons/objectives')
      ?.refs.map((ref) => {
        return findObjects.objectives.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/dreams')
      ?.refs.map((ref) => {
        return findObjects.dreams.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/fears')
      ?.refs.map((ref) => {
        return findObjects.fears.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/appearance')
      ?.refs.map((ref) => {
        return findObjects.appearance.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/personality')
      ?.refs.map((ref) => {
        return findObjects.personality.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/powers')
      ?.refs.map((ref) => {
        return findObjects.powers.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/traumas')
      ?.refs.map((ref) => {
        return findObjects.traumas.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/values')
      ?.refs.map((ref) => {
        return findObjects.values.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/wishes')
      ?.refs.map((ref) => {
        return findObjects.wishes.push(ref)
      })

    return findObjects
  }, [project?.tags])

  const projectName = project?.name || 'Carregando...'
  const tags = project?.tags

  const booksThisProject = books?.filter(
    (book) => book.defaultProject === project?.id,
  )

  const personsThisProject = persons?.filter(
    (person) => person.defaultProject === project?.id,
  )

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
      tags,
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
    } = usePeronInternal(persons, id, project?.tags)

    return {
      person,
      historyPersons,
      objectives,
      personInfos,
      tags,
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

  return {
    project,
    projectName,
    tags,
    creator,
    usersWithAccess,
    objectsCreatedInProject,

    booksThisProject,

    personsThisProject: personsOrd,
    queryPerson,
    findManyPersons,

    permission,
    useBook,

    usePerson,
  }
}
