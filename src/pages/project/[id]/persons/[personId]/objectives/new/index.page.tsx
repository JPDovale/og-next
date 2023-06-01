import { IError } from '@@types/errors/IError'
import { Avatares } from '@components/usefull/Avatares'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { HeadingPart } from '@components/usefull/HeadingPart'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { InputRadio } from '@components/usefull/InputRadio'
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
import { ToastError } from '@components/usefull/ToastError'
import { zodResolver } from '@hookform/resolvers/zod'
import { useObjectives } from '@hooks/useObjectives'
import { usePerson } from '@hooks/usePerson'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  Anchor,
  Crosshair,
  Skull,
  UserMinus,
  UserSquare,
  UsersThree,
} from 'phosphor-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Objective } from './components/Objective'
import { NewObjectiveForm } from './styles'

const newObjectiveBodySchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O titulo precisa ter pelo menos 2 caracteres' })
    .max(90, { message: 'O titulo não pode ter mais de 90 caracteres' }),

  description: z
    .string()
    .min(2, { message: 'A descrição precisa ter pelo menos 2 caracteres' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),

  itBeRealized: z.boolean({ description: 'Esse campo é obrigatório!' }),

  supporters: z.array(z.object({ id: z.string().uuid() })).optional(),

  avoiders: z.array(z.object({ id: z.string().uuid() })).optional(),
})

type newObjectiveData = z.infer<typeof newObjectiveBodySchema>

