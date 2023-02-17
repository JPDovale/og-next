import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ITag } from '@api/responsesTypes/IProjcetResponse'
import { constructInfos } from './utils/constructInfos'
import { constructObjectives } from './utils/constructObjectives'
import { findAppearanceUtil } from './utils/findAppearence'
import { findCoupleUtil } from './utils/findCouple'
import { findDreamUtil } from './utils/findDreams'
import { findFearUtil } from './utils/findFear'
import { findObjectiveUtil } from './utils/findObjective'
import { findPowerUtil } from './utils/findPower'
import { findTraumaUtil } from './utils/findTrauma'
import { findValueUtil } from './utils/findValue'
import { findWisheUtil } from './utils/findWishe'

export function usePerson(
  persons: IPersonsResponse[],
  id: string,
  tagsOfProject?: ITag[],
) {
  const person = persons.find((person) => person?.id === id)
  const historyPersons = person?.history.split('\n')
  const personName = `${person?.name || 'Carregando...'}`

  const tags = {
    objectives: tagsOfProject?.find((tag) => tag.type === 'persons/objectives'),
    personality: tagsOfProject?.find(
      (tag) => tag.type === 'persons/personality',
    ),
    values: tagsOfProject?.find((tag) => tag.type === 'persons/values'),
    traumas: tagsOfProject?.find((tag) => tag.type === 'persons/traumas'),
    appearance: tagsOfProject?.find((tag) => tag.type === 'persons/appearance'),
    dreams: tagsOfProject?.find((tag) => tag.type === 'persons/dreams'),
    fears: tagsOfProject?.find((tag) => tag.type === 'persons/fears'),
    wishes: tagsOfProject?.find((tag) => tag.type === 'persons/wishes'),
    couples: tagsOfProject?.find((tag) => tag.type === 'persons/couples'),
    powers: tagsOfProject?.find((tag) => tag.type === 'persons/powers'),
  }

  const personInfos = constructInfos(person)
  const objectives = constructObjectives(person, persons)

  function findObjective(id: string) {
    return findObjectiveUtil({ person, id })
  }

  function findPersonality(id: string) {
    return findObjectiveUtil({ person, id })
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
    tags,

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
