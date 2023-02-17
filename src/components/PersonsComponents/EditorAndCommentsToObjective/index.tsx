import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import {
  IObjective,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { IComment, IRef } from '@api/responsesTypes/IProjcetResponse'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { EditorContainer } from '@components/ProjectsComponents/EditorAndComments/styles'
import { ObjectiveEditor } from '../ObjectiveEditor'

interface IEditorAndCommentsToObjective {
  isNew: boolean
  objective: IObjective | undefined
  projectId: string
  personId: string
  persons: IPersonsResponse[]
  refs: IRef[] | undefined
  permission: 'edit' | 'view' | 'comment' | undefined
  projectCreatedPerUser: string
  comments?: IComment[]
  onNewComment: (comment: ICreateCommentDTO) => Promise<void>
}

export function EditorAndCommentsToObjective({
  isNew,
  objective,
  onNewComment,
  permission,
  personId,
  persons,
  projectCreatedPerUser,
  projectId,
  refs,
  comments,
}: IEditorAndCommentsToObjective) {
  return (
    <EditorContainer>
      <ObjectiveEditor
        isNew={isNew}
        objective={objective}
        projectId={projectId}
        personId={personId}
        persons={persons}
        refs={refs}
        permission={permission}
      />
      {!isNew && permission !== 'view' && (
        <CommentsOnPage
          projectCreatedPerUser={projectCreatedPerUser}
          projectId={projectId}
          onNewComment={onNewComment}
          to={`objectives/${objective?.id}`}
          comments={comments}
          personId={personId}
          isNew={isNew}
          editorTo={'objetivo'}
          permission={permission}
        />
      )}
    </EditorContainer>
  )
}
