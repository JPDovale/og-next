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
} from '@api/responsesTypes/person/IPerson'
import { CardObjective } from '@components/PersonsComponents/CardObjective'
import { HeaderImageAndInfos } from '@components/usefull/HeaderImageAndInfos'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { ListEmpty } from '@components/usefull/ListEmpty'
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
import { Campu } from './components/Campu'
import {
  History,
  HistoryContent,
  ObjectContainer,
  ObjectivesContent,
} from './styles'

export default function PersonPage() {
  const router = useRouter()
  const { id, personId } = router.query
  usePreventBack(`/project/${id}/persons`)

  const { project, permission, projectName } = useProject(id as string)
  const { person, personInfos, personName, loadingPerson, callEvent } =
    usePerson(personId as string)

  async function handleUpdateImage(files: FileList | null): Promise<void> {
    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await callEvent.updateImage(file)
  }

  async function handleDeleteImage(id: string) {
    callEvent.deleteImage()
    return true
  }

  return (
    <>
      <NextSeo title={`${personName} | Magiscrita`} noindex />
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
          url={person?.image.url}
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
            {person?.collections.objective.itens &&
            person?.collections.objective.itens[0] ? (
              person?.collections.objective.itens?.map((objective) => {
                return (
                  <CardObjective
                    key={objective.id}
                    objective={objective}
                    avoiders={objective.collections.avoider.itens}
                    supporters={objective.collections.supporter.itens}
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
          objectOfCampu={
            person?.collections.personality.itens as IPersonality[]
          }
          withSubObjects="consequências"
          columns={2}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<TreeStructure size={40} />}
          title="Valores"
          keyIndex="values"
          objectOfCampu={person?.collections.value.itens as IValue[]}
          withSubObjects="exceções"
          columns={2}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<HeartBreak size={40} />}
          title="Traumas"
          keyIndex="traumas"
          objectOfCampu={person?.collections.trauma.itens as ITrauma[]}
          withSubObjects="consequências"
          columns={2}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<Person size={40} />}
          title="Aparência"
          keyIndex="appearance"
          objectOfCampu={person?.collections.appearance.itens as IAppearance[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<RainbowCloud size={48} />}
          title="Sonhos"
          keyIndex="dreams"
          objectOfCampu={person?.collections.dream.itens as IDream[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<Warning size={40} />}
          title="Medos"
          keyIndex="fears"
          objectOfCampu={person?.collections.fear.itens as IFear[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<SketchLogo size={40} />}
          title="Desejos"
          keyIndex="wishes"
          objectOfCampu={person?.collections.wishe.itens as IWishe[]}
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<Users size={40} />}
          title="Casais"
          keyIndex="couples"
          objectOfCampu={person?.collections.couple.itens as ICouple[]}
          isUniqueRelational
        />

        <Campu
          isLoading={loadingPerson}
          permission={permission}
          icon={<Lightning size={40} />}
          title="poderes"
          keyIndex="powers"
          objectOfCampu={person?.collections.power.itens as IPower[]}
        />
      </ProjectPageLayout>
    </>
  )
}
