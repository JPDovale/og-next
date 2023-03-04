import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ButtonIcon } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Image as ImageIco, Pencil, UserPlus } from 'phosphor-react'
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
  person: IPersonsResponse
  isAdd?: boolean
  isNotPreview?: boolean
}

export function CardPerson({
  person,
  isAdd = false,
  isNotPreview = false,
}: ICardPersonProps) {
  const router = useRouter()
  const { id } = router.query

  const personId = person.id

  return (
    <CardPersonContainer
      as={isNotPreview ? 'div' : 'button'}
      title={
        isAdd ? 'Adicionar personagem' : `${person.name} ${person.lastName}`
      }
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
            {person?.image?.url ? (
              <Image
                src={person.image.url}
                alt={`${person.name} ${person.lastName}`}
                width={400}
                height={400}
                priority
              />
            ) : (
              <ImageIco weight="thin" size={64} alt="" color="#e3e3e3" />
            )}
          </div>
          <PersonInfos>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Nome:
              </Text>
              <Text size="sm">
                {person.name} {person.lastName}
              </Text>
            </ItemInfo>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Idade:
              </Text>
              <Text size="sm">{person.age} anos</Text>
            </ItemInfo>

            <ItemsContainer>
              <ItemInfo>
                <Text as="label" size="sm" family="body" height="shorter">
                  Criado em:
                </Text>
                <Text size="xxs">{person.createAt}</Text>
              </ItemInfo>
              <ItemInfo>
                <Text as="label" size="sm" family="body" height="shorter">
                  Atualizado em:
                </Text>
                <Text size="xxs">{person.updateAt}</Text>
              </ItemInfo>
            </ItemsContainer>

            {isNotPreview && (
              <ObjectsOfPerson>
                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Objetivos:
                  </Text>
                  <Text size="xs">{person.objectives?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Sonhos:
                  </Text>
                  <Text size="xs">{person.dreams?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Medos:
                  </Text>
                  <Text size="xs">{person.fears?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Casais:
                  </Text>
                  <Text size="xs">{person.couples?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Aparência:
                  </Text>
                  <Text size="xs">{person.appearance?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Personalidade:
                  </Text>
                  <Text size="xs">{person.personality?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Poderes:
                  </Text>
                  <Text size="xs">{person.powers?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Traumas:
                  </Text>
                  <Text size="xs">{person.traumas?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Valores:
                  </Text>
                  <Text size="xs">{person.values?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="xs" family="body" height="shorter">
                    Desejos:
                  </Text>
                  <Text size="xs">{person.wishes?.length || 0}</Text>
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
                  dangerouslySetInnerHTML={{ __html: person.history! }}
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
