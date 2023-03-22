import * as Dialog from '@radix-ui/react-dialog'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { ToastError } from '@components/usefull/ToastError'
import { ProjectsContext } from '@contexts/projects'
import { useBox } from '@hooks/useBox'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { NewArchiveInBoxModal } from '@components/BoxesComponents/NewArchiveInBoxModal'
import { Toast } from '@components/usefull/Toast'
import { NewArchive } from './components/NewArchive'
import { CardArchive } from './components/CardArchive'
import { useWindowSize } from '@hooks/useWindow'
import { usePreventBack } from '@hooks/usePreventDefaultBack'

export default function BoxPage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  const { loading, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { boxId } = router.query

  const { findBox } = useBox()
  const { box, boxName } = findBox(boxId as string)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { GoBackButton } = usePreventBack('/boxes')

  return (
    <DashboardPageLayout loading={loading} window={`Box: ${boxName}`}>
      <ToastError error={error} setError={setError} />
      <Toast
        title="Arquivo criado com sucesso"
        message="Você acabou de criar um novo arquivo na sua box"
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
      />

      <ContainerGrid padding={4} css={{ marginTop: '80px' }} isRelativePosition>
        <GoBackButton topDistance={2} />

        <ContainerGrid
          padding={4}
          css={{ marginTop: '40px' }}
          columns={smallWindow ? 1 : 2}
          darkBackground
        >
          <InfoDefault title="Nome da box:">{boxName}</InfoDefault>
          <InfoDefault title="Descrição da box:">
            {box?.description ?? 'Carregando...'}
          </InfoDefault>
        </ContainerGrid>

        <ContainerGrid padding={2}>
          <Text
            size="2xl"
            family="headingText"
            css={
              smallWindow
                ? {}
                : {
                    display: 'flex',
                    justifyContent: 'space-between',
                  }
            }
          >
            Galeria:
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <NewArchive />
              </Dialog.Trigger>

              <NewArchiveInBoxModal
                boxId={box?.id!}
                onSuccess={() => setSuccessToastOpen(true)}
              />
            </Dialog.Root>
          </Text>

          <ContainerGrid padding={0}>
            {box?.archives.map((archive) => (
              <CardArchive
                key={archive.archive.id}
                archive={archive}
                boxId={box.id}
              />
            ))}
          </ContainerGrid>
        </ContainerGrid>
      </ContainerGrid>
    </DashboardPageLayout>
  )
}
