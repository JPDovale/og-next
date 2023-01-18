import { Text } from '@og-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Image as ImageIco, Pencil, UserPlus } from 'phosphor-react'
import { IPersonsResponse } from '../../api/responsesTypes/IPersonsResponse'
import {
  CardPersonContainer,
  EditPersonButton,
  ItemInfo,
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
      as={!isNotPreview ? 'button' : 'div'}
      isAdd={isAdd}
      isNotPreview={isNotPreview}
      onClick={() =>
        isAdd
          ? router.replace(`/project/${id}/persons`)
          : !isNotPreview &&
            router.replace(`/project/${id}/persons/${personId}`)
      }
    >
      {isAdd ? (
        <Text height="shorter">
          <UserPlus size={48} />
          <br />
          Criar um personagem
        </Text>
      ) : (
        <>
          <div className="person-image">
            {person?.image?.url ? (
              <Image src={person.image.url} alt="" width={400} height={400} />
            ) : (
              <ImageIco weight="thin" size={64} alt="" color="#e3e3e3" />
            )}
          </div>
          <PersonInfos>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Nome:
              </Text>
              <Text>
                {person.name} {person.lastName}
              </Text>
            </ItemInfo>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Idade:
              </Text>
              <Text>{person.age} anos</Text>
            </ItemInfo>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Criado em:
              </Text>
              <Text>{person.createAt}</Text>
            </ItemInfo>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Atualizado em:
              </Text>
              <Text>{person.updateAt}</Text>
            </ItemInfo>
          </PersonInfos>

          {isNotPreview && (
            <>
              <ObjectsOfPerson>
                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Objetivos:
                  </Text>
                  <Text>{person.objectives?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Sonhos:
                  </Text>
                  <Text>{person.dreams?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Medos:
                  </Text>
                  <Text>{person.fears?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Casais:
                  </Text>
                  <Text>{person.couples?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Aparência:
                  </Text>
                  <Text>{person.appearance?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Personalidade:
                  </Text>
                  <Text>{person.personality?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Poderes:
                  </Text>
                  <Text>{person.powers?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Traumas:
                  </Text>
                  <Text>{person.traumas?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Valores:
                  </Text>
                  <Text>{person.values?.length || 0}</Text>
                </ItemInfo>

                <ItemInfo isObject>
                  <Text as="label" size="sm" family="body" height="shorter">
                    Desejos:
                  </Text>
                  <Text>{person.wishes?.length || 0}</Text>
                </ItemInfo>
              </ObjectsOfPerson>
              <PersonHistory>
                <Text as="label" weight="bold" size="xl">
                  História:
                </Text>
                <Text as="p" family="body">
                  {person.history}
                </Text>
              </PersonHistory>
              <EditPersonButton
                icon={<Pencil weight="bold" size={32} />}
                wid="hug"
                onClick={() =>
                  router.replace(`/project/${id}/persons/${personId}`)
                }
              />
            </>
          )}
        </>
      )}
    </CardPersonContainer>
  )
}
