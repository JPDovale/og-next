import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { Avatares } from '@components/usefull/Avatares'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { useObjectives } from '@hooks/useObjectives'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { getDate } from '@utils/dates/getDate'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Crosshair, Skull, UsersThree } from 'phosphor-react'

export default function ObjectivePage() {
  const router = useRouter()
  const { id, personId, objectiveId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { permission, projectName, findManyPersons } = useProject(id as string)
  const { person, findObjective, personName, loadingPerson, callEvent } =
    usePerson(personId as string)
  const { objective } = findObjective(objectiveId as string)

  const { findObjective: findFinalObjective } = useObjectives(id as string)
  const { objective: finalObjective } = findFinalObjective(
    objectiveId as string,
  )

  const personsInObjectiveIds = finalObjective?.persons?.map((person) => {
    if (person.id === personId) return ''
    return person.id
  })
  const personsInObjective = findManyPersons(personsInObjectiveIds ?? [])

  async function handleCommentInObjective(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await callEvent.commentInPerson({
      toObjectId: objective?.id ?? '',
      comment: {
        content: newComment.content,
        commentIn: 'objective',
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
        title={`${personName}-${objective?.infos.title} | Magiscrita`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Objetivos',
          objective?.infos.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<Crosshair size={40} />}
            label="Objetivo"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/objectives/${objective}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {objective?.infos.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {objective?.infos.description}
              </Text>
            </InfoDefault>

            <InfoDefault size="lg" title="Será concretizado?:">
              <Text
                family="body"
                size="xl"
                height="shorter"
                weight="bold"
                css={{
                  color: objective?.infos.itBeRealized
                    ? '$successDefault'
                    : '$fullError',
                }}
              >
                {objective?.infos.itBeRealized ? 'SIM' : 'NÃO'}
              </Text>
            </InfoDefault>

            <InfoDefault title="Apoiadores:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                <Avatares
                  persons={objective?.collections.supporter.itens ?? []}
                  columns={10}
                  size="2xl"
                  listEmptyIcon={<UsersThree />}
                  listEmptyMessage="Nenhum apoiador adicionado a lista"
                  isClickable
                />
              </Text>
            </InfoDefault>

            <InfoDefault title="Contras:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                <Avatares
                  persons={objective?.collections.avoider.itens ?? []}
                  columns={10}
                  size="2xl"
                  listEmptyIcon={<Skull />}
                  listEmptyMessage="Nenhum contra adicionado a lista"
                  isClickable
                />
              </Text>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {objective?.infos.createdAt
                  ? getDate(objective?.infos.createdAt)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>

          {personsInObjective && personsInObjective[0] && (
            <ContainerGrid padding={4} darkBackground>
              <InfoDefault title="Personagens atribuídos a esse objetivo">
                <Text family="body" size="xl" height="shorter" weight="bold">
                  <Avatares
                    persons={personsInObjective}
                    columns={10}
                    size="2xl"
                    listEmptyMessage=""
                    isClickable
                  />
                </Text>
              </InfoDefault>
            </ContainerGrid>
          )}
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInObjective}
          permission={permission}
          comments={objective?.collections.comment.itens ?? []}
          onResponseIntersect={handleResponseComment}
        />
        {/* <EditorAndCommentsToObjective
          isNew={objectiveId === 'new'}
          objective={objective}
          onNewComment={CommentInPerson}
          permission={permission}
          personId={person?.id as string}
          persons={personsThisProject}
          projectCreatedPerUser={project?.user.id}
          projectId={project?.id as string}
          referenceArchives={[]}
          comments={objective?.comments ?? []}
        /> */}
      </ProjectPageLayout>
    </>
  )
}
