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
import { InterfaceContext } from '@contexts/interface'
import { ProjectsContext } from '@contexts/projects'
import { zodResolver } from '@hookform/resolvers/zod'
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

  const { createBox, boxes } = useContext(ProjectsContext)
  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  const boxesNotInternal = boxes?.filter((box) => !box.internal)

  const tagsAlreadyExistesInBoxes: Array<{ name: string }> = []

  boxesNotInternal?.filter((box) => {
    box.tags?.map((tag) => {
      return tagsAlreadyExistesInBoxes.push(tag)
    })

    return ''
  })

  const tagsAlreadyExistesInBoxesFiltered = tagsAlreadyExistesInBoxes.filter(
    (tag, i, self) => i === self.findIndex((t) => t.name === tag.name),
  )

  const {
    handleSubmit,
    register,
    formState,
    watch,
    setValue,
    setError,
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
      setError('tags', { message: 'Já existe uma tag com esse nome' })

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
    const isCreated = await createBox(box)

    if (isCreated) {
      reset()
      setTag('')
      onSuccess && onSuccess()
    }
  }

  return (
    <ModalContent title="Nova box">
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
            css={{ background: !isDarkMode ? '$gray500' : '' }}
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
              background: !isDarkMode ? '$gray500' : '',
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
            css={{ background: !isDarkMode ? '$gray500' : '' }}
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
            columns={
              tagsAlreadyExistesInBoxesFiltered &&
              tagsAlreadyExistesInBoxesFiltered[0]
                ? 5
                : 1
            }
          >
            {tagsAlreadyExistesInBoxesFiltered &&
            tagsAlreadyExistesInBoxesFiltered[0] ? (
              <>
                {tagsAlreadyExistesInBoxesFiltered.map((t) => {
                  const tagAlreadySelected = tags?.find(
                    (tag) =>
                      tag.name.toLowerCase().trim() ===
                      t.name.toLowerCase().trim(),
                  )

                  if (tagAlreadySelected) return ''

                  return (
                    <TagCard
                      onClick={() => handleAddTag(t.name)}
                      key={t.name}
                      css={{ cursor: 'pointer', background: '$purple800' }}
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
                  <TagCard key={t.name}>
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
