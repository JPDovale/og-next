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

export default function PersonalityPage() {
  const { loading, persons, commentInPerson } = useContext(ProjectsContext)

  const router = useRouter()
  const { id, personId, personalityId } = router.query
  usePreventBack(`/project/${id}/persons/${personId}`)

  const { project, projectName, permission, usePerson } = useProject(
    id as string,
  )
  const { person, tags, personName, findPersonality } = usePerson(
    personId as string,
  )
  const { commentsInThisPersonality, personality, keysPersonality } =
    findPersonality(personalityId as string)

  const tag = tags.personality
  const refs = tag && tag.refs

  const inError =
    !loading &&
    ((personalityId !== 'new' && !personality) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }
  return (
    <>
      <NextSeo
        title={`${personName}-${
          personalityId === 'new' ? 'Nova' : 'Editar'
        } personalidade | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${personName}`,
          'Personalidade',
          personality ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={personalityId === 'new'}
          editorTo={keysPersonality.label}
          projectId={project?.id}
          personId={person?.id!}
          object={
            {
              ...personality,
              subObjects: personality?.consequences || [],
            } as IGenericObject
          }
          withSubObjects={keysPersonality.subObjects}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={keysPersonality.keyPath}
          comments={commentsInThisPersonality}
        />
      </ProjectPageLayout>
    </>
  )
}
