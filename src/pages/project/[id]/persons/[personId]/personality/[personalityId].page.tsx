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

interface ISubObject {
  title: string
  description: string
}

interface IGenericObject {
  id?: string
  title: string
  description: string
  subObjects?: ISubObject[]
}

export default function PersonalityPage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, personalityId } = router.query

  if (loading) return <Loading />
  if (!projects) return <Error />

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project.tags.find(
    (tag) => tag.type === 'persons/personality',
  ) as ITag

  const permission = project.users.find((u) => u.id === user?.id)?.permission

  const refs = tag && tag.refs

  if (!project || !persons) return <Error />

  const person = persons.find((person) => person.id === personId)

  if (!person) return <Error />

  const exitePersonality =
    personalityId !== 'new'
      ? person.personality?.find(
          (personality) => personality.id === personalityId,
        )
      : undefined

  const commentsInThisPersonality = person.comments?.filter(
    (comment) => comment.to === `personality/${personalityId}`,
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
        'Personalidade',
        exitePersonality ? 'Edição' : 'Novo',
      ]}
      loading={loading}
    >
      <EditorAndCommentsToGenerics
        persons={persons}
        refs={refs}
        isNew={!exitePersonality}
        editorTo="personalidade"
        projectId={project.id}
        personId={person.id}
        object={
          {
            ...exitePersonality,
            subObjects: exitePersonality?.consequences || [],
          } as IGenericObject
        }
        withSubObjects="consequências"
        permission={permission}
        projectCreatedPerUser={project.createdPerUser}
        onNewComment={CommentInPerson}
        to={`personality/${personalityId}`}
        comments={commentsInThisPersonality}
      />
    </ProjectPageLayout>
  )
}
