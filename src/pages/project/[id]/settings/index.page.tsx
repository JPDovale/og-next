import { IError } from '@@types/errors/IError'
import {
  IFeatures,
  IKeysOfFeatures,
} from '@api/responsesTypes/IProjectResponse'
import { SelectFeatures } from '@components/ProjectsComponents/SelectFeatures'
import { UsingThisFeatures } from '@components/ProjectsComponents/UsingThisFeatures'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { LabelInput } from '@components/usefull/LabelInput'
import { Text } from '@components/usefull/Text'
import { TimeChristSelect } from '@components/usefull/TimeChristSelelct'
import { ToastError } from '@components/usefull/ToastError'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/dist/client/router'
import { ArchiveBox, Pencil, Presentation, Timer, X } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { z, ZodError } from 'zod'

import { CardUserWithAccess } from './components/CardUserWithAccess'
import { Creator, SettingsProject } from './styles'

const initialDateSchema = z.coerce.number({
  invalid_type_error: 'Coloque apenas números',
})

export default function SettingsPage() {
  const [unshare, setUnshare] = useState('')
  const [name, setName] = useState('')
  const [timeChrist, setTimeChrist] = useState<'A.C.' | 'D.C.'>('D.C.')
  const [inUpdateFeatures, setInUpdateFeatures] = useState(false)
  const [featuresSet, setFeaturesSet] = useState<IFeatures | null>(null)
  const [initialDate, setInitialDate] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query

  usePreventBack(`/project/${id}`)

  const {
    loadingProject,
    callEvent,
    project,
    // personsThisProject,
    // booksThisProject,
    usersInProject,
    projectName,
    projectType,
    createdAt,
    updatedAt,
  } = useProject(id as string)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  function handleUnshare() {
    const userToRemove = usersInProject.find((user) => user.id === unshare)

    if (!userToRemove) return

    return callEvent.unshare(userToRemove.email)
  }

  async function handleUpdateNameProject() {
    await callEvent.updateName(name)
    setName('')
  }

  async function handleUpdateInitialDate() {
    try {
      const initialDateValidate = initialDateSchema.parse(initialDate)

      const { resolved, error } = await callEvent.updateInitialDate({
        initialDate: initialDateValidate,
        timeChrist,
      })

      if (error) {
        setError(error)
        return
      }

      if (resolved) {
        setInitialDate('')
        setError(null)
      }
    } catch (err) {
      if (err instanceof ZodError) {
        setError({
          title: 'Coloque apenas números.',
          message: 'Coloque apenas números.',
        })
      }
    }
  }

  function handleUpdateFeaturesChecked(
    featureName: IKeysOfFeatures,
    value: boolean,
  ) {
    if (!featuresSet) return
    const featuresValue = {
      ...featuresSet,
      [featureName]: value,
    }

    setFeaturesSet(featuresValue)
  }

  function handleEditModeFeatures() {
    setFeaturesSet(project!.features)

    setInUpdateFeatures(true)
  }

  async function handleUpdateFeatures() {
    if (!featuresSet) return

    const { resolved, error } = await callEvent.changeFeaturesUsing(featuresSet)

    if (error) {
      setError(error)
      return
    }

    if (resolved) {
      setFeaturesSet(null)
      setInUpdateFeatures(false)
    }
  }

  const isToShowInputInitialDate = inUpdateFeatures
    ? featuresSet?.timeLines
    : project?.features.timeLines

  return (
    <>
      <NextSeo title={`${projectName}-Configurações | Magiscrita`} noindex />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Configurações']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <SettingsProject>
          <ToastError error={error} setError={setError} />

          <ContainerGrid padding={6} darkBackground>
            <LabelInput label="Nome do projeto">
              <TextInputRoot size="sm">
                <TextInputIcon>
                  <Presentation />
                </TextInputIcon>

                <TextInputInput
                  placeholder={projectName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  value={name}
                />
              </TextInputRoot>
            </LabelInput>

            <ButtonRoot
              wid="hug"
              variant="noShadow"
              css={{ padding: '$3 $8' }}
              disabled={!name}
              onClick={handleUpdateNameProject}
            >
              <ButtonIcon>
                <ArchiveBox />
              </ButtonIcon>

              <ButtonLabel>Alterar</ButtonLabel>
            </ButtonRoot>
          </ContainerGrid>

          {isToShowInputInitialDate && (
            <ContainerGrid padding={6} darkBackground>
              <ContainerGrid
                padding={0}
                css={{ display: 'flex', alignItems: 'center' }}
              >
                <LabelInput label="Ano em que a história se passa">
                  <TextInputRoot
                    variant={
                      project?.initial_date === 'non-set' ? 'denied' : 'default'
                    }
                    size="sm"
                  >
                    <TextInputIcon>
                      <Timer />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder={project?.initial_date}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setInitialDate(e.target.value)
                      }
                      value={initialDate}
                    />
                  </TextInputRoot>
                </LabelInput>

                <InfoDefault
                  css={{ width: '15%' }}
                  title="Antes ou depois de Cristo?"
                >
                  <TimeChristSelect
                    value={timeChrist}
                    setValue={setTimeChrist}
                  />
                </InfoDefault>
              </ContainerGrid>
              <ButtonRoot
                wid="hug"
                variant="noShadow"
                css={{ padding: '$3 $8' }}
                disabled={
                  !initialDate &&
                  timeChrist === project?.initial_date_time_christ
                }
                onClick={handleUpdateInitialDate}
              >
                <ButtonIcon>
                  <ArchiveBox />
                </ButtonIcon>

                <ButtonLabel>Alterar</ButtonLabel>
              </ButtonRoot>
            </ContainerGrid>
          )}

          <ContainerGrid padding={6} darkBackground>
            <InfoDefault title="Usando os modelos de:">
              {inUpdateFeatures ? (
                <SelectFeatures
                  features={featuresSet!}
                  setFeature={handleUpdateFeaturesChecked}
                />
              ) : (
                <UsingThisFeatures features={project?.features} />
              )}
            </InfoDefault>

            <ContainerGrid css={{ display: 'flex', gap: '$4' }} padding={0}>
              <ButtonRoot
                wid="hug"
                variant="noShadow"
                css={{ padding: '$3 $8' }}
                onClick={
                  inUpdateFeatures
                    ? handleUpdateFeatures
                    : handleEditModeFeatures
                }
              >
                <ButtonIcon>
                  {inUpdateFeatures ? <ArchiveBox /> : <Pencil />}
                </ButtonIcon>

                <ButtonLabel>
                  {inUpdateFeatures ? 'Salvar' : 'Editar'}
                </ButtonLabel>
              </ButtonRoot>

              {inUpdateFeatures && (
                <ButtonRoot
                  wid="hug"
                  variant="noShadow"
                  css={{ padding: '$3 $8' }}
                  onClick={() => setInUpdateFeatures(false)}
                >
                  <ButtonIcon>
                    <X />
                  </ButtonIcon>

                  <ButtonLabel>Cancelar</ButtonLabel>
                </ButtonRoot>
              )}
            </ContainerGrid>
          </ContainerGrid>

          <ContainerGrid padding={6} darkBackground>
            <InfoDefault title="Tipo do projeto">
              <Text>{projectType}</Text>
              <Text family="body" as="label">
                Outros tipos de projetos estarão disponíveis em breve para os
                criadores do projeto...
              </Text>
            </InfoDefault>
          </ContainerGrid>

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

          <ContainerGrid
            columns={smallWindow ? 1 : 2}
            padding={6}
            darkBackground
          >
            <InfoDefault title="Criador do projeto">
              <Creator>
                <ContainerGrid>
                  <AvatarWeb
                    size="4xl"
                    src={project?.user.avatar_url ?? undefined}
                  />
                </ContainerGrid>
                <ContainerGrid padding={0}>
                  <InfoDefault title="Nome">
                    <Text>{project?.user.name || 'Carregando...'}</Text>
                  </InfoDefault>

                  <InfoDefault title="Nome de usuário">
                    <Text>{project?.user.username || 'Carregando...'}</Text>
                  </InfoDefault>

                  <InfoDefault title="Email">
                    <Text>{project?.user.email || 'Carregando...'}</Text>
                  </InfoDefault>
                </ContainerGrid>
              </Creator>
            </InfoDefault>

            <InfoDefault
              title={` Usuários com acesso: ${usersInProject.length}`}
            >
              <ContainerGrid padding={0}>
                <Text family="body" as="label" height="shorter">
                  A opção de alterar a permissão em breve estará disponível...
                  Se precisar alterar, remova o usuário e o adicione novamente
                  com a permissão desejada.
                </Text>

                <ContainerGrid columns={smallWindow ? 1 : 2} padding={0}>
                  {usersInProject?.map((userWithAccess) => {
                    if (userWithAccess?.id !== project?.user?.id) {
                      return (
                        <CardUserWithAccess
                          key={userWithAccess.id}
                          userWithAccess={userWithAccess}
                          project={project!}
                          setUnshare={setUnshare}
                          unshare={unshare}
                          handleUnshare={handleUnshare}
                        />
                      )
                    } else {
                      return ''
                    }
                  })}
                </ContainerGrid>
              </ContainerGrid>
            </InfoDefault>
          </ContainerGrid>

          <ContainerGrid padding={6} columns={2} darkBackground>
            <InfoDefault title="Hora de criação">
              <Text size="sm">{createdAt}</Text>
            </InfoDefault>

            <InfoDefault title="Ultima alteração">
              <Text size="sm">{updatedAt}</Text>
            </InfoDefault>
          </ContainerGrid>

          {/* <Info css={{ marginTop: '$6' }}>
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
          </Info> */}
        </SettingsProject>
      </ProjectPageLayout>
    </>
  )
}
