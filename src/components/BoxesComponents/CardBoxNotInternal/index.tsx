import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { useWindowSize } from '@hooks/useWindow'
import { useRouter } from 'next/router'
import { CardBoxNotInternalContainer, CardTagBox } from './styles'

interface ICardBoxNotInternalProps {
  box: IBoxResponse
}

export function CardBoxNotInternal({ box }: ICardBoxNotInternalProps) {
  const router = useRouter()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <CardBoxNotInternalContainer
      onClick={() => router.push(`/boxes/${box.id}`)}
    >
      <InfoDefault title="Tags:">
        <ContainerGrid padding={0} columns={6}>
          {box.tags.map((tag) => (
            <CardTagBox key={tag.name}>
              <Text size="xs">{tag.name}</Text>
            </CardTagBox>
          ))}
        </ContainerGrid>
      </InfoDefault>

      <ContainerGrid padding={0} columns={smallWindow ? 1 : 2}>
        <InfoDefault title="Nome:">
          <Text family="headingText">{box.name}</Text>
        </InfoDefault>

        <InfoDefault title="Numero de arquivos salvos:">
          <Text>{box.archives.length}</Text>
        </InfoDefault>
      </ContainerGrid>

      {box.description && (
        <InfoDefault title="Descrição:">
          <Text family="body">{box.description}</Text>
        </InfoDefault>
      )}

      <ContainerGrid padding={0} columns={2}>
        <InfoDefault title="Criado em:">
          <Text size="xs">{box.createdAt}</Text>
        </InfoDefault>
        <InfoDefault title="Atualizado em:">
          <Text size="xs">{box.updatedAt}</Text>
        </InfoDefault>
      </ContainerGrid>
    </CardBoxNotInternalContainer>
  )
}
