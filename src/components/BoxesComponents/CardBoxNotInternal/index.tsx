import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import { useWindowSize } from '@hooks/useWindow'
import { getDate } from '@utils/dates/getDate'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { CardBoxNotInternalContainer, CardTagBox } from './styles'

interface ICardBoxNotInternalProps {
  box: IBoxResponse
}

export function CardBoxNotInternal({ box }: ICardBoxNotInternalProps) {
  const router = useRouter()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { theme } = useContext(InterfaceContext)

  return (
    <CardBoxNotInternalContainer
      onClick={() => router.push(`/boxes/${box.id}`)}
    >
      <InfoDefault title="Tags:">
        <ContainerGrid padding={0} columns={4}>
          {box.tags?.map((tag) => (
            <CardTagBox key={tag.name}>
              <Text colorInvert={theme === 'light'} size="xs">
                {tag.name}
              </Text>
            </CardTagBox>
          ))}
        </ContainerGrid>
      </InfoDefault>

      <ContainerGrid padding={0} columns={smallWindow ? 1 : 2}>
        <InfoDefault title="Nome:">
          <Text family="headingText">{box.name}</Text>
        </InfoDefault>

        <InfoDefault title="Numero de arquivos salvos:">
          <Text>{box.archives?.length ?? 0}</Text>
        </InfoDefault>
      </ContainerGrid>

      {box.description && (
        <InfoDefault title="Descrição:">
          <Text family="body">{box.description}</Text>
        </InfoDefault>
      )}

      <ContainerGrid padding={0} columns={2}>
        <InfoDefault title="Criado em:">
          <Text size="xs">{getDate(box.created_at)}</Text>
        </InfoDefault>
        {/* <InfoDefault title="Atualizado em:">
          <Text size="xs">{getDate(box.updatedAt)}</Text>
        </InfoDefault> */}
      </ContainerGrid>
    </CardBoxNotInternalContainer>
  )
}
