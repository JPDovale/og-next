import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import { UserContext } from '@contexts/user'
import { useRouter } from 'next/router'
import {
  Fingerprint,
  Gear,
  UserMinus,
  UsersThree,
  WarningOctagon,
  XCircle,
} from 'phosphor-react'
import { useContext } from 'react'

import { Options, UserInfos, UserOptionsPopupContainer } from './style'

export function UserOptionsPopup() {
  const { user, logout } = useContext(UserContext)
  const { userOptionsIsOpen, setUserOptionsIsOpen } =
    useContext(InterfaceContext)

  const router = useRouter()

  return (
    <UserOptionsPopupContainer onWindow={userOptionsIsOpen}>
      <UserInfos>
        <button
          className="close"
          type="button"
          onClick={() => setUserOptionsIsOpen(false)}
        >
          <XCircle size={32} />
        </button>
        <AvatarWeb src={user?.avatar?.url as string} />
        <div>
          <Text as={'h3'} size={'lg'} weight={'bold'} spacing={'maximum'}>
            {user?.username}
          </Text>
          <Text as={'span'} family={'body'} size={'md'}>
            {user?.email}
          </Text>
        </div>
      </UserInfos>
      <Options>
        <ButtonRoot
          type="button"
          onClick={() => {
            router.push('/user/settings')
            setUserOptionsIsOpen(false)
          }}
        >
          <ButtonIcon>
            <Gear weight="bold" />
          </ButtonIcon>
          <ButtonLabel>Configurações de usuário</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          onClick={() => {
            router.push('/shared')
            setUserOptionsIsOpen(false)
          }}
        >
          <ButtonIcon>
            <UsersThree weight="bold" />
          </ButtonIcon>

          <ButtonLabel>Projetos compartilhados</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot type="button" onClick={logout}>
          <ButtonIcon>
            <UserMinus weight="bold" />
          </ButtonIcon>

          <ButtonLabel>Logout</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot type="button" disabled css={{ marginTop: '$8' }}>
          <ButtonIcon>
            <WarningOctagon weight="bold" />
          </ButtonIcon>

          <ButtonLabel>Ajuda</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot type="button" label="" disabled>
          <ButtonIcon>
            <Fingerprint weight="bold" />
          </ButtonIcon>

          <ButtonLabel>Política de privacidade</ButtonLabel>
        </ButtonRoot>
      </Options>
    </UserOptionsPopupContainer>
  )
}
