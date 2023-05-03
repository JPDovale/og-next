import * as Dialog from '@radix-ui/react-dialog'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { LabelInput } from '@components/usefull/LabelInput'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Loading } from '@components/usefull/Loading'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useValues } from '@hooks/useValues'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, PlusCircle, TreeStructure, X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Value } from './components/Value'
import {
  ExceptionCard,
  ExcludeButton,
  NewExceptionCard,
  NewValueForm,
} from './styles'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Toast } from '@components/usefull/Toast'
import { NewExceptionModal } from '../../components/NewExceptionModal'

const newValueBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),

  exceptions: z
    .array(
      z.object({
        title: z
          .string()
          .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
          .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

        description: z
          .string()
          .min(2, {
            message: 'A descrição precisa ter pelo menos 2 caracteres',
          })
          .max(1000, {
            message: 'A descrição não pode ter mais de 1000 caracteres',
          }),
      }),
    )
    .optional(),
})

type newValueData = z.infer<typeof newValueBodySchema>
type newExceptionData = { title: string; description: string }

export default function NewValuePage() {
  const [
    toastErrorAlreadyExceptionExisteIsOpen,
    setToastErrorAlreadyExceptionExisteIsOpen,
  ] = useState(false)
  const [newExceptionModalIsOpen, setNewExceptionModalIsOpen] = useState(false)
  const [valueSelected, setValueSelected] = useState<string | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { personName, loadingPerson, person } = usePerson(personId as string)
  const { loadingValues, findValueWherePersonNotExisteIn } = useValues(
    id as string,
  )
  const values = findValueWherePersonNotExisteIn(personId as string)
  const value = values.find((value) => value.id === valueSelected)

  const { handleSubmit, register, watch, setValue, formState } =
    useForm<newValueData>({
      resolver: zodResolver(newValueBodySchema),
    })

  const exceptions = watch('exceptions')

  function handleSelectValue(id: string) {
    if (id === valueSelected) return setValueSelected(null)

    setValueSelected(id)
  }

  function handleCreateValue(data: newValueData) {
    console.log(data)
  }

  function handleAddException(exception: newExceptionData) {
    const alreadyExisteExceptionWithName = exceptions?.find(
      (exceptionInArray) =>
        exceptionInArray.title.toLowerCase().trim() ===
        exception.title.toLowerCase().trim(),
    )

    if (alreadyExisteExceptionWithName)
      return setToastErrorAlreadyExceptionExisteIsOpen(true)

    const exceptionsEveryTimeArray = exceptions ?? []
    setValue('exceptions', [...exceptionsEveryTimeArray, exception])
    setNewExceptionModalIsOpen(false)
  }

  function handleRemoveException(exception: newExceptionData) {
    const filteredExceptions = exceptions?.filter(
      (exceptionInArray) => exceptionInArray !== exception,
    )
    setValue('exceptions', filteredExceptions)
  }

  return (
    <>
      <NextSeo title={`${personName}-Novo valor | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Valor', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <Toast
          message="Você já criou uma exceção com esse nome... Tente outro."
          title="Exceção já existe"
          open={toastErrorAlreadyExceptionExisteIsOpen}
          setOpen={setToastErrorAlreadyExceptionExisteIsOpen}
          type="error"
        />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<TreeStructure size={40} />}
            label={
              valueSelected && value
                ? `Valor selecionado: ${value.title}`
                : 'Novo valor'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione um valor criado anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={values[0] ? 3 : 1}>
            {values[0] ? (
              values.map((value) => (
                <Value
                  selected={
                    valueSelected === null ? true : valueSelected === value.id
                  }
                  value={value}
                  key={value.id}
                  onClick={() => handleSelectValue(value.id)}
                />
              ))
            ) : loadingValues ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhum valor criado anteriormente... Vamos criar o primeiro?" />
            )}
          </ContainerGrid>

          {!valueSelected ? (
            <NewValueForm onSubmit={handleSubmit(handleCreateValue)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar um novo valor para seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo do valor"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <TreeStructure />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição do valor:"
                >
                  <Textarea
                    placeholder="Descrição exemplo"
                    resizable
                    {...register('description')}
                  />
                </LabelInput>
              </ContainerGrid>

              <InfoDefault title="Exceções:" size="sm">
                <ContainerGrid padding={0} columns={3} css={{ height: '$40' }}>
                  <Dialog.Root
                    open={newExceptionModalIsOpen}
                    onOpenChange={setNewExceptionModalIsOpen}
                  >
                    <Dialog.Trigger asChild>
                      <NewExceptionCard type="button">
                        <PlusCircle size={24} />
                        <Text weight="bold">Criar exceção</Text>
                        <Text family="body">(OPCIONAL)</Text>
                      </NewExceptionCard>
                    </Dialog.Trigger>

                    <NewExceptionModal onSubmit={handleAddException} />
                  </Dialog.Root>

                  {exceptions &&
                    exceptions[0] &&
                    exceptions.map((exception) => (
                      <ExceptionCard key={exception.title}>
                        <InfoDefault title="Titulo:" size="sm">
                          <Text
                            family="body"
                            size="xl"
                            height="shorter"
                            weight="bold"
                          >
                            {exception?.title}
                          </Text>
                        </InfoDefault>

                        <InfoDefault title="Descrição:" size="sm">
                          <Text
                            family="body"
                            size="lg"
                            height="shorter"
                            weight="bold"
                          >
                            {exception?.description}
                          </Text>
                        </InfoDefault>

                        <ExcludeButton
                          type="button"
                          onClick={() => handleRemoveException(exception)}
                        >
                          <X weight="bold" size={18} />
                        </ExcludeButton>
                      </ExceptionCard>
                    ))}
                </ContainerGrid>
              </InfoDefault>

              <ButtonRoot type="submit" align="center">
                <ButtonIcon>
                  <TreeStructure />
                </ButtonIcon>

                <ButtonLabel>Criar valor</ButtonLabel>
              </ButtonRoot>
            </NewValueForm>
          ) : (
            <ContainerGrid>
              <ButtonRoot align="center" type="button">
                <ButtonIcon>
                  <Anchor />
                </ButtonIcon>
                <ButtonLabel>
                  Atribuir &quot;{value?.title}&quot; ao personagem {personName}
                </ButtonLabel>
              </ButtonRoot>
            </ContainerGrid>
          )}
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
