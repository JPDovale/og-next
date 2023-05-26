import Link from 'next/link'
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
        <Link href={'/docs'}>
          <SideBarItem disabled={asPath === '/docs'}>Introdução</SideBarItem>
        </Link>

        <Link href={'/docs/versions'}>
          <SideBarItem disabled={asPath === '/docs/versions'}>
            Versões
          </SideBarItem>
        </Link>
      </SideBarBlock>

      {addLabels.map((addLabel) => (
        <>
          <SideBarHeader key={addLabel.title}>{addLabel.title}</SideBarHeader>
          <SideBarBlock>
            {addLabel.labels.map((label) => (
              <Link
                key={label.value}
                href={`/docs/${addLabel.value}/${label.value}`}
              >
                <SideBarItem
                  disabled={asPath === `/docs/${addLabel.value}/${label.value}`}
                >
                  {label.label}
                </SideBarItem>
              </Link>
            ))}
          </SideBarBlock>
        </>
      ))}
    </SideBarContainer>
  )
}
