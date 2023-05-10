import { IValue } from '@api/responsesTypes/IPersonsResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { ValueContainer } from './styles'

interface IValueProps {
  value: IValue
  selected: boolean
  onClick: () => void
}

export function Value({ onClick, selected, value }: IValueProps) {
  return (
    <ValueContainer selected={selected} onClick={onClick}>
      <InfoDefault title="Titulo:">
        <Text weight="bold" family="body">
          {value.title}
        </Text>
      </InfoDefault>

      <InfoDefault title="Descrição:">
        <Text weight="bold" family="body">
          {value.description.slice(0, 100)}
          {value.description.length > 120 && '...'}
        </Text>
      </InfoDefault>

      <InfoDefault title="Exceções:">
        <Text weight="bold" family="body" size="xl">
          {value.exceptions?.length}
        </Text>
      </InfoDefault>

      <InfoDefault title="Personagens associados:">
        <ContainerGrid padding={0} columns={6}>
          {value.persons?.map((person) => (
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
    </ValueContainer>
  )
}
