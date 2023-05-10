import { createBookRequest } from '@api/booksRequests'
import { ICreateBookDTO } from '@api/dtos/booksDTOS/ICreateBookDTO'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function createBook(
  projectId: string,
  newBook: ICreateBookDTO,
  refetchProject: IRefetchProject,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await createBookRequest({ book: newBook, projectId })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      createBook(projectId, newBook, refetchProject, refetchProjects),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchProjects()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
