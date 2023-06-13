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
import { InterfaceContext } from '@contexts/interface'
import {
  IInCouplePerson,
  IPersonInObject,
  ISubObject,
} from '@api/responsesTypes/person/IPerson'

interface IGenericObject {
  id?: string
  infos: {
    title: string
    description: string
    createdAt: Date
    untilEnd?: boolean
  }
  collections?: {
    consequence?: {
      itens?: ISubObject[]
    }
    exception?: {
      itens?: ISubObject[]
    }
    referencesIt?: {
      itens: IPersonInObject[]
    }
    couple?: IInCouplePerson
  }
}

interface IGenericCardObjectProps {
  object: IGenericObject
  to: string
  withSubObjects?: 'consequências' | 'exceções' | undefined
  subObjects?: ISubObject[]
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

  return (
    <GenericCardObjectContainer>
      <ObjectInfos>
        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            Titulo
          </Text>
          <Text weight="bold" size="2xl" family="body" height="shorter">
            {object.infos.title}
          </Text>
        </ItemInfo>

        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            Descrição
          </Text>
          <Text size="xl" family="body" weight="bold" height="shorter">
            {object.infos.description}
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
                  key={`${subObject.infos.description}${subObject.infos.title}`}
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
                      {subObject.infos.title}
                    </Text>
                  </ItemInfo>
                  <ItemInfo>
                    <Text as="label" size="sm" family="body" height="shorter">
                      Descrição
                    </Text>
                    <Text weight="bold" family="body" height="shorter">
                      {subObject.infos.description}
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
                  src={object.collections?.couple?.image.url}
                  alt={object.collections?.couple?.image.alt}
                  size="lg"
                />
                <RelationalInfos>
                  <Text as="label" size="lg" family="body" height="shorter">
                    {object.collections?.couple?.name.first}
                  </Text>
                  <Text as="label" size="lg" family="body" height="shorter">
                    {object.collections?.couple?.age} anos
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
                  color: object.infos.untilEnd
                    ? '$successDefault'
                    : '$errorDefault',
                }}
              >
                {object.infos.untilEnd ? 'Sim' : 'Não'}
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
