import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { Editor } from '@components/Editor'
import { CommentsOnPage } from '../CommentsOnPage'
import { EditorContainer } from './styles'

interface IEditorAndCommentsProps {
  message: string
  to: string
  label: string
  updateValue: () => void
  value: any
  setValue: (value: any) => void
  preValue: any
  permission: 'edit' | 'view' | 'comment' | undefined
  projectId: string
  personId?: string
  projectCreatedPerUser: string
  comments?: IComment[]
  toMany?: any[]
  preValueToMany?: any[]
}

export function EditorAndComments({
  message,
  to,
  label,
  updateValue,
  value,
  setValue,
  preValue,
  permission,
  projectId,
  personId = '',
  projectCreatedPerUser,
  comments = [],
  toMany,
  preValueToMany,
}: IEditorAndCommentsProps) {
  return (
    <EditorContainer>
      <Editor
        toMany={toMany}
        preValueToMany={preValueToMany}
        message={message}
        to={label}
        updateValue={updateValue}
        setValue={setValue}
        value={value}
        preValue={preValue}
        permission={permission}
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
