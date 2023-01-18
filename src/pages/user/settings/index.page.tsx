import { useMemo, useContext, useState } from 'react'
import { Button, Text, TextInput } from '@og-ui/react'
import {
  At,
  Crosshair,
  Envelope,
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
import { IRef } from '../../../api/responsesTypes/IProjcetResponse'
import { UserContext } from '../../../contexts/user'
import { ProjectsContext } from '../../../contexts/projects'
import { DashboardPageLayout } from '../../../layouts/DashboardPageLayout'
import {
  Avatar,
  Info,
  Input,
  UserInfos,
  UserSettings,
  UserSettingsPageContainer,
} from './styles'
import { ResponseInfoApi } from '../../../components/ResponseInfoApi'
import { AvatarWeb } from '../../../components/Avatar'
import { useWindowSize } from '../../../hooks/useWindow'
import { NextSeo } from 'next-seo'

interface IObjects {
  objectives: IRef[]
  dreams: IRef[]
  fears: IRef[]
  appearance: IRef[]
  personality: IRef[]
  powers: IRef[]
  traumas: IRef[]
  values: IRef[]
  wishes: IRef[]
}

export default function UserSettingsPage() {
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
  const { users, projects, persons } = useContext(ProjectsContext)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

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

    projects.map((project) => {
      project.tags
        .find((tag) => tag.type === 'persons/objectives')
        ?.refs.map((ref) => {
          return findeObjectives.objectives.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/dreams')
        ?.refs.map((ref) => {
          return findeObjectives.dreams.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/fears')
        ?.refs.map((ref) => {
          return findeObjectives.fears.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/appearance')
        ?.refs.map((ref) => {
          return findeObjectives.appearance.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/personality')
        ?.refs.map((ref) => {
          return findeObjectives.personality.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/powers')
        ?.refs.map((ref) => {
          return findeObjectives.powers.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/traumas')
        ?.refs.map((ref) => {
          return findeObjectives.traumas.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/values')
        ?.refs.map((ref) => {
          return findeObjectives.values.push(ref)
        })

      project.tags
        .find((tag) => tag.type === 'persons/wishes')
        ?.refs.map((ref) => {
          return findeObjectives.wishes.push(ref)
        })

      return ''
    })

    return findeObjectives
  }, [projects])

  function handleSaveUser() {
    setError(undefined)
    updateUser(name, username, email)
  }

  async function handleUpdateImage(files: FileList | null) {
    if (!files) return

    const file = files[0]

    if (file?.type !== 'image/jpeg' && file.type !== 'image/png') return

    await updateAvatar(file)
  }

  async function handleUpdatePassword() {
    setError(undefined)
    await updatePassword(oldPassword, password)
    setTimeout(() => setError(undefined), 10000)
  }

  return (
    <>
      <NextSeo title={`Configurações-${user?.username} | Ognare`} noindex />

      <DashboardPageLayout window="Configurações do usuário" loading={loading}>
        <UserSettingsPageContainer>
          <UserSettings>
            {error && <ResponseInfoApi error={error} />}

            <Info isCard>
              <Text family="body" as="label">
                Nome
                <TextInput
                  icon={<UserCircle />}
                  placeholder={user?.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Text>
            </Info>

            <Info isCard>
              <Text family="body" as="label">
                Nome de usuário
                <TextInput
                  icon={<At />}
                  placeholder={user?.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Text>
            </Info>

            <Info isCard>
              <Text family="body" as="label">
                Email
                <TextInput
                  type="email"
                  icon={<Envelope />}
                  placeholder={user?.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
                Caso você não forneça um email valido, não poderemos recuperar a
                sua conta...
              </Text>
            </Info>

            <Button
              type="button"
              label="Salvar alterações"
              icon={<PencilLine />}
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
            />

            <Info isCard>
              <Text family="body" as="label">
                Alterar senha
                <Info isCard columns={smallWindow ? 1 : 2}>
                  <Text family="body" as="label">
                    <header>Senha antiga</header>
                    <TextInput
                      type="password"
                      icon={<Key />}
                      placeholder="**********"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Text>

                  <Text family="body" as="label">
                    <header>Nova senha</header>
                    <TextInput
                      type="password"
                      icon={<LockKey />}
                      placeholder="**********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Text>
                </Info>
                <Button
                  type="button"
                  label="Alterar"
                  icon={<LockLaminated />}
                  wid="hug"
                  disabled={!oldPassword || !password}
                  onClick={() => handleUpdatePassword()}
                  css={{
                    padding: '$3 $10',
                    alignSelf: 'center',
                    marginTop: '$4',
                  }}
                />
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

                <Button
                  disabled={!user?.avatar?.url || loading}
                  onClick={deleteAvatar}
                  type="button"
                  label="Remover avatar"
                  icon={<X />}
                  wid="full"
                  align="center"
                />
              </div>
            </Info>
          </UserInfos>
        </UserSettingsPageContainer>
      </DashboardPageLayout>
    </>
  )
}
