import { IObjective } from '@api/responsesTypes/IPersonsResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import { Eye, Pencil, Skull, UsersThree } from 'phosphor-react'

import {
  AvoiderContainer,
  Avoiders,
  CardObjectiveContainer,
  EditButton,
  ItemInfo,
  ObjectiveInfos,
  Supporters,
  SupportingContainer,
} from './styles'

interface ICardObjectiveProps {
  objective: IObjective
  avoiders: Array<{ id: string; name: string; image_url: string | null }>
  supporters: Array<{ id: string; name: string; image_url: string | null }>
  permission: 'view' | 'edit' | 'comment' | undefined
}

export function CardObjective({
  objective,
  avoiders,
  supporters,
  permission,
}: ICardObjectiveProps) {
  const router = useRouter()
  const { id: projectId, personId } = router.query

  return (
    <CardObjectiveContainer>
      <ObjectiveInfos>
        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            Titulo
          </Text>
          <Text>{objective.title}</Text>
        </ItemInfo>

        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            Descrição
          </Text>
          <Text size="sm">{objective.description}</Text>
        </ItemInfo>

        <ItemInfo>
          <Text as="label" size="sm" family="body" height="shorter">
            O objetivo sera concluído?
          </Text>
          <Text
            css={{
              color: objective.it_be_realized
                ? '$successDefault'
                : '$errorDefault',
            }}
          >
            {objective.it_be_realized ? 'Sim' : 'Não'}
          </Text>
        </ItemInfo>
      </ObjectiveInfos>

      <AvoiderContainer>
        <ItemInfo>
          <Text as="label" size="md" weight="bold" height="shorter">
            Inimigos
          </Text>
        </ItemInfo>
        <Avoiders isEmpty={!avoiders[0]}>
          {avoiders[0] ? (
            avoiders.map((avoider) => (
              <ItemInfo
                key={avoider.id}
                isViewPerson
                onClick={() =>
                  router.push(`/project/${projectId}/persons/${avoider.id}`)
                }
              >
                <AvatarWeb src={avoider?.image_url ?? undefined} size="sm" />
                <Text as="label" size="sm" family="body" height="shorter">
                  {avoider.name}
                </Text>
              </ItemInfo>
            ))
          ) : (
            <ListEmpty isInLine icon={<Skull size={24} />} message=" " />
          )}
        </Avoiders>
      </AvoiderContainer>

      <SupportingContainer>
        <ItemInfo>
          <Text as="label" size="md" weight="bold" height="shorter">
            Apoiadores
          </Text>
        </ItemInfo>
        <Supporters isEmpty={!supporters[0]}>
          {supporters[0] ? (
            supporters.map((supporter) => (
              <ItemInfo
                key={supporter.id}
                isViewPerson
                onClick={() =>
                  router.push(`/project/${projectId}/persons/${supporter.id}`)
                }
              >
                <AvatarWeb src={supporter?.image_url ?? undefined} size="sm" />
                <Text as="label" size="sm" family="body" height="shorter">
                  {supporter.name}
                </Text>
              </ItemInfo>
            ))
          ) : (
            <ListEmpty isInLine icon={<UsersThree size={24} />} message=" " />
          )}
        </Supporters>
      </SupportingContainer>

      <EditButton
        onClick={() =>
          router.push(
            `/project/${projectId}/persons/${personId}/objectives/${objective.id}`,
          )
        }
      >
        {permission === 'edit' ? (
          <Pencil size={20} color="#fffddd" />
        ) : (
          <Eye size={20} color="#fffddd" />
        )}
      </EditButton>
    </CardObjectiveContainer>
  )
}
