import { useContext, useState } from 'react'
import { Button, Text } from '@og-ui/react'
import { UserCircleMinus, X } from 'phosphor-react'

import { CardAuthorContainer, UnshareButton, UnshareConfirm } from './styles'
// import { IProjectResponse } from '@api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { UserContext } from '@contexts/user'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { useWindowSize } from '@hooks/useWindow'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'

interface ICardAuthorProps {
  userAuthor: IUserResponse | undefined
  book: IBooksResponse | undefined
}

export function CardAuthor({ userAuthor, book }: ICardAuthorProps) {
  const { user } = useContext(UserContext)
  const [unshare, setUnshare] = useState(false)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  function handleUnshare() {}

  return (
    <CardAuthorContainer>
      <ContainerGrid alignCenter>
        <AvatarWeb
          size={smallWindow ? '2xl' : '4xl'}
          src={userAuthor?.avatar?.url}
          selfCenter
        />
        {userAuthor?.id !== user?.id && (
          <UnshareButton
            className="unshare"
            icon={unshare ? <X /> : <UserCircleMinus />}
            wid="hug"
            label={unshare ? 'Cancelar' : 'Remover'}
            onClick={() => {
              if (unshare) return setUnshare(false)
              setUnshare(true)
            }}
          />
        )}
      </ContainerGrid>
      <ContainerGrid padding={4}>
        <InfoDefault title="Nome:">
          <Text size="xs">{`${userAuthor?.name} ${
            userAuthor?.id === user?.id ? ' (criador)' : ''
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

            <Button
              type="button"
              className="unshare"
              icon={<UserCircleMinus />}
              wid="full"
              label="Confirmar"
              onClick={handleUnshare}
            />
          </InfoDefault>
        </UnshareConfirm>
      )}
    </CardAuthorContainer>
  )
}
