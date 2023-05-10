import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { getDate } from '@utils/dates/getDate'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { SketchLogo } from 'phosphor-react'

export default function WishePage() {
  const router = useRouter()
  const { id, personId, wisheId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, findWishe, loadingPerson, callEvent } = usePerson(
    personId as string,
  )
  const { wishe } = findWishe(wisheId as string)

  async function handleCommentInWishe(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await callEvent.commentInPerson({
      toObjectId: wishe?.id ?? '',
      comment: {
        content: newComment.content,
        commentIn: 'wishe',
      },
    })
  }

  async function handleResponseComment(
    newResponse: ICreateCommentDTO,
    commentId: string,
  ) {
    await callEvent.responseCommentInPerson({
      content: newResponse.content,
      commentId,
    })
  }

  return (
    <>
      <NextSeo title={`${personName}-${wishe?.title} | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Desejos',
          wishe?.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<SketchLogo size={40} />}
            label="Desejo"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/wishes/${wisheId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {wishe?.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {wishe?.description}
              </Text>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {wishe?.created_at
                  ? getDate(wishe?.created_at)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInWishe}
          permission={permission}
          comments={wishe?.comments}
          onResponseIntersect={handleResponseComment}
        />
        {/* <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={wisheId === 'new'}
          editorTo={keysWishe.label}
          projectId={project?.id}
          personId={person?.id!}
          object={wishe}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysWishe.keyPath}
          comments={commentsInThisWishe}
        /> */}
      </ProjectPageLayout>
    </>
  )
}