export default function NewObjectivePage() {
  const [objectiveSelected, setObjectiveSelected] = useState<string | null>(
    null,
  )
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id, personId } = router.query
  const { GoBackButton } = usePreventBack(`/project/${id}/persons/${personId}`)

  const { projectName, permission, findManyPersons } = useProject(id as string)
  const { personName, loadingPerson, person, callEvent } = usePerson(
    personId as string,
  )
  const { loadingObjectives, findObjectiveWherePersonNotExisteIn } =
    useObjectives(id as string)
  const objectives = findObjectiveWherePersonNotExisteIn(personId as string)
  const objective = objectives.find(
    (objective) => objective.id === objectiveSelected,
  )

  const { handleSubmit, register, watch, setValue, formState } =
    useForm<newObjectiveData>({
      resolver: zodResolver(newObjectiveBodySchema),
    })

  const avoiders = watch('avoiders')
  const supporters = watch('supporters')
  const itBeRealized = watch('itBeRealized')

  const {
    personsToPossibleAddInObjective,
    avoidersPersons,
    supportersPersons,
  } = useMemo(() => {
    const notPossiblePersonsToAddInObjective: string[] = [
      personId?.toString() || '',
    ]

    const avoidersIds: string[] = []
    const supportersIds: string[] = []

    avoiders?.map((avoider) => {
      notPossiblePersonsToAddInObjective.push(avoider.id)
      return avoidersIds.push(avoider.id)
    })
    supporters?.map((supporter) => {
      notPossiblePersonsToAddInObjective.push(supporter.id)
      return supportersIds.push(supporter.id)
    })

    const personsToPossibleAddInObjective = findManyPersons(
      notPossiblePersonsToAddInObjective,
      {
        reverse: true,
      },
    )

    const avoidersPersons = findManyPersons(avoidersIds)
    const supportersPersons = findManyPersons(supportersIds)

    return {
      personsToPossibleAddInObjective,
      avoidersPersons,
      supportersPersons,
    }
  }, [avoiders, supporters, personId, findManyPersons])

  function handleUpdateItBeRealized(newState: any) {
    const newItBeRealized = newState as boolean

    if (newItBeRealized === itBeRealized) return

    setValue('itBeRealized', newItBeRealized)
  }

  function handleSelectObjective(id: string) {
    if (id === objectiveSelected) return setObjectiveSelected(null)

    setObjectiveSelected(id)
  }

  function handleAddSupporter(personId: string) {
    const supportersArrayEveryTime = supporters || []

    setValue('supporters', [...supportersArrayEveryTime, { id: personId }])
  }

  function handleAddAvoider(personId: string) {
    const avoidersArrayEveryTime = avoiders || []

    setValue('avoiders', [...avoidersArrayEveryTime, { id: personId }])
  }

  function handleRemovePersonSupportersOrAvoiders(personId: string) {
    const personInAvoiders = avoiders?.find(
      (avoider) => avoider.id === personId,
    )

    if (!personInAvoiders) {
      const filteredSupporters = supporters?.filter(
        (supporter) => supporter.id !== personId,
      )
      setValue('supporters', filteredSupporters)
    } else {
      const filteredAvoiders = avoiders?.filter(
        (avoider) => avoider.id !== personId,
      )
      setValue('avoiders', filteredAvoiders)
    }
  }

  async function handleCreateObjective(data: newObjectiveData) {
    const { resolved, error } = await callEvent.createObject<newObjectiveData>({
      path: 'objectives',
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
    if (!objectiveSelected) return

    const { resolved, error } = await callEvent.createObjectReference({
      path: 'objectives',
      referenceId: objectiveSelected,
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
      <NextSeo title={`${personName}-Novo objetivo | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens', `${personName}`, 'Objetivos', 'Novo']}
        loading={loadingPerson}
        inError={!loadingPerson && !person}
        inErrorNotAuthorized={permission !== 'edit'}
        isScrolling
      >
        <ToastError error={error} setError={setError} />

        <ContainerGrid padding={4} isRelativePosition>
          <GoBackButton topDistance={4} />

          <HeadingPart
            icon={<Crosshair size={40} />}
            label={
              objectiveSelected && objective
                ? `Objetivo selecionado: ${objective.infos.title}`
                : 'Novo objetivo'
            }
            inTop
          />

          <Text weight="bold" family="body" size="xl">
            Selecione um objetivo criado anteriormente para reaproveitar:
          </Text>

          <ContainerGrid padding={0} columns={objectives[0] ? 3 : 1}>
            {objectives[0] ? (
              objectives.map((objective) => (
                <Objective
                  selected={
                    objectiveSelected === null
                      ? true
                      : objectiveSelected === objective.id
                  }
                  objective={objective}
                  key={objective.id}
                  onClick={() => handleSelectObjective(objective.id)}
                />
              ))
            ) : loadingObjectives ? (
              <ContainerGrid padding={0} css={{ minHeight: '380px' }}>
                <Loading autoAdapt />
              </ContainerGrid>
            ) : (
              <ListEmpty message="Nenhum objetivo criado anteriormente... Vamos criar o primeiro?" />
            )}
          </ContainerGrid>

          {!objectiveSelected ? (
            <NewObjectiveForm onSubmit={handleSubmit(handleCreateObjective)}>
              <Text weight="bold" size="xl" family="body">
                Está na hora de criar um novo objetivo para seu personagem
              </Text>

              <ContainerGrid padding={0}>
                <ContainerGrid padding={0}>
                  <LabelInput
                    error={formState.errors.title?.message}
                    label="Titulo do objetivo:"
                  >
                    <TextInputRoot>
                      <TextInputIcon>
                        <Crosshair />
                      </TextInputIcon>

                      <TextInputInput
                        placeholder="Titulo exemplo"
                        {...register('title')}
                      />
                    </TextInputRoot>
                  </LabelInput>

                  <LabelInput
                    error={formState.errors.description?.message}
                    label="Descrição do objetivo:"
                  >
                    <Textarea
                      placeholder="Descrição exemplo"
                      resizable
                      {...register('description')}
                    />
                  </LabelInput>

                  <LabelInput
                    error={formState.errors.itBeRealized?.message}
                    label="O objetivo será realizado ao fim da história?"
                  >
                    <InputRadio
                      state={itBeRealized}
                      setState={handleUpdateItBeRealized}
                      values={[
                        {
                          label: 'Sim',
                          value: true,
                        },
                        {
                          label: 'Não',
                          value: false,
                        },
                      ]}
                    />
                  </LabelInput>
                </ContainerGrid>

                <ContainerGrid padding={0} columns={2}>
                  <InfoDefault
                    title={`Apoiadores: ${supportersPersons.length}`}
                    size="sm"
                  >
                    <ContainerGrid darkBackground>
                      {supportersPersons && supportersPersons[0] ? (
                        <Avatares
                          firstButtonIcon={<UserMinus />}
                          firstButtonFunction={
                            handleRemovePersonSupportersOrAvoiders
                          }
                          persons={supportersPersons}
                          listEmptyMessage=""
                        />
                      ) : (
                        <ListEmpty
                          icon={<UsersThree size={24} />}
                          message="Nenhum apoiador adicionado ainda"
                          isInLine
                        />
                      )}
                    </ContainerGrid>
                  </InfoDefault>

                  <InfoDefault
                    title={`Contras: ${avoidersPersons.length}`}
                    size="sm"
                  >
                    <ContainerGrid darkBackground>
                      {avoidersPersons && avoidersPersons[0] ? (
                        <Avatares
                          firstButtonIcon={<UserMinus />}
                          firstButtonFunction={
                            handleRemovePersonSupportersOrAvoiders
                          }
                          persons={avoidersPersons}
                          listEmptyMessage=""
                        />
                      ) : (
                        <ListEmpty
                          icon={<Skull size={24} />}
                          message="Nenhum contra adicionado ainda"
                          isInLine
                        />
                      )}
                    </ContainerGrid>
                  </InfoDefault>
                </ContainerGrid>

                <InfoDefault
                  title={`Personagens com possibilidade de atribuição: ${personsToPossibleAddInObjective.length}`}
                  size="sm"
                >
                  <ContainerGrid darkBackground>
                    {personsToPossibleAddInObjective &&
                    personsToPossibleAddInObjective[0] ? (
                      <Avatares
                        firstButtonFunction={handleAddSupporter}
                        firstButtonIcon={<UsersThree />}
                        secondaryButtonFunction={handleAddAvoider}
                        secondaryButtonIcon={<Skull />}
                        persons={personsToPossibleAddInObjective}
                        listEmptyMessage=""
                        columns={12}
                        size="sm"
                      />
                    ) : (
                      <ListEmpty
                        icon={<UserSquare size={24} />}
                        message="Nenhum personagem com possibilidade de atribuição criado ainda"
                        isInLine
                      />
                    )}
                  </ContainerGrid>
                </InfoDefault>

                <ButtonRoot type="submit" align="center">
                  <ButtonIcon>
                    <Crosshair />
                  </ButtonIcon>

                  <ButtonLabel>Criar objetivo</ButtonLabel>
                </ButtonRoot>
              </ContainerGrid>
            </NewObjectiveForm>
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
                  Atribuir &quot;{objective?.infos.title}&quot; ao personagem{' '}
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
