import { CardBook } from '@components/BooksComponents/CardBook'
import { CardPerson } from '@components/PersonsComponents/CardPerson'
import { PlotParts } from '@components/ProjectsComponents/PlotParts'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Loading } from '@components/usefull/Loading'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { Text } from '@components/usefull/Text'
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
// import { TimelineView } from '@components/TimelinesComponents/TimelineView'
import { InterfaceContext } from '@contexts/interface'
import { useProject } from '@hooks/useProject'

export default function ProjectPage() {
  usePreventBack('/projects')

  const [onEditImg, setOnEditImg] = useState(false)

  const { timelineIsOpen } = useContext(InterfaceContext)

  const router = useRouter()
  const { id } = router.query

  const {
    project,
    booksThisProject,
    personsThisProject,
    permission,
    loadingProject,
    projectName,
    projectType,
    createdAt,
    updatedAt,
    projectImage,
    usersInProject,
    callEvent,
  } = useProject(id as string)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786
  const largeWindow = windowSize.width! > 1700

  async function handleUpdateImage(files: FileList | null) {
    setOnEditImg(false)

    if (!files) return

    const file = files[0]

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    await callEvent.updateImage(file)
  }

  async function handleRemoveImage() {
    callEvent.removeImage()
    setOnEditImg(false)
  }

  // useEffect(() => {
  //   setLoading(false)
  // }, [setLoading])

  return (
    <>
      <NextSeo title={`${projectName} | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isTimelineInWindow={timelineIsOpen && !smallWindow}
        isScrolling
      >
        <HeaderProjectInfos>
          <ImageContainer>
            {loadingProject ? (
              <Loading />
            ) : !projectImage ? (
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
                src={projectImage}
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
            {projectImage && (
              <ButtonRoot
                type="button"
                wid="middle"
                align="center"
                onClick={handleRemoveImage}
              >
                <ButtonIcon>
                  <Trash />
                </ButtonIcon>

                <ButtonLabel>REMOVER</ButtonLabel>
              </ButtonRoot>
            )}
          </EditImgForm>
          <InfosContainer>
            <Infos>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Nome:
                </Text>
                <Text as="p" size="sm" weight="bold">
                  {projectName}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Tipo:
                </Text>
                <Text as="p" size="sm" weight="bold">
                  {projectType}
                </Text>
              </Info>
            </Infos>

            <Infos>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Criado:
                </Text>
                <Text as="p" size="sm" weight="bold">
                  {createdAt}
                </Text>
              </Info>

              <Info>
                <Text as="span" size="sm" family="body">
                  Última atualização:
                </Text>
                <Text as="p" size="sm" weight="bold">
                  {updatedAt}
                </Text>
              </Info>
            </Infos>

            <Infos columns={4}>
              <Info>
                <Text as="span" size="sm" family="body" height="shorter">
                  Usuários:
                </Text>
                <Text as="p" size="sm" weight="bold">
                  {usersInProject.length}
                </Text>
              </Info>

              {project?.features.books && (
                <Info>
                  <Text as="span" size="sm" family="body" height="shorter">
                    Livros:
                  </Text>
                  <Text as="p" size="sm" weight="bold">
                    {project?._count.books || 0}
                  </Text>
                </Info>
              )}

              {project?.features.powers && (
                <Info>
                  <Text as="span" size="sm" family="body" height="shorter">
                    Poderes:
                  </Text>
                  <Text as="p" size="sm" weight="bold">
                    Em breve
                  </Text>
                </Info>
              )}

              {project?.features.persons && (
                <Info>
                  <Text as="span" size="sm" family="body" height="shorter">
                    Personagens:
                  </Text>
                  <Text as="p" size="sm" weight="bold">
                    {project?._count.persons || 0}
                  </Text>
                </Info>
              )}
            </Infos>
          </InfosContainer>
        </HeaderProjectInfos>

        <PlotProjectContainer>
          {project?.features.books && (
            <>
              <HeadingPart
                onClick={() => router.push(`/project/${project?.id}/books`)}
              >
                <Books size={40} />
                Livros
              </HeadingPart>
              <BooksContainer isEmpty={!booksThisProject[0]}>
                {booksThisProject[0] ? (
                  booksThisProject.map((book) => (
                    <CardBook
                      key={book.id}
                      bookId={book?.id}
                      projectId={project?.id!}
                      isPreview
                    />
                  ))
                ) : (
                  <ListEmpty
                    message="Você ainda não criou nenhum livro para esse projeto."
                    icon={<Books size={48} />}
                  />
                )}
              </BooksContainer>
            </>
          )}

          {project?.features.plot && (
            <>
              <HeadingPart
                onClick={() => router.push(`/project/${project?.id}/plot`)}
              >
                <BookOpen size={40} />
                PLOT
              </HeadingPart>
              {loadingProject ? (
                <Loading />
              ) : (
                <PlotParts projectId={project?.id!} isPreview />
              )}
            </>
          )}

          {project?.features.persons && (
            <>
              <HeadingPart
                onClick={() => router.push(`/project/${project?.id}/persons`)}
              >
                <UserFocus size={40} />
                Personagens
              </HeadingPart>
              <PersonsContainer>
                {permission === 'edit' && (
                  <CardPerson personId={''} key="--" isAdd />
                )}

                {personsThisProject.map((person, i) => {
                  const index = permission === 'edit' ? i : i - 1

                  if (largeWindow && index >= 14) return null
                  if (!largeWindow && index >= 11) return null
                  if (smallWindow && index >= 5) return null
                  return <CardPerson key={person.id} personId={person.id} />
                })}
              </PersonsContainer>
            </>
          )}
        </PlotProjectContainer>

        {/* {timelineOfProject && !smallWindow && (
          <TimelineView timeline={timelineOfProject} />
        )} */}
      </ProjectPageLayout>
    </>
  )
}
