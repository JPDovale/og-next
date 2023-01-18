import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ICreateCommentDTO } from '../../../../../../api/dtos/ICreateNewCommentDTO'
import {
  IProjectResponse,
  ITag,
} from '../../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndCommentsToGenerics } from '../../../../../../components/EditorAndCommentsToGenerics'
import { ProjectsContext } from '../../../../../../contexts/projects'
import { UserContext } from '../../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../../layouts/ProjectPageLayout'

export default function CouplePage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, coupleId } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project?.tags.find(
    (tag) => tag.type === 'persons/couples',
  ) as ITag

  const refs = tag && tag.refs
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const person = persons.find((person) => person.id === personId)

  const exiteCouple = person?.couples?.find((couple) => couple.id === coupleId)

  const commentsInThisCouple = person?.comments?.filter(
    (comment) => comment.to === `couples/${coupleId}`,
  )

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={[
        'Personagens',
        `${person?.name || 'Carregando...'}`,
        'Casais',
        exiteCouple ? 'Edição' : 'Novo',
      ]}
      loading={loading}
      inError={!loading && coupleId !== 'new' && !exiteCouple}
    >
      <EditorAndCommentsToGenerics
        persons={persons}
        refs={refs}
        isNew={coupleId === 'new'}
        editorTo="casal"
        projectId={project?.id}
        personId={person?.id!}
        object={exiteCouple}
        permission={permission}
        projectCreatedPerUser={project?.createdPerUser}
        onNewComment={CommentInPerson}
        to={`couple/${coupleId}`}
        comments={commentsInThisCouple}
        isUniqueRelational
      />
    </ProjectPageLayout>
  )
}
