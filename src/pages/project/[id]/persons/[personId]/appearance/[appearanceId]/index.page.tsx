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
import { Person } from 'phosphor-react'

export default function AppearancePage() {
  const router = useRouter()
  const { id, personId, appearanceId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, findAppearance, loadingPerson, callEvent } =
    usePerson(personId as string)
  const { appearance } = findAppearance(appearanceId as string)

  async function handleCommentInAppearance(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await callEvent.commentInPerson({
      toObjectId: appearance?.id ?? '',
      comment: {
        content: newComment.content,
        commentIn: 'appearance',
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
      <NextSeo
        title={`${personName}-${appearance?.title} | Magiscrita`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Aparências',
          appearance?.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<Person size={40} />}
            label="Aparência"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/appearance/${appearanceId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {appearance?.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {appearance?.description}
              </Text>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {appearance?.created_at
                  ? getDate(appearance?.created_at)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInAppearance}
          permission={permission}
          comments={appearance?.comments}
          onResponseIntersect={handleResponseComment}
        />
        {/* <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={appearanceId === 'new'}
          editorTo={keysAppearance.label}
          projectId={project?.id}
          personId={person?.id!}
          object={appearance}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysAppearance.keyPath}
          comments={commentsInThisAppearance}
        /> */}
      </ProjectPageLayout>
    </>
  )
}
