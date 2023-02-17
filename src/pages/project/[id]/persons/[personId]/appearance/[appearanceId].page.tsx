import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { EditorAndCommentsToGenerics } from '@components/PersonsComponents/EditorAndCommentsToGenerics'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function AppearancePage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, appearanceId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, tags, personName, findAppearance } = usePerson(
    personId as string,
  )
  const { appearance, commentsInThisAppearance, keysAppearance } =
    findAppearance(appearanceId as string)

  const tag = tags.appearance
  const refs = tag && tag.refs

  const inError =
    !loading && ((appearanceId !== 'new' && !appearance) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${personName}-${
          appearanceId === 'new' ? 'Nova' : 'Editar'
        } aparência | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Aparência',
          appearance ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={appearanceId === 'new'}
          editorTo={keysAppearance.label}
          projectId={project?.id}
          personId={person?.id!}
          object={appearance}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysAppearance.keyPath}
          comments={commentsInThisAppearance}
        />
      </ProjectPageLayout>
    </>
  )
}
