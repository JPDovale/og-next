import { Text } from '@components/usefull/Text'
import { UserCircleMinus, X } from 'phosphor-react'

import {
  CardUserWithAccessContainer,
  UnshareButton,
  UnshareConfirm,
} from './styles'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { useProject } from '@hooks/useProject'
import { useUser } from '@hooks/useUser'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { IProject } from '@api/responsesTypes/project/IProject'
import { IUserInProject } from '@api/responsesTypes/project/IProjectPreview'

interface ICardUserWithAccessContainerProps {
  project: IProject
  userWithAccess: IUserInProject
  unshare: string
  setUnshare: (newState: string) => void
  handleUnshare: () => void
}

export function CardUserWithAccess({
  project,
  userWithAccess,
  unshare,
  setUnshare,
  handleUnshare,
}: ICardUserWithAccessContainerProps) {
  const { user } = useUser()

  const { permission } = useProject(project.id)

  const smallWindow = screen.width < 786

  return (
    <CardUserWithAccessContainer>
      <AvatarWeb
        size={smallWindow ? '2xl' : '4xl'}
        src={userWithAccess.avatar.url}
        alt={userWithAccess.avatar.alt}
      />
      {project.creator.id === user?.account.id && (
        <UnshareButton
          className="unshare"
          wid="hug"
          onClick={() => {
            if (unshare === userWithAccess.id) return setUnshare('')
            setUnshare(userWithAccess.id)
          }}
        >
          <ButtonIcon>
            {unshare === userWithAccess.id ? <X /> : <UserCircleMinus />}
          </ButtonIcon>

          <ButtonLabel>
            {unshare === userWithAccess.id ? 'Cancelar' : 'Remover'}
          </ButtonLabel>
        </UnshareButton>
      )}

      <Text family="body" as="label">
        Nome de usuário:
        <Text size="xs">{userWithAccess.username}</Text>
      </Text>
      <Text family="body" as="label">
        Email:
        <Text size="xs">{userWithAccess.email}</Text>
      </Text>
      <Text family="body" as="label">
        Permissão:
        <Text size="xs">{permission}</Text>
      </Text>

      {unshare === userWithAccess.id && (
        <UnshareConfirm>
          <ContainerGrid padding={2} darkBackground>
            <Text size="sm" as="span">
              Quer memos remover o usuário do projeto?
            </Text>
            <Text family="body" as="label" height="shorter">
              Isso fará com que o usuário não possa mais acessar nada
              relacionado a esse projeto.
            </Text>

            <ButtonRoot
              type="button"
              className="unshare"
              wid="full"
              onClick={handleUnshare}
            >
              <ButtonIcon>
                <UserCircleMinus />
              </ButtonIcon>

              <ButtonLabel>Confirmar</ButtonLabel>
            </ButtonRoot>
          </ContainerGrid>
        </UnshareConfirm>
      )}
    </CardUserWithAccessContainer>
  )
}
