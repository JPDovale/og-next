import { IError } from '@@types/errors/IError'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { ModalContent } from '@components/usefull/ModalContent'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { ToastError } from '@components/usefull/ToastError'
import { InterfaceContext } from '@contexts/interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBoxes } from '@hooks/useBoxes'
import { Package, PlusCircle, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewBoxForm, TagCard } from './styles'

const newBoxFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome precisa ter pelo menos dois caracteres' })
    .max(100, { message: 'O nome não pode ter mais de 100 caracteres' }),
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

type NewBoxFormData = z.infer<typeof newBoxFormSchema>

interface INewBoxModalProps {
  onSuccess?: () => void
}

export function NewBoxModal({ onSuccess }: INewBoxModalProps) {
  const [tag, setTag] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const { callEvent, tags: tagsExistes } = useBoxes()
  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  const {
    handleSubmit,
    register,
    formState,
    watch,
    setValue,
    setError: setErrorForm,
    clearErrors,
    reset,
  } = useForm<NewBoxFormData>({
    resolver: zodResolver(newBoxFormSchema),
  })

  const tags = watch('tags')

  function handleAddTag(tagName: string) {
    clearErrors()
    const tagsNow = tags || []

    const tagExistes = tagsNow.find(
      (t) => t.name.toLowerCase().trim() === tagName.toLowerCase().trim(),
    )

    if (tagExistes) {
      setErrorForm('tags', { message: 'Já existe uma tag com esse nome' })

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

  async function handleNewBox(box: NewBoxFormData) {
    const { resolved, error } = await callEvent.create(box)

    if (error) {
      setError(error)
    }

    if (resolved) {
      reset()
      setTag('')
      onSuccess && onSuccess()
    }
  }

  return (
    <ModalContent title="Nova box">
      <ToastError error={error} setError={setError} />

      <NewBoxForm onSubmit={handleSubmit(handleNewBox)} darkMode={isDarkMode}>
        <Text as="label">
          <Text
            family="body"
            size="sm"
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            Nome
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {formState.errors?.name?.message}
            </Text>
          </Text>

          <TextInputRoot
            variant={formState.errors.name?.message ? 'denied' : 'default'}
            css={{ background: !isDarkMode ? '$base600' : '' }}
          >
            <TextInputIcon>
              <Package weight="bold" />
            </TextInputIcon>

            <TextInputInput placeholder="Nome da box" {...register('name')} />
          </TextInputRoot>
        </Text>

        <Text as="label">
          <Text
            family="body"
            size="sm"
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            Descrição (opcional)
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
            css={{
              width: '100%',
              height: 160,
              resize: 'none',
              background: !isDarkMode ? '$base600' : '',
            }}
            variant={
              formState.errors.description?.message ? 'denied' : 'default'
            }
            placeholder="Descrição da box"
            {...register('description')}
          />
        </Text>

        <Text as="label">
          <Text
            family="body"
            size="sm"
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            Adicionar tags para a box (opcional)
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {formState.errors?.tags?.message}
            </Text>
          </Text>

          <TextInputRoot
            variant="noShadow"
            size="sm"
            css={{ background: !isDarkMode ? '$base600' : '' }}
          >
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

        <Text as="div" css={{ paddingBottom: '$4' }}>
          <Text family="body" size="sm">
            Tags existentes:
          </Text>

          <ContainerGrid
            padding={0}
            columns={tagsExistes && tagsExistes[0] ? 5 : 1}
          >
            {tagsExistes && tagsExistes[0] ? (
              <>
                {tagsExistes.map((t) => {
                  const tagAlreadySelected = tags?.find(
                    (tag) =>
                      tag.name.toLowerCase().trim() ===
                      t.name.toLowerCase().trim(),
                  )

                  if (tagAlreadySelected) return ''

                  return (
                    <TagCard
                      darkMode={isDarkMode}
                      onClick={() => handleAddTag(t.name)}
                      key={t.name}
                      css={{
                        cursor: 'pointer',
                        background: '$purple800',
                        color: '$white',
                      }}
                    >
                      <Text>{t.name}</Text>
                    </TagCard>
                  )
                })}
              </>
            ) : (
              <ListEmpty message="Nenhuma tag foi adicionado ainda" isInLine />
            )}
          </ContainerGrid>
        </Text>

        <Text as="div" css={{ paddingBottom: '$4' }}>
          <Text family="body" size="sm">
            Tags da box:
          </Text>

          <ContainerGrid padding={0} columns={tags && tags[0] ? 5 : 1}>
            {tags && tags[0] ? (
              <>
                {tags.map((t) => (
                  <TagCard darkMode={isDarkMode} key={t.name}>
                    <Text>{t.name}</Text>

                    <button
                      type="button"
                      title="remover tag"
                      onClick={() => handleRemoveTag(t.name)}
                    >
                      <X weight="bold" size={12} />
                    </button>
                  </TagCard>
                ))}
              </>
            ) : (
              <ListEmpty message="Nenhuma tag foi adicionado ainda" isInLine />
            )}
          </ContainerGrid>
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
      </NewBoxForm>
    </ModalContent>
  )
}
