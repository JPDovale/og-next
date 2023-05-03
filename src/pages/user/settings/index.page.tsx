import { useMemo, useContext, useState } from 'react'
import {
  At,
  Crosshair,
  Envelope,
  Eye,
  EyeClosed,
  HeartBreak,
  Key,
  Lightning,
  LockKey,
  LockLaminated,
  PencilLine,
  Person,
  ProjectorScreenChart,
  RainbowCloud,
  SketchLogo,
  TreeStructure,
  UserCircle,
  UserCircleGear,
  UserFocus,
  UsersThree,
  Warning,
  X,
} from 'phosphor-react'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
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
import { ResponseInfoApi } from '@components/usefull/ResponseInfoApi'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { IArchive } from '@api/responsesTypes/IBoxResponse'

interface IObjects {
  objectives: IArchive[]
  dreams: IArchive[]
  fears: IArchive[]
  appearance: IArchive[]
  personality: IArchive[]
  powers: IArchive[]
  traumas: IArchive[]
  values: IArchive[]
  wishes: IArchive[]
}

export default function UserSettingsPage() {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')

  const {
    user,
    loading,
    updateUser,
    error,
    setError,
    updateAvatar,
    updatePassword,
    deleteAvatar,
  } = useContext(UserContext)
  const { users, projects, persons, boxes } = useContext(ProjectsContext)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  usePreventBack('/projects')

  const objects = useMemo(() => {
    const findeObjectives: IObjects = {
      objectives: [],
      dreams: [],
      fears: [],
      appearance: [],
      personality: [],
      powers: [],
      traumas: [],
      values: [],
      wishes: [],
    }

    boxes.map((box) => {
      switch (box.name) {
        case 'persons/objectives': {
          box.archives.map((file) => {
            return findeObjectives.objectives.push(file)
          })
          break
        }

        case 'persons/dreams': {
          box.archives.map((file) => {
            return findeObjectives.dreams.push(file)
          })
          break
        }

        case 'persons/fears': {
          box.archives.map((file) => {
            return findeObjectives.fears.push(file)
          })
          break
        }

        case 'persons/appearance': {
          box.archives.map((file) => {
            return findeObjectives.appearance.push(file)
          })
          break
        }

        case 'persons/personality': {
          box.archives.map((file) => {
            return findeObjectives.personality.push(file)
          })
          break
        }

        case 'persons/powers': {
          box.archives.map((file) => {
            return findeObjectives.powers.push(file)
          })
          break
        }

        case 'persons/traumas': {
          box.archives.map((file) => {
            return findeObjectives.traumas.push(file)
          })
          break
        }

        case 'persons/values': {
          box.archives.map((file) => {
            return findeObjectives.values.push(file)
          })
          break
        }

        case 'persons/wishes': {
          box.archives.map((file) => {
            return findeObjectives.wishes.push(file)
          })
          break
        }

        default:
          break
      }

      return ''
    })

    return findeObjectives
  }, [boxes])

  function handleSaveUser() {
    setError(undefined)
    updateUser(
      name || user?.name,
      username || user?.username,
      email || user?.email,
    )
  }

  async function handleUpdateImage(files: FileList | null) {
    if (!files) return

    const file = files[0]

    if (file?.type !== 'image/jpeg' && file.type !== 'image/png') return

    await updateAvatar(file)
  }

  async function handleUpdatePassword() {
    setError(undefined)

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

    await updatePassword(oldPassword, password)
    setTimeout(() => setError(undefined), 10000)
  }

  return (
    <>
      <NextSeo title={`Configurações-${user?.username} | Magiscrita`} noindex />

      <DashboardPageLayout window="Configurações do usuário" loading={loading}>
        <UserSettingsPageContainer>
          <UserSettings>
            {error && <ResponseInfoApi error={error} />}

            <Info isCard>
              <Text family="body" as="label">
                Nome
                <TextInputRoot>
                  <TextInputIcon>
                    <UserCircle />
                  </TextInputIcon>

                  <TextInputInput
                    placeholder={user?.name}
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
                    placeholder={user?.username}
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
                    placeholder={user?.email}
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
              onClick={handleSaveUser}
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
                  onClick={() => handleUpdatePassword()}
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

            <Info isCard columns={2}>
              <Text family="body" as="label">
                <header>Data de criação</header>
                <Text size="sm">{user?.createAt}</Text>
              </Text>

              <Text family="body" as="label">
                <header>Ultima alteração</header>
                <Text size="sm">{user?.updateAt}</Text>
              </Text>
            </Info>

            <Info css={{ marginTop: '$6' }}>
              <Text family="body" as="label">
                Ás referencias criadas não são contadas na listagem
              </Text>
            </Info>
            <Info columns={smallWindow ? 2 : 3} isCard>
              <Text family="body" as="label">
                <header>
                  <ProjectorScreenChart /> Projetos
                </header>
                <Text>{projects.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <UsersThree />
                  Usuários acessíveis
                </header>
                <Text>{users.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <UserFocus />
                  Personagens
                </header>
                <Text>{persons.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <Crosshair />
                  Objetivos criados
                </header>
                <Text>{objects.objectives.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <RainbowCloud />
                  Sonhos criados
                </header>
                <Text>{objects.dreams.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <Warning />
                  Medos criados
                </header>
                <Text>{objects.fears.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <Person />
                  Aparências criadas
                </header>
                <Text>{objects.appearance.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <UserCircleGear />
                  Personalidades criadas
                </header>
                <Text>{objects.personality.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <Lightning />
                  Poderes criados
                </header>
                <Text>{objects.powers.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <HeartBreak />
                  Traumas criados
                </header>
                <Text>{objects.traumas.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <TreeStructure />
                  Valores criados
                </header>
                <Text>{objects.values.length}</Text>
              </Text>

              <Text family="body" as="label">
                <header>
                  <SketchLogo />
                  Desejos criados
                </header>
                <Text>{objects.wishes.length}</Text>
              </Text>
            </Info>
          </UserSettings>

          <UserInfos>
            <Info>
              <Avatar>
                <AvatarWeb src={user?.avatar?.url} size="full" />
              </Avatar>
              <Text size="lg" weight="bold">
                {user?.username?.toUpperCase()}
              </Text>

              <div className="buttons">
                <Input htmlFor="file" disabled={loading}>
                  <PencilLine />
                  Alterar avatar
                  <input
                    disabled={loading}
                    type="file"
                    id="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      handleUpdateImage(e.target.files)
                    }}
                  />
                </Input>

                <ButtonRoot
                  disabled={!user?.avatar?.url || loading}
                  onClick={deleteAvatar}
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
