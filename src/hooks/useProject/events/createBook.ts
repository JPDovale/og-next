import { createBookRequest } from '@api/booksRequests'
import { ICreateBookDTO } from '@api/dtos/booksDTOS/ICreateBookDTO'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function createBook(
  projectId: string,
  newBook: ICreateBookDTO,
  refetchProjects: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await createBookRequest({ book: newBook, projectId })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createBook(projectId, newBook, refetchProjects),
  })

  if (handledAnswer) {
    refetchProjects()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
