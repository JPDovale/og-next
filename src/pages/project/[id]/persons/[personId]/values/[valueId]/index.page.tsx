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
import { TreeStructure } from 'phosphor-react'

export default function ValuePage() {
  const router = useRouter()
  const { id, personId, valueId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { permission, projectName } = useProject(id as string)
  const { person, personName, findValue, loadingPerson, callEvent } = usePerson(
    personId as string,
  )
  const { value } = findValue(valueId as string)

  async function handleCommentInValue(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await callEvent.commentInPerson({
      toObjectId: value?.id ?? '',
      comment: {
        content: newComment.content,
        commentIn: 'value',
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
        title={`${personName}-${value?.infos.title} | Magiscrita`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Valores',
          value?.infos.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<TreeStructure size={40} />}
            label="Valor"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/values/${valueId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {value?.infos.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {value?.infos.description}
              </Text>
            </InfoDefault>

            <InfoDefault title="Exceções:">
              <ContainerGrid
                css={{ gap: '$8', marginTop: '$4' }}
                padding={0}
                columns={
                  value?.collections.exception.itens &&
                  value.collections.exception.itens[0]
                    ? 2
                    : 1
                }
              >
                {value?.collections.exception.itens &&
                value.collections.exception.itens[0] ? (
                  value.collections.exception.itens.map((exception) => (
                    <ContainerGrid
                      padding={4}
                      css={{
                        background: '$gray700',
                        borderRadius: '$sm',
                        boxShadow: '$default',
                      }}
                      key={exception.id}
                    >
                      <InfoDefault size="lg" title="Titulo:">
                        <Text
                          family="body"
                          size="xl"
                          height="shorter"
                          weight="bold"
                        >
                          {exception?.infos.title}
                        </Text>
                      </InfoDefault>

                      <InfoDefault title="Descrição:">
                        <Text family="body" height="shorter" weight="bold">
                          {exception?.infos.description}
                        </Text>
                      </InfoDefault>
                    </ContainerGrid>
                  ))
                ) : (
                  <ListEmpty
                    message="Nenhuma exceção adicionada a lista."
                    isLoading={loadingPerson}
                    isInLine
                  />
                )}
              </ContainerGrid>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {value?.infos.createdAt
                  ? getDate(value?.infos.createdAt)
                  : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInValue}
          permission={permission}
          comments={value?.collections.comment.itens}
          onResponseIntersect={handleResponseComment}
        />
        {/* <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={valueId === 'new'}
          editorTo={keysValue.label}
          projectId={project?.id}
          personId={person?.id!}
          object={
            {
              ...value,
              subObjects: value?.exceptions || [],
            } as IGenericObject
          }
          withSubObjects={keysValue.subObjects}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysValue.keyPath}
          comments={commentsInThisValue}
        /> */}
      </ProjectPageLayout>
    </>
  )
}
