import { getPersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useProject } from '@hooks/useProject'
import { useProjects } from '@hooks/useProjects'
import { useUser } from '@hooks/useUser'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { commentInPerson } from './events/commentInPerson'
import { createObject } from './events/createObject'
import { createObjectReference } from './events/createObjectReference'
import { deleteImagePerson } from './events/deleteImagePerson'
import { deletePerson } from './events/deletePerson'
import { responseCommentInPerson } from './events/responseCommentInPerson'
import { update } from './events/update'
import { updateImagePerson } from './events/updateImagePerson'
import { ICallEvent } from './types/ICallEvent'
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
  const { isRefreshingSession, loadingUser } = useUser()

  const { data, isLoading, refetch } = useQuery(
    `person-${id}`,
    async () => {
      if (!id || isRefreshingSession) return

      let response = await getPersonRequest(id)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getPersonRequest(id)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const person = response.person as IPersonsResponse

      return { person, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1hour
    },
  )

  const refetchPerson = refetch

  const person = data?.person ?? null

  const { couples } = useMemo(() => {
    const couples = person?.couples ?? []

    person?.coupleWithPersons?.map((CWP) => {
      const existeCoupleIn = couples.find(
        (couple) => couple.id === CWP.couple.id,
      )

      if (existeCoupleIn) return ''

      return couples.push({
        ...CWP.couple,
        person_id: CWP.person_id,
        coupleWithPerson: {
          ...CWP.couple.coupleWithPerson,
          person_id: CWP.couple.person_id,
        },
      })
    })

    return {
      couples,
    }
  }, [person])

  const loadingPerson = !(!loadingUser && !isLoading)
  const historyPersons = person?.history ?? 'Carregando...'
  const personName = person?.name
    ? `${person?.name} ${person?.last_name}`
    : 'Carregando...'

  const personInfos = constructInfos(person)

  const { refetchProject } = useProject(person?.project_id ?? '')
  const { refetchProjects } = useProjects()

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

  const callEvent: ICallEvent = {
    updateImage: (file) =>
      updateImagePerson(person!.id, file, refetchPerson, refetchProject),
    deleteImage: () =>
      deleteImagePerson(person!.id, refetchPerson, refetchProject),
    update: (newInfos) =>
      update(person!.id, newInfos, refetchPerson, refetchProject),

    delete: () => deletePerson(person!.id, refetchProject, refetchProjects),

    createObject: (newObject) =>
      createObject(person!.id, newObject, refetchPerson),
    createObjectReference: (newReference) =>
      createObjectReference(person!.id, newReference, refetchPerson),
    commentInPerson: (newComment) =>
      commentInPerson(person!.id, newComment, refetchPerson),
    responseCommentInPerson: (newResponse) =>
      responseCommentInPerson(person!.id, newResponse, refetchPerson),
  }

  return {
    person,
    couples,
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

    callEvent,
  }
}
