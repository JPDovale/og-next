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
import { Warning } from 'phosphor-react'
import { useContext } from 'react'

export default function FearPage() {
  const { commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, fearId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { person, personName, findFear, loadingPerson } = usePerson(
    personId as string,
  )
  const { fear } = findFear(fearId as string)

  async function handleCommentInFear(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo title={`${personName}-${fear?.title} | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Medos',
          fear?.title ?? 'Carregando...',
        ]}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        isScrolling
      >
        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            permission={permission}
            icon={<Warning size={40} />}
            label="Medo"
            customFunctionOnClickSideButton={() =>
              router.push(
                `/project/${id}/persons/${personId}/fears/${fearId}/edit`,
              )
            }
            isToEdit
            inTop
          />

          <ContainerGrid padding={4} darkBackground>
            <InfoDefault size="lg" title="Titulo:">
              <Text family="body" size="3xl" height="shorter" weight="bold">
                {fear?.title}
              </Text>
            </InfoDefault>

            <InfoDefault title="Descrição:">
              <Text family="body" size="xl" height="shorter" weight="bold">
                {fear?.description}
              </Text>
            </InfoDefault>

            <InfoDefault title="Criado em:">
              <Text family="body" size="sm" height="shorter" weight="bold">
                {fear?.created_at ? getDate(fear?.created_at) : 'Carregando...'}
              </Text>
            </InfoDefault>
          </ContainerGrid>
        </ContainerGrid>

        <CommentsOnPage
          onNewComment={handleCommentInFear}
          permission={permission}
          comments={fear?.comments}
        />

        {/* <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={fearId === 'new'}
          editorTo={keysFear.label}
          projectId={project?.id}
          personId={person?.id!}
          object={fear}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysFear.keyPath}
          comments={commentsInThisFear} 
        /> */}
      </ProjectPageLayout>
    </>
  )
}
