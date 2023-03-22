import { CardModelNewBox } from '@components/BoxesComponents/CardModelNewBox'
import { CardModelNewPerson } from '@components/PersonsComponents/CardModelNewPerson'
import { CardModelNewProject } from '@components/ProjectsComponents/CardModelNewProject'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Heading } from '@components/usefull/Heading'
import { ToastError } from '@components/usefull/ToastError'
import { ProjectsContext } from '@contexts/projects'
import { useBox } from '@hooks/useBox'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { useContext, useState } from 'react'
import { CardBoxNotInternal } from '../../components/BoxesComponents/CardBoxNotInternal'
import { Container } from './styles'

export default function BoxesPage() {
  const [query, setQuery] = useState('')

  const { loading, error, setError } = useContext(ProjectsContext)

  const { boxes } = useBox()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  usePreventBack()

  return (
    <>
      <NextSeo title="Boxes | Ognare" noindex />

      <DashboardPageLayout
        window={`Boxes: ${boxes ? boxes.length : 0}`}
        query={query}
        setQuery={setQuery}
        loading={loading}
        queryless={boxes && !!boxes[0]}
      >
        <Container>
          {!smallWindow && (
            <>
              <Heading size="sm">Modelos:</Heading>
              <ContainerGrid padding={0} columns={3} css={{ gap: '$8' }}>
                <CardModelNewProject />
                <CardModelNewPerson />
                <CardModelNewBox />
              </ContainerGrid>
              <Heading size="sm">Boxes:</Heading>
            </>
          )}

          <ContainerGrid
            padding={0}
            columns={smallWindow ? 1 : 2}
            css={{ gap: '$8' }}
          >
            {boxes.map((box) => (
              <CardBoxNotInternal key={box.id} box={box} />
            ))}
          </ContainerGrid>
        </Container>

        <ToastError error={error} setError={setError} />
      </DashboardPageLayout>
    </>
  )
}
