import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { Text } from '@components/usefull/Text'
import { ToastError } from '@components/usefull/ToastError'
import { DashboardPageLayout } from '@layouts/DashboardPageLayout'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NewArchiveInBoxModal } from '@components/BoxesComponents/NewArchiveInBoxModal'
import { Toast } from '@components/usefull/Toast'
import { NewArchive } from './components/NewArchive'
import { CardArchive } from './components/CardArchive'
import { useWindowSize } from '@hooks/useWindow'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Package, Pencil, Trash, X } from 'phosphor-react'
import { z } from 'zod'
import { CardTagBox, RemoveButton } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { AlertModal } from '@components/usefull/AlertModal'
import { useBoxes } from '@hooks/useBoxes'
import { IError } from '@@types/errors/IError'
import { ListEmpty } from '@components/usefull/ListEmpty'

const editBoxFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome precisa ter pelo menos dois caracteres' })
    .max(100, { message: 'O nome não pode ter mais de 100 caracteres' })
    .optional(),
  description: z
    .string()
    .max(300, { message: 'A descrição não pode ter mais de 300 caracteres' })
    .optional(),
  tags: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, { message: 'O nome precisa ter pelo menos dois caracteres' })
          .max(100, { message: 'O nome não pode ter mais de 100 caracteres' }),
      }),
    )
    .optional(),
})

type EditBoxFormData = z.infer<typeof editBoxFormSchema>

