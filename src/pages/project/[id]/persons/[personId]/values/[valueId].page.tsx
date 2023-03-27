import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
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
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, valueId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, permission, projectName, usePerson } = useProject(
    id as string,
  )
  const { person, personName, findValue, personBoxes } = usePerson(
    personId as string,
  )
  const { value, keysValue, commentsInThisValue } = findValue(valueId as string)

  const boxValues = personBoxes.values
  const files = boxValues && boxValues.archives

  const inError =
    !loading && ((valueId !== 'new' && !value) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          valueId === 'new' ? 'Novo' : 'Editar'
        } valor | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Valor',
          value ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={valueId === 'new'}
          editorTo={keysValue.label}
          projectId={project?.id}
          personId={person?.id!}
          object={
            {
              ...value,
              subObjects: value?.exceptions || [],
            } as IGenericObject
          }
          withSubObjects={keysValue.subObjects}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysValue.keyPath}
          comments={commentsInThisValue}
        />
      </ProjectPageLayout>
    </>
  )
}
