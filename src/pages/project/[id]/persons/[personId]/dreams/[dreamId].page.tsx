import { NextSeo } from 'next-seo'
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
import { usePreventBack } from '../../../../../../hooks/usePreventDefaultBack'
import { ProjectPageLayout } from '../../../../../../layouts/ProjectPageLayout'

export default function DreamPage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, dreamId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project?.tags.find((tag) => tag.type === 'persons/dreams') as ITag

  const refs = tag && tag.refs
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const person = persons.find((person) => person.id === personId)

  const exiteDream = person?.dreams?.find((dream) => dream.id === dreamId)

  const commentsInThisDream = person?.comments?.filter(
    (comment) => comment.to === `dreams/${dreamId}`,
  )

  const inError =
    !loading && ((dreamId !== 'new' && !exiteDream) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${person?.name || 'Carregando...'}-${
          dreamId === 'new' ? 'Novo' : 'Editar'
        } sonho | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${person?.name || 'Carregando'}`,
          'Sonhos',
          exiteDream ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={dreamId === 'new'}
          editorTo="sonho"
          projectId={project?.id}
          personId={person?.id!}
          object={exiteDream}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={`dreams/${dreamId}`}
          comments={commentsInThisDream}
        />
      </ProjectPageLayout>
    </>
  )
}
