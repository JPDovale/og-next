import { useState, FormEvent } from 'react'
import { Textarea } from '@components/usefull/Textarea'
import { PaperPlaneTilt } from 'phosphor-react'
import {
  CommentContainer,
  CommentContent,
  HeaderComment,
  NewResponseForm,
  Response,
  ResponsesComment,
} from './styles'
import { AvatarWeb } from '@components/usefull/Avatar'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Heading } from '@components/usefull/Heading'
import { Text } from '@components/usefull/Text'
import { getDate } from '@utils/dates/getDate'
import { IUserInProject, useProject } from '@hooks/useProject'
import { useRouter } from 'next/router'
import { useUser } from '@hooks/useUser'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'

interface ICommentProps {
  comment: IComment
  permission?: 'edit' | 'view' | 'comment'
  onResponseIntersect?: (
    newResponse: ICreateCommentDTO,
    commentId: string,
  ) => Promise<void>
}

export function Comment({
  comment,
  permission,
  onResponseIntersect,
}: ICommentProps) {
  const [newResponse, setNewResponse] = useState('')

  const router = useRouter()
  const { id } = router.query

  const { usersInProject, project, callEvent } = useProject(id as string)
  const { user } = useUser()

  const responses = comment.responses

  const userComment = (usersInProject.find(
    (user) => user.id === comment.user_id,
  ) || user) as IUserInProject

  async function handleNewResponse(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!newResponse) return

    const newResponseObj = {
      content: newResponse,
    }

    if (onResponseIntersect) {
      setNewResponse('')
      return await onResponseIntersect(newResponseObj, comment.id)
    }

    setNewResponse('')
    await callEvent.responseCommentInPlot({
      response: newResponseObj,
      commentId: comment.id,
    })
  }

  return (
    <CommentContainer key={userComment?.id}>
      <HeaderComment>
        <AvatarWeb src={userComment?.avatar_url ?? undefined} size="sm" />
        <Text as="span" size="2xl" height="shorter" weight="bold" family="body">
          {userComment?.username}
          {userComment?.id === project?.user.id && ' (Criador)'}
          <Text as="span" size="xxs">
            {getDate(comment.created_at)}
          </Text>
        </Text>
      </HeaderComment>
      <CommentContent>
        <Text as="span" size="sm" weight="bold">
          Comentário:
        </Text>

        <Text className="content" family="body">
          {comment.content}
        </Text>

        <ResponsesComment>
          <Text as="span" size="sm" weight="bold">
            Respostas:
          </Text>

          {responses &&
            responses.map((response) => {
              const userResponse = (usersInProject.find(
                (user) => user.id === response.user_id,
              ) || user) as IUserInProject

              return (
                <Response key={response.id}>
                  <HeaderComment isPreview="false">
                    <AvatarWeb
                      src={userResponse?.avatar_url ?? undefined}
                      size="sm"
                    />
                    <Heading as="span" size="sm">
                      {userResponse?.username}
                      {userResponse?.id === project?.user.id && ' (Criador)'}
                      <Text as="p" size="xxs">
                        {getDate(response.created_at)}
                      </Text>
                    </Heading>
                  </HeaderComment>

                  <CommentContent>
                    <Text as="span" size="sm" weight="bold">
                      Resposta:
                    </Text>

                    <Text className="contentResponse" family="body">
                      {response.content}
                    </Text>
                  </CommentContent>
                </Response>
              )
            })}
          {permission !== 'view' && (
            <NewResponseForm onSubmit={handleNewResponse}>
              <Text size="xxs">Responda esse comentário</Text>
              <Textarea
                placeholder="Escreva seu comentário aqui"
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
              />
              <ButtonRoot type="submit" align="center">
                <ButtonIcon>
                  <PaperPlaneTilt weight="bold" />
                </ButtonIcon>

                <ButtonLabel>Responder</ButtonLabel>
              </ButtonRoot>
            </NewResponseForm>
          )}
        </ResponsesComment>
      </CommentContent>
    </CommentContainer>
  )
}
