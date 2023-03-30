import { IComment } from '@api/responsesTypes/IProjectResponse'
import { Editor } from '@components/Editor'
import { CommentsOnPage } from '../CommentsOnPage'
import { EditorContainer } from './styles'

interface IEditorAndCommentsProps {
  to: string
  superFix?: string
  updateValue: () => void
  setValue: (value: any) => void
  preValue: any
  permission: 'edit' | 'view' | 'comment' | undefined
  projectId: string
  personId?: string
  projectCreatedPerUser: string
  comments?: IComment[]
  withoutComments?: boolean
}

export function EditorAndComments({
  to,
  superFix,
  updateValue,
  setValue,
  preValue,
  permission,
  projectId,
  personId = '',
  projectCreatedPerUser,
  comments = [],
  withoutComments = false,
}: IEditorAndCommentsProps) {
  return (
    <EditorContainer>
      <Editor
        superFix={superFix}
        projectId={projectId}
        to={to}
        permission={permission}
        handleUpdate={updateValue}
        preValue={preValue}
        setValue={setValue}
      />
      {!withoutComments && (
        <CommentsOnPage
          personId={personId}
          to={to}
          projectId={projectId}
          projectCreatedPerUser={projectCreatedPerUser}
          comments={comments}
          permission={permission}
        />
      )}
    </EditorContainer>
  )
}
