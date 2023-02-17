import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IInfos } from '@hooks/useProject/useBook'

export function constructInfos(person: IPersonsResponse | undefined) {
  const infos: IInfos[] = [
    {
      columns: 2,
      infos: [
        {
          label: 'Nome:',
          value: `${person?.name || 'Carregando...'} ${person?.lastName}`,
        },
        {
          label: 'Idade:',
          value: `${person?.age} anos` || 'Carregando...',
        },
        {
          label: 'Criado em:',
          value: person?.createAt || 'Carregando...',
        },
        {
          label: 'Atualizado em:',
          value: person?.updateAt || 'Carregando...',
        },
      ],
    },
    {
      columns: 4,
      infos: [
        {
          label: 'Objetivos:',
          value: `${person?.objectives.length || 0}`,
        },
        {
          label: 'Personalidade:',
          value: `${person?.personality.length || 0}`,
        },
        {
          label: 'Valores:',
          value: `${person?.values.length || 0}`,
        },
        {
          label: 'Traumas:',
          value: `${person?.traumas.length || 0}`,
        },
        {
          label: 'Aparência:',
          value: `${person?.appearance.length || 0}`,
        },
        {
          label: 'Sonhos:',
          value: `${person?.dreams.length || 0}`,
        },
        {
          label: 'Medos:',
          value: `${person?.fears.length || 0}`,
        },
        {
          label: 'Desejos:',
          value: `${person?.wishes.length || 0}`,
        },
        {
          label: 'Casais:',
          value: `${person?.couples.length || 0}`,
        },
        {
          label: 'Poderes:',
          value: `${person?.powers.length || 0}`,
        },
      ],
    },
  ]

  return infos
}
