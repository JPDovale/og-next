import { Button, Text } from '@og-ui/react'
import { useRouter } from 'next/router'
import { HouseLine, List, XCircle } from 'phosphor-react'
import { useContext } from 'react'
import { InterfaceContext } from '../../contexts/interface'
import {
  Buttons,
  HeaderProjectContainer,
  Loading,
  Space,
  Title,
} from './styles'

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

  const router = useRouter()

  // const smallWindow = screen.width < 786

  return (
    <>
      <HeaderProjectContainer>
        <Title weight="bold">
          {loading && <Loading />}

          <HouseLine
            size={16}
            onClick={() => router.replace(`/project/${projectId}`)}
          />
          <Text as="span" weight="bold">
            {projectName}
          </Text>
          <Text
            as="span"
            css={{
              marginLeft: -12,
              color: '$base700',
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
            onClick={() => router.replace('/projects')}
          >
            <XCircle size={24} />
          </button>
          <Button
            type="button"
            wid="hug"
            icon={<List />}
            className="showNavigator"
            onClick={() => setNavigatorProjectIsOpen(true)}
          />
        </Buttons>
      </HeaderProjectContainer>
      <Space />
    </>
  )
}
