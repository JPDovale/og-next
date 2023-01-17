import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ICreateCommentDTO } from '../../../../../../api/dtos/ICreateNewCommentDTO'
import {
  IProjectResponse,
  ITag,
} from '../../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndCommentsToGenerics } from '../../../../../../components/EditorAndCommentsToGenerics'
import { Error } from '../../../../../../components/Error'
import { Loading } from '../../../../../../components/Loading'
import { ProjectsContext } from '../../../../../../contexts/projects'
import { UserContext } from '../../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../../layouts/ProjectPageLayout'

export default function DreamPage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, dreamId } = router.query

  if (loading) return <Loading />
  if (!projects) return <Error />

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project.tags.find((tag) => tag.type === 'persons/dreams') as ITag

  const refs = tag && tag.refs
  const permission = project.users.find((u) => u.id === user?.id)?.permission

  if (!project || !persons) return <Error />

  const person = persons.find((person) => person.id === personId)

  if (!person) return <Error />

  const exiteDream =
    dreamId !== 'new'
      ? person.dreams?.find((dream) => dream.id === dreamId)
      : undefined

  const commentsInThisDream = person.comments?.filter(
    (comment) => comment.to === `dreams/${dreamId}`,
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
        'Sonhos',
        exiteDream ? 'Edição' : 'Novo',
      ]}
      loading={loading}
    >
      <EditorAndCommentsToGenerics
        persons={persons}
        refs={refs}
        isNew={!exiteDream}
        editorTo="sonho"
        projectId={project.id}
        personId={person.id}
        object={exiteDream}
        permission={permission}
        projectCreatedPerUser={project.createdPerUser}
        onNewComment={CommentInPerson}
        to={`dreams/${dreamId}`}
        comments={commentsInThisDream}
      />
    </ProjectPageLayout>
  )
}
