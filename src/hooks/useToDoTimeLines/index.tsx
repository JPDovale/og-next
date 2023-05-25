import { ITimeLineResponse } from '@api/responsesTypes/ITimeLineResponse'
import { getToDoTimeLinesRequest } from '@api/timeLinesRequests'
import { refreshSessionRequest } from '@api/userRequest'
import { useUser } from '@hooks/useUser'
import { useQuery } from 'react-query'
import { createTimeEventToDo } from './events/createTimeEventToDo'
import { createToDoTimeLine } from './events/createToDoTimeLine'
import { deleteToDoTimeEvent } from './events/deleteTimeEventToDo'
import { ICallEvent } from './types/ICallEvent'

export function useToDoTimeLines() {
  const { isRefreshingSession } = useUser()

  const { data, isLoading, refetch, isFetching } = useQuery(
    'toDoTimeLines',
    async () => {
      let response = await getToDoTimeLinesRequest()
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getToDoTimeLinesRequest()
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const toDoTimeLines = response.timeLines as ITimeLineResponse[]

      return { toDoTimeLines, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  )

  const toDoTimeLines = data?.toDoTimeLines ?? []
  const refetchToDoTimelines = refetch
  const loadingToDoTimeLines = isLoading || isFetching

  function findTimeLine(id: string) {
    const timeline = toDoTimeLines.find((timeline) => timeline.id === id)

    return {
      timeline,
    }
  }

  const callEvent: ICallEvent = {
    createToDoTimeLine: (newToDoTimeLine) =>
      createToDoTimeLine(newToDoTimeLine, refetchToDoTimelines),
    createToDoTimeEvent: (timeLineId, timeEvent) =>
      createTimeEventToDo(timeLineId, timeEvent, refetchToDoTimelines),
    deleteToDoTimeEvent: (timeLineId, timeEventId) =>
      deleteToDoTimeEvent(timeLineId, timeEventId, refetchToDoTimelines),
  }

  return {
    toDoTimeLines,
    loadingToDoTimeLines,
    callEvent,

    findTimeLine,
    refetchToDoTimelines,
  }
}
