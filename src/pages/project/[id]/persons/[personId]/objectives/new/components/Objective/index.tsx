import { IObjective } from '@api/responsesTypes/person/IPerson'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { ObjectiveContainer } from './styles'

interface IObjectiveProps {
  objective: IObjective
  selected: boolean
  onClick: () => void
}

export function Objective({ objective, selected, onClick }: IObjectiveProps) {
  return (
    <ObjectiveContainer selected={selected} onClick={onClick}>
      <InfoDefault title="Titulo:">
        <Text weight="bold" family="body">
          {objective.infos.title}
        </Text>
      </InfoDefault>

      <ContainerGrid padding={0} columns={2}>
        <InfoDefault title="Apoiadores:">
          <Text
            weight="bold"
            family="body"
            size="xl"
            css={{ color: '$successDefault' }}
          >
            {objective.collections.supporter.itensLength}
          </Text>
        </InfoDefault>

        <InfoDefault title="Contras:">
          <Text
            weight="bold"
            family="body"
            size="xl"
            css={{ color: '$fullError' }}
          >
            {objective.collections.avoider.itensLength}
          </Text>
        </InfoDefault>
      </ContainerGrid>

      <InfoDefault title="Personagens associados:">
        <ContainerGrid padding={0} columns={6}>
          {objective.collections.referencesIt.itens?.map((person) => (
            <ContainerGrid padding={0} key={person.id} css={{ gap: 0 }}>
              <AvatarWeb src={person.image.url} size="xsm" selfCenter />
              <Text
                family="body"
                height="shorter"
                size="xs"
                weight="bold"
                css={{ textAlign: 'center' }}
              >
                {person.name.first}
              </Text>
            </ContainerGrid>
          ))}
        </ContainerGrid>
      </InfoDefault>
    </ObjectiveContainer>
  )
}
