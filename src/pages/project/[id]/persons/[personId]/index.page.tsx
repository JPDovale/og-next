import { Button, Text } from '@og-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  CaretCircleDoubleLeft,
  Crosshair,
  HeartBreak,
  Image as ImageIco,
  Lightning,
  Pencil,
  PencilCircle,
  Person,
  PlusCircle,
  Quotes,
  RainbowCloud,
  SketchLogo,
  Trash,
  TreeStructure,
  UserCircleGear,
  Users,
  Warning,
} from 'phosphor-react'
import { useContext, useState } from 'react'
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
} from '../../../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { CardObjective } from '../../../../../components/CardObjective'
import { Error } from '../../../../../components/Error'
import { ListEmpty } from '../../../../../components/ListEmpty'
import { Loading } from '../../../../../components/Loading'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'
import { Campu } from './components/Campu'
import {
  EditImgForm,
  HeaderPersonInfos,
  HeadingPart,
  History,
  HistoryContent,
  Info,
  Infos,
  InfosContainer,
  Input,
  ObjectContainer,
  ObjectivesContent,
} from './styles'

export default function PersonPage() {
  const [onEditImg, setOnEditImg] = useState(false)
  const [onUpdateImg, setOnUpdateImg] = useState(false)

  const { projects, loading, persons, updateImageFromPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId } = router.query

  if (loading) return <Loading />
  if (!projects) return <Error />

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  if (!project || !persons) return <Error />

  const person = persons.find((person) => person.id === personId)
  const permission = project.users.find((u) => u.id === user?.id)?.permission

  if (!person) return <Error />

  async function handleUpdateImage(files: FileList | null) {
    if (!files) return setOnEditImg(false)

    setOnEditImg(false)
    setOnUpdateImg(true)
    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return ''

    await updateImageFromPerson(personId as string, file)
    setOnUpdateImg(false)
  }

  return (
    <ProjectPageLayout
      projectName={project.name}
      projectId={`${id}`}
      paths={['Personagens', `${person?.name}`]}
      loading={loading}
      isScrolling
    >
      <HeaderPersonInfos>
        {onUpdateImg ? (
          <div className="image">
            <Loading />
          </div>
        ) : !person.image ? (
          <ImageIco
            className="image"
            weight="thin"
            size={64}
            alt=""
            onClick={() => setOnEditImg(!onEditImg)}
          />
        ) : (
          <Image
            className="image"
            src={person.image.url}
            alt=""
            onClick={() => setOnEditImg(!onEditImg)}
            height={800}
            width={800}
            priority
          />
        )}

        {permission === 'edit' && (
          <EditImgForm visible={onEditImg} encType="multipart/form-data">
            <Input htmlFor="file">
              <Pencil />
              EDITAR
              <input
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  handleUpdateImage(e.target.files)
                }}
              />
            </Input>
            {project.image && (
              <Button
                type="button"
                icon={<Trash />}
                wid="middle"
                align="center"
                label="REMOVER"
              />
            )}
          </EditImgForm>
        )}

        <InfosContainer>
          <Button
            type="button"
            className="goBack"
            wid="hug"
            icon={<CaretCircleDoubleLeft weight="bold" />}
            onClick={() => router.replace(`/project/${id}/persons`)}
          />

          <Infos>
            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Nome:
              </Text>
              <Text as="p" size="sm">
                {person.name} {person.lastName}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Idade:
              </Text>
              <Text as="p" size="sm">
                {person.age} anos
              </Text>
            </Info>
          </Infos>

          <Infos>
            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Criado:
              </Text>
              <Text as="p" size="sm">
                {person.createAt}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Última atualização:
              </Text>
              <Text as="p" size="sm">
                {person.updateAt}
              </Text>
            </Info>
          </Infos>

          <Infos columns={4}>
            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Objetivos:
              </Text>
              <Text as="p" size="sm">
                {person.objectives.length}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Personalidade:
              </Text>
              <Text as="p" size="sm">
                {person.personality.length}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Valores:
              </Text>
              <Text as="p" size="sm">
                {person.values.length}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Traumas:
              </Text>
              <Text as="p" size="sm">
                {person.traumas.length}
              </Text>
            </Info>
          </Infos>

          <Infos columns={4}>
            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Aparência:
              </Text>
              <Text as="p" size="sm">
                {person.appearance.length}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Sonhos:
              </Text>
              <Text as="p" size="sm">
                {person.dreams.length}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Medos:
              </Text>
              <Text as="p" size="sm">
                {person.fears.length}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Desejos:
              </Text>
              <Text as="p" size="sm">
                {person.wishes.length}
              </Text>
            </Info>
          </Infos>

          <Infos columns={4}>
            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Casais:
              </Text>
              <Text as="p" size="sm">
                {person.couples.length}
              </Text>
            </Info>

            <Info>
              <Text as="span" size="sm" family="body" height="shorter">
                Poderes:
              </Text>
              <Text as="p" size="sm">
                {person.powers.length}
              </Text>
            </Info>
          </Infos>
        </InfosContainer>
      </HeaderPersonInfos>

      <History>
        <HeadingPart size="sm">
          <Quotes size={40} />
          História
          {permission === 'edit' && (
            <PencilCircle
              size={40}
              onClick={() =>
                router.replace(`/project/${id}/persons/${personId}/edit`)
              }
            />
          )}
        </HeadingPart>
        <HistoryContent>{person.history}</HistoryContent>
      </History>

      <ObjectContainer>
        <HeadingPart size="sm">
          <Crosshair size={40} />
          Objetivos:
          {permission === 'edit' && (
            <PlusCircle
              size={40}
              onClick={() =>
                router.replace(
                  `/project/${id}/persons/${personId}/objectives/${'new'}`,
                )
              }
            />
          )}
        </HeadingPart>

        <ObjectivesContent>
          {person.objectives && person.objectives[0] ? (
            person.objectives.map((objective) => {
              const avoiders = persons.filter((person) => {
                const isAvoider = !!objective.avoiders.find(
                  (avoider) => avoider === person.id,
                )

                return isAvoider
              })

              const supporters = persons.filter((person) => {
                const isSupporter = !!objective.supporting.find(
                  (support) => support === person.id,
                )

                return isSupporter
              })

              return (
                <CardObjective
                  permission={permission}
                  key={objective.id}
                  objective={objective}
                  avoiders={avoiders}
                  supporters={supporters}
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
        permission={permission}
        icon={<UserCircleGear size={40} />}
        title="Personalidade"
        keyIndex="personality"
        objectOfCampu={person.personality as IPersonality[]}
        withSubObjects="consequências"
        columns={2}
      />

      <Campu
        permission={permission}
        icon={<TreeStructure size={40} />}
        title="Valores"
        keyIndex="values"
        objectOfCampu={person.values as IValue[]}
        withSubObjects="exceções"
        columns={2}
      />

      <Campu
        permission={permission}
        icon={<HeartBreak size={40} />}
        title="Traumas"
        keyIndex="traumas"
        objectOfCampu={person.traumas as ITrauma[]}
        withSubObjects="consequências"
        columns={2}
      />

      <Campu
        permission={permission}
        icon={<Person size={40} />}
        title="Aparência"
        keyIndex="appearance"
        objectOfCampu={person.appearance as IAppearance[]}
      />

      <Campu
        permission={permission}
        icon={<RainbowCloud size={48} />}
        title="Sonhos"
        keyIndex="dreams"
        objectOfCampu={person.dreams as IDream[]}
      />

      <Campu
        permission={permission}
        icon={<Warning size={40} />}
        title="Medos"
        keyIndex="fears"
        objectOfCampu={person.fears as IFear[]}
      />

      <Campu
        permission={permission}
        icon={<SketchLogo size={40} />}
        title="Desejos"
        keyIndex="wishes"
        objectOfCampu={person.wishes as IWishe[]}
      />

      <Campu
        permission={permission}
        icon={<Users size={40} />}
        title="Casais"
        keyIndex="couples"
        objectOfCampu={person.couples as ICouple[]}
        isUniqueRelational
      />

      <Campu
        permission={permission}
        icon={<Lightning size={40} />}
        title="poderes"
        keyIndex="powers"
        objectOfCampu={person.powers as IPower[]}
      />
    </ProjectPageLayout>
  )
}
