import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { Toast } from '@components/usefull/Toast'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/dist/client/router'
import {
  Books,
  ArchiveBox,
  Crosshair,
  HeartBreak,
  Lightning,
  Person,
  Presentation,
  RainbowCloud,
  SketchLogo,
  TreeStructure,
  UserCircleGear,
  UserFocus,
  Warning,
} from 'phosphor-react'
import { ChangeEvent, useContext, useState } from 'react'

import { CardUserWithAccess } from './components/CardUserWithAccess'
import { Creator, Info, SettingsProject } from './styles'

export default function SettingsPage() {
  const [unshare, setUnshare] = useState('')
  const [name, setName] = useState('')

  const { loading, unshareProject, error, updateNameProject, setError } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query

  usePreventBack(`/project/${id}`)

  const {
    project,
    personsThisProject,
    booksThisProject,
    creator,
    usersWithAccess,
    objectsCreatedInProject,
  } = useProject(id as string)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  function handleUnshare() {
    const userToRemove = usersWithAccess.find((u) => u.id === unshare)

    if (!userToRemove) return

    return unshareProject(userToRemove.email, project?.id)
  }

  async function handleUpdateNameProject() {
    await updateNameProject({ projectId: id as string, name })
    setName('')
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
          <Toast
            title={error?.title!}
            message={error?.message!}
            open={!!error}
            setOpen={() => setError(undefined)}
          />

          <Info isCard>
            <Text family="body" as="label">
              Nome
              <TextInputRoot>
                <TextInputIcon>
                  <Presentation />
                </TextInputIcon>

                <TextInputInput
                  placeholder={project?.name || 'Carregando...'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  value={name}
                />
              </TextInputRoot>
            </Text>
            <ButtonRoot
              wid="hug"
              css={{ padding: '$3 $8', marginTop: '$3', boxShadow: 'none' }}
              disabled={!name}
              onClick={handleUpdateNameProject}
            >
              <ButtonIcon>
                <ArchiveBox />
              </ButtonIcon>

              <ButtonLabel>Alterar</ButtonLabel>
            </ButtonRoot>
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

          {/* <ButtonRoot
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
                <AvatarWeb size="4xl" src={creator?.avatar?.url} />
                <div>
                  <Text family="body" as="label">
                    Nome
                    <Text>{creator?.name || 'Carregando...'}</Text>
                  </Text>
                  <Text family="body" as="label">
                    Nome de usuário
                    <Text>{creator?.username || 'Carregando...'}</Text>
                  </Text>
                  <Text family="body" as="label">
                    Email
                    <Text>{creator?.email || 'Carregando...'}</Text>
                  </Text>
                </div>
              </Creator>
            </Text>
            <Text family="body" as="div">
              Usuários com acesso: {project?.users.length}
              <Text family="body" as="label" height="shorter">
                A opção de alterar a permissão em breve estará disponível... Se
                precisar alterar, remova o usuário e o adicione novamente com a
                permissão desejada.
              </Text>
              <Info columns={smallWindow ? 1 : 2}>
                {usersWithAccess?.map((userWithAccess) => {
                  if (userWithAccess?.id !== creator?.id) {
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
              <Text>{personsThisProject?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Books />
                Livros
              </header>
              <Text>{booksThisProject?.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Crosshair />
                Objetivos criados
              </header>
              <Text>{objectsCreatedInProject?.objectives.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <RainbowCloud />
                Sonhos criados
              </header>
              <Text>{objectsCreatedInProject?.dreams.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Warning />
                Medos criados
              </header>
              <Text>{objectsCreatedInProject?.fears.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Person />
                Aparências criadas
              </header>
              <Text>{objectsCreatedInProject?.appearance.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <UserCircleGear />
                Personalidades criadas
              </header>
              <Text>{objectsCreatedInProject?.personality.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <Lightning />
                Poderes criados
              </header>
              <Text>{objectsCreatedInProject?.powers.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <HeartBreak />
                Traumas criados
              </header>
              <Text>{objectsCreatedInProject?.traumas.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <TreeStructure />
                Valores criados
              </header>
              <Text>{objectsCreatedInProject?.values.length || 0}</Text>
            </Text>

            <Text family="body" as="label">
              <header>
                <SketchLogo />
                Desejos criados
              </header>
              <Text>{objectsCreatedInProject?.wishes.length || 0}</Text>
            </Text>
          </Info>
        </SettingsProject>
      </ProjectPageLayout>
    </>
  )
}
