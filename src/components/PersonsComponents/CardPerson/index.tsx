import { ButtonIcon } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import { useProject } from '@hooks/useProject'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Image as ImageIco, Pencil, UserPlus } from 'phosphor-react'
import { useContext } from 'react'
import {
  CardPersonContainer,
  EditPersonButton,
  HistoryContent,
  ItemInfo,
  ObjectsOfPerson,
  PersonHistory,
  PersonInfos,
} from './styles'

interface ICardPersonProps {
  personId: string
  isAdd?: boolean
  isNotPreview?: boolean
}

export function CardPerson({
  personId,
  isAdd = false,
  isNotPreview = false,
}: ICardPersonProps) {
  const router = useRouter()
  const { id } = router.query

  const { theme } = useContext(InterfaceContext)

  const { findPerson } = useProject(id as string)
  const { person, personImage, personName } = findPerson(personId)

  return (
    <CardPersonContainer
      as={isNotPreview ? 'div' : 'button'}
      title={isAdd ? 'Adicionar personagem' : `${personName}`}
      isAdd={isAdd}
      isNotPreview={isNotPreview}
      onClick={() =>
        isAdd
          ? router.push(`/project/${id}/persons`)
          : !isNotPreview && router.push(`/project/${id}/persons/${personId}`)
      }
    >
      {isAdd ? (
        <Text height="shorter" size="xs">
          <UserPlus size={40} />
          <br />
          Criar um personagem
        </Text>
      ) : (
        <>
          <div className="person-image">
            {personImage ? (
              <Image
                src={personImage}
                alt={`${personName}`}
                width={400}
                height={400}
                priority
              />
            ) : (
              <ImageIco
                weight="thin"
                size={64}
                alt=""
                color={theme === 'dark' ? '#e3e3e3' : '#030303'}
              />
            )}
          </div>
          <ContainerGrid padding={0} columns={2}>
            <PersonInfos>
              <ItemInfo>
                <Text as="label" size="sm" family="body" height="shorter">
                  Nome:
                </Text>
                <Text size="sm" weight="bold">
                  {personName}
                </Text>
              </ItemInfo>
              <ItemInfo>
                <Text as="label" size="sm" family="body" height="shorter">
                  Idade:
                </Text>
                <Text size="sm" weight="bold">
                  {person?.age} anos
                </Text>
              </ItemInfo>

              {isNotPreview && (
                <ObjectsOfPerson>
                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Objetivos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.objectives || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Sonhos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.dreams || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Medos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.fears || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Casais:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.couples || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Aparência:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.appearances || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Personalidade:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.personalities || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Poderes:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.powers || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Traumas:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.traumas || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Valores:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.values || 0}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Desejos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?._count.wishes || 0}
                    </Text>
                  </ItemInfo>
                </ObjectsOfPerson>
              )}
            </PersonInfos>
            {isNotPreview && (
              <>
                <PersonHistory>
                  <Text as="label" size="xl">
                    História:
                  </Text>
                  <HistoryContent
                    dangerouslySetInnerHTML={{
                      __html: `${person?.history!.slice(0, 400)}...`,
                    }}
                  />
                </PersonHistory>
                <EditPersonButton
                  size="xs"
                  variant="noShadow"
                  wid="hug"
                  onClick={() =>
                    router.push(`/project/${id}/persons/${personId}`)
                  }
                >
                  <ButtonIcon>
                    <Pencil weight="bold" size={32} />
                  </ButtonIcon>
                </EditPersonButton>
              </>
            )}
          </ContainerGrid>
        </>
      )}
    </CardPersonContainer>
  )
}
