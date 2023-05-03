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
import { usePersonalities } from '@hooks/usePersonalities'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Anchor, PlusCircle, UserCircleGear, X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Personality } from './components/Personality'
import {
  ConsequenceCard,
  ExcludeButton,
  NewConsequenceCard,
  NewPersonalityForm,
} from './styles'
import { NewConsequenceModal } from '../../components/NewConsequenceModal'
import { Toast } from '@components/usefull/Toast'

const newPersonalityBodySchema = z.object({
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

type newPersonalityData = z.infer<typeof newPersonalityBodySchema>
type newConsequenceData = { title: string; description: string }

export default function NewPersonalityPage() {
  const [
    toastErrorAlreadyConsequenceExisteIsOpen,
    setToastErrorAlreadyConsequenceExisteIsOpen,
  ] = useState(false)
  const [newConsequenceModalIsOpen, setNewConsequenceModalIsOpen] =
    useState(false)
  const [personalitySelected, setPersonalitySelected] = useState<string | null>(
    null,
  )

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission } = useProject(id as string)
  const { personName, loadingPerson, person } = usePerson(personId as string)
  const { loadingPersonalities, findPersonalityWherePersonNotExisteIn } =
    usePersonalities(id as string)
  const personalities = findPersonalityWherePersonNotExisteIn(
    personId as string,
  )
  const personality = personalities.find(
    (personality) => personality.id === personalitySelected,
  )

  const { handleSubmit, register, watch, setValue, formState } =
    useForm<newPersonalityData>({
      resolver: zodResolver(newPersonalityBodySchema),
    })

  const consequences = watch('consequences')

  function handleSelectPersonality(id: string) {
    if (id === personalitySelected) return setPersonalitySelected(null)

    setPersonalitySelected(id)
  }

  function handleCreatePersonality(data: newPersonalityData) {
    console.log(data)
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

  return (
    <>
      <NextSeo
        title={`${personName}-Nova personalidade | Magiscrita`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Personalidade', 'Nova']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
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
            icon={<UserCircleGear size={40} />}
            label={
              personalitySelected && personality
                ? `Personalidade selecionada: ${personality.title}`
                : 'Nova personalidade'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione uma personalidade criada anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={personalities[0] ? 3 : 1}>
            {personalities[0] ? (
              personalities.map((personality) => (
                <Personality
                  selected={
                    personalitySelected === null
                      ? true
                      : personalitySelected === personality.id
                  }
                  personality={personality}
                  key={personality.id}
                  onClick={() => handleSelectPersonality(personality.id)}
                />
              ))
            ) : loadingPersonalities ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhuma personalidade criada anteriormente... Vamos criar a primeira?" />
            )}
          </ContainerGrid>

          {!personalitySelected ? (
            <NewPersonalityForm
              onSubmit={handleSubmit(handleCreatePersonality)}
            >
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar uma nova personalidade para seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <LabelInput
                  error={formState.errors.title?.message}
                  label="Titulo da personalidade"
                >
                  <TextInputRoot>
                    <TextInputIcon>
                      <UserCircleGear />
                    </TextInputIcon>

                    <TextInputInput
                      placeholder="Titulo exemplo"
                      {...register('title')}
                    />
                  </TextInputRoot>
                </LabelInput>

                <LabelInput
                  error={formState.errors.description?.message}
                  label="Descrição da personalidade:"
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
                  <UserCircleGear />
                </ButtonIcon>

                <ButtonLabel>Criar personalidade</ButtonLabel>
              </ButtonRoot>
            </NewPersonalityForm>
          ) : (
            <ContainerGrid>
              <ButtonRoot align="center" type="button">
                <ButtonIcon>
                  <Anchor />
                </ButtonIcon>
                <ButtonLabel>
                  Atribuir &quot;{personality?.title}&quot; ao personagem{' '}
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
