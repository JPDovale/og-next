import { ButtonIcon, ButtonRoot } from '@components/usefull/Button'
import { InterfaceContext } from '@contexts/interface'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import { HouseLine, List, Star, XCircle } from 'phosphor-react'
import { useContext } from 'react'
import {
  Buttons,
  HeaderProjectContainer,
  Loading,
  Space,
  Title,
} from './styles'
import { useUser } from '@hooks/useUser'

type IHeaderProjectProps = {
  projectName: string
  projectId: string
  paths?: string[]
  loading?: boolean
}

export function HeaderProject({
  projectId,
  projectName,
  paths,
  loading = true,
}: IHeaderProjectProps) {
  const { setNavigatorProjectIsOpen } = useContext(InterfaceContext)
  const { userIsPro } = useUser()

  const router = useRouter()

  // const smallWindow = screen.width < 786

  return (
    <>
      <HeaderProjectContainer>
        <Title weight="bold">
          {loading && <Loading />}

          <HouseLine
            size={16}
            onClick={() => router.push(`/project/${projectId}`)}
          />
          {userIsPro && (
            <Star weight="fill" alt="Usuário pro" size={16} color="#f97700" />
          )}
          <Text as="span" weight="bold">
            {loading ? 'Carregando...' : projectName || 'Error'}
          </Text>
          <Text
            as="span"
            css={{
              marginLeft: -12,
              textTransform: 'uppercase',
            }}
            family="body"
          >
            {!!paths && paths.map((p) => `/${p}`)}
          </Text>
        </Title>
        <Buttons>
          <button
            type="button"
            className="close"
            onClick={() => router.push('/projects')}
          >
            <XCircle size={24} />
          </button>
          <ButtonRoot
            type="button"
            wid="hug"
            className="showNavigator"
            onClick={() => setNavigatorProjectIsOpen(true)}
          >
            <ButtonIcon>
              <List />
            </ButtonIcon>
          </ButtonRoot>
        </Buttons>
      </HeaderProjectContainer>
      <Space />
    </>
  )
}
