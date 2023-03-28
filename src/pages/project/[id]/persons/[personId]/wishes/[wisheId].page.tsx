import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function WishePage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, wisheId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, personName, personBoxes, findWishe } = usePerson(
    personId as string,
  )
  const { commentsInThisWishe, keysWishe, wishe } = findWishe(wisheId as string)

  const boxWishes = personBoxes.wishes
  const files = boxWishes && boxWishes.archives

  const inError =
    !loading && ((wisheId !== 'new' && !wishe) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          wisheId === 'new' ? 'Novo' : 'Editar'
        } desejo | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Desejos',
          wishe ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={wisheId === 'new'}
          editorTo={keysWishe.label}
          projectId={project?.id}
          personId={person?.id!}
          object={wishe}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysWishe.keyPath}
          comments={commentsInThisWishe}
        />
      </ProjectPageLayout>
    </>
  )
}
