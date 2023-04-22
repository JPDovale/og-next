import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { AvatarWeb } from '../Avatar'
import { ButtonIcon, ButtonRoot } from '../Button'
import {
  AvataresContainer,
  Buttons,
  Header,
  ListEmpty,
  PersonAvatar,
} from './styles'

interface IAvataresProps {
  persons: IPersonsResponse[]
  firstButtonIcon?: ReactNode
  secondaryButtonIcon?: ReactNode
  internalButtonIcon?: ReactNode
  columns?: 5 | 7 | 10 | 12 | 15 | 18
  size?: 'md' | 'sm' | 'xsm' | 'lg' | '2xl' | '4xl' | 'full' | '2xs'
  isClickable?: boolean
  additionalKey?: string

  firstButtonKey?: 'supporting' | 'avoider'
  secondButtonKey?: 'supporting' | 'avoider'

  listEmptyMessage: string
  listEmptyIcon?: ReactNode

  personSelected?: string
  error?: boolean

  firstButtonFunction?: (to: 'supporting' | 'avoider', personId: string) => void
  secondaryButtonFunction?: (
    to: 'supporting' | 'avoider',
    personId: string,
  ) => void
  functionInternalButton?: (id: string) => void
}

export function Avatares({
  persons,
  firstButtonIcon,
  secondaryButtonIcon,
  internalButtonIcon,
  size = 'sm',
  isClickable = false,
  additionalKey,

  firstButtonKey,
  secondButtonKey,

  listEmptyMessage,
  listEmptyIcon,

  personSelected = '',
  error = false,
  columns = 7,

  firstButtonFunction,
  secondaryButtonFunction,
  functionInternalButton,
}: IAvataresProps) {
  const router = useRouter()
  const { id } = router.query

  function findPersonAndReturn(id: string) {
    if (functionInternalButton) return functionInternalButton(id)

    return console.log('Função ausente')
  }

  function handleFirstButton(id: string) {
    firstButtonFunction &&
      firstButtonFunction(firstButtonKey || 'supporting', id)
  }

  function handleSecondaryButton(id: string) {
    secondaryButtonFunction &&
      secondaryButtonFunction(secondButtonKey || 'avoider', id)
  }

  return (
    <AvataresContainer columns={columns} isEmpty={!persons[0]}>
      {persons.map((person) => {
        return (
          <PersonAvatar
            key={`${person?.id}-${additionalKey || 'last'}`}
            onClick={() => {
              isClickable && router.push(`/project/${id}/persons/${person.id}`)
            }}
            isClickable={isClickable}
          >
            <Buttons>
              {firstButtonIcon && personSelected !== person.id && (
                <ButtonRoot
                  size="xxs"
                  variant="noShadow"
                  type="button"
                  wid="full"
                  align="center"
                  onClick={() => handleFirstButton(person.id)}
                >
                  <ButtonIcon>{firstButtonIcon}</ButtonIcon>
                </ButtonRoot>
              )}
              {secondaryButtonIcon && personSelected !== person.id && (
                <ButtonRoot
                  size="xxs"
                  variant="noShadow"
                  type="button"
                  wid="full"
                  align="center"
                  onClick={() => handleSecondaryButton(person.id)}
                >
                  <ButtonIcon>{secondaryButtonIcon}</ButtonIcon>
                </ButtonRoot>
              )}
              {internalButtonIcon && personSelected !== person.id && (
                <ButtonRoot
                  size="xxs"
                  variant="noShadow"
                  type="button"
                  wid="full"
                  align="center"
                  onClick={() => findPersonAndReturn(person.id)}
                >
                  <ButtonIcon>{internalButtonIcon}</ButtonIcon>
                </ButtonRoot>
              )}
            </Buttons>
            <Header
              size="sm"
              family="body"
              css={{
                marginTop: '-15px',
              }}
            >
              <AvatarWeb
                size={size}
                src={person?.image_url ?? undefined}
                selected={personSelected === person?.id && true}
                error={!personSelected && error && true}
                isClickable={isClickable}
              />

              <Text size="sm" family="body">
                {person?.name}
              </Text>
            </Header>
          </PersonAvatar>
        )
      })}
      {!persons[0] && (
        <ListEmpty>
          {listEmptyIcon}
          <Text as="label" family="body">
            {listEmptyMessage}
          </Text>
        </ListEmpty>
      )}
    </AvataresContainer>
  )
}
