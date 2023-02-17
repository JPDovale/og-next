import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { Button, Text } from '@og-ui/react'
import { useRouter } from 'next/dist/client/router'
import { ReactNode } from 'react'
import { AvatarWeb } from '../Avatar'
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
                <Button
                  type="button"
                  icon={firstButtonIcon}
                  wid="full"
                  align="center"
                  onClick={() => handleFirstButton(person.id)}
                />
              )}
              {secondaryButtonIcon && personSelected !== person.id && (
                <Button
                  type="button"
                  icon={secondaryButtonIcon}
                  wid="full"
                  align="center"
                  onClick={() => handleSecondaryButton(person.id)}
                />
              )}
              {internalButtonIcon && personSelected !== person.id && (
                <Button
                  type="button"
                  icon={internalButtonIcon}
                  wid="full"
                  align="center"
                  onClick={() => findPersonAndReturn(person.id)}
                />
              )}
            </Buttons>
            <Header
              as="label"
              size="sm"
              family="body"
              css={{
                marginTop: '-15px',
              }}
            >
              <AvatarWeb
                size={size}
                src={person?.image?.url}
                selected={personSelected === person?.id && true}
                error={!personSelected && error && true}
                isClickable={isClickable}
              />

              <p>{person?.name}</p>
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