import { IPerson } from '@api/responsesTypes/person/IPerson'
import { IInfos } from '@hooks/useBook'
import { getDate } from '@utils/dates/getDate'

export function constructInfos(person: IPerson | null) {
  const infos: IInfos[] = [
    {
      columns: 2,
      infos: [
        {
          label: 'Nome:',
          value: `${person?.name.full || 'Carregando...'}`,
        },
        {
          label: 'Idade:',
          value: person?.age.number
            ? `${person.age.number} anos`
            : 'Idade desconhecida',
        },
        {
          label: 'Criado em:',
          value: person?.infos.createdAt
            ? getDate(person?.infos.createdAt)
            : 'Carregando...',
        },
        {
          label: 'Atualizado em:',
          value: person?.infos.updatedAt
            ? getDate(person?.infos.updatedAt)
            : 'Carregando...',
        },
      ],
    },
    {
      columns: 4,
      infos: [
        {
          label: 'Objetivos:',
          value: `${person?.collections.objective.itensLength || 0}`,
        },
        {
          label: 'Personalidade:',
          value: `${person?.collections.personality.itensLength || 0}`,
        },
        {
          label: 'Valores:',
          value: `${person?.collections.value.itensLength || 0}`,
        },
        {
          label: 'Traumas:',
          value: `${person?.collections.trauma?.itensLength || 0}`,
        },
        {
          label: 'Aparência:',
          value: `${person?.collections.appearance?.itensLength || 0}`,
        },
        {
          label: 'Sonhos:',
          value: `${person?.collections.dream?.itensLength || 0}`,
        },
        {
          label: 'Medos:',
          value: `${person?.collections.fear?.itensLength || 0}`,
        },
        {
          label: 'Desejos:',
          value: `${person?.collections.wishe?.itensLength || 0}`,
        },
        {
          label: 'Casais:',
          value: `${person?.collections.couple?.itensLength || 0}`,
        },
        {
          label: 'Poderes:',
          value: `${person?.collections.power?.itensLength || 0}`,
        },
      ],
    },
  ]

  return infos
}
