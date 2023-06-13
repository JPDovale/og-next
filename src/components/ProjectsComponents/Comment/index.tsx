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
import { useProject } from '@hooks/useProject'
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

  const { project, callEvent } = useProject(id as string)
  const { user } = useUser()

  const responses = comment.responses

  const userComment = project?.users.find((user) => user.id === comment.user_id)
  const userIsCommenter = !!userComment

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
    <CommentContainer
      key={userIsCommenter ? userComment?.id : user?.account.id}
    >
      <HeaderComment>
        <AvatarWeb
          src={
            userIsCommenter ? userComment?.avatar.url : user?.infos.avatar.url
          }
          size="sm"
        />
        <Text as="span" size="2xl" height="shorter" weight="bold" family="body">
          {userComment?.username}
          {userIsCommenter
            ? userComment?.id === project?.creator.id && ' (Criador)'
            : user?.account.id === project?.creator.id && ' (Criador)'}
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
              const userResponse = project?.users.find(
                (user) => user.id === response.user_id,
              )
              const userIsResponser = !!userResponse

              return (
                <Response key={response.id}>
                  <HeaderComment isPreview="false">
                    <AvatarWeb
                      src={
                        userIsResponser
                          ? userResponse?.avatar.url
                          : user?.infos.avatar.url
                      }
                      size="sm"
                    />
                    <Heading as="span" size="sm">
                      {userIsResponser
                        ? userResponse?.username
                        : user?.infos.username}
                      {userIsResponser
                        ? userResponse?.id === project?.creator.id &&
                          ' (Criador)'
                        : user?.account.id === project?.creator.id &&
                          ' (Criador)'}
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
