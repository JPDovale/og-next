import { ModelsHeader } from '@components/ModelsHeader'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Heading } from '@components/usefull/Heading'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { useBoxes } from '@hooks/useBoxes'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { NextSeo } from 'next-seo'
import { Package } from 'phosphor-react'
import { useState } from 'react'
import { CardBoxNotInternal } from '../../components/BoxesComponents/CardBoxNotInternal'
import { Container } from './styles'

export default function BoxesPage() {
  const [query, setQuery] = useState('')

  const { boxes, loadingBoxes } = useBoxes()

  const { smallWindow } = useWindowSize()

  usePreventBack()

  return (
    <>
      <NextSeo title="Boxes | Magiscrita" noindex />

      <DashboardPageLayout
        window={`Boxes: ${boxes ? boxes.length : 0}`}
        query={query}
        setQuery={setQuery}
        loading={loadingBoxes}
        queryless={boxes && !!boxes[0]}
      >
        <Container>
          {!smallWindow && (
            <>
              <ModelsHeader />
              <Heading size="sm">Boxes:</Heading>
            </>
          )}

          <ContainerGrid
            padding={0}
            columns={smallWindow || (boxes && !boxes[0]) ? 1 : 2}
            css={{ gap: '$8' }}
          >
            {boxes && boxes[0] ? (
              boxes.map((box) => <CardBoxNotInternal key={box.id} box={box} />)
            ) : (
              <ListEmpty
                message="Você ainda não criou nenhuma box"
                icon={<Package size={48} />}
              />
            )}
          </ContainerGrid>
        </Container>
      </DashboardPageLayout>
    </>
  )
}
