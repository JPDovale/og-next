import { IFear } from '@api/responsesTypes/person/IPerson'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { FearContainer } from './styles'

interface IFearProps {
  fear: IFear
  selected: boolean
  onClick: () => void
}

export function Fear({ onClick, selected, fear }: IFearProps) {
  return (
    <FearContainer selected={selected} onClick={onClick}>
      <InfoDefault title="Titulo:">
        <Text weight="bold" family="body">
          {fear.infos.title}
        </Text>
      </InfoDefault>

      <InfoDefault title="Descrição:">
        <Text weight="bold" family="body">
          {fear.infos.description.slice(0, 100)}
          {fear.infos.description.length > 120 && '...'}
        </Text>
      </InfoDefault>

      <InfoDefault title="Personagens associados:">
        <ContainerGrid padding={0} columns={6}>
          {fear.collections.referencesIt.itens?.map((person) => (
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
    </FearContainer>
  )
}
