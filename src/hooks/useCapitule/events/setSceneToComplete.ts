import { setSceneToCompleteRequest } from '@api/booksRequests'
import { IRefetchBook } from '@hooks/useBook/types/IRefetchBook'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchCapitule } from '../types/IRefetchCapitule'
import { IResolveEvent } from '../types/IResolveEvent'
import { ISetSceneToComplete } from '../types/ISetSceneToComplete'

export async function setSceneToComplete(
  capituleId: string,
  bookId: string,
  completeInfos: ISetSceneToComplete,
  refetchCapitule: IRefetchCapitule,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await setSceneToCompleteRequest({
    capituleId,
    bookId,
    completeInfos,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      setSceneToComplete(
        capituleId,
        bookId,
        completeInfos,
        refetchCapitule,
        refetchBook,
      ),
  })

  if (handledAnswer) {
    await Promise.all([refetchCapitule(), refetchBook()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
