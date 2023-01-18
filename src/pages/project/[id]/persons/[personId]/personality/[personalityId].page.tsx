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

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project?.tags.find(
    (tag) => tag.type === 'persons/personality',
  ) as ITag

  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const refs = tag && tag.refs

  const person = persons.find((person) => person.id === personId)

  const exitePersonality = person?.personality?.find(
    (personality) => personality.id === personalityId,
  )

  const commentsInThisPersonality = person?.comments?.filter(
    (comment) => comment.to === `personality/${personalityId}`,
  )

  const inError =
    !loading &&
    ((personalityId !== 'new' && !exitePersonality) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }
  return (
    <>
      <NextSeo
        title={`${person?.name || 'Carregando...'}-${
          personalityId === 'new' ? 'Nova' : 'Editar'
        } personalidade | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${person?.name || 'Carregando...'}`,
          'Personalidade',
          exitePersonality ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={personalityId === 'new'}
          editorTo="personalidade"
          projectId={project?.id}
          personId={person?.id!}
          object={
            {
              ...exitePersonality,
              subObjects: exitePersonality?.consequences || [],
            } as IGenericObject
          }
          withSubObjects="consequências"
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={`personality/${personalityId}`}
          comments={commentsInThisPersonality}
        />
      </ProjectPageLayout>
    </>
  )
}
