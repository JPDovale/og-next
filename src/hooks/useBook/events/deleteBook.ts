import { deleteBookRequest } from '@api/booksRequests'
import { IRefetchProject } from '@hooks/useProject/types/IRefetchProject'
import { responseDealings } from '@utils/data/responseDealings'
import { IResolveEvent } from '../types/IResolveEvent'

export async function deleteBook(
  bookId: string,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await deleteBookRequest(bookId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteBook(bookId, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
