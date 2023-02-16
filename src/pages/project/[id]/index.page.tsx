import { Button, Text } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  BookOpen,
  Books,
  Image as ImageIco,
  Pencil,
  Trash,
  UserFocus,
} from 'phosphor-react'
import { useContext, useState } from 'react'
import { IPersonsResponse } from '../../../api/responsesTypes/IPersonsResponse'
import { CardBook } from '../../../components/BooksComponents/CardBook'
import { CardPerson } from '../../../components/CardPerson'
import { ListEmpty } from '../../../components/ListEmpty'
import { Loading } from '../../../components/Loading'
import { PlotParts } from '../../../components/PlotParts'
import { ProjectsContext } from '../../../contexts/projects'
import { usePreventBack } from '../../../hooks/usePreventDefaultBack'
import { useProject } from '../../../hooks/useProject'
import { useWindowSize } from '../../../hooks/useWindow'
import { ProjectPageLayout } from '../../../layouts/ProjectPageLayout'
import {
  BooksContainer,
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

  const { updateImageProject, loading, deleteImageProject } =
    useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query

  const { project, booksThisProject, personsThisProject, permission } =
    useProject(id as string)

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
                  {booksThisProject?.length || 0}
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
            onClick={() => router.push(`/project/${project.id}/books`)}
          >
            <Books size={40} />
            Livros
          </HeadingPart>
          <BooksContainer isEmpty={!booksThisProject[0]}>
            {booksThisProject[0] ? (
              booksThisProject.map((book) => (
                <CardBook key={book.id} book={book} isPreview />
              ))
            ) : (
              <ListEmpty
                message="Você ainda não criou nenhum livro para esse projeto."
                icon={<Books size={48} />}
              />
            )}
          </BooksContainer>

          <HeadingPart
            onClick={() => router.push(`/project/${project.id}/plot`)}
          >
            <BookOpen size={40} />
            PLOT
          </HeadingPart>
          {loading ? <Loading /> : <PlotParts project={project} isPreview />}

          <HeadingPart
            onClick={() => router.push(`/project/${project.id}/persons`)}
          >
            <UserFocus size={40} />
            Personagens
          </HeadingPart>
          <PersonsContainer>
            {permission === 'edit' && (
              <CardPerson person={{} as IPersonsResponse} key="--" isAdd />
            )}

            {personsThisProject.map((person, i) => {
              const index = permission === 'edit' ? i : i - 1

              if (largeWindow && index >= 14) return null
              if (!largeWindow && index >= 11) return null
              if (smallWindow && index >= 5) return null
              return <CardPerson key={person.id} person={person} />
            })}
          </PersonsContainer>
        </PlotProjectContainer>
      </ProjectPageLayout>
    </>
  )
}
