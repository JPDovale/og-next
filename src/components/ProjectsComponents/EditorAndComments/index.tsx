import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { Editor } from '@components/Editor'
import { CommentsOnPage } from '../CommentsOnPage'
import { EditorContainer } from './styles'

interface IEditorAndCommentsProps {
  to: string
  updateValue: () => void
  setValue: (value: any) => void
  preValue: any
  permission: 'edit' | 'view' | 'comment' | undefined
  projectId: string
  personId?: string
  projectCreatedPerUser: string
  comments?: IComment[]
}

export function EditorAndComments({
  to,
  updateValue,
  setValue,
  preValue,
  permission,
  projectId,
  personId = '',
  projectCreatedPerUser,
  comments = [],
}: IEditorAndCommentsProps) {
  return (
    <EditorContainer>
      <Editor
        projectId={projectId}
        to={to}
        permission={permission}
        handleUpdate={updateValue}
        preValue={preValue}
        setValue={setValue}
      />
      <CommentsOnPage
        personId={personId}
        to={to}
        projectId={projectId}
        projectCreatedPerUser={projectCreatedPerUser}
        comments={comments}
        permission={permission}
      />
    </EditorContainer>
  )
}
