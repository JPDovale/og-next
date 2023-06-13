import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Text } from '@components/usefull/Text'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { getDate } from '@utils/dates/getDate'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { HeartBreak } from 'phosphor-react'

export default function TraumaPage() {
  const router = useRouter()
  const { id, personId, traumaId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, loadingPerson, personName, findTrauma, callEvent } =
    usePerson(personId as string)
  const { trauma } = findTrauma(traumaId as string)

  async function handleCommentInTrauma(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await callEvent.commentInPerson({
      toObjectId: trauma?.id ?? '',
      comment: {
        content: newComment.content,
        commentIn: 'trauma',
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
        title={`${personName}-${trauma?.infos.title} trauma | Magiscrita`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Trauma',
          trauma?.infos.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<HeartBreak size={40} />}
            label="Aparência"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/traumas/${traumaId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {trauma?.infos.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {trauma?.infos.description}
              </Text>
            </InfoDefault>

            <InfoDefault title="Consequências:">
              <ContainerGrid
                css={{ gap: '$8', marginTop: '$4' }}
                padding={0}
                columns={
                  trauma?.collections.consequence.itens &&
                  trauma?.collections.consequence.itens[0]
                    ? 2
                    : 1
                }
              >
                {trauma?.collections.consequence.itens &&
                trauma?.collections.consequence.itens[0] ? (
                  trauma?.collections.consequence.itens.map((consequence) => (
                    <ContainerGrid
                      padding={4}
                      css={{
                        background: '$gray700',
                        borderRadius: '$sm',
                        boxShadow: '$default',
                      }}
                      key={consequence.id}
                    >
                      <InfoDefault size="lg" title="Titulo:">
                        <Text
                          family="body"
                          size="xl"
                          height="shorter"
                          weight="bold"
                        >
                          {consequence?.infos.title}
                        </Text>
                      </InfoDefault>

                      <InfoDefault title="Descrição:">
                        <Text family="body" height="shorter" weight="bold">
                          {consequence?.infos.description}
                        </Text>
                      </InfoDefault>
                    </ContainerGrid>
                  ))
                ) : (
                  <ListEmpty
                    message="Nenhuma consequência adicionada a lista."
                    isLoading={loadingPerson}
                    isInLine
                  />
                )}
              </ContainerGrid>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {trauma?.infos.createdAt
                  ? getDate(trauma?.infos.createdAt)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInTrauma}
          permission={permission}
          comments={trauma?.collections.comment.itens}
          onResponseIntersect={handleResponseComment}
        />
        {/* <EditorAndCommentsToGenerics
          persons={persons}
          projectId={project?.id}
          referenceArchives={files}
          isNew={traumaId === 'new'}
          editorTo={keysTrauma.label}
          personId={person?.id!}
          object={
            {
              ...trauma,
              subObjects: trauma?.collections.consequence.itens || [],
            } as IGenericObject
          }
          withSubObjects={keysTrauma.subObjects}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysTrauma.keyPath}
          comments={commentsInThisTrauma}
        /> */}
      </ProjectPageLayout>
    </>
  )
}
