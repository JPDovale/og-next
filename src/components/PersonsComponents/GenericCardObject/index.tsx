import { ReactNode } from 'react'
import { Text } from '@components/usefull/Text'
import { Eye, Pencil } from 'phosphor-react'
import {
  EditButton,
  GenericCardObjectContainer,
  ItemInfo,
  ObjectInfos,
  Relational,
  RelationalInfos,
  SubObjectCard,
  SubObjects,
} from './styles'
import { useRouter } from 'next/router'
import { AvatarWeb } from '@components/usefull/Avatar'
import { useProject } from '@hooks/useProject'

interface IGenericObject {
  id?: string
  title: string
  description: string
  coupleWithPerson?: {
    person_id: string
  }
  until_end?: boolean
}

interface IGenericCardObjectProps {
  object: IGenericObject
  to: string
  icon?: ReactNode
  withSubObjects?: 'consequências' | 'exceções' | undefined
  subObjects?: IGenericObject[]
  isUniqueRelational?: boolean
  permission: 'view' | 'edit' | 'comment' | undefined

  functionToButton?: (object: IGenericObject) => void
}

export function GenericCardObject({
  object,
  to,
  icon,
  subObjects,
  withSubObjects,
  isUniqueRelational = false,
  permission,

  functionToButton,
}: IGenericCardObjectProps) {
  const router = useRouter()
  const { id, personId } = router.query

  const { personsThisProject } = useProject(id as string)
  const relationalPerson = personsThisProject?.find(
    (person) => person.id === object.coupleWithPerson?.person_id,
  )

  console.log(object)

  return (
    <GenericCardObjectContainer>
      <ObjectInfos>
        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            Titulo
          </Text>
          <Text>{object.title}</Text>
        </ItemInfo>

        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            Descrição
          </Text>
          <Text size="sm">{object.description}</Text>
        </ItemInfo>

        {withSubObjects && (
          <ItemInfo>
            <Text
              as="label"
              size="md"
              family="body"
              height="shorter"
              weight="bold"
            >
              {withSubObjects} {subObjects?.length}:
            </Text>
            <SubObjects>
              {subObjects?.map((subObject) => (
                <SubObjectCard
                  key={`${subObject.description}${subObject.title}`}
                >
                  <ItemInfo>
                    <Text as="label" size="sm" family="body" height="shorter">
                      Titulo
                    </Text>
                    <Text size="sm">{subObject.title}</Text>
                  </ItemInfo>
                  <ItemInfo>
                    <Text as="label" size="sm" family="body" height="shorter">
                      Descrição
                    </Text>
                    <Text size="sm">{subObject.description}</Text>
                  </ItemInfo>
                </SubObjectCard>
              ))}
            </SubObjects>
          </ItemInfo>
        )}

        {isUniqueRelational && (
          <>
            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Personagem
              </Text>
              <Relational>
                <AvatarWeb
                  src={relationalPerson?.image_url ?? undefined}
                  size="lg"
                />
                <RelationalInfos>
                  <Text as="label" size="lg" family="body" height="shorter">
                    {relationalPerson?.name}
                  </Text>
                  <Text as="label" size="lg" family="body" height="shorter">
                    {relationalPerson?.age} anos
                  </Text>
                </RelationalInfos>
              </Relational>
            </ItemInfo>

            <ItemInfo>
              <Text as="label" size="sm" family="body" height="shorter">
                Ficarão juntos no final?
              </Text>
              <Text
                css={{
                  color: object.until_end ? '$successDefault' : '$errorDefault',
                }}
              >
                {object.until_end ? 'Sim' : 'Não'}
              </Text>
            </ItemInfo>
          </>
        )}
      </ObjectInfos>

      <EditButton
        type="button"
        onClick={() =>
          functionToButton
            ? functionToButton(object)
            : router.push(
                `/project/${id}/persons/${personId}/${to}/${object.id}`,
              )
        }
      >
        {icon ||
          (permission === 'edit' ? (
            <Pencil size={20} color="#fffddd" />
          ) : (
            <Eye size={20} color="#fffddd" />
          ))}
      </EditButton>
    </GenericCardObjectContainer>
  )
}
