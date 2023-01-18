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

export default function AppearancePage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, appearanceId } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project?.tags.find(
    (tag) => tag.type === 'persons/appearance',
  ) as ITag

  const refs = tag && tag.refs
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const person = persons.find((person) => person.id === personId)

  const exiteAppearance = person?.appearance?.find(
    (appearance) => appearance.id === appearanceId,
  )

  const commentsInThisAppearance = person?.comments?.filter(
    (comment) => comment.to === `appearance/${appearanceId}`,
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
        'Aparência',
        exiteAppearance ? 'Edição' : 'Novo',
      ]}
      loading={loading}
      inError={!loading && appearanceId !== 'new' && !exiteAppearance}
    >
      <EditorAndCommentsToGenerics
        persons={persons}
        refs={refs}
        isNew={appearanceId === 'new'}
        editorTo="aparência"
        projectId={project?.id}
        personId={person?.id!}
        object={exiteAppearance}
        permission={permission}
        projectCreatedPerUser={project?.createdPerUser}
        onNewComment={CommentInPerson}
        to={`appearance/${appearanceId}`}
        comments={commentsInThisAppearance}
      />
    </ProjectPageLayout>
  )
}
