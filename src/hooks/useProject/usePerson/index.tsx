import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { constructInfos } from './utils/constructInfos'
import { constructObjectives } from './utils/constructObjectives'
import { findAppearanceUtil } from './utils/findAppearence'
import { findCoupleUtil } from './utils/findCouple'
import { findDreamUtil } from './utils/findDreams'
import { findFearUtil } from './utils/findFear'
import { findObjectiveUtil } from './utils/findObjective'
import { findPersonalityUtil } from './utils/findPersonality'
import { findPowerUtil } from './utils/findPower'
import { findTraumaUtil } from './utils/findTrauma'
import { findValueUtil } from './utils/findValue'
import { findWisheUtil } from './utils/findWishe'

export function usePerson(
  persons: IPersonsResponse[],
  id: string,
  boxes?: IBoxResponse[],
) {
  const person = persons.find((person) => person?.id === id)
  const historyPersons = person?.history.split('\n')
  const personName = `${person?.name || 'Carregando...'}`

  const personBoxes = {
    objectives: boxes?.find((box) => box.name === 'persons/objectives'),
    personality: boxes?.find((box) => box.name === 'persons/personality'),
    values: boxes?.find((box) => box.name === 'persons/values'),
    traumas: boxes?.find((box) => box.name === 'persons/traumas'),
    appearance: boxes?.find((box) => box.name === 'persons/appearance'),
    dreams: boxes?.find((box) => box.name === 'persons/dreams'),
    fears: boxes?.find((box) => box.name === 'persons/fears'),
    wishes: boxes?.find((box) => box.name === 'persons/wishes'),
    couples: boxes?.find((box) => box.name === 'persons/couples'),
    powers: boxes?.find((box) => box.name === 'persons/powers'),
  }

  const personInfos = constructInfos(person)
  const objectives = constructObjectives(person, persons)

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
    historyPersons,
    personName,
    personInfos,
    objectives,
    personBoxes,

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