export default function BoxPage() {
  const [tag, setTag] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [successUpdateToastOpen, setSuccessUpdateToastOpen] = useState(false)

  const router = useRouter()
  const { boxId } = router.query

  const { findBox, loadingBoxes, callEvent } = useBoxes()
  const { box, boxName } = findBox(boxId as string)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { GoBackButton } = usePreventBack('/boxes')

  const {
    handleSubmit,
    register,
    formState,
    clearErrors,
    watch,
    setError: setFormError,
    setValue,
    reset,
  } = useForm<EditBoxFormData>({
    resolver: zodResolver(editBoxFormSchema),
    defaultValues: {
      name: box?.name,
      description: box?.description ?? undefined,
      tags: box?.tags,
    },
  })

  const tags = watch('tags')

  async function handleUpdateBox(data: EditBoxFormData) {
    const { resolved } = await callEvent.updateBox({
      boxId: box!.id,
      description: data.description,
      name: data.name,
      tags: data.tags,
    })

    if (resolved) {
      setSuccessUpdateToastOpen(true)
      setTag('')
      setIsEditing(false)
    }
  }

  function handleAddTag(tagName: string) {
    clearErrors()
    const tagsNow = tags || []

    const tagExistes = tagsNow.find(
      (t) => t.name.toLowerCase().trim() === tagName.toLowerCase().trim(),
    )

    if (tagExistes) {
      setFormError('tags', { message: 'Já existe uma tag com esse nome' })

      return
    }

    setValue('tags', [
      {
        name: tagName,
      },
      ...tagsNow,
    ])

    setTag('')
  }

  function handleRemoveTag(tag: string) {
    const tagsNow = tags || []

    setValue(
      'tags',
      tagsNow.filter((t) => t.name !== tag),
    )
  }

  async function handleDeleteBox() {
    router.push('/boxes')
    await callEvent.deleteBox(box!.id)
  }

  return (
    <DashboardPageLayout loading={loadingBoxes} window={`Box: ${boxName}`}>
      <ToastError error={error} setError={setError} />
      <Toast
        title="Arquivo criado com sucesso"
        message="Você acabou de criar um novo arquivo na sua box"
        open={successToastOpen}
        setOpen={setSuccessToastOpen}
      />

      <Toast
        title="Box editada com sucesso"
        message="Você acabou de de editar a sua box"
        open={successUpdateToastOpen}
        setOpen={setSuccessUpdateToastOpen}
      />

      <ContainerGrid padding={4} css={{ marginTop: '80px' }} isRelativePosition>
        <GoBackButton topDistance={2} />

        <ContainerGrid
          padding={0}
          css={{ display: 'flex', width: smallWindow ? '75%' : '50%' }}
        >
          <ButtonRoot
            size="xs"
            disabled={loadingBoxes}
            variant="noShadow"
            wid="middle"
            align="center"
            onClick={() => {
              setIsEditing(!isEditing)
              if (isEditing) reset()
            }}
          >
            <ButtonIcon>{isEditing ? <X /> : <Pencil />}</ButtonIcon>
            <ButtonLabel>{isEditing ? 'CANCELAR' : 'EDITAR'}</ButtonLabel>
          </ButtonRoot>

          {!isEditing && (
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <ButtonRoot
                  size="xs"
                  disabled={loadingBoxes}
                  variant="noShadow"
                  wid="middle"
                  align="center"
                >
                  <ButtonIcon>
                    <Trash />
                  </ButtonIcon>
                  <ButtonLabel>EXCLUIR</ButtonLabel>
                </ButtonRoot>
              </AlertDialog.Trigger>

              <AlertModal
                description={`Deletar a box "${box?.name}" ocasionará a exclusão permanente de todas as imagens e
              também todas as informações contidas nela. Isso também não poderá
              ser desfeito depois.`}
                onAccept={handleDeleteBox}
              />
            </AlertDialog.Root>
          )}

          {isEditing && (
            <ButtonRoot
              size="xs"
              disabled={formState.isSubmitting}
              variant="noShadow"
              wid="middle"
              align="center"
              onClick={handleSubmit(handleUpdateBox)}
            >
              <ButtonLabel>SALVAR</ButtonLabel>
            </ButtonRoot>
          )}
        </ContainerGrid>

        <ContainerGrid padding={4} darkBackground>
          <ContainerGrid padding={0} columns={smallWindow ? 1 : 2}>
            <InfoDefault
              title={`Nome da box: ${
                formState.errors?.name?.message
                  ? formState.errors.name?.message
                  : ''
              }`}
            >
              {isEditing ? (
                <TextInputRoot variant="noShadow" size="xs">
                  <TextInputInput
                    placeholder="Nome da box:"
                    {...register('name')}
                  />
                </TextInputRoot>
              ) : (
                boxName
              )}
            </InfoDefault>

            <InfoDefault
              title={`Descrição da box: ${
                formState.errors?.description?.message
                  ? formState.errors.description?.message
                  : ''
              }`}
            >
              {isEditing ? (
                <TextInputRoot variant="noShadow" size="xs">
                  <TextInputInput
                    placeholder="Descrição da box:"
                    {...register('description')}
                  />
                </TextInputRoot>
              ) : (
                box?.description ?? 'Carregando...'
              )}
            </InfoDefault>
          </ContainerGrid>

          <ContainerGrid padding={0} columns={6}>
            {tags &&
              tags.map((tag, i) => (
                <CardTagBox key={tag.name}>
                  {tag.name}
                  {tags.length > 1 && isEditing && (
                    <RemoveButton onClick={() => handleRemoveTag(tag.name)}>
                      <X />
                    </RemoveButton>
                  )}
                </CardTagBox>
              ))}
          </ContainerGrid>

          {isEditing && (
            <Text as="label">
              <Text
                family="body"
                size="sm"
                css={{ display: 'flex', justifyContent: 'space-between' }}
              >
                Adicionar tags para a box
                <Text
                  as="span"
                  family="body"
                  size="sm"
                  css={{ color: '$errorDefault', float: 'right' }}
                >
                  {formState.errors?.tags?.message}
                </Text>
              </Text>

              <TextInputRoot variant="noShadow" size="sm">
                <TextInputInput
                  name="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </TextInputRoot>

              <ButtonRoot
                type="button"
                size="xs"
                wid="full"
                align="center"
                variant="noShadow"
                disabled={!tag}
                css={{ marginTop: '$4' }}
                onClick={() => handleAddTag(tag)}
              >
                <ButtonLabel>Adicionar</ButtonLabel>
              </ButtonRoot>
            </Text>
          )}
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
            {box?.archives && box.archives[0] ? (
              box?.archives?.map((archive) => (
                <CardArchive
                  key={archive.id}
                  archive={archive}
                  boxId={box.id}
                />
              ))
            ) : (
              <ListEmpty
                message="Nenhum arquivo foi salvo para esse caixote ainda"
                icon={<Package size={64} />}
              />
            )}
          </ContainerGrid>
        </ContainerGrid>
      </ContainerGrid>
    </DashboardPageLayout>
  )
}
