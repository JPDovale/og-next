import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ICreateCommentDTO } from '../../../../../../api/dtos/ICreateNewCommentDTO'
import {
  IProjectResponse,
  ITag,
} from '../../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndCommentsToObjective } from '../../../../../../components/EditorAndCommentsToObjective'
import { Error } from '../../../../../../components/Error'
import { Loading } from '../../../../../../components/Loading'
import { ProjectsContext } from '../../../../../../contexts/projects'
import { UserContext } from '../../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../../layouts/ProjectPageLayout'

export default function ObjectivePage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, objectiveId } = router.query

  if (loading) return <Loading />
  if (!projects) return <Error />

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse
  const tag = project.tags.find(
    (tag) => tag.type === 'persons/objectives',
  ) as ITag
  const refs = tag && tag.refs
  const permission = project.users.find((u) => u.id === user?.id)?.permission

  if (!project || !persons) return <Error />

  const person = persons.find((person) => person.id === personId)

  if (!person) return <Error />

  const exiteObjective =
    objectiveId !== 'new'
      ? person.objectives?.find((objective) => objective.id === objectiveId)
      : undefined

  const commentsInThisObjective = person.comments?.filter(
    (comment) => comment.to === `objectives/${objectiveId}`,
  )

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <ProjectPageLayout
      projectName={project.name}
      projectId={`${id}`}
      paths={[
        'Personagens',
        `${person?.name}`,
        'Objetivos',
        exiteObjective ? 'Edição' : 'Novo',
      ]}
      loading={loading}
    >
      <EditorAndCommentsToObjective
        isNew={!exiteObjective}
        objective={exiteObjective}
        onNewComment={CommentInPerson}
        permission={permission}
        personId={person?.id as string}
        persons={persons}
        projectCreatedPerUser={project.createdPerUser}
        projectId={project.id as string}
        refs={refs}
        comments={commentsInThisObjective}
      />
    </ProjectPageLayout>
  )
}
