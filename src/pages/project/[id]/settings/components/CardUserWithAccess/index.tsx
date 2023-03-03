import { useContext } from 'react'
import { Text } from '@components/usefull/Text'
import { UserCircleMinus, X } from 'phosphor-react'

import { Info } from '../../styles'
import {
  CardUserWithAccessContainer,
  UnshareButton,
  UnshareConfirm,
} from './styles'
import { IProjectResponse } from '@api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { UserContext } from '@contexts/user'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'

interface ICardUserWithAccessContainerProps {
  project: IProjectResponse
  userWithAccess: IUserResponse
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
  const { user } = useContext(UserContext)

  const smallWindow = screen.width < 786

  const permission = project.users.find(
    (user) => user.id === userWithAccess.id,
  )?.permission

  return (
    <CardUserWithAccessContainer>
      <AvatarWeb
        size={smallWindow ? '2xl' : '4xl'}
        src={userWithAccess.avatar?.url}
      />
      {project.createdPerUser === user?.id && (
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
        Nome:
        <Text size="xs">{userWithAccess.name}</Text>
      </Text>
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
          <Info isCard>
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
          </Info>
        </UnshareConfirm>
      )}
    </CardUserWithAccessContainer>
  )
}
