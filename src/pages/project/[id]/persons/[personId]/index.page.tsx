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
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
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
  const { updateImageFromPerson, deleteImagePerson } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId } = router.query
  usePreventBack(`/project/${id}/persons`)

  const { project, permission, projectName } = useProject(id as string)
  const { person, personInfos, personName, loadingPerson } = usePerson(
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
      <NextSeo title={`${personName} | Ognare`} noindex />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`]}
        loading={loadingPerson}
        inError={!loadingPerson && (!project?.id || !person?.name)}
        isScrolling
      >
        <HeaderImageAndInfos
          idObject={person?.id as string}
          onUpdateCalled={handleUpdateImage}
          onRemoveCalled={handleDeleteImage}
          url={person?.image_url ?? undefined}
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

          <HistoryContent
            dangerouslySetInnerHTML={{ __html: person?.history! }}
          />
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
            {person?.objectives && person?.objectives[0] ? (
              person?.objectives?.map((objective) => {
                return (
                  <CardObjective
                    permission={permission}
                    key={objective.id}
                    objective={objective}
                    avoiders={objective.avoiders?.persons ?? []}
                    supporters={objective.supporters?.persons ?? []}
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
          isLoading={loadingPerson}
          permission={permission}
          icon={<UserCircleGear size={40} />}
          title="Personalidade"
          keyIndex="personality"
          objectOfCampu={person?.personalities as IPersonality[]}
          withSubObjects="consequências"
          columns={2}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<TreeStructure size={40} />}
          title="Valores"
          keyIndex="values"
          objectOfCampu={person?.values as IValue[]}
          withSubObjects="exceções"
          columns={2}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<HeartBreak size={40} />}
          title="Traumas"
          keyIndex="traumas"
          objectOfCampu={person?.traumas as ITrauma[]}
          withSubObjects="consequências"
          columns={2}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<Person size={40} />}
          title="Aparência"
          keyIndex="appearance"
          objectOfCampu={person?.appearances as IAppearance[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<RainbowCloud size={48} />}
          title="Sonhos"
          keyIndex="dreams"
          objectOfCampu={person?.dreams as IDream[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<Warning size={40} />}
          title="Medos"
          keyIndex="fears"
          objectOfCampu={person?.fears as IFear[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<SketchLogo size={40} />}
          title="Desejos"
          keyIndex="wishes"
          objectOfCampu={person?.wishes as IWishe[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<Users size={40} />}
          title="Casais"
          keyIndex="couples"
          objectOfCampu={person?.couples as ICouple[]}
          isUniqueRelational
        />

        <Campu
          isLoading={loadingPerson}
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
