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

export default function ValuePage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, valueId } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project?.tags.find((tag) => tag.type === 'persons/values') as ITag

  const refs = tag && tag.refs
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const person = persons.find((person) => person.id === personId)

  const exiteValue = person?.values?.find((value) => value.id === valueId)

  const commentsInThisValue = person?.comments?.filter(
    (comment) => comment.to === `values/${valueId}`,
  )

  const inError =
    !loading && ((valueId !== 'new' && !exiteValue) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${person?.name || 'Carregando...'}-${
          valueId === 'new' ? 'Novo' : 'Editar'
        } valor | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${person?.name || 'Carregando...'}`,
          'Valor',
          exiteValue ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={valueId === 'new'}
          editorTo="valor"
          projectId={project?.id}
          personId={person?.id!}
          object={
            {
              ...exiteValue,
              subObjects: exiteValue?.exceptions || [],
            } as IGenericObject
          }
          withSubObjects="exceções"
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={`value/${valueId}`}
          comments={commentsInThisValue}
        />
      </ProjectPageLayout>
    </>
  )
}
