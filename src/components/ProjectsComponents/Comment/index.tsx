import { useState, useContext, FormEvent } from 'react'
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
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { AvatarWeb } from '@components/usefull/Avatar'
import { IComment } from '@api/responsesTypes/IProjectResponse'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Heading } from '@components/usefull/Heading'
import { Text } from '@components/usefull/Text'

interface ICommentProps {
  comment: IComment
  projectId: string
  isPreview?: boolean
  permission?: 'edit' | 'view' | 'comment' | undefined
  projectCreatedPerUser?: string
  asPerson?: boolean
  personId?: string
}

export function Comment({
  comment,
  isPreview = false,
  projectId,
  permission,
  projectCreatedPerUser,
  asPerson = false,
  personId,
}: ICommentProps) {
  const { responseCommentInPlot, users, responseCommentToPerson } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const [newResponse, setNewResponse] = useState('')

  const responses = comment.responses

  const userComment = users.find((user) => user.id === comment.userId) || user

  async function handleNewResponse(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!newResponse) return

    const newResponseObj = {
      content: newResponse,
    }

    if (asPerson) {
      setNewResponse('')
      return await responseCommentToPerson(
        newResponseObj,
        personId as string,
        comment.id,
      )
    }

    setNewResponse('')
    await responseCommentInPlot(newResponseObj, projectId, comment.id)
  }

  return (
    <CommentContainer key={userComment?.id}>
      <HeaderComment isPreview={isPreview}>
        <AvatarWeb
          src={userComment?.avatar?.url}
          size={isPreview ? 'md' : 'sm'}
        />
        <Text as="span" size="2xl" height="shorter" weight="bold" family="body">
          {userComment?.username}
          {userComment?.id === projectCreatedPerUser && ' (Criador)'}
          <Text as="span" size="xxs">
            {comment.createAt}
          </Text>
        </Text>
      </HeaderComment>
      <CommentContent isPreview={isPreview}>
        <Text
          as="span"
          size={isPreview ? 'xxs' : 'sm'}
          weight={isPreview ? 'regular' : 'bold'}
        >
          Comentário:
        </Text>

        <Text className="content" family="body">
          {comment.content}
        </Text>

        {isPreview && comment.responses?.length !== 0 && (
          <Text as="span" size="xxs">
            Acesse para ver as respostas
          </Text>
        )}

        {!isPreview && (
          <ResponsesComment>
            <Text
              as="span"
              size={isPreview ? 'xxs' : 'sm'}
              weight={isPreview ? 'regular' : 'bold'}
            >
              Respostas:
            </Text>

            {responses &&
              responses.map((response) => {
                const userResponse =
                  users.find((user) => user.id === response.userId) || user

                return (
                  <Response key={response.id}>
                    <HeaderComment isPreview="false">
                      <AvatarWeb
                        src={userResponse?.avatar?.url}
                        size={isPreview ? 'md' : 'sm'}
                      />
                      <Heading as="span" size="sm">
                        {userResponse?.username}
                        {userResponse?.id === projectCreatedPerUser &&
                          ' (Criador)'}
                        <Text as="p" size="xxs">
                          {response.createAt}
                        </Text>
                      </Heading>
                    </HeaderComment>

                    <CommentContent>
                      <Text
                        as="span"
                        size={isPreview ? 'xxs' : 'sm'}
                        weight={isPreview ? 'regular' : 'bold'}
                      >
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
        )}
      </CommentContent>
    </CommentContainer>
  )
}
