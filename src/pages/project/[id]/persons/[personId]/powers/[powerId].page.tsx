import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function PowerPage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, powerId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, personBoxes, personName, findPower } = usePerson(
    personId as string,
  )
  const { commentsInThisPower, keysPower, power } = findPower(powerId as string)

  const boxPowers = personBoxes.powers
  const files = boxPowers && boxPowers.archives

  const inError =
    !loading && ((powerId !== 'new' && !power) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          powerId === 'new' ? 'Novo' : 'Editar'
        } poder | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Poderes',
          power ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          referenceArchives={files}
          isNew={powerId === 'new'}
          editorTo={keysPower.label}
          projectId={project?.id}
          personId={person?.id!}
          object={power}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysPower.keyPath}
          comments={commentsInThisPower}
        />
      </ProjectPageLayout>
    </>
  )
}
