import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import { CardBoxContainer } from './styles'

interface ICardBoxProps {
  box: IBoxResponse
  isInternal?: boolean
}

export function CardBox({ box, isInternal = false }: ICardBoxProps) {
  const isBooksOrPersons = box.name === 'persons' || box.name === 'books'

  const router = useRouter()
  const { id } = router.query

  function handleRedirect() {
    if (isBooksOrPersons) {
      router.push(`/project/${id}/${box.name}`)
    } else {
      router.push(`/project/${id}/boxes/${box.id}`)
    }
  }

  return (
    <CardBoxContainer title={box.name} onClick={handleRedirect}>
      <Text size="xs">{box.name}</Text>

      <ContainerGrid padding={0}>
        <InfoDefault title={`Arquivos ${box.archives?.length}`}>
          <ContainerGrid padding={0}>
            {box.archives?.map((file, index) => {
              if (index >= 2) return ''

              return (
                <ContainerGrid key={file.id} padding={0} darkBackground>
                  {file.description && file.title && (
                    <InfoDefault title="Titulo">
                      <Text size="xs">{file.title}</Text>
                    </InfoDefault>
                  )}

                  {file.description && file.title && (
                    <InfoDefault title="Descrição">
                      <Text size="xs">{file.description}</Text>
                    </InfoDefault>
                  )}

                  {/* {isInternal && (
                    <InfoDefault title="Número de atribuições">
                      <Text size="xs">{file.links?.length}</Text>
                    </InfoDefault>
                  )} */}

                  {!isInternal && (
                    <InfoDefault title="Número de imagens">
                      <Text size="xs">{file.gallery?.length || 0}</Text>
                    </InfoDefault>
                  )}
                </ContainerGrid>
              )
            })}

            <Text size="xs" css={{ justifySelf: 'center' }}>
              Ver com detalhes
            </Text>
          </ContainerGrid>
        </InfoDefault>
      </ContainerGrid>
    </CardBoxContainer>
  )
}
