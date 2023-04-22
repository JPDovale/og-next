import { getPersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { ProjectsContext } from '@contexts/projects'
import { useUser } from '@hooks/useUser'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { constructInfos } from './utils/constructInfos'
import { findAppearanceUtil } from './utils/findAppearances'
import { findCoupleUtil } from './utils/findCouple'
import { findDreamUtil } from './utils/findDreams'
import { findFearUtil } from './utils/findFear'
import { findObjectiveUtil } from './utils/findObjective'
import { findPersonalityUtil } from './utils/findPersonality'
import { findPowerUtil } from './utils/findPower'
import { findTraumaUtil } from './utils/findTrauma'
import { findValueUtil } from './utils/findValue'
import { findWisheUtil } from './utils/findWishe'

export function usePerson(id: string) {
  const { loading, setLoading } = useContext(ProjectsContext)
  const { isRefreshingSession, loadingUser } = useUser()

  const { data, isLoading } = useQuery(
    `person-${id}`,
    async () => {
      if (!id || isRefreshingSession) return

      let response = await getPersonRequest(id)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getPersonRequest(id)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const person = response.person as IPersonsResponse

      return { person, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
      onError: () => setLoading(false),
      onSuccess: () => setLoading(false),
    },
  )

  const person = data?.person ?? null
  const loadingPerson = loading || loadingUser || isLoading
  const historyPersons = person?.history ?? 'Carregando...'
  const personName = person?.name
    ? `${person?.name} ${person?.last_name}`
    : 'Carregando...'

  const personInfos = constructInfos(person)

  function findObjective(id: string) {
    return findObjectiveUtil({ person, id })
  }

  function findPersonality(id: string) {
    return findPersonalityUtil({ person, id })
  }

  function findValue(id: string) {
    return findValueUtil({ id, person })
  }

  function findTrauma(id: string) {
    return findTraumaUtil({ id, person })
  }

  function findAppearance(id: string) {
    return findAppearanceUtil({ id, person })
  }

  function findDream(id: string) {
    return findDreamUtil({ id, person })
  }

  function findFear(id: string) {
    return findFearUtil({ id, person })
  }

  function findWishe(id: string) {
    return findWisheUtil({ id, person })
  }

  function findCouple(id: string) {
    return findCoupleUtil({ id, person })
  }

  function findPower(id: string) {
    return findPowerUtil({ id, person })
  }

  return {
    person,
    loadingPerson,
    historyPersons,
    personName,
    personInfos,

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
  }
}
