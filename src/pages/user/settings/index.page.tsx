import { useContext, useState } from 'react'
import {
  At,
  Envelope,
  Eye,
  EyeClosed,
  Key,
  LockKey,
  LockLaminated,
  PencilLine,
  UserCircle,
  X,
} from 'phosphor-react'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { NextSeo } from 'next-seo'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import {
  Avatar,
  Info,
  Input,
  UserInfos,
  UserSettings,
  UserSettingsPageContainer,
} from './styles'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { useUser } from '@hooks/useUser'
import {
  deleteAvatarRequest,
  updateAvatarRequest,
  updatePasswordRequest,
  updateUserRequest,
} from '@api/userRequest'
import { InterfaceContext } from '@contexts/interface'

export default function UserSettingsPage() {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')

  const { setError } = useContext(InterfaceContext)

  const { user, loadingUser, refetchUser } = useUser()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  usePreventBack('/projects')

  async function handleUpdateImage(files: FileList | null) {
    if (!files) return

    const file = files[0]

    if (file?.type !== 'image/jpeg' && file.type !== 'image/png') return

    const response = await updateAvatarRequest(file)

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.ok) {
      await refetchUser()
    }
  }

  async function handleUpdatePassword() {
    setError(null)

    if (password.length < 6 || oldPassword.length < 6) {
      return setError({
        title: 'As senhas precisam ter pelo menos 6 caracteres.',
        message:
          'As senhas precisam ter pelo menos 6 caracteres, por favor verifique os campos e tente novamente.',
      })
    }

    if (password !== oldPassword) {
      return setError({
        title: 'As senhas são diferentes.',
        message:
          'As senhas que você informou não são iguais, por favor verifique os campos e tente novamente.',
      })
    }

    const response = await updatePasswordRequest({ oldPassword, password })

    if (response.error) {
      setError(response.error)
    }
  }

  async function handleRemoAvatar() {
    const response = await deleteAvatarRequest()

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.ok) {
      await refetchUser()
      setError(null)
    }
  }

  async function handleUpdateUser() {
    const response = await updateUserRequest({
      email: email || user?.infos.email,
      name: name || user?.infos.name,
      username: username || user?.infos.username,
    })

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.ok) {
      await refetchUser()
      setName('')
      setEmail('')
      setUsername('')
      setError(null)
    }
  }

  return (
    <>
      <NextSeo
        title={`Configurações-${user?.infos.username} | Magiscrita`}
        noindex
      />

      <DashboardPageLayout
        window="Configurações do usuário"
        loading={loadingUser}
        disableScroll
      >
        <UserSettingsPageContainer>
          <UserSettings>
            <Info isCard>
              <Text family="body" as="label">
                Nome
                <TextInputRoot>
                  <TextInputIcon>
                    <UserCircle />
                  </TextInputIcon>

                  <TextInputInput
                    placeholder={user?.infos.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </TextInputRoot>
              </Text>
            </Info>

            <Info isCard>
              <Text family="body" as="label">
                Nome de usuário
                <TextInputRoot>
                  <TextInputIcon>
                    <At />
                  </TextInputIcon>

                  <TextInputInput
                    placeholder={user?.infos.username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </TextInputRoot>
              </Text>
            </Info>

            <Info isCard>
              <Text family="body" as="label">
                Email
                <TextInputRoot disabled>
                  <TextInputIcon>
                    <Envelope />
                  </TextInputIcon>

                  <TextInputInput
                    type="email"
                    placeholder={user?.infos.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </TextInputRoot>
                Caso você não forneça um email valido, não poderemos recuperar a
                sua conta...
              </Text>
            </Info>

            <ButtonRoot
              type="button"
              wid={smallWindow ? 'full' : 'middle'}
              align="center"
              disabled={!!(!name && !email && !username)}
              onClick={handleUpdateUser}
              css={{
                padding: '$3 $10',
                alignSelf: 'center',
                marginTop: '$4',
                marginBottom: '$8',
              }}
            >
              <ButtonIcon>
                <PencilLine />
              </ButtonIcon>

              <ButtonLabel>Salvar alterações</ButtonLabel>
            </ButtonRoot>

            <Info isCard>
              <Text family="body" as="label">
                Alterar senha
                <Info isCard columns={smallWindow ? 1 : 2}>
                  <Text family="body" as="label">
                    <header>Senha antiga</header>
                    <TextInputRoot>
                      <TextInputIcon>
                        <Key />
                      </TextInputIcon>

                      <TextInputInput
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="**********"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />

                      <TextInputIcon
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        {isShowPassword ? <Eye /> : <EyeClosed />}
                      </TextInputIcon>
                    </TextInputRoot>
                  </Text>

                  <Text family="body" as="label">
                    <header>Nova senha</header>
                    <TextInputRoot>
                      <TextInputIcon>
                        <LockKey />
                      </TextInputIcon>

                      <TextInputInput
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <TextInputIcon
                        onClick={() => setIsShowPassword(!isShowPassword)}
                      >
                        {isShowPassword ? <Eye /> : <EyeClosed />}
                      </TextInputIcon>
                    </TextInputRoot>
                  </Text>
                </Info>
                <ButtonRoot
                  type="button"
                  wid="hug"
                  disabled={!oldPassword || !password}
                  onClick={handleUpdatePassword}
                  css={{
                    padding: '$3 $10',
                    alignSelf: 'center',
                    marginTop: '$4',
                  }}
                >
                  <ButtonIcon>
                    <LockLaminated />
                  </ButtonIcon>

                  <ButtonLabel>Alterar</ButtonLabel>
                </ButtonRoot>
              </Text>
            </Info>
          </UserSettings>

          <UserInfos>
            <Info>
              <Avatar>
                <AvatarWeb
                  src={user?.infos.avatar.url ?? undefined}
                  size="full"
                  alt={user?.infos.avatar.alt}
                />
              </Avatar>
              <Text size="lg" weight="bold">
                {user?.infos.username?.toUpperCase()}
              </Text>

              <div className="buttons">
                <Input htmlFor="file" disabled={loadingUser}>
                  <PencilLine />
                  Alterar avatar
                  <input
                    disabled={loadingUser}
                    type="file"
                    id="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      handleUpdateImage(e.target.files)
                    }}
                  />
                </Input>

                <ButtonRoot
                  disabled={!user?.infos.avatar.url || loadingUser}
                  onClick={handleRemoAvatar}
                  type="button"
                  wid="full"
                  align="center"
                >
                  <ButtonIcon>
                    <X />
                  </ButtonIcon>
                  <ButtonLabel>Remover avatar</ButtonLabel>
                </ButtonRoot>
              </div>
            </Info>
          </UserInfos>
        </UserSettingsPageContainer>
      </DashboardPageLayout>
    </>
  )
}
