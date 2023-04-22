import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { Chats, PaperPlaneTilt } from 'phosphor-react'

import { FormEvent, useState } from 'react'
import { Comment } from '../Comment'
import {
  Comments,
  CommentsHeader,
  CommentsOnPageContainer,
  NewCommentForm,
} from './styles'

interface ICommentsOnPageProps {
  comments?: IComment[]
  permission?: 'edit' | 'view' | 'comment'
  onNewComment?: (newComment: ICreateCommentDTO) => void
  isNew?: boolean
  editorTo?: string
}

export function CommentsOnPage({
  comments,
  permission,
  isNew = false,
  editorTo = 'objeto',
  onNewComment,
}: ICommentsOnPageProps) {
  const [newComment, setNewComment] = useState('')

  async function handleNewComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // if (!newComment) return

    // const newCommentObj = {
    //   to,
    //   content: newComment,
    // }

    // if (onNewComment) {
    //   setNewComment('')
    //   return onNewComment(newCommentObj)
    // }

    // await commentInPlot(newCommentObj, projectId)
    // setNewComment('')
  }

  return (
    <CommentsOnPageContainer>
      <CommentsHeader>
        <Text as="p" weight="bold">
          <Chats size={24} />
          Comentários
        </Text>
      </CommentsHeader>
      {permission !== 'view' && (
        <NewCommentForm onSubmit={handleNewComment}>
          <Text size="xxs" weight="bold">
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
          <ButtonRoot disabled={isNew} type="submit" align="center">
            <ButtonIcon>
              <PaperPlaneTilt weight="bold" />
            </ButtonIcon>

            <ButtonLabel>Comentar</ButtonLabel>
          </ButtonRoot>
        </NewCommentForm>
      )}

      <Comments>
        {comments &&
          comments.map((comment) => (
            <Comment
              permission={permission}
              key={comment.id}
              comment={comment}
            />
          ))}
      </Comments>
    </CommentsOnPageContainer>
  )
}
