import {
  IBooksResponse,
  ICapitule,
  IScene,
} from '@api/responsesTypes/IBooksResponse'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { useContext } from 'react'
import { constructInfosBook } from './utils/constructInfosBook'

export interface IInfos {
  infos: Array<{
    label: string
    value: string
  }>
  columns: 1 | 2 | 3 | 4
}

export interface IFindCapituleResponse {
  capitule: ICapitule | undefined
  capituleName: string
  capituleWords: number

  findScene: (id: string) => IScene | undefined
}

export function useBook(books: IBooksResponse[], id: string) {
  const { loading, users } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const book = books?.find((book) => book.id === id)
  const bookName = loading
    ? 'Carregando...'
    : `${book?.title} ${book?.subtitle ? ' - ' + book.subtitle : ''}`
  const bookInfos = constructInfosBook(book)

  const bookWords = Number(book?.words)
  const bookWrittenWords = Number(book?.writtenWords)

  const authorsIncludeCreator = users.filter((user) => {
    const userAccess = !!book?.authors?.find((u) => u.id === user.id)
    return userAccess
  })
  const bookAuthors = authorsIncludeCreator.filter((u) => u.id !== user?.id)

  function findCapitule(id: string): IFindCapituleResponse {
    const capitule = book?.capitules.find((capitule) => capitule.id === id)
    const capituleName = capitule?.name || 'Carregando...'
    const capituleWords = Number(capitule?.words)

    function findScene(id: string) {
      const scene = capitule?.scenes?.find((s) => s.id === id)

      return scene
    }

    return { capitule, capituleName, findScene, capituleWords }
  }

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
