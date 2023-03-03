import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { Comment } from '@components/ProjectsComponents/Comment'
import { ButtonIcon, ButtonRoot } from '@components/usefull/Button'
import { Heading } from '@components/usefull/Heading'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import { Pencil } from 'phosphor-react'
import { Comments, ElementContent, PlotPartContainer } from './styles'

interface IPlotPartProps {
  term: 'o' | 'a' | 'os' | 'as'
  idObject: string
  to: string
  last?: string
  lastTerm?: 'o' | 'a' | 'os' | 'as'
  element: string | undefined
  disabled?: boolean
  permission: 'view' | 'edit' | 'comment' | undefined
  isPreview: boolean
  comments?: IComment[]
  keyValue: string
  isToProject: boolean
}

export function PlotPart({
  to,
  idObject,
  last,
  lastTerm,
  element,
  term,
  permission,
  disabled = false,
  isPreview,
  comments,
  keyValue,
  isToProject,
}: IPlotPartProps) {
  const router = useRouter()
  const { id } = router.query

  const comment = comments?.filter((comment) => comment.to === keyValue)[0]

  const pathToRedirect = isToProject
    ? `/project/${id}/plot/${keyValue}`
    : `/project/${id}/books/${idObject}/${keyValue}`

  const finalMessage =
    permission !== 'edit'
      ? 'Aguarde os editores definirem esse tópico'
      : permission === 'edit'
      ? 'Clique para editar'
      : 'Clique para visualizar'

  return (
    <PlotPartContainer disabled={!element && disabled} isPreview={isPreview}>
      <Heading as="header" size="sm">
        {to}
        {!isPreview && permission === 'edit' && (
          <ButtonRoot
            type="button"
            wid="hug"
            disabled={!element && disabled}
            onClick={() => {
              if (!element && disabled) return
              router.push(pathToRedirect)
            }}
          >
            <ButtonIcon>
              <Pencil />
            </ButtonIcon>
          </ButtonRoot>
        )}
      </Heading>
      <Text
        as="div"
        family="body"
        size="lg"
        onClick={() => {
          if (!element && disabled) return
          router.push(pathToRedirect)
        }}
      >
        {element && (
          <ElementContent dangerouslySetInnerHTML={{ __html: element! }} />
        )}

        {!element && !isPreview ? (
          <Text
            as="span"
            size="xs"
            css={{
              alignSelf: 'center',
              color: isPreview ? '$black' : '$white',
            }}
          >
            {finalMessage}
          </Text>
        ) : (
          <Text
            as="span"
            size="xs"
            css={{
              alignSelf: 'center',
              color: isPreview ? '$white' : '$white',
              paddingBottom: 16,
            }}
          >
            {finalMessage}
          </Text>
        )}
      </Text>
      {!isPreview && !isToProject && comment && (
        <Comments>
          <Heading as="header" size="sm">
            Comentários
          </Heading>

          <Comment projectId={idObject} comment={comment} isPreview />
        </Comments>
      )}
    </PlotPartContainer>
  )
}
