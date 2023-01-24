import { Button, Text } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  BookOpen,
  Image as ImageIco,
  Pencil,
  Trash,
  UserFocus,
} from 'phosphor-react'
import { useContext, useState } from 'react'
import { IPersonsResponse } from '../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../api/responsesTypes/IProjcetResponse'
import { CardPerson } from '../../components/CardPerson'
import { Loading } from '../../components/Loading'
import { PlotParts } from '../../components/PlotParts'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'
import { usePreventBack } from '../../hooks/usePreventDefaultBack'
import { useWindowSize } from '../../hooks/useWindow'
import { ProjectPageLayout } from '../../layouts/ProjectPageLayout'
import {
  EditImgForm,
  HeaderProjectInfos,
  HeadingPart,
  ImageContainer,
  Info,
  Infos,
  InfosContainer,
  Input,
  PersonsContainer,
  PlotProjectContainer,
} from './styles'

export default function ProjectPage() {
  usePreventBack('/projects')

  const [onEditImg, setOnEditImg] = useState(false)

  const { projects, updateImageProject, persons, loading, deleteImageProject } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects?.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const personsThisProject = persons?.filter(
    (person) => person.defaultProject === project?.id,
  )
  const permissionThisUserInProject = project?.users.find(
    (u) => user?.id === u.id,
  )?.permission

  const windowSize = useWindowSize()

  const smallWindow = windowSize.width! < 786
  const largeWindow = windowSize.width! > 1700

  async function handleUpdateImage(files: FileList | null) {
    setOnEditImg(false)

    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await updateImageProject(id as string, file)
  }

  return (
    <>
      <NextSeo title={`${project?.name || 'Carregando...'} | Ognare`} noindex />

      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        loading={loading}
        inError={!loading && !project?.name}
        isScrolling
      >
        <HeaderProjectInfos>
          <ImageContainer>
            {loading ? (
              <Loading />
            ) : !project?.image?.url ? (
              <ImageIco
                className="image"
                weight="thin"
                size={128}
                alt=""
                onClick={() => setOnEditImg(!onEditImg)}
              />
            ) : (
              <Image
                priority
                width={400}
                height={400}
                className="image"
                src={project?.image?.url}
                alt=""
                onClick={() => setOnEditImg(!onEditImg)}
              />
            )}
          </ImageContainer>
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
            {project?.image?.url && (
              <Button
                type="button"
                icon={<Trash />}
                wid="middle"
                align="center"
                label="REMOVER"
                onClick={() => {
                  deleteImageProject({ projectId: project.id! })
                  setOnEditImg(false)
                }}
              />
            )}
          </EditImgForm>
          <InfosContainer>
            <Infos>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Nome:
                </Text>
                <Text as="p" size="sm">
                  {project?.name || 'Carregando...'}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Tipo:
                </Text>
                <Text as="p" size="sm">
                  {project?.type || 'Carregando...'}
                </Text>
              </Info>
            </Infos>

            <Infos>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Criado:
                </Text>
                <Text as="p" size="sm">
                  {project?.createAt || 'Carregando...'}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body">
                  Última atualização:
                </Text>
                <Text as="p" size="sm">
                  {project?.updateAt || 'Carregando...'}
                </Text>
              </Info>
            </Infos>

            <Infos columns={4}>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Usuários:
                </Text>
                <Text as="p" size="sm">
                  {project?.users?.length || 0}
                </Text>
              </Info>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Livros:
                </Text>
                <Text as="p" size="sm">
                  Em breve
                </Text>
              </Info>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Poderes:
                </Text>
                <Text as="p" size="sm">
                  Em breve
                </Text>
              </Info>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Personagens:
                </Text>
                <Text as="p" size="sm">
                  {personsThisProject?.length || 0}
                </Text>
              </Info>
            </Infos>
          </InfosContainer>
        </HeaderProjectInfos>
        <PlotProjectContainer>
          <HeadingPart
            size="md"
            onClick={() => router.push(`/project/${project.id}/plot`)}
          >
            <BookOpen size={40} />
            PLOT
          </HeadingPart>
          {loading ? <Loading /> : <PlotParts project={project} isPreview />}
          <HeadingPart
            size="md"
            onClick={() => router.push(`/project/${project.id}/persons`)}
          >
            <UserFocus size={40} />
            Personagens
          </HeadingPart>
          <PersonsContainer>
            {permissionThisUserInProject === 'edit' && (
              <CardPerson person={{} as IPersonsResponse} key="--" isAdd />
            )}

            {personsThisProject.map((person, i) => {
              const index = permissionThisUserInProject === 'edit' ? i : i - 1

              if (largeWindow && index >= 7) return null
              if (!largeWindow && index >= 5) return null
              if (smallWindow && index >= 3) return null
              return <CardPerson key={person.id} person={person} />
            })}
          </PersonsContainer>
        </PlotProjectContainer>
      </ProjectPageLayout>
    </>
  )
}
