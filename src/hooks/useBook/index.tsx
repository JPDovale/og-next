import { getBookRequest } from '@api/booksRequests'
import { IBook } from '@api/responsesTypes/book/IBook'
import { ICapitulePreview } from '@api/responsesTypes/capitule/ICapitulePreview'
import { refreshSessionRequest } from '@api/userRequest'
import { useProject } from '@hooks/useProject'
import { useUser } from '@hooks/useUser'
import { useQuery } from 'react-query'
import { createCapitule } from './events/createCapitule'
import { createGenre } from './events/createGenre'
import { deleteBook } from './events/deleteBook'
import { deleteGenre } from './events/deleteGenre'
import { removeFrontCoverBook } from './events/removeFrontCoverBook'
import { reorderCapitules } from './events/reorderCapitules'
import { updateBook } from './events/updateBook'
import { updateFrontCoverBook } from './events/updateFrontCoverBook'
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
  capitule: ICapitulePreview | undefined
  capituleName: string
  capituleWords: number
}

export function useBook(id: string) {
  const { isRefreshingSession, loadingUser } = useUser()

  const { data, isLoading, refetch } = useQuery(
    `book-${id}`,
    async () => {
      if (!id || isRefreshingSession) return

      let response = await getBookRequest(id)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getBookRequest(id)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const book = response.data?.book as IBook

      return { book, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
    },
  )

  const { refetchProject } = useProject(data?.book.infos.projectId ?? '')

  const book = data?.book ?? null
  const loadingBook = isLoading || loadingUser
  const refetchBook = refetch
  const bookInfos = constructInfosBook(book)

  function findCapitule(id: string): IFindCapituleResponse {
    const capitule = book?.collections.capitules?.itens.find(
      (capitule) => capitule.id === id,
    )
    const capituleName = capitule?.name || 'Carregando...'
    const capituleWords = capitule?.infos.words ?? 0

    return { capitule, capituleName, capituleWords }
  }

  const callEvent: ICallEvent = {
    reorderCapitules: (reorder) =>
      reorderCapitules(book!.id, reorder, refetchBook),
    removeFrontCover: () => removeFrontCoverBook(book!.id, refetchBook),
    delete: () => deleteBook(book!.id, refetchProject),
    updateFrontCover: (file) =>
      updateFrontCoverBook(book!.id, file, refetchBook),
    update: (bookUpdated) => updateBook(book!.id, bookUpdated, refetchBook),
    createCapitule: (newCapitule) =>
      createCapitule(book!.id, newCapitule, refetchBook),
    removeGenre: (genreId) => deleteGenre(book!.id, genreId, refetchBook),
    addGenre: (genre) => createGenre(book!.id, genre, refetchBook),
  }

  return {
    book,
    bookInfos,
    findCapitule,
    loadingBook,
    callEvent,
    refetchBook,
  }
}
