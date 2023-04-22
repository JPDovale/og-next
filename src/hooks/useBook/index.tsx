import { getBookRequest } from '@api/booksRequests'
import { IBooksResponse, ICapitule } from '@api/responsesTypes/IBooksResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useUser } from '@hooks/useUser'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ICallEvent } from './types/ICallEvent'
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
}

export function useBook(id: string) {
  const [loading, setLoading] = useState(true)
  const { isRefreshingSession, loadingUser } = useUser()

  const { data, isLoading } = useQuery(
    `book-${id}`,
    async () => {
      if (!id || isRefreshingSession) return

      let response = await getBookRequest(id)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getBookRequest(id)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const book = response.book as IBooksResponse

      return { book, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
      onError: () => setLoading(false),
      onSuccess: () => setLoading(false),
    },
  )

  const book = data?.book ?? null

  const loadingBook = loadingUser || isLoading || loading

  const bookName = loadingBook
    ? 'Carregando...'
    : `${book?.title}
     ${book?.subtitle ? ' - ' + book.subtitle : ''}`
  const bookInfos = constructInfosBook(book)

  const bookWords = book?.words || 0
  const bookWrittenWords = book?.written_words || 0

  const bookAuthors = book?.authors ?? []

  function findCapitule(id: string): IFindCapituleResponse {
    const capitule = book?.capitules?.find((capitule) => capitule.id === id)
    const capituleName = capitule?.name || 'Carregando...'
    const capituleWords = Number(capitule?.words)

    return { capitule, capituleName, capituleWords }
  }

  const callEvent: ICallEvent = {
    updateFrontCover: (file) => {},
    removeFrontCover: () => {},
    addGenre: (genre) => {},
    removeGenre: (genre) => {},
    delete: () => {},
  }

  return {
    book,
    bookName,
    bookInfos,
    bookAuthors,
    findCapitule,
    bookWords,
    bookWrittenWords,
    loadingBook,
    callEvent,
  }
}
