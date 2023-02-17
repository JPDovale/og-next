import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function FearPage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, fearId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, personName, tags, findFear } = usePerson(personId as string)
  const { commentsInThisFear, fear, keysFear } = findFear(fearId as string)

  const tag = tags.fears
  const refs = tag && tag.refs

  const inError =
    !loading && ((fearId !== 'new' && !fear) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          fearId === 'new' ? 'Novo' : 'Editar'
        } medo | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Medos',
          fear ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={fearId === 'new'}
          editorTo={keysFear.label}
          projectId={project?.id}
          personId={person?.id!}
          object={fear}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysFear.keyPath}
          comments={commentsInThisFear}
        />
      </ProjectPageLayout>
    </>
  )
}
