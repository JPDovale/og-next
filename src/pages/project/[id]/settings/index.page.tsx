import {
  //  Button,
  Text,
  TextInput,
} from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/dist/client/router'
import {
  Books,
  Crosshair,
  HeartBreak,
  Lightning,
  // PencilLine,
  Person,
  Presentation,
  RainbowCloud,
  SketchLogo,
  TreeStructure,
  UserCircleGear,
  UserFocus,
  Warning,
} from 'phosphor-react'
import { useContext, useMemo, useState } from 'react'
import {
  IProjectResponse,
  IRef,
} from '../../../../api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '../../../../api/responsesTypes/IUserResponse'
import { AvatarWeb } from '../../../../components/Avatar'
import { ResponseInfoApi } from '../../../../components/ResponseInfoApi'
import { ProjectsContext } from '../../../../contexts/projects'
import { UserContext } from '../../../../contexts/user'
import { usePreventBack } from '../../../../hooks/usePreventDefaultBack'
import { useWindowSize } from '../../../../hooks/useWindow'
import { ProjectPageLayout } from '../../../../layouts/ProjectPageLayout'

import { CardUserWithAccess } from './components/CardUserWithAccess'
import { Creator, Info, SettingsProject } from './styles'

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

export default function SettingsPage() {
  const [unshare, setUnshare] = useState('')

  const { projects, users, loading, persons, unshareProject, error, books } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  usePreventBack(`/project/${id}`)

  const project = projects?.find(
    (project) => project?.id === id,
  ) as IProjectResponse

  const personsOfProject = persons.filter(
    (person) => person.defaultProject === project?.id,
  )
  const booksOfProject = books.filter(
    (book) => book.defaultProject === project?.id,
  )

  const userCreatorFinde = users?.find(
    (user) => user.id === project?.createdPerUser,
  )
  const userCreator = userCreatorFinde || (user as IUserResponse)

  const usersWithAccess = users.filter((u) => {
    return project?.users.find((user) => user.id === u.id)
  })
  const allUsersWithAccess = [
    ...usersWithAccess,
    userCreator,
    user,
  ] as IUserResponse[]

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

    project?.tags
      .find((tag) => tag.type === 'persons/objectives')
      ?.refs.map((ref) => {
        return findeObjectives.objectives.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/dreams')
      ?.refs.map((ref) => {
        return findeObjectives.dreams.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/fears')
      ?.refs.map((ref) => {
        return findeObjectives.fears.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/appearance')
      ?.refs.map((ref) => {
        return findeObjectives.appearance.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/personality')
      ?.refs.map((ref) => {
        return findeObjectives.personality.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/powers')
      ?.refs.map((ref) => {
        return findeObjectives.powers.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/traumas')
      ?.refs.map((ref) => {
        return findeObjectives.traumas.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/values')
      ?.refs.map((ref) => {
        return findeObjectives.values.push(ref)
      })

    project?.tags
      .find((tag) => tag.type === 'persons/wishes')
      ?.refs.map((ref) => {
        return findeObjectives.wishes.push(ref)
      })

    return findeObjectives
  }, [project?.tags])

  function handleUnshare() {
    const userToRemove = users.find((u) => u.id === unshare)

    if (!userToRemove) return

    return unshareProject(userToRemove.email, project?.id)
  }

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Configurações | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Configurações']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <SettingsProject>
          {error && <ResponseInfoApi error={error} />}

          <Info isCard>
            <Text family="body" as="label">
              Nome
              <TextInput
                icon={<Presentation />}
                placeholder={project?.name || 'Carregando...'}
                disabled
              />
              A alteração estará disponível em breve para os criadores do
              projeto
            </Text>
          </Info>

          <Info isCard>
            <Text family="body" as="label">
              Tipo do projeto
              <Text>{project?.type || 'Carregando...'}</Text>
              <Text family="body" as="label">
                Outros tipos de projetos estarão disponíveis em breve para os
                criadores do projeto...
              </Text>
            </Text>
          </Info>

          {/* <Button
                    type="button"

          label="Salvar alterações"
          icon={<PencilLine />}
          wid={smallWindow ? 'full' : 'middle'}
          align="center"
          // disabled={!!(!name && !email && !username)}
          // onClick={handleSaveUser}
          css={{
            padding: '$3 $10',
            alignSelf: 'center',
            marginTop: '$4',
            marginBottom: '$8',
          }}
        /> */}

          <Info isCard columns={smallWindow ? 1 : 2}>
            <Text family="body" as="label">
              Criador
              <Creator>
                <AvatarWeb size="4xl" src={userCreator?.avatar?.url} />
                <div>
                  <Text family="body" as="label">
                    Nome
                    <Text>{userCreator?.name || 'Carregando...'}</Text>
                  </Text>
                  <Text family="body" as="label">
                    Nome de usuário
                    <Text>{userCreator?.username || 'Carregando...'}</Text>
                  </Text>
                  <Text family="body" as="label">
                    Email
                    <Text>{userCreator?.email || 'Carregando...'}</Text>
                  </Text>
                </div>
              </Creator>
            </Text>
            <Text family="body" as="label">
              Usuários com acesso: {project?.users.length}
              <Text family="body" as="label" height="shorter">
                A opção de alterar a permissão em breve estará disponível... Se
                precisar alterar, remova o usuário e o adicione novamente com a
                permissão desejada.
              </Text>
              <Info columns={smallWindow ? 1 : 2}>
                {allUsersWithAccess?.map((userWithAccess) => {
                  if (userWithAccess?.id !== userCreator?.id) {
                    return (
                      <CardUserWithAccess
                        key={userWithAccess.id}
                        userWithAccess={userWithAccess}
                        project={project}
                        setUnshare={setUnshare}
                        unshare={unshare}
                        handleUnshare={handleUnshare}
                      />
                    )
                  } else {
                    return ''
                  }
                })}
              </Info>
            </Text>
          </Info>

          <Info isCard columns={2}>
            <Text family="body" as="label">
              <header>Data de criação</header>
              <Text size="sm">{project?.createAt || 'Carregando...'}</Text>
            </Text>

            <Text family="body" as="label">
              <header>Ultima alteração</header>
              <Text size="sm">{project?.updateAt || 'Carregando...'}</Text>
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
                <UserFocus />
                Personagens
              </header>
              <Text>{personsOfProject?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Books />
                Livros
              </header>
              <Text>{booksOfProject?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Crosshair />
                Objetivos criados
              </header>
              <Text>{objects?.objectives.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <RainbowCloud />
                Sonhos criados
              </header>
              <Text>{objects?.dreams.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Warning />
                Medos criados
              </header>
              <Text>{objects?.fears.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Person />
                Aparências criadas
              </header>
              <Text>{objects?.appearance.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <UserCircleGear />
                Personalidades criadas
              </header>
              <Text>{objects?.personality.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Lightning />
                Poderes criados
              </header>
              <Text>{objects?.powers.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <HeartBreak />
                Traumas criados
              </header>
              <Text>{objects?.traumas.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <TreeStructure />
                Valores criados
              </header>
              <Text>{objects?.values.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <SketchLogo />
                Desejos criados
              </header>
              <Text>{objects?.wishes.length || 0}</Text>
            </Text>
          </Info>
        </SettingsProject>
      </ProjectPageLayout>
    </>
  )
}
