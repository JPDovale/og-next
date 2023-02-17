import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { ProjectsContext } from '@contexts/projects'
import { Button, Text, Textarea } from '@og-ui/react'
import { CaretDoubleRight, Chats, PaperPlaneTilt } from 'phosphor-react'
import { FormEvent, useState, useContext } from 'react'
import { Comment } from '../Comment'
import {
  Comments,
  CommentsHeader,
  CommentsOnPageContainer,
  NewCommentForm,
  ShowComment,
} from './styles'

interface ICommentsOnPageProps {
  comments?: IComment[]
  permission?: 'edit' | 'view' | 'comment' | undefined
  projectCreatedPerUser: string
  to: string
  projectId: string
  onNewComment?: (newComment: ICreateCommentDTO) => void
  personId: string
  isNew?: boolean
  editorTo?: string
}

export function CommentsOnPage({
  comments,
  permission,
  projectCreatedPerUser,
  to,
  projectId,
  personId,
  isNew = false,
  editorTo = 'objeto',

  onNewComment,
}: ICommentsOnPageProps) {
  const { commentInPlot } = useContext(ProjectsContext)

  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(true)

  async function handleNewComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!newComment) return

    const newCommentObj = {
      to,
      content: newComment,
    }

    if (onNewComment) {
      setNewComment('')
      return onNewComment(newCommentObj)
    }

    await commentInPlot(newCommentObj, projectId)
    setNewComment('')
  }

  return (
    <CommentsOnPageContainer onWindow={showComments}>
      <CommentsHeader>
        <Text as="p">
          <Chats size={24} />
          Comentários
        </Text>
        <ShowComment
          type="button"
          onClick={() => setShowComments(!showComments)}
          show={showComments}
        >
          <CaretDoubleRight size={24} />
        </ShowComment>
      </CommentsHeader>
      {permission !== 'view' && (
        <NewCommentForm onSubmit={handleNewComment}>
          <Text size="xxs">
            {isNew
              ? `Você precisa criar o ${editorTo} antes de comentar algo`
              : 'Faça um novo comentário:'}
          </Text>
          <Textarea
            disabled={isNew}
            placeholder="Escreva seu comentário aqui"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            disabled={isNew}
            type="submit"
            label="Comentar"
            icon={<PaperPlaneTilt weight="bold" />}
            align="center"
          />
        </NewCommentForm>
      )}

      <Comments>
        {comments &&
          comments.map((comment) => (
            <Comment
              projectId={projectId}
              projectCreatedPerUser={projectCreatedPerUser}
              permission={permission}
              key={comment.id}
              comment={comment}
              asPerson={!!onNewComment}
              personId={personId}
            />
          ))}
      </Comments>
    </CommentsOnPageContainer>
  )
}
