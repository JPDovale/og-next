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
import { Pencil, X } from 'phosphor-react'
import { AlertModal } from '@components/usefull/AlertModal'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Textarea } from '@components/usefull/Textarea'
import { getDate } from '@utils/dates/getDate'

interface ICardArchiveProps {
  archive: IArchive
  boxId: string
}

const editArchiveFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'O titulo do arquivo precisa ter pelo menos um carácter.',
    })
    .max(100, {
      message: 'O titulo do arquivo não pode ter mais de 100 caracteres.',
    })
    .optional(),
  description: z
    .string()
    .min(1, {
      message: 'A descrição do arquivo precisa ter pelo menos um carácter.',
    })
    .max(600, {
      message: 'O titulo do arquivo não pode ter mais de 600 caracteres.',
    })
    .optional(),
})

type EditArchiveBody = z.infer<typeof editArchiveFormSchema>

export function CardArchive({ archive, boxId }: ICardArchiveProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [toastLengthError, setToastLengthError] = useState(false)
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [successEditToastOpen, setSuccessEditToastOpen] = useState(false)
  const [successDeleteToastOpen, setSuccessDeleteToastOpen] = useState(false)
  const [successDeleteImageToastOpen, setSuccessDeleteImageToastOpen] =
    useState(false)

  const {
    saveArchiveImages,
    deleteArchiveBox,
    deleteImageInArchive,
    updateArchive,
  } = useContext(ProjectsContext)

  const { register, formState, handleSubmit, reset } = useForm<EditArchiveBody>(
    {
      resolver: zodResolver(editArchiveFormSchema),
      defaultValues: {
        title: archive.title,
        description: archive.description,
      },
    },
  )

  async function handleUploadImage(files: File[]) {
    if (files.length > 1) setToastLengthError(true)

    const file = files[0]

    const isUploaded = await saveArchiveImages({
      file,
      archiveId: archive.id,
      boxId,
    })

    if (isUploaded) {
      setSuccessToastOpen(true)
    }
  }

  async function handleDeleteArchive() {
    const isDeleted = await deleteArchiveBox({
      boxId,
      archiveId: archive.id,
    })

    if (isDeleted) {
      setSuccessDeleteToastOpen(true)
    }
  }

  async function handleDeleteImageInArchive(imageId: string) {
    const isDeleted = await deleteImageInArchive({
      boxId,
      archiveId: archive.id,
      imageId,
    })

    if (isDeleted) {
      setSuccessDeleteImageToastOpen(true)
    }
  }

  async function handleUpdateArchive(data: EditArchiveBody) {
    const isUpdated = await updateArchive({
      archiveId: archive.id,
      boxId,
      title: data.title,
      description: data.description,
    })

    if (isUpdated) {
      setIsEditing(false)
      setSuccessEditToastOpen(true)
      reset()
    }
  }

  return (
    <CardArchiveContainer title={archive.title}>
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
        title="Arquivo salvo"
        message="Você acabou de editar o arquivo."
        open={successEditToastOpen}
        setOpen={setSuccessEditToastOpen}
      />

      <Toast
        title="Arquivo deletado"
        message="Você acabou de deletar um aquivo."
        open={successDeleteToastOpen}
        setOpen={setSuccessDeleteToastOpen}
      />

      <Toast
        title="Imagem deletada"
        message="Você acabou de deletar uma imagem."
        open={successDeleteImageToastOpen}
        setOpen={setSuccessDeleteImageToastOpen}
      />

      <HeaderCardArchive>
        <ContainerGrid padding={0} columns={4} isRelativePosition>
          <InfoDefault
            title={`Titulo: ${formState.errors.title?.message}`}
            size="sm"
          >
            {isEditing ? (
              <TextInputRoot
                size="xs"
                variant={
                  formState.errors.title?.message ? 'denied' : 'noShadow'
                }
              >
                <TextInputInput
                  placeholder="Titulo do arquivo"
                  {...register('title')}
                />
              </TextInputRoot>
            ) : (
              archive.title
            )}
          </InfoDefault>
          <InfoDefault title="Imagens:" size="sm">
            {archive.gallery?.length}
          </InfoDefault>
          <InfoDefault title="Criado em:" size="sm">
            {getDate(archive.created_at)}
          </InfoDefault>
          {/* <InfoDefault title="Atualizado em:" size="sm">
            {archive.updatedAt}
          </InfoDefault> */}

          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <DeleteButton>
                <X />
              </DeleteButton>
            </AlertDialog.Trigger>

            <AlertModal
              description={`Deletar o arquivo "${archive.title}" ocasionará a exclusão permanente de todas as imagens e
              também todas as informações contidas no arquivo. Isso também não poderá
              ser desfeito depois.`}
              onAccept={handleDeleteArchive}
            />
          </AlertDialog.Root>
        </ContainerGrid>
      </HeaderCardArchive>

      <ContentCardArchive>
        <ContainerGrid padding={0} isRelativePosition>
          <InfoDefault
            title={`Descrição: ${formState.errors?.description?.message}`}
          >
            <Text family="body">
              {isEditing ? (
                <Textarea
                  css={{ width: '100%', height: 160, resize: 'none' }}
                  variant={
                    formState.errors.description?.message
                      ? 'denied'
                      : 'noShadow'
                  }
                  placeholder="Descrição do arquivo"
                  {...register('description')}
                />
              ) : (
                archive.description
              )}
            </Text>
          </InfoDefault>

          <ContainerGrid padding={0} css={{ display: 'flex' }}>
            <ButtonRoot
              variant="noShadow"
              wid="hug"
              size="xs"
              onClick={() => setIsEditing(!isEditing)}
            >
              <ButtonIcon>{isEditing ? <X /> : <Pencil />}</ButtonIcon>
            </ButtonRoot>

            {isEditing && (
              <ButtonRoot
                onClick={handleSubmit(handleUpdateArchive)}
                variant="noShadow"
                size="xs"
                wid="hug"
                disabled={formState.isSubmitting || !formState.isDirty}
                css={{ padding: '$2 $8' }}
              >
                <ButtonLabel>Salvar</ButtonLabel>
              </ButtonRoot>
            )}
          </ContainerGrid>
        </ContainerGrid>

        <ContainerGrid padding={0} columns={3} css={{ marginTop: '$5' }}>
          <UploadZone onUpload={handleUploadImage} />

          {archive.gallery?.map((image) => (
            <ImageContainer key={image.id}>
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <DeleteButton>
                    <X />
                  </DeleteButton>
                </AlertDialog.Trigger>

                <AlertModal
                  description={`Não será possível recuperar essa imagem após a exclusão ser confirmada...`}
                  onAccept={() => handleDeleteImageInArchive(image.id)}
                />
              </AlertDialog.Root>

              <Image
                src={image.image_url ?? undefined}
                alt=""
                width={900}
                height={900}
              />
            </ImageContainer>
          ))}
        </ContainerGrid>
      </ContentCardArchive>
    </CardArchiveContainer>
  )
}
