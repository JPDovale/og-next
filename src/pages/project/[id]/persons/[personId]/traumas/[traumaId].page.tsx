import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ICreateCommentDTO } from '../../../../../../api/dtos/ICreateNewCommentDTO'

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
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, traumaId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, tags, personName, findTrauma } = usePerson(personId as string)
  const { commentsInThisTrauma, keysTrauma, trauma } = findTrauma(
    traumaId as string,
  )

  const tag = tags.traumas
  const refs = tag && tag.refs

  const inError =
    !loading && ((traumaId !== 'new' && !trauma) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          traumaId === 'new' ? 'Novo' : 'Editar'
        } trauma | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Trauma',
          trauma ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          projectId={project?.id}
          refs={refs}
          isNew={traumaId === 'new'}
          editorTo={keysTrauma.label}
          personId={person?.id!}
          object={
            {
              ...trauma,
              subObjects: trauma?.consequences || [],
            } as IGenericObject
          }
          withSubObjects={keysTrauma.subObjects}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysTrauma.keyPath}
          comments={commentsInThisTrauma}
        />
      </ProjectPageLayout>
    </>
  )
}
