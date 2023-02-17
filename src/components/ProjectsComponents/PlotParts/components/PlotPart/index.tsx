import { IComment } from '@api/responsesTypes/IProjcetResponse'
import { Comment } from '@components/ProjectsComponents/Comment'
import { Button, Heading, Text } from '@og-ui/react'
import { useRouter } from 'next/router'
import { Pencil } from 'phosphor-react'
import { Comments, PlotPartContainer } from './styles'

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
  isInitialized: boolean
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
  isInitialized,
  isToProject,
}: IPlotPartProps) {
  const router = useRouter()
  const { id } = router.query

  const comment = comments?.filter((comment) => comment.to === keyValue)[0]

  const elementLineBraked = element?.split('\n')
  const pathToRedirect = isToProject
    ? `/project/${id}/plot/${keyValue}`
    : `/project/${id}/books/${idObject}/${keyValue}`

  return (
    <PlotPartContainer
      disabled={!element && isInitialized && disabled}
      isPreview={isPreview}
    >
      <Heading as="header" size="sm">
        {to}
        {!isPreview && permission === 'edit' && (
          <Button
            type="button"
            icon={<Pencil />}
            wid="hug"
            disabled={!element && isInitialized && disabled}
            onClick={() => {
              if (!element && isInitialized && disabled) return
              router.push(pathToRedirect)
            }}
          />
        )}
      </Heading>
      <Text
        as="div"
        family="body"
        size="lg"
        onClick={() => {
          if (!element && isInitialized && disabled) return
          router.push(pathToRedirect)
        }}
      >
        {!element ? (
          permission === 'edit' ? (
            <Text family="body">
              Você ainda não definiu {term} {to} do seu projeto{' '}
            </Text>
          ) : (
            <Text family="body">
              {to} ainda não foi definido pelos editores do projeto
            </Text>
          )
        ) : (
          elementLineBraked?.map((line) => {
            if (line) {
              return (
                <Text key={line} family="body">
                  {line}
                  <br />
                  <br />
                </Text>
              )
            }

            return null
          })
        )}

        {!element && isInitialized ? (
          <Text as="span" size="sm">
            {disabled && permission === 'edit'
              ? `Você precisa definir ${lastTerm || term} ${last} antes`
              : disabled
              ? 'As  outras definições precisa acontecer antes'
              : permission === 'edit'
              ? 'Clique para definir'
              : element
              ? 'Clique para visualizar'
              : 'Aguardando os editores'}
          </Text>
        ) : (
          <Text
            as="span"
            size="xs"
            css={{
              alignSelf: 'center',
              color: isPreview ? '$black' : '$white',
              paddingBottom: 16,
            }}
          >
            Clique para definir
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