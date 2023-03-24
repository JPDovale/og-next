import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { ModalContent } from '@components/usefull/ModalContent'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { ProjectsContext } from '@contexts/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileImage, PlusCircle } from 'phosphor-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewArchiveForm } from './styles'

const newArchiveFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'O titulo do arquivo precisa ter pelo menos um carácter.',
    })
    .max(100, {
      message: 'O titulo do arquivo não pode ter mais de 100 caracteres.',
    }),
  description: z
    .string()
    .min(1, {
      message: 'A descrição do arquivo precisa ter pelo menos um carácter.',
    })
    .max(600, {
      message: 'O titulo do arquivo não pode ter mais de 600 caracteres.',
    }),
})

type NewArchiveBody = z.infer<typeof newArchiveFormSchema>

interface INewArchiveInBoxModalProps {
  boxId: string
  onSuccess: () => void
}

export function NewArchiveInBoxModal({
  boxId,
  onSuccess,
}: INewArchiveInBoxModalProps) {
  const { createArchiveInBox } = useContext(ProjectsContext)

  const { handleSubmit, register, formState, reset } = useForm<NewArchiveBody>({
    resolver: zodResolver(newArchiveFormSchema),
  })

  async function handleCreateArchive(archive: NewArchiveBody) {
    const newArchive: ICreateArchiveInBoxRequest = {
      boxId,
      description: archive.description,
      title: archive.title,
    }

    const archiveCreated = await createArchiveInBox(newArchive)

    if (archiveCreated) {
      reset()
      onSuccess()
    }
  }

  return (
    <ModalContent title="Novo arquivo">
      <NewArchiveForm onSubmit={handleSubmit(handleCreateArchive)}>
        <Text as="label">
          <Text
            family="body"
            size="sm"
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            Titulo
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {formState.errors?.title?.message}
            </Text>
          </Text>

          <TextInputRoot
            variant={formState.errors.title?.message ? 'denied' : 'default'}
          >
            <TextInputIcon>
              <FileImage weight="bold" />
            </TextInputIcon>

            <TextInputInput
              placeholder="Titulo do arquivo"
              {...register('title')}
            />
          </TextInputRoot>
        </Text>

        <Text as="label">
          <Text
            family="body"
            size="sm"
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            Descrição
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {formState.errors?.description?.message}
            </Text>
          </Text>

          <Textarea
            css={{ width: '100%', height: 160, resize: 'none' }}
            variant={
              formState.errors.description?.message ? 'denied' : 'default'
            }
            placeholder="Descrição do arquivo"
            {...register('description')}
          />
        </Text>

        <ButtonRoot
          size="sm"
          type="submit"
          align="center"
          disabled={formState.isSubmitting}
        >
          <ButtonIcon>
            <PlusCircle weight="bold" />
          </ButtonIcon>

          <ButtonLabel>Criar</ButtonLabel>
        </ButtonRoot>
      </NewArchiveForm>
    </ModalContent>
  )
}
