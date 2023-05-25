import { useRouter } from 'next/router'
import {
  SideBarBlock,
  SideBarContainer,
  SideBarHeader,
  SideBarItem,
} from './styles'

interface ILabel {
  label: string
  value: string
}

interface IAddLabel {
  title: string
  value: string
  labels: ILabel[]
}

interface ISideBarProps {
  addLabels?: IAddLabel[]
}

export function SideBar({ addLabels = [] }: ISideBarProps) {
  const router = useRouter()
  const { asPath } = router

  return (
    <SideBarContainer>
      <SideBarHeader>Documentação:</SideBarHeader>

      <SideBarBlock>
        <SideBarItem
          disabled={asPath === '/docs'}
          onClick={() => router.push('/docs')}
        >
          Introdução
        </SideBarItem>

        <SideBarItem
          disabled={asPath === '/docs/versions'}
          onClick={() => router.push('/docs/versions')}
        >
          Versões
        </SideBarItem>
      </SideBarBlock>

      {addLabels.map((addLabel) => (
        <>
          <SideBarHeader key={addLabel.title}>{addLabel.title}</SideBarHeader>
          <SideBarBlock>
            {addLabel.labels.map((label) => (
              <SideBarItem
                key={label.value}
                disabled={asPath === `/docs/${addLabel.value}/${label.value}`}
                onClick={() =>
                  router.push(`/docs/${addLabel.value}/${label.value}`)
                }
              >
                {label.label}
              </SideBarItem>
            ))}
          </SideBarBlock>
        </>
      ))}
    </SideBarContainer>
  )
}
