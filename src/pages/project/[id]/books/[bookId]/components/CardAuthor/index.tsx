import { useState } from 'react'
import { Text } from '@components/usefull/Text'
import { UserCircleMinus, X } from 'phosphor-react'

import { CardAuthorContainer, UnshareButton, UnshareConfirm } from './styles'
// import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { useWindowSize } from '@hooks/useWindow'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { useUser } from '@hooks/useUser'

interface ICardAuthorProps {
  userAuthor: IUserResponse | undefined
  book: IBooksResponse | undefined
}

export function CardAuthor({ userAuthor, book }: ICardAuthorProps) {
  const [unshare, setUnshare] = useState(false)

  const { user } = useUser()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  function handleUnshare() {}

  return (
    <CardAuthorContainer>
      <ContainerGrid alignCenter>
        <AvatarWeb
          size={smallWindow ? '2xl' : '4xl'}
          src={userAuthor?.avatar_url ?? undefined}
          selfCenter
        />
        {userAuthor?.id !== user?.account.id && (
          <UnshareButton
            className="unshare"
            wid="hug"
            onClick={() => {
              if (unshare) return setUnshare(false)
              setUnshare(true)
            }}
          >
            <ButtonIcon>{unshare ? <X /> : <UserCircleMinus />}</ButtonIcon>

            <ButtonLabel>{unshare ? 'Cancelar' : 'Remover'}</ButtonLabel>
          </UnshareButton>
        )}
      </ContainerGrid>
      <ContainerGrid padding={4}>
        <InfoDefault title="Nome:">
          <Text size="xs">{`${userAuthor?.name} ${
            userAuthor?.id === user?.account.id ? ' (criador)' : ''
          }`}</Text>
        </InfoDefault>

        <InfoDefault title="Nome de usuário:">
          <Text size="xs">{userAuthor?.username}</Text>
        </InfoDefault>

        <InfoDefault title="Email:">
          <Text size="xs">{userAuthor?.email}</Text>
        </InfoDefault>
      </ContainerGrid>

      {unshare && (
        <UnshareConfirm>
          <InfoDefault title="">
            <Text size="sm" as="span">
              Quer memos remover o usuário da autoria do livro.?
              <br />
            </Text>
            <Text family="body" as="span" size="sm">
              Esse usuário continuará tendo acesso ao projeto. Caso ele seja um
              editor, poderá editar normalmente todo o projeto, incluindo o
              restante dos livros e esse. (Caso queira retirar o usuário, acesse
              as configurações do projeto.) Se esse usuário participou
              ativamente da construção do livro, ele pode requisitar parte dos
              direitos autorais.
            </Text>

            <ButtonRoot
              type="button"
              className="unshare"
              wid="full"
              onClick={handleUnshare}
            >
              <ButtonIcon>
                <UserCircleMinus />
              </ButtonIcon>

              <ButtonLabel>Confirmar</ButtonLabel>
            </ButtonRoot>
          </InfoDefault>
        </UnshareConfirm>
      )}
    </CardAuthorContainer>
  )
}
