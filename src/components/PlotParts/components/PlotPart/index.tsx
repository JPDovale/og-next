import { Button, Heading, Text } from '@og-ui/react'
import { useRouter } from 'next/router'
import { Pencil } from 'phosphor-react'
import { IComment } from '../../../../api/responsesTypes/IProjcetResponse'
import { Comment } from '../../../Comment'
import { Comments, PlotPartContainer } from './styles'

interface IPlotPartProps {
  term: 'o' | 'a' | 'os' | 'as'
  projectId: string
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
}

export function PlotPart({
  to,
  projectId,
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
}: IPlotPartProps) {
  const router = useRouter()
  const { id } = router.query

  const comment = comments?.filter((comment) => comment.to === keyValue)[0]

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
              router.push(`/project/${id}/plot/${keyValue}`)
            }}
          />
        )}
      </Heading>
      <Text
        as="p"
        family="body"
        size="lg"
        onClick={() => {
          if (!element && isInitialized && disabled) return
          router.replace(`/project/${id}/plot/${keyValue}`)
        }}
      >
        {!element
          ? permission === 'edit'
            ? `Você ainda não definiu ${term} ${to} do seu projeto`
            : `${to} ainda não foi definido pelos editores do projeto`
          : element}

        {!element && isInitialized ? (
          <Text as="span">
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
          <Text as="span">Clique para definir</Text>
        )}
      </Text>
      {!isPreview && comment && (
        <Comments>
          <Heading as="header" size="sm">
            Comentários
          </Heading>

          <Comment projectId={projectId} comment={comment} isPreview />
        </Comments>
      )}
    </PlotPartContainer>
  )
}
