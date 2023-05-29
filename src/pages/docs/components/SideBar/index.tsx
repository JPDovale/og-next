import { useWindowSize } from '@hooks/useWindow'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'phosphor-react'
import { useState } from 'react'
import {
  SideBarBlock,
  SideBarContainer,
  SideBarHeader,
  SideBarItem,
  SideBarOpen,
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
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false)

  const router = useRouter()
  const { asPath } = router

  const { smallWindow } = useWindowSize()

  return (
    <SideBarContainer sideBarIsOpen={sideBarIsOpen}>
      {smallWindow && (
        <SideBarOpen
          sideBarIsOpen={sideBarIsOpen}
          type="button"
          title={sideBarIsOpen ? 'Fechar barra lateral' : 'Abrir barra lateral'}
          onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
        >
          <ArrowLeft size={20} />
        </SideBarOpen>
      )}

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
