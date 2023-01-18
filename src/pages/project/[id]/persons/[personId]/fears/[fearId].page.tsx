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

export default function FearPage() {
  const { projects, loading, persons, commentInPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id, personId, fearId } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const tag = project?.tags.find((tag) => tag.type === 'persons/fears') as ITag

  const refs = tag && tag.refs
  const permission = project?.users.find((u) => u.id === user?.id)?.permission

  const person = persons.find((person) => person.id === personId)

  const exiteFear = person?.fears?.find((fear) => fear.id === fearId)

  const commentsInThisFear = person?.comments?.filter(
    (comment) => comment.to === `fears/${fearId}`,
  )

  const inError =
    !loading && ((fearId !== 'new' && !exiteFear) || !project || !person)

  async function CommentInPerson(newComment: ICreateCommentDTO) {
    if (!newComment) return

    await commentInPerson(newComment, person?.id as string)
  }

  return (
    <>
      <NextSeo
        title={`${person?.name || 'Carregando...'}-${
          fearId === 'new' ? 'Novo' : 'Editar'
        } medo | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={[
          'Personagens',
          `${person?.name || 'Carregando...'}`,
          'Medos',
          exiteFear ? 'Edição' : 'Novo',
        ]}
        loading={loading}
        inError={inError}
      >
        <EditorAndCommentsToGenerics
          persons={persons}
          refs={refs}
          isNew={fearId === 'new'}
          editorTo="medo"
          projectId={project?.id}
          personId={person?.id!}
          object={exiteFear}
          permission={permission}
          projectCreatedPerUser={project?.createdPerUser}
          onNewComment={CommentInPerson}
          to={`fears/${fearId}`}
          comments={commentsInThisFear}
        />
      </ProjectPageLayout>
    </>
  )
}
