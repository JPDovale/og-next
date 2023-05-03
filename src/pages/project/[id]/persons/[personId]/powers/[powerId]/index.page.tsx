import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { getDate } from '@utils/dates/getDate'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Lightning } from 'phosphor-react'
import { useContext } from 'react'

export default function PowerPage() {
  const { commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, powerId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, loadingPerson, personName, findPower } = usePerson(
    personId as string,
  )
  const { power } = findPower(powerId as string)

  async function handleCommentInPower(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo title={`${personName}-${power?.title} | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Poderes',
          power?.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<Lightning size={40} />}
            label="Poder"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/powers/${powerId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {power?.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {power?.description}
              </Text>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {power?.created_at
                  ? getDate(power?.created_at)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInPower}
          permission={permission}
          comments={power?.comments}
        />

        {/* <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={powerId === 'new'}
          editorTo={keysPower.label}
          projectId={project?.id}
          personId={person?.id!}
          object={power}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysPower.keyPath}
          comments={commentsInThisPower}
        /> */}
      </ProjectPageLayout>
    </>
  )
}
