import { Button, Text } from '@og-ui/react'
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
import { InterfaceContext } from '../../../../contexts/interface'
import { UserContext } from '../../../../contexts/user'
import { AvatarWeb } from '../../../Avatar'
import { Error } from '../../../Error'
import { Options, UserInfos, UserOptionsPopupContainer } from './style'

export function UserOptionsPopup() {
  const { user, logout } = useContext(UserContext)
  const { userOptionsIsOpen, setUserOptionsIsOpen } =
    useContext(InterfaceContext)

  const router = useRouter()

  if (!user) return <Error />

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
            {user.username}
          </Text>
          <Text as={'span'} family={'body'} size={'md'}>
            {user.email}
          </Text>
        </div>
      </UserInfos>
      <Options>
        <Button
          type="button"
          icon={<Gear weight="bold" />}
          label="Configurações de usuário"
          onClick={() => {
            router.replace('/user/settings')
            setUserOptionsIsOpen(false)
          }}
        />

        <Button
          type="button"
          icon={<UsersThree weight="bold" />}
          label="Projetos compartilhados"
          onClick={() => {
            router.replace('/shared')
            setUserOptionsIsOpen(false)
          }}
        />

        <Button
          type="button"
          icon={<UserMinus weight="bold" />}
          label="Logout"
          onClick={() =>
            // user.isSocialLogin
            //   ? signOut({
            //       redirect: true,
            //       callbackUrl: 'http://localhost:3000/login',
            //     }).then(() => logout())
            //   :
            logout()
          }
        />
        <Button
          type="button"
          icon={<WarningOctagon weight="bold" />}
          label="Ajuda"
          disabled
          css={{
            marginTop: '$8',
          }}
        />
        <Button
          type="button"
          icon={<Fingerprint weight="bold" />}
          label="Política de privacidade"
          disabled
        />
      </Options>
    </UserOptionsPopupContainer>
  )
}
