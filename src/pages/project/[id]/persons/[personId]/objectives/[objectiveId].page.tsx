import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToObjective } from '@components/PersonsComponents/EditorAndCommentsToObjective'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function ObjectivePage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, objectiveId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, permission, usePerson, projectName } = useProject(
    id as string,
  )
  const { person, personBoxes, findObjective, personName } = usePerson(
    personId as string,
  )
  const { objective, commentsInThisObjective } = findObjective(
    objectiveId as string,
  )

  const boxObjectives = personBoxes.objectives
  const files = boxObjectives?.archives

  const inError =
    !loading && ((objectiveId !== 'new' && !objective) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          objectiveId === 'new' ? 'Novo' : 'Editar'
        } objetivo | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Objetivos',
          objective ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToObjective
          isNew={objectiveId === 'new'}
          objective={objective}
          onNewComment={CommentInPerson}
          permission={permission}
          personId={person?.id as string}
          persons={persons}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          referenceArchives={files}
          comments={commentsInThisObjective}
        />
      </ProjectPageLayout>
    </>
  )
}
