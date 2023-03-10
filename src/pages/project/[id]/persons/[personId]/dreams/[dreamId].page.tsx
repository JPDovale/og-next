import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function DreamPage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, dreamId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, personBoxes, personName, findDream } = usePerson(
    personId as string,
  )
  const { commentsInThisDream, dream, keysDream } = findDream(dreamId as string)

  const boxDreams = personBoxes.dreams
  const files = boxDreams && boxDreams.archives

  const inError =
    !loading && ((dreamId !== 'new' && !dream) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          dreamId === 'new' ? 'Novo' : 'Editar'
        } sonho | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Sonhos',
          dream ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={dreamId === 'new'}
          editorTo={keysDream.label}
          projectId={project?.id}
          personId={person?.id!}
          object={dream}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysDream.keyPath}
          comments={commentsInThisDream}
        />
      </ProjectPageLayout>
    </>
  )
}
