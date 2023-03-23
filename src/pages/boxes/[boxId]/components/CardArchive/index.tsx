import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { IArchive } from '@api/responsesTypes/IBoxResponse'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { Toast } from '@components/usefull/Toast'
import { UploadZone } from '@components/usefull/UploadZone'
import { ProjectsContext } from '@contexts/projects'
import Image from 'next/image'
import { useContext, useState } from 'react'
import {
  CardArchiveContainer,
  ContentCardArchive,
  DeleteButton,
  HeaderCardArchive,
  ImageContainer,
} from './styles'
import { X } from 'phosphor-react'
import { AlertModal } from '@components/usefull/AlertModal'

interface ICardArchiveProps {
  archive: IArchive
  boxId: string
}

export function CardArchive({ archive, boxId }: ICardArchiveProps) {
  const [toastLengthError, setToastLengthError] = useState(false)
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [successDeleteToastOpen, setSuccessDeleteToastOpen] = useState(false)

  const { saveArchiveImages, deleteArchiveBox } = useContext(ProjectsContext)

  async function handleUploadImage(files: File[]) {
    if (files.length > 1) setToastLengthError(true)

    const file = files[0]

    const isUploaded = await saveArchiveImages({
      file,
      archiveId: archive.archive.id,
      boxId,
    })

    if (isUploaded) {
      setSuccessToastOpen(true)
    }
  }

  async function handleDeleteArchive() {
    const isDeleted = await deleteArchiveBox({
      boxId,
      archiveId: archive.archive.id,
    })

    if (isDeleted) {
      setSuccessDeleteToastOpen(true)
    }
  }

  return (
    <CardArchiveContainer title={archive.archive.title}>
      <Toast
        title="Faça upload de apenas 1 arquivos por vez."
        message="Faça upload de apenas 1 arquivos por vez."
        open={toastLengthError}
        setOpen={setToastLengthError}
        type="error"
      />

      <Toast
        title="Arquivo salvo"
        message="Agora você tem a sua própria galeria de fotos para essa ideia."
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
      />

      <Toast
        title="Arquivo deletado"
        message="Você acabou de deletar um aquivo."
        open={successDeleteToastOpen}
        setOpen={setSuccessDeleteToastOpen}
      />

      <HeaderCardArchive>
        <ContainerGrid padding={0} columns={4} isRelativePosition>
          <InfoDefault title="Titulo:" size="sm">
            {archive.archive.title}
          </InfoDefault>
          <InfoDefault title="Imagens:" size="sm">
            {archive.images?.length}
          </InfoDefault>
          <InfoDefault title="Criado em:" size="sm">
            {archive.archive.createdAt}
          </InfoDefault>
          <InfoDefault title="Atualizado em:" size="sm">
            {archive.archive.updatedAt}
          </InfoDefault>

          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <DeleteButton>
                <X />
              </DeleteButton>
            </AlertDialog.Trigger>

            <AlertModal
              description={`Deletar o arquivo "${archive.archive.title}" ocasionará a exclusão permanente de todas as imagens e
              também todas as informações contidas no arquivo. Isso também não poderá
              ser desfeito depois.`}
              onAccept={handleDeleteArchive}
            />
          </AlertDialog.Root>
        </ContainerGrid>
      </HeaderCardArchive>

      <ContentCardArchive>
        <InfoDefault title="Descrição:">
          <Text family="body">{archive.archive.description}</Text>
        </InfoDefault>

        <ContainerGrid padding={0} columns={3} css={{ marginTop: '$5' }}>
          <UploadZone onUpload={handleUploadImage} />

          {archive.images?.map((image) => (
            <ImageContainer key={image.id}>
              <Image src={image.url} alt="" width={900} height={900} />
            </ImageContainer>
          ))}
        </ContainerGrid>
      </ContentCardArchive>
    </CardArchiveContainer>
  )
}
