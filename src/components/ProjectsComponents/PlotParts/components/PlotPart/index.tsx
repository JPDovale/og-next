import { ButtonIcon, ButtonRoot } from '@components/usefull/Button'
import { Heading } from '@components/usefull/Heading'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import { Pencil } from 'phosphor-react'
import { Content, ElementContent, PlotPartContainer } from './styles'

interface IPlotPartProps {
  idObject: string
  to: string
  element: string | undefined | null
  disabled?: boolean
  permission: 'view' | 'edit' | 'comment' | undefined
  isPreview: boolean
  keyValue: string
  isToProject: boolean
}

export function PlotPart({
  to,
  idObject,
  element,
  permission,
  disabled = false,
  isPreview,
  keyValue,
  isToProject,
}: IPlotPartProps) {
  const router = useRouter()
  const { id } = router.query

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
      <Content
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
              color: '$black',
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
              color: '$black',
              paddingBottom: 16,
            }}
          >
            {finalMessage}
          </Text>
        )}
      </Content>
    </PlotPartContainer>
  )
}
