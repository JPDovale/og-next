import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ICreateCommentDTO } from '../../../../../../api/dtos/ICreateNewCommentDTO'
import {
  IProjectResponse,
  ITag,
} from '../../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndCommentsToObjective } from '../../../../../../components/EditorAndCommentsToObjective'

import { ProjectsContext } from '../../../../../../contexts/projects'
import { UserContext } from '../../../../../../contexts/user'
import { usePreventBack } from '../../../../../../hooks/usePreventDefaultBack'
import { ProjectPageLayout } from '../../../../../../layouts/ProjectPageLayout'

export default function ObjectivePage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, objectiveId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse
  const tag = project?.tags.find(
    (tag) => tag.type === 'persons/objectives',
  ) as ITag
  const refs = tag && tag.refs
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const person = persons.find((person) => person.id === personId)

  const exiteObjective = person?.objectives?.find(
    (objective) => objective.id === objectiveId,
  )

  const commentsInThisObjective = person?.comments?.filter(
    (comment) => comment.to === `objectives/${objectiveId}`,
  )

  const inError =
    !loading &&
    ((objectiveId !== 'new' && !exiteObjective) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${person?.name || 'Carregando...'}-${
          objectiveId === 'new' ? 'Novo' : 'Editar'
        } objetivo | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${person?.name || 'Carregando...'}`,
          'Objetivos',
          exiteObjective ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToObjective
          isNew={objectiveId === 'new'}
          objective={exiteObjective}
          onNewComment={CommentInPerson}
          permission={permission}
          personId={person?.id as string}
          persons={persons}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          refs={refs}
          comments={commentsInThisObjective}
        />
      </ProjectPageLayout>
    </>
  )
}
