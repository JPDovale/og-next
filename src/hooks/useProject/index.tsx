import { useContext } from 'react'
import {
  IFindCapituleResponse,
  IInfos,
  useBook as useBookInternal,
} from './useBook'
import { IBooksResponse } from '../../api/responsesTypes/IBooksResponse'
import { IPersonsResponse } from '../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../api/responsesTypes/IProjcetResponse'
import { InterfaceContext } from '../../contexts/interface'
import { ProjectsContext } from '../../contexts/projects'
import { orderElements } from '../../services/orderElements'
import { UserContext } from '../../contexts/user'
import { IUserResponse } from '../../api/responsesTypes/IUserResponse'

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

export function useProject(id: string) {
  const { projects, books, persons } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)
  const { orderBy } = useContext(InterfaceContext)

  const project = projects?.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const projectName = project?.name || 'Carregando...'
  const tags = project?.tags

  const booksThisProject = books?.filter(
    (book) => book.defaultProject === project?.id,
  )

  const personsThisProject = persons?.filter(
    (person) => person.defaultProject === project?.id,
  )

  const personsOrd = orderElements(
    personsThisProject,
    orderBy,
  ) as IPersonsResponse[]

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

    booksThisProject,

    personsThisProject: personsOrd,
    queryPerson,
    findManyPersons,

    permission,
    useBook,
  }
}
