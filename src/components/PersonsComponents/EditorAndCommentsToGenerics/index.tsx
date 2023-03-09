import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { IArchive } from '@api/responsesTypes/IBoxResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { EditorContainer } from '@components/ProjectsComponents/EditorAndComments/styles'
import { IEditorTo } from 'src/@types/editores/IEditorTo'
import { GenericEditorObject } from '../GenericEditorObject'

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

interface IEditorAndCommentsToGenerics {
  isNew: boolean
  object: IGenericObject | undefined
  projectId: string
  personId: string
  persons: IPersonsResponse[]
  referenceArchives: IArchive[] | undefined
  permission: 'edit' | 'view' | 'comment' | undefined
  projectCreatedPerUser: string
  comments?: IComment[]
  onNewComment: (comment: ICreateCommentDTO) => Promise<void>
  withSubObjects?: 'consequências' | 'exceções' | undefined
  editorTo: IEditorTo
  to: string
  isUniqueRelational?: boolean
}

export function EditorAndCommentsToGenerics({
  isNew,
  object,
  onNewComment,
  permission,
  personId,
  persons,
  projectCreatedPerUser,
  projectId,
  referenceArchives,
  comments,
  withSubObjects,
  editorTo,
  to,
  isUniqueRelational = false,
}: IEditorAndCommentsToGenerics) {
  return (
    <EditorContainer>
      <GenericEditorObject
        persons={persons}
        referenceArchives={referenceArchives}
        isNew={isNew}
        editorTo={editorTo}
        projectId={projectId}
        personId={personId}
        object={object}
        withSubObjects={withSubObjects}
        permission={permission}
        isUniqueRelational={isUniqueRelational}
      />
      {!isNew && permission !== 'view' && (
        <CommentsOnPage
          projectCreatedPerUser={projectCreatedPerUser}
          projectId={projectId}
          onNewComment={onNewComment}
          to={to}
          comments={comments}
          personId={personId}
          isNew={isNew}
          editorTo={editorTo}
          permission={permission}
        />
      )}
    </EditorContainer>
  )
}
