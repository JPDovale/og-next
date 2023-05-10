import * as Dialog from '@radix-ui/react-dialog'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
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
import { useTraumas } from '@hooks/useTraumas'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, HeartBreak, PlusCircle, X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Trauma } from './components/Trauma'
import {
  ConsequenceCard,
  ExcludeButton,
  NewConsequenceCard,
  NewTraumaForm,
} from './styles'
import { NewConsequenceModal } from '../../components/NewConsequenceModal'
import { Toast } from '@components/usefull/Toast'
import { IError } from '@@types/errors/IError'
import { ToastError } from '@components/usefull/ToastError'

const newTraumaBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),

  consequences: z
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

type newTraumaData = z.infer<typeof newTraumaBodySchema>
type newConsequenceData = { title: string; description: string }

export default function NewTraumaPage() {
  const [
    toastErrorAlreadyConsequenceExisteIsOpen,
    setToastErrorAlreadyConsequenceExisteIsOpen,
  ] = useState(false)
  const [newConsequenceModalIsOpen, setNewConsequenceModalIsOpen] =
    useState(false)
  const [traumaSelected, setTraumaSelected] = useState<string | null>(null)
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { personName, loadingPerson, person, callEvent } = usePerson(
    personId as string,
  )
  const { loadingTraumas, findTraumaWherePersonNotExisteIn } = useTraumas(
    id as string,
  )
  const traumas = findTraumaWherePersonNotExisteIn(personId as string)
  const trauma = traumas.find((trauma) => trauma.id === traumaSelected)

  const { handleSubmit, register, watch, setValue, formState } =
    useForm<newTraumaData>({
      resolver: zodResolver(newTraumaBodySchema),
    })

  const consequences = watch('consequences')

  function handleSelectTrauma(id: string) {
    if (id === traumaSelected) return setTraumaSelected(null)

    setTraumaSelected(id)
  }

  function handleAddConsequence(consequence: newConsequenceData) {
    const alreadyExisteConsequenceWithName = consequences?.find(
      (conseq) =>
        conseq.title.toLowerCase().trim() ===
        consequence.title.toLowerCase().trim(),
    )

    if (alreadyExisteConsequenceWithName)
      return setToastErrorAlreadyConsequenceExisteIsOpen(true)

    const consequencesEveryTimeArray = consequences ?? []
    setValue('consequences', [...consequencesEveryTimeArray, consequence])
    setNewConsequenceModalIsOpen(false)
  }

  function handleRemoveConsequence(consequence: newConsequenceData) {
    const filteredConsequences = consequences?.filter(
      (conseq) => conseq !== consequence,
    )
    setValue('consequences', filteredConsequences)
  }

  async function handleCreateTrauma(data: newTraumaData) {
    const { resolved, error } = await callEvent.createObject<newTraumaData>({
      path: 'traumas',
      object: data,
    })

    if (resolved) {
      router.push(`/project/${id}/persons/${personId}`)
    }

    if (error) {
      setError(error)
    }
  }

  async function handleCreateReference() {
    if (!traumaSelected) return

    const { resolved, error } = await callEvent.createObjectReference({
      path: 'traumas',
      referenceId: traumaSelected,
    })

    if (resolved) {
      router.push(`/project/${id}/persons/${personId}`)
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo title={`${personName}-Nova trauma | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Trauma', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <Toast
          message="Você já criou uma consequência com esse nome... Tente outro."
          title="Consequência já existe"
          open={toastErrorAlreadyConsequenceExisteIsOpen}
          setOpen={setToastErrorAlreadyConsequenceExisteIsOpen}
          type="error"
        />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<HeartBreak size={40} />}
            label={
              traumaSelected && trauma
                ? `Trauma selecionado: ${trauma.title}`
                : 'Novo trauma'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione um trauma criado anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={traumas[0] ? 3 : 1}>
            {traumas[0] ? (
              traumas.map((trauma) => (
                <Trauma
                  selected={
                    traumaSelected === null
                      ? true
                      : traumaSelected === trauma.id
                  }
                  trauma={trauma}
                  key={trauma.id}
                  onClick={() => handleSelectTrauma(trauma.id)}
                />
              ))
            ) : loadingTraumas ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhum trauma criado anteriormente... Vamos criar o primeiro?" />
            )}
          </ContainerGrid>

          {!traumaSelected ? (
            <NewTraumaForm onSubmit={handleSubmit(handleCreateTrauma)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar um novo trauma para seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo do trauma"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <HeartBreak />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição do trauma:"
                >
                  <Textarea
                    placeholder="Descrição exemplo"
                    resizable
                    {...register('description')}
                  />
                </LabelInput>
              </ContainerGrid>

              <InfoDefault title="Consequências:" size="sm">
                <ContainerGrid padding={0} columns={3} css={{ height: '$40' }}>
                  <Dialog.Root
                    open={newConsequenceModalIsOpen}
                    onOpenChange={setNewConsequenceModalIsOpen}
                  >
                    <Dialog.Trigger asChild>
                      <NewConsequenceCard type="button">
                        <PlusCircle size={24} />
                        <Text weight="bold">Criar consequências</Text>
                        <Text family="body">(OPCIONAL)</Text>
                      </NewConsequenceCard>
                    </Dialog.Trigger>

                    <NewConsequenceModal onSubmit={handleAddConsequence} />
                  </Dialog.Root>

                  {consequences &&
                    consequences[0] &&
                    consequences.map((consequence) => (
                      <ConsequenceCard key={consequence.title}>
                        <InfoDefault title="Titulo:" size="sm">
                          <Text
                            family="body"
                            size="xl"
                            height="shorter"
                            weight="bold"
                          >
                            {consequence?.title}
                          </Text>
                        </InfoDefault>

                        <InfoDefault title="Descrição:" size="sm">
                          <Text
                            family="body"
                            size="lg"
                            height="shorter"
                            weight="bold"
                          >
                            {consequence?.description}
                          </Text>
                        </InfoDefault>

                        <ExcludeButton
                          type="button"
                          onClick={() => handleRemoveConsequence(consequence)}
                        >
                          <X weight="bold" size={18} />
                        </ExcludeButton>
                      </ConsequenceCard>
                    ))}
                </ContainerGrid>
              </InfoDefault>

              <ButtonRoot type="submit" align="center">
                <ButtonIcon>
                  <HeartBreak />
                </ButtonIcon>

                <ButtonLabel>Criar trauma</ButtonLabel>
              </ButtonRoot>
            </NewTraumaForm>
          ) : (
            <ContainerGrid>
              <ButtonRoot
                onClick={handleCreateReference}
                align="center"
                type="button"
              >
                <ButtonIcon>
                  <Anchor />
                </ButtonIcon>
                <ButtonLabel>
                  Atribuir &quot;{trauma?.title}&quot; ao personagem{' '}
                  {personName}
                </ButtonLabel>
              </ButtonRoot>
            </ContainerGrid>
          )}
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
