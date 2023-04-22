import { ButtonIcon } from '@components/usefull/Button'
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
  ItemsContainer,
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
  const { createdAt, person, personImage, personName, updatedAt } =
    findPerson(personId)

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
                color={
                  isNotPreview
                    ? '#e3e3e3'
                    : theme === 'dark'
                    ? '#e3e3e3'
                    : '#030303'
                }
              />
            )}
          </div>
          <PersonInfos>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Nome:
              </Text>
              <Text
                size="sm"
                weight="bold"
                colorInvert={isNotPreview && theme === 'light'}
              >
                {personName}
              </Text>
            </ItemInfo>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Idade:
              </Text>
              <Text
                size="sm"
                weight="bold"
                colorInvert={isNotPreview && theme === 'light'}
              >
                {person?.age} anos
              </Text>
            </ItemInfo>

            <ItemsContainer>
              <ItemInfo>
                <Text as="label" size="sm" family="body" height="shorter">
                  Criado em:
                </Text>
                <Text
                  size="xxs"
                  colorInvert={isNotPreview && theme === 'light'}
                >
                  {createdAt}
                </Text>
              </ItemInfo>
              <ItemInfo>
                <Text as="label" size="sm" family="body" height="shorter">
                  Atualizado em:
                </Text>
                <Text
                  size="xxs"
                  colorInvert={isNotPreview && theme === 'light'}
                >
                  {updatedAt}
                </Text>
              </ItemInfo>
            </ItemsContainer>

            {isNotPreview && (
              <ObjectsOfPerson>
                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Objetivos:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.objectives || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Sonhos:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.dreams || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Medos:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.fears || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Casais:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.couples || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Aparência:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.appearances || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Personalidade:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.personalities || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Poderes:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.powers || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Traumas:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.traumas || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Valores:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
                    {person?._count.values || 0}
                  </Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Desejos:
                  </Text>
                  <Text
                    size="xs"
                    colorInvert={isNotPreview && theme === 'light'}
                  >
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
                  dangerouslySetInnerHTML={{ __html: person?.history! }}
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
        </>
      )}
    </CardPersonContainer>
  )
}
