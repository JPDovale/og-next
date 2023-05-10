import { IPersonality } from '@api/responsesTypes/IPersonsResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { PersonalityContainer } from './styles'

interface IPersonalityProps {
  personality: IPersonality
  selected: boolean
  onClick: () => void
}

export function Personality({
  onClick,
  selected,
  personality,
}: IPersonalityProps) {
  return (
    <PersonalityContainer selected={selected} onClick={onClick}>
      <InfoDefault title="Titulo:">
        <Text weight="bold" family="body">
          {personality.title}
        </Text>
      </InfoDefault>

      <InfoDefault title="Descrição:">
        <Text weight="bold" family="body">
          {personality.description.slice(0, 100)}
          {personality.description.length > 120 && '...'}
        </Text>
      </InfoDefault>

      <InfoDefault title="Consequências:">
        <Text weight="bold" family="body" size="xl">
          {personality.consequences?.length}
        </Text>
      </InfoDefault>

      <InfoDefault title="Personagens associados:">
        <ContainerGrid padding={0} columns={6}>
          {personality.persons?.map((person) => (
            <ContainerGrid padding={0} key={person.id} css={{ gap: 0 }}>
              <AvatarWeb
                src={person.image_url ?? undefined}
                size="xsm"
                selfCenter
              />
              <Text
                family="body"
                height="shorter"
                size="xs"
                weight="bold"
                css={{ textAlign: 'center' }}
              >
                {person.name}
              </Text>
            </ContainerGrid>
          ))}
        </ContainerGrid>
      </InfoDefault>
    </PersonalityContainer>
  )
}
