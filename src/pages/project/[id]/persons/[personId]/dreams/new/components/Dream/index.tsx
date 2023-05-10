import { IDream } from '@api/responsesTypes/IPersonsResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { DreamContainer } from './styles'

interface IDreamProps {
  dream: IDream
  selected: boolean
  onClick: () => void
}

export function Dream({ onClick, selected, dream }: IDreamProps) {
  return (
    <DreamContainer selected={selected} onClick={onClick}>
      <InfoDefault title="Titulo:">
        <Text weight="bold" family="body">
          {dream.title}
        </Text>
      </InfoDefault>

      <InfoDefault title="Descrição:">
        <Text weight="bold" family="body">
          {dream.description.slice(0, 100)}
          {dream.description.length > 120 && '...'}
        </Text>
      </InfoDefault>

      <InfoDefault title="Personagens associados:">
        <ContainerGrid padding={0} columns={6}>
          {dream.persons?.map((person) => (
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
    </DreamContainer>
  )
}
