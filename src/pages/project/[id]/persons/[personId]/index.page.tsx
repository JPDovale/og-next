import {
  IAppearance,
  ICouple,
  IDream,
  IFear,
  IPersonality,
  IPower,
  ITrauma,
  IValue,
  IWishe,
} from '@api/responsesTypes/IPersonsResponse'
import { CardObjective } from '@components/PersonsComponents/CardObjective'
import { HeaderImageAndInfos } from '@components/usefull/HeaderImageAndInfos'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { Text } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  Crosshair,
  HeartBreak,
  Lightning,
  Person,
  Quotes,
  RainbowCloud,
  SketchLogo,
  TreeStructure,
  UserCircleGear,
  Users,
  Warning,
} from 'phosphor-react'
import { useContext } from 'react'
import { Campu } from './components/Campu'
import {
  History,
  HistoryContent,
  ObjectContainer,
  ObjectivesContent,
} from './styles'

export default function PersonPage() {
  const { loading, updateImageFromPerson, deleteImagePerson } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId } = router.query
  usePreventBack(`/project/${id}/persons`)

  const { project, permission, usePerson } = useProject(id as string)
  const { person, historyPersons, objectives, personInfos } = usePerson(
    personId as string,
  )

  async function handleUpdateImage(files: FileList | null): Promise<void> {
    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await updateImageFromPerson(personId as string, file)
  }

  async function handleDeleteImage(id: string) {
    return deleteImagePerson({ personId: id })
  }

  return (
    <>
      <NextSeo title={`${person?.name || 'Carregando...'} | Ognare`} noindex />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Personagens', `${person?.name || 'Carregando...'}`]}
        loading={loading}
        inError={!loading && (!project?.id || !person?.name)}
        isScrolling
      >
        <HeaderImageAndInfos
          idObject={person?.id as string}
          onUpdateCalled={handleUpdateImage}
          onRemoveCalled={handleDeleteImage}
          url={person?.image?.url}
          pathGoBack={`/project/${id}/persons`}
          permission={permission}
          allInfos={personInfos}
        />

        <History>
          <HeadingPart
            label="História"
            icon={<Quotes size={40} />}
            permission={permission}
            customFunctionOnClickSideButton={() =>
              router.push(`/project/${id}/persons/${personId}/edit`)
            }
            isToEdit
          />
          <HistoryContent>
            {historyPersons?.map((line) => {
              if (line) {
                return (
                  <Text family="body" key={line}>
                    {line}
                  </Text>
                )
              }

              return null
            }) || <Text family="body">Carregando...</Text>}
          </HistoryContent>
        </History>

        <ObjectContainer>
          <HeadingPart
            label="Objetivos"
            icon={<Crosshair size={40} />}
            permission={permission}
            redirectPathToAdd={`/project/${id}/persons/${personId}/objectives/new`}
            isToAdd
          />

          <ObjectivesContent>
            {objectives && objectives[0] ? (
              objectives.map((objective) => {
                return (
                  <CardObjective
                    permission={permission}
                    key={objective.id}
                    objective={objective.objectiveDefault}
                    avoiders={objective.avoiders}
                    supporters={objective.supporting}
                  />
                )
              })
            ) : (
              <ListEmpty
                icon={<Crosshair size={48} />}
                message="Nenhum objetivo foi adicionado ainda"
              />
            )}
          </ObjectivesContent>
        </ObjectContainer>

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<UserCircleGear size={40} />}
          title="Personalidade"
          keyIndex="personality"
          objectOfCampu={person?.personality as IPersonality[]}
          withSubObjects="consequências"
          columns={2}
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<TreeStructure size={40} />}
          title="Valores"
          keyIndex="values"
          objectOfCampu={person?.values as IValue[]}
          withSubObjects="exceções"
          columns={2}
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<HeartBreak size={40} />}
          title="Traumas"
          keyIndex="traumas"
          objectOfCampu={person?.traumas as ITrauma[]}
          withSubObjects="consequências"
          columns={2}
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<Person size={40} />}
          title="Aparência"
          keyIndex="appearance"
          objectOfCampu={person?.appearance as IAppearance[]}
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<RainbowCloud size={48} />}
          title="Sonhos"
          keyIndex="dreams"
          objectOfCampu={person?.dreams as IDream[]}
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<Warning size={40} />}
          title="Medos"
          keyIndex="fears"
          objectOfCampu={person?.fears as IFear[]}
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<SketchLogo size={40} />}
          title="Desejos"
          keyIndex="wishes"
          objectOfCampu={person?.wishes as IWishe[]}
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<Users size={40} />}
          title="Casais"
          keyIndex="couples"
          objectOfCampu={person?.couples as ICouple[]}
          isUniqueRelational
        />

        <Campu
          isLoading={loading}
          permission={permission}
          icon={<Lightning size={40} />}
          title="poderes"
          keyIndex="powers"
          objectOfCampu={person?.powers as IPower[]}
        />
      </ProjectPageLayout>
    </>
  )
}
