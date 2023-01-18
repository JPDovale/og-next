import { Button, Text } from '@og-ui/react'
import { NextSeo } from 'next-seo'
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

  const {
    projects,
    loading,
    persons,
    updateImageFromPerson,
    deleteImagePerson,
  } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const person = persons.find((person) => person?.id === personId)
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const historyLineBreaks = person?.history.split('\n')

  async function handleUpdateImage(files: FileList | null) {
    setOnEditImg(false)

    if (!files) return

    setOnEditImg(false)
    setOnUpdateImg(true)
    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return ''

    await updateImageFromPerson(personId as string, file)
    setOnUpdateImg(false)
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
        <HeaderPersonInfos>
          {onUpdateImg ? (
            <div className="image">
              <Loading />
            </div>
          ) : !person?.image?.url ? (
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
              src={person?.image.url}
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
              {person?.image?.url && (
                <Button
                  type="button"
                  icon={<Trash />}
                  wid="middle"
                  align="center"
                  label="REMOVER"
                  onClick={() => {
                    deleteImagePerson({ personId: person?.id! })
                    setOnEditImg(false)
                  }}
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
                  {person?.name || 'Carregando...'} {person?.lastName}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Idade:
                </Text>
                <Text as="p" size="sm">
                  {`${person?.age} anos` || 'Carregando...'}
                </Text>
              </Info>
            </Infos>

            <Infos>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Criado:
                </Text>
                <Text as="p" size="sm">
                  {person?.createAt || 'Carregando...'}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Última atualização:
                </Text>
                <Text as="p" size="sm">
                  {person?.updateAt || 'Carregando...'}
                </Text>
              </Info>
            </Infos>

            <Infos columns={4}>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Objetivos:
                </Text>
                <Text as="p" size="sm">
                  {person?.objectives.length || 0}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Personalidade:
                </Text>
                <Text as="p" size="sm">
                  {person?.personality.length || 0}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Valores:
                </Text>
                <Text as="p" size="sm">
                  {person?.values.length || 0}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Traumas:
                </Text>
                <Text as="p" size="sm">
                  {person?.traumas.length || 0}
                </Text>
              </Info>
            </Infos>

            <Infos columns={4}>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Aparência:
                </Text>
                <Text as="p" size="sm">
                  {person?.appearance.length || 0}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Sonhos:
                </Text>
                <Text as="p" size="sm">
                  {person?.dreams.length || 0}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Medos:
                </Text>
                <Text as="p" size="sm">
                  {person?.fears.length || 0}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Desejos:
                </Text>
                <Text as="p" size="sm">
                  {person?.wishes.length || 0}
                </Text>
              </Info>
            </Infos>

            <Infos columns={4}>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Casais:
                </Text>
                <Text as="p" size="sm">
                  {person?.couples.length || 0}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Poderes:
                </Text>
                <Text as="p" size="sm">
                  {person?.powers.length || 0}
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
          <HistoryContent>
            {historyLineBreaks?.map((line) => {
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
            {person?.objectives && person?.objectives[0] ? (
              person?.objectives.map((objective) => {
                const avoiders = persons.filter((person) => {
                  const isAvoider = !!objective.avoiders.find(
                    (avoider) => avoider === person?.id,
                  )

                  return isAvoider
                })

                const supporters = persons.filter((person) => {
                  const isSupporter = !!objective.supporting.find(
                    (support) => support === person?.id,
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
