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

export default function TraumaPage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, traumaId } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project?.tags.find(
    (tag) => tag.type === 'persons/traumas',
  ) as ITag

  const refs = tag && tag.refs
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const person = persons.find((person) => person.id === personId)

  const exiteTrauma = person?.traumas?.find((trauma) => trauma.id === traumaId)

  const commentsInThisTrauma = person?.comments?.filter(
    (comment) => comment.to === `traumas/${traumaId}`,
  )

  const inError =
    !loading && ((traumaId !== 'new' && !exiteTrauma) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${person?.name || 'Carregando...'}-${
          traumaId === 'new' ? 'Novo' : 'Editar'
        } trauma | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${person?.name || 'Carregando...'}`,
          'Trauma',
          exiteTrauma ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={traumaId === 'new'}
          editorTo="trauma"
          projectId={project?.id}
          personId={person?.id!}
          object={
            {
              ...exiteTrauma,
              subObjects: exiteTrauma?.consequences || [],
            } as IGenericObject
          }
          withSubObjects="consequências"
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={`trauma/${traumaId}`}
          comments={commentsInThisTrauma}
        />
      </ProjectPageLayout>
    </>
  )
}
