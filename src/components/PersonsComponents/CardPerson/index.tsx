import { ButtonIcon } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
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
  const { person } = findPerson(personId)

  return (
    <CardPersonContainer
      as={isNotPreview ? 'div' : 'button'}
      title={isAdd ? 'Adicionar personagem' : `${person?.name.full}`}
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
            {person?.image.url ? (
              <Image
                src={person?.image.url}
                alt={person?.image.alt ?? ''}
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
          <ContainerGrid padding={0} columns={isNotPreview ? 2 : 1}>
            <PersonInfos>
              <InfoDefault title="Nome" size="sm" css={{ alignItems: 'start' }}>
                {person?.name.full}
              </InfoDefault>

              <InfoDefault
                title="Idade"
                size="sm"
                css={{ alignItems: 'start' }}
              >
                {person?.age.number
                  ? `${person.age.number} anos`
                  : 'Idade desconhecida'}
              </InfoDefault>

              {isNotPreview && (
                <ObjectsOfPerson>
                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Objetivos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.objective.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Sonhos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.dream.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Medos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.fear.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Casais:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.couple.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Aparência:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.appearance.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Personalidade:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.personality.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Poderes:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.power.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Traumas:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.trauma.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Valores:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.value.itensLength}
                    </Text>
                  </ItemInfo>

                  <ItemInfo isObject>
                    <Text as="label" size="xs" family="body" height="shorter">
                      Desejos:
                    </Text>
                    <Text weight="bold" size="xs">
                      {person?.collections.wishe.itensLength}
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
