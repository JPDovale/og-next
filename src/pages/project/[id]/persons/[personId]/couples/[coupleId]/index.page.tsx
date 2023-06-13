import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { AvatarWeb } from '@components/usefull/Avatar'
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
import { Users } from 'phosphor-react'

export default function CouplePage() {
  const router = useRouter()
  const { id, personId, coupleId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, findCouple, loadingPerson, callEvent } =
    usePerson(personId as string)
  const { couple } = findCouple(coupleId as string)

  async function handleCommentInCouple(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await callEvent.commentInPerson({
      toObjectId: couple?.id ?? '',
      comment: {
        content: newComment.content,
        commentIn: 'couple',
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
        title={`${personName}-${couple?.infos.title}  | Magiscrita`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Casais',
          couple?.infos.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<Users size={40} />}
            label="Casal"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}persons/${personId}/couples/${coupleId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {couple?.infos.title}
              </Text>
            </InfoDefault>

            <InfoDefault size="lg" title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {couple?.infos.description}
              </Text>
            </InfoDefault>

            <InfoDefault size="lg" title="Casal:">
              <Text
                family="body"
                size="xl"
                height="shorter"
                weight="bold"
                onClick={() =>
                  router.push(
                    `/project/${id}/persons/${couple?.collections.couple.id}`,
                  )
                }
              >
                <ContainerGrid padding={0} css={{ display: 'flex' }}>
                  <AvatarWeb
                    size="4xl"
                    src={couple?.collections.couple.image.url}
                    isClickable
                  />
                  <ContainerGrid padding={0}>
                    <InfoDefault size="lg" title="Nome:">
                      <Text
                        family="body"
                        size="xl"
                        height="shorter"
                        weight="bold"
                      >
                        {couple?.collections.couple.name.first}
                      </Text>
                    </InfoDefault>

                    <InfoDefault size="lg" title="Idade:">
                      <Text
                        family="body"
                        size="xl"
                        height="shorter"
                        weight="bold"
                      >
                        {couple?.collections.couple.age}
                      </Text>
                    </InfoDefault>

                    <InfoDefault size="lg" title="História:">
                      <Text
                        family="body"
                        size="xl"
                        height="shorter"
                        weight="bold"
                      >
                        {`${couple?.collections.couple?.history.slice(
                          0,
                          280,
                        )}...`}
                      </Text>
                    </InfoDefault>
                  </ContainerGrid>
                </ContainerGrid>
              </Text>
            </InfoDefault>

            <InfoDefault size="lg" title="Ficarão juntos?:">
              <Text
                family="body"
                size="xl"
                height="shorter"
                weight="bold"
                css={{
                  color: couple?.infos.untilEnd
                    ? '$successDefault'
                    : '$fullError',
                }}
              >
                {couple?.infos.untilEnd ? 'SIM' : 'NÃO'}
              </Text>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {couple?.infos.createdAt
                  ? getDate(couple?.infos.createdAt)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInCouple}
          permission={permission}
          comments={couple?.collections.comment.itens}
          onResponseIntersect={handleResponseComment}
        />
        {/* <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={coupleId === 'new'}
          editorTo={keysCouple.label}
          projectId={project?.id}
          personId={person?.id!}
          object={couple}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysCouple.keyPath}
          comments={commentsInThisCouple}
          isUniqueRelational
        /> */}
      </ProjectPageLayout>
    </>
  )
}
