import { ITrauma } from '@api/responsesTypes/person/IPerson'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { TraumaContainer } from './styles'

interface ITraumaProps {
  trauma: ITrauma
  selected: boolean
  onClick: () => void
}

export function Trauma({ onClick, selected, trauma }: ITraumaProps) {
  return (
    <TraumaContainer selected={selected} onClick={onClick}>
      <InfoDefault title="Titulo:">
        <Text weight="bold" family="body">
          {trauma.infos.title}
        </Text>
      </InfoDefault>

      <InfoDefault title="Descrição:">
        <Text weight="bold" family="body">
          {trauma.infos.description.slice(0, 100)}
          {trauma.infos.description.length > 120 && '...'}
        </Text>
      </InfoDefault>

      <InfoDefault title="Consequências:">
        <Text weight="bold" family="body" size="xl">
          {trauma.collections.consequence.itensLength}
        </Text>
      </InfoDefault>

      <InfoDefault title="Personagens associados:">
        <ContainerGrid padding={0} columns={6}>
          {trauma.collections.referencesIt.itens?.map((person) => (
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
    </TraumaContainer>
  )
}
