import { IEditorTo } from '../../@types/editores/IEditorTo'
import { ICreateCommentDTO } from '../../api/dtos/ICreateNewCommentDTO'
import { IPersonsResponse } from '../../api/responsesTypes/IPersonsResponse'
import { IComment, IRef } from '../../api/responsesTypes/IProjcetResponse'
import { CommentsOnPage } from '../CommentsOnPage'
import { EditorContainer } from '../EditorAndComments/styles'
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
  refs: IRef[]
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
  refs,
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
        refs={refs}
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
