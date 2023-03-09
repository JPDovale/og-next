import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function CouplePage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, coupleId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, personName, personBoxes, findCouple } = usePerson(
    personId as string,
  )
  const { commentsInThisCouple, couple, keysCouple } = findCouple(
    coupleId as string,
  )

  const boxCouples = personBoxes.couples
  const files = boxCouples && boxCouples.archives

  const inError =
    !loading && ((coupleId !== 'new' && !couple) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          coupleId === 'new' ? 'Novo' : 'Editar'
        } casal | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Casais',
          couple ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={coupleId === 'new'}
          editorTo={keysCouple.label}
          projectId={project?.id}
          personId={person?.id!}
          object={couple}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysCouple.keyPath}
          comments={commentsInThisCouple}
          isUniqueRelational
        />
      </ProjectPageLayout>
    </>
  )
}
