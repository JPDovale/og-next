import { useContext } from 'react'
import { Text } from '@components/usefull/Text'
import { Eye } from 'phosphor-react'
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
import { InterfaceContext } from '@contexts/interface'

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
  withSubObjects?: 'consequências' | 'exceções' | undefined
  subObjects?: IGenericObject[]
  isUniqueRelational?: boolean
}

export function GenericCardObject({
  object,
  to,
  subObjects,
  withSubObjects,
  isUniqueRelational = false,
}: IGenericCardObjectProps) {
  const { theme } = useContext(InterfaceContext)

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
          <Text weight="bold" size="2xl" family="body" height="shorter">
            {object.title}
          </Text>
        </ItemInfo>

        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            Descrição
          </Text>
          <Text size="xl" family="body" weight="bold" height="shorter">
            {object.description}
          </Text>
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
                    <Text
                      weight="bold"
                      size="lg"
                      family="body"
                      height="shorter"
                    >
                      {subObject.title}
                    </Text>
                  </ItemInfo>
                  <ItemInfo>
                    <Text as="label" size="sm" family="body" height="shorter">
                      Descrição
                    </Text>
                    <Text weight="bold" family="body" height="shorter">
                      {subObject.description}
                    </Text>
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
                weight="bold"
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
          router.push(`/project/${id}/persons/${personId}/${to}/${object.id}`)
        }
      >
        <Eye size={20} color={theme === 'dark' ? '#fffddd' : '#121214'} />
      </EditButton>
    </GenericCardObjectContainer>
  )
}
